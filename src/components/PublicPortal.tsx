import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Bell, Calendar, Clock, Eye, Globe, Heart, Menu, MessageCircle, Radio, Search, Share2, ShieldCheck, TrendingUp, X as XIcon } from "lucide-react";
import { categories, formatNepaliDate, type PortalSettings, type Post } from "../data/portal";
import { ArticleCard, TrendingWidget, NewsletterForm, AdSlot, ShareButtons, Reveal, EmptyState } from "./components";

const ease = [0.22, 1, 0.36, 1] as const;

export function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#top" className={`brand-logo inline-block ${compact ? "scale-75" : ""}`} aria-label="ViralPANA home">
      <div className="relative">
        <h1 className="text-2xl lg:text-3xl font-black text-gray-900">
          VIRAL<span className="text-red-600">PANA</span>
        </h1>
        <p className="text-xs font-bold text-gray-600 tracking-wider">The Wave of Truth</p>
      </div>
    </a>
  );
}

function Nav({ onAdmin }: { onAdmin: () => void }) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-white shadow-lg border-b border-gray-200">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-4 py-2 sm:px-6 text-xs text-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <span className="flex items-center gap-2">
              <Radio className="h-3.5 w-3.5 animate-pulse text-red-500" />
              {new Intl.DateTimeFormat("ne-NP", { dateStyle: "long" }).format(new Date())}
            </span>
            <span className="font-semibold text-red-400">लाइभ अपडेट</span>
          </div>
        </div>

        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <BrandLogo />

          <div className="hidden items-center gap-6 lg:flex">
            {categories.filter(c => c !== "सबै").slice(0, 6).map((cat) => (
              <a key={cat} href={`#category/${cat}`} className="text-sm font-semibold text-gray-700 hover:text-red-600 transition">
                {cat}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 hover:bg-gray-100 rounded-lg transition">
              <Search className="h-5 w-5 text-gray-700" />
            </button>
            <a href="#subscribe" className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700 transition">
              <Bell className="h-4 w-4" /> न्यूज़ अलर्ट
            </a>
            <button onClick={onAdmin} className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50 transition">
              <ShieldCheck className="h-4 w-4" /> Admin
            </button>
          </div>

          <button onClick={() => setOpen(!open)} className="rounded-lg p-2 lg:hidden hover:bg-gray-100" aria-label="Menu">
            {open ? <XIcon className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        <AnimatePresence>
          {searchOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="border-t border-gray-200 bg-gray-50 px-4 py-4 sm:px-6">
              <input type="search" placeholder="खोज गर्नुहोस्..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-600" autoFocus />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="border-t border-gray-200 bg-white px-4 py-4 lg:hidden">
              <div className="space-y-2">
                {categories.filter(c => c !== "सबै").map((cat) => (
                  <a key={cat} href={`#category/${cat}`} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 font-semibold text-gray-700 hover:bg-red-50 hover:text-red-600 transition">
                    {cat}
                  </a>
                ))}
              </div>
              <div className="mt-4 space-y-2 border-t border-gray-200 pt-4">
                <a href="#subscribe" className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700 transition">
                  <Bell className="h-4 w-4" /> न्यूज़ अलर्ट
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div className="h-32 sm:h-36 lg:h-40" />
    </>
  );
}

function BreakingTicker({ posts, headline }: { posts: Post[]; headline: string }) {
  const breaking = posts.filter(p => p.breaking || p.featured).slice(0, 4);
  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="mx-auto flex max-w-7xl overflow-hidden">
        <div className="flex shrink-0 items-center gap-2 bg-red-600 px-4 py-3 text-sm font-black">
          <span className="animate-pulse">🔥</span> ताजा खबर
        </div>
        <div className="relative flex-1 overflow-hidden py-3">
          <div className="animate-marquee flex w-max gap-12 whitespace-nowrap text-sm font-semibold">
            <span>{headline}</span>
            {breaking.map(p => <span key={p.id} className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" /> {p.title}
            </span>)}
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroSection({ posts, settings, onOpen }: { posts: Post[]; settings: PortalSettings; onOpen: (p: Post) => void }) {
  const published = posts.filter(p => p.status === "published");
  const featured = published.find(p => p.featured) || published[0];
  const secondary = published.filter(p => p.id !== featured?.id).slice(0, 3);

  if (!featured) return null;

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <motion.div
              whileHover={{ y: -2 }}
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-2xl min-h-[500px] lg:min-h-[600px]"
            >
              <img src={featured.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60 group-hover:opacity-70 transition duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
              <div className="relative flex h-full flex-col justify-end p-6 sm:p-8">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-block rounded-full bg-red-600 px-4 py-1.5 text-xs font-black">मुख्य समाचार</span>
                  <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-black backdrop-blur">{featured.category}</span>
                </div>
                <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">{featured.title}</h1>
                <p className="mt-4 max-w-2xl leading-7 text-white/80">{featured.excerpt}</p>
                <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/70">
                  <span className="font-semibold">{featured.author}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {formatNepaliDate(featured.publishedAt)}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {featured.readTime} min</span>
                </div>
                <button
                  onClick={() => onOpen(featured)}
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-black text-gray-900 hover:bg-red-50 transition hover:-translate-y-0.5"
                >
                  पूरा पढ्नुहोस् <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </Reveal>

          <div className="grid gap-4">
            {secondary.map((post, i) => (
              <Reveal key={post.id} delay={0.1 + i * 0.05}>
                <ArticleCard post={post} onClick={() => onOpen(post)} />
              </Reveal>
            ))}
            <AdSlot settings={settings} compact />
          </div>
        </div>
      </div>
    </section>
  );
}

function ArticlesGrid({ posts, category, settings, onOpen }: { posts: Post[]; category: string; settings: PortalSettings; onOpen: (p: Post) => void }) {
  const filtered = posts.filter(p => p.status === "published" && (category === "सबै" || p.category === category));

  if (!filtered.length) return <EmptyState />;

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="space-y-8">
      {featured && <ArticleCard post={featured} onClick={() => onOpen(featured)} featured />}
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((post, i) => (
          <Reveal key={post.id} delay={i * 0.05}>
            <ArticleCard post={post} onClick={() => onOpen(post)} />
          </Reveal>
        ))}
      </div>

      <AdSlot settings={settings} />
    </div>
  );
}

function ArticleModal({ post, settings, related, onOpen, onClose }: { post: Post | null; settings: PortalSettings; related: Post[]; onOpen: (p: Post) => void; onClose: () => void }) {
  const [showComments, setShowComments] = useState(false);

  if (!post) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
      />
      <motion.dialog
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed inset-x-0 bottom-0 z-50 h-[90vh] overflow-y-auto rounded-t-3xl bg-white sm:inset-y-auto sm:left-1/2 sm:max-h-[90vh] sm:w-full sm:max-w-4xl sm:-translate-x-1/2"
        open
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-lg transition z-10"
          aria-label="Close"
        >
          <XIcon className="h-6 w-6" />
        </button>

        <article className="px-4 py-8 sm:px-8 sm:py-12">
          <div className="mx-auto max-w-2xl">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="rounded-full bg-red-600 px-4 py-1.5 text-xs font-black text-white">{post.category}</span>
              {post.breaking && <span className="rounded-full bg-orange-500 px-4 py-1.5 text-xs font-black text-white animate-pulse">⚡ BREAKING</span>}
            </div>

            <h1 className="text-3xl sm:text-4xl font-black leading-tight text-gray-900 mb-6">{post.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 pb-6 border-b border-gray-200">
              <span className="font-semibold">{post.author}</span>
              <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {formatNepaliDate(post.publishedAt)}</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {post.readTime} min</span>
              <span className="flex items-center gap-1"><Eye className="h-4 w-4" /> {post.views.toLocaleString()}</span>
            </div>

            <img src={post.image} alt={post.title} className="my-8 rounded-2xl w-full h-auto" loading="lazy" />

            <p className="text-lg leading-8 text-gray-700 mb-8 whitespace-pre-wrap">{post.content}</p>

            <div className="flex flex-wrap gap-4 my-8 py-6 border-y border-gray-200">
              <ShareButtons post={post} />
              <button
                onClick={() => setShowComments(!showComments)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition font-semibold"
              >
                <MessageCircle className="h-5 w-5" /> ({post.views})
              </button>
            </div>

            {related.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-black text-gray-900 mb-6">सम्बन्धित खबरहरू</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {related.slice(0, 4).map((p) => (
                    <ArticleCard key={p.id} post={p} onClick={() => onOpen(p)} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </motion.dialog>
    </AnimatePresence>
  );
}

function Footer({ settings, onSubscribe }: { settings: PortalSettings; onSubscribe: (email: string) => void }) {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 mb-12 md:grid-cols-4">
          <div>
            <h3 className="font-black text-lg mb-4">VIRAL<span className="text-red-500">PANA</span></h3>
            <p className="text-gray-400 text-sm">ताजा नेपाली समाचार, blogs र तथ्यमूलक डिजिटल सामग्री।</p>
          </div>
          <div>
            <h4 className="font-black mb-3">श्रेणीहरू</h4>
            <div className="space-y-2 text-sm text-gray-400">
              {categories.filter(c => c !== "सबै").slice(0, 5).map(cat => (
                <a key={cat} href={`#category/${cat}`} className="block hover:text-red-500 transition">{cat}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-black mb-3">अनुसरण गरिन</h4>
            <div className="flex gap-3">
              <a href="https://facebook.com/viralpana" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-lg hover:bg-red-600 transition font-bold text-sm">
                f
              </a>
              <a href="https://twitter.com/viralpana" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-lg hover:bg-red-600 transition font-bold text-sm">
                𝕏
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-black mb-3">सम्पर्क</h4>
            <a href={`mailto:${settings.primaryEmail}`} className="text-sm text-gray-400 hover:text-red-500 transition block">
              {settings.primaryEmail}
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-sm text-gray-500">© 2026 ViralPANA. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}

export default function PublicPortal({ posts, settings, onOpen, onSubscribe, onAdmin }: { posts: Post[]; settings: PortalSettings; onOpen: (p: Post) => void; onSubscribe: (email: string) => void; onAdmin: () => void }) {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [category, setCategory] = useState("सबै");

  const related = useMemo(() => selectedPost ? posts.filter(p => p.id !== selectedPost.id && p.category === selectedPost.category && p.status === "published").slice(0, 4) : [], [selectedPost, posts]);

  const handleOpenPost = (post: Post) => {
    onOpen(post);
    setSelectedPost(post);
  };

  return (
    <div className="bg-white min-h-screen">
      <Nav onAdmin={onAdmin} />
      <BreakingTicker posts={posts} headline={settings.breakingHeadline} />
      <HeroSection posts={posts} settings={settings} onOpen={handleOpenPost} />

      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`rounded-full px-4 py-2 font-bold transition ${
                  category === cat ? "bg-red-600 text-white" : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <ArticlesGrid posts={posts} category={category} settings={settings} onOpen={handleOpenPost} />
        </div>
      </section>

      <section id="subscribe" className="py-12 sm:py-16 bg-gray-50">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <Reveal>
            <NewsletterForm onSubscribe={onSubscribe} />
          </Reveal>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-2xl font-black text-gray-900 mb-8">Trending Now</h2>
          <TrendingWidget posts={posts} />
        </div>
      </section>

      <Footer settings={settings} onSubscribe={onSubscribe} />

      <ArticleModal post={selectedPost} settings={settings} related={related} onOpen={handleOpenPost} onClose={() => setSelectedPost(null)} />

      <motion.button
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700 transition"
        aria-label="Scroll to top"
      >
        <ArrowRight className="h-5 w-5 rotate-[-90deg]" />
      </motion.button>
    </div>
  );
}
