import { useEffect, useMemo, useState } from "react";
import PublicPortal from "./components/PublicPortal";
import AdminPanel from "./components/AdminPanel";
import ErrorBoundary from "./components/ErrorBoundary";
import { defaultSettings, seedPosts, uid, type PortalSettings, type Post, type Subscriber } from "./data/portal";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "";

if (!ADMIN_PASSWORD) {
  // Warn at runtime during development if no env var is provided
  console.warn("VITE_ADMIN_PASSWORD not set — admin route disabled. Configure server-side auth for production.");
}

function usePersistentState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key);
      if (!saved) return initial;
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed) && typeof parsed === "object" && parsed !== null && !Array.isArray(initial) && typeof initial === "object" && initial !== null) {
        return { ...initial, ...parsed } as T;
      }
      return parsed as T;
    } catch { return initial; }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage full */ }
  }, [key, value]);
  return [value, setValue] as const;
}

function stripHtml(html: string) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return (doc.body.textContent || "").replace(/\s+/g, " ").trim();
}

function normalizePost(post: Partial<Post>): Post {
  const fallback = seedPosts[0];
  const title = String(post.title || "Untitled");
  const wordCount = title.split(/\s+/).length + (post.content ? post.content.split(/\s+/).length : 0);
  const readTime = Math.max(1, Math.ceil(wordCount / 250));
  return {
    ...fallback,
    ...post,
    id: post.id || uid(),
    title,
    slug: post.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    type: post.type === "blog" ? "blog" : "news",
    category: String(post.category || "समाचार"),
    status: (post.status === "draft" || post.status === "scheduled") ? post.status : "published",
    featured: Boolean(post.featured),
    breaking: Boolean(post.breaking),
    author: String(post.author || "ViralPANA"),
    image: String(post.image || fallback.image),
    excerpt: String(post.excerpt || "ViralPANA editorial update।"),
    content: String(post.content || post.excerpt || "ViralPANA editorial update।"),
    publishedAt: post.publishedAt || new Date().toISOString(),
    updatedAt: post.updatedAt || new Date().toISOString(),
    views: Number.isFinite(Number(post.views)) ? Number(post.views) : 0,
    tags: Array.isArray(post.tags) ? post.tags : [],
    readTime: Number.isFinite(Number(post.readTime)) ? Number(post.readTime) : readTime,
    seo: {
      metaDescription: post.seo?.metaDescription || post.excerpt?.slice(0, 160) || "",
      metaKeywords: post.seo?.metaKeywords || post.category,
      ogImage: post.seo?.ogImage || post.image,
      ogTitle: post.seo?.ogTitle || title,
      ogDescription: post.seo?.ogDescription || post.excerpt,
      canonicalUrl: post.seo?.canonicalUrl || "",
    },
  };
}

export default function App() {
  const [route, setRoute] = useState(() => window.location.hash.replace("#", ""));
  const [storedPosts, setStoredPosts] = usePersistentState<Post[]>("viralpana.posts.v2", seedPosts);
  const [storedSettings, setStoredSettings] = usePersistentState<PortalSettings>("viralpana.settings.v2", defaultSettings);
  const [storedSubscribers, setStoredSubscribers] = usePersistentState<Subscriber[]>("viralpana.subscribers.v2", []);
  const [importedPosts, setImportedPosts] = useState<Post[]>([]);
  const [adminAuthed, setAdminAuthed] = useState(false);

  const localPosts = useMemo(() => (Array.isArray(storedPosts) ? storedPosts.filter(Boolean).map(normalizePost) : []), [storedPosts]);
  const settings = useMemo(() => ({ ...defaultSettings, ...storedSettings }), [storedSettings]);
  const subscribers = useMemo(() => (Array.isArray(storedSubscribers) ? storedSubscribers.filter(s => s?.email) : []), [storedSubscribers]);
  const setLocalPosts = setStoredPosts;
  const setSettings = setStoredSettings;
  const setSubscribers = setStoredSubscribers;

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash.replace("#", ""));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    if (route !== "admin" && route !== "/admin") {
      setAdminAuthed(false);
    }
  }, [route]);

  useEffect(() => {
    let active = true;
    fetch("https://viralpana.blogspot.com/feeds/posts/default?alt=json&max-results=12")
      .then(response => response.ok ? response.json() : Promise.reject())
      .then(data => {
        if (!active) return;
        const existingTitles = new Set(localPosts.map(p => p.title));
        const imported: Post[] = (data.feed?.entry || [])
          .filter((entry: any) => !entry.title.$t.toLowerCase().includes("ads.txt") && !existingTitles.has(entry.title.$t))
          .map((entry: any) => {
            const content = entry.content?.$t || entry.summary?.$t || "";
            const clean = stripHtml(content);
            const image = content.match(/<img[^>]+src=["']([^"']+)/i)?.[1] || entry["media$thumbnail"]?.url?.replace("s72", "s900") || seedPosts[4].image;
            const sourceUrl = entry.link?.find((link: any) => link.rel === "alternate")?.href || "https://viralpana.blogspot.com/";
            return {
              id: entry.id?.$t || uid(),
              title: entry.title.$t,
              type: "blog" as const,
              category: entry.category?.[0]?.term || "समाचार",
              status: "published" as const,
              featured: false,
              breaking: false,
              author: entry.author?.[0]?.name?.$t || "ViralPANA",
              image,
              excerpt: `${clean.slice(0, 180)}...`,
              content: clean,
              publishedAt: entry.published?.$t || new Date().toISOString(),
              views: 1200,
              source: "blogger" as const,
              sourceUrl,
            };
          }).slice(0, 8);
        setImportedPosts(imported);
      }).catch(() => setImportedPosts([]));
    return () => { active = false; };
  }, [localPosts]);

  const posts = useMemo(() => [...importedPosts, ...localPosts], [importedPosts, localPosts]);
  const isAdmin = (route === "admin" || route === "/admin") && adminAuthed;

  const goAdmin = () => {
    if (!ADMIN_PASSWORD) {
      alert("Admin access disabled locally. Configure VITE_ADMIN_PASSWORD or use a backend auth (Supabase/Auth0) for production.");
      return;
    }
    const password = prompt("🔒 Admin Password लेख्नुहोस्:");
    if (password === ADMIN_PASSWORD) {
      setAdminAuthed(true);
      window.location.hash = "admin";
    } else if (password !== null) {
      alert("❌ गलत password! Admin access नाइँ।");
    }
  };

  const goHome = () => {
    setAdminAuthed(false);
    window.location.hash = "";
  };

  const openPost = (post: Post) => {
    if (post.source === "blogger" && importedPosts.some(p => p.id === post.id)) {
      setImportedPosts(current => current.map(p => p.id === post.id ? { ...p, views: p.views + 1 } : p));
    } else {
      setLocalPosts(current => current.map(p => p.id === post.id ? { ...p, views: p.views + 1 } : p));
    }
  };

  const subscribe = (email: string) => {
    setSubscribers(current => current.some(s => s.email.toLowerCase() === email.toLowerCase()) ? current : [{ id: uid(), email, createdAt: new Date().toISOString() }, ...current]);
  };

  const importedCount = importedPosts.length + localPosts.filter(p => p.source === "blogger").length;

  return <ErrorBoundary>
    {isAdmin ? <AdminPanel posts={localPosts} setPosts={setLocalPosts} settings={settings} setSettings={setSettings} subscribers={subscribers} setSubscribers={setSubscribers} importedCount={importedCount} onExit={goHome} /> : <PublicPortal posts={posts} settings={settings} onOpen={openPost} onSubscribe={subscribe} onAdmin={goAdmin} />}
  </ErrorBoundary>;
}
