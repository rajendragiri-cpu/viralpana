import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, Eye, Heart, MessageCircle, Search, Share2, TrendingUp, X } from "lucide-react";
import { Post, PortalSettings } from "../data/portal";

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-70px" }} transition={{ duration: 0.7, delay, ease }}>
      {children}
    </motion.div>
  );
}

export function ArticleCard({ post, onClick, featured = false }: { post: Post; onClick: () => void; featured?: boolean }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={`group text-left w-full overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black/5 transition hover:shadow-2xl ${
        featured ? "lg:col-span-2" : ""
      }`}
    >
      <div className={`relative overflow-hidden ${featured ? "h-80 lg:h-96" : "h-48"}`}>
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <span className="absolute top-4 left-4 inline-flex items-center gap-1 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white">
          {post.category}
        </span>
        {post.breaking && (
          <span className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-lg bg-[#ff4d1a] px-3 py-1.5 text-xs font-bold text-white animate-pulse">
            ⚡ BREAKING
          </span>
        )}
      </div>
      <div className={`p-5 ${featured ? "lg:p-7" : ""}`}>
        <p className={`font-black leading-tight text-gray-900 group-hover:text-red-600 transition ${featured ? "text-xl lg:text-2xl" : "text-lg"}`}>
          {post.title}
        </p>
        <p className={`mt-3 text-gray-600 line-clamp-2 ${featured ? "lg:line-clamp-3" : ""}`}>{post.excerpt}</p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-gray-700">{post.author}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {post.readTime} min
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" /> {(post.views / 1000).toFixed(1)}K
          </div>
        </div>
      </div>
    </motion.button>
  );
}

export function TrendingWidget({ posts }: { posts: Post[] }) {
  const trending = posts.filter(p => p.status === "published").sort((a, b) => b.views - a.views).slice(0, 5);
  
  if (!trending.length) return null;

  return (
    <Reveal className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-black/5">
      <div className="flex items-center gap-2 mb-5">
        <TrendingUp className="h-5 w-5 text-red-600" />
        <h3 className="text-lg font-black text-gray-900">Trending Now</h3>
      </div>
      <div className="space-y-4">
        {trending.map((post, idx) => (
          <div key={post.id} className="flex gap-3 pb-4 border-b border-gray-200 last:border-0 last:pb-0">
            <span className="text-2xl font-black text-red-600 w-8 text-center">{idx + 1}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 leading-snug line-clamp-2 hover:text-red-600 cursor-pointer transition">
                {post.title}
              </p>
              <p className="text-xs text-gray-500 mt-1">{post.category}</p>
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

export function NewsletterForm({ onSubscribe }: { onSubscribe: (email: string) => void }) {
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      onSubscribe(email);
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-gradient-to-r from-red-600 to-red-700 p-6 text-white">
      <h3 className="text-lg font-black">न्यूज़लेटर सब्सक्राइब गरिन</h3>
      <p className="mt-2 text-sm text-white/80">ताजा समाचार सिधा तपाईंको ईमेलमा पाउनुहोस्।</p>
      <div className="mt-4 flex gap-2">
        <input
          type="email"
          placeholder="तपाईंको ईमेल"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-lg bg-white/20 px-4 py-2.5 text-sm placeholder-white/60 backdrop-blur transition focus:bg-white/30 focus:outline-none"
          required
        />
        <button
          type="submit"
          className="rounded-lg bg-white px-5 py-2.5 font-bold text-red-600 transition hover:bg-red-50"
        >
          सब्सक्राइब
        </button>
      </div>
      {subscribed && <p className="mt-2 text-sm text-green-100">✓ धन्यवाद! सब्सक्रिप्शन सफल भयो।</p>}
    </form>
  );
}

export function AdSlot({ settings, position = "default", compact = false }: { settings: PortalSettings; position?: string; compact?: boolean }) {
  if (!settings.adsEnabled) return null;

  if (settings.adNetwork === "adsense" && settings.adsenseClient) {
    return (
      <div className={`rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 text-sm ${
        compact ? "h-48 sm:h-72" : "h-64"
      }`}>
        <div className="text-center">
          <p className="font-bold">Google AdSense</p>
          <p className="text-xs mt-1">Ad Unit: {settings.adsenseSlot || position}</p>
        </div>
      </div>
    );
  }

  return (
    <a href={settings.adUrl} target="_blank" rel="noopener noreferrer" className="group rounded-lg overflow-hidden block hover:opacity-90 transition">
      <img src={settings.adImage} alt={settings.adTitle} className="w-full h-auto" />
      <div className="bg-gray-100 p-4 border-t border-gray-200">
        <p className="font-bold text-sm text-gray-900">{settings.adTitle}</p>
        <p className="text-xs text-gray-600 mt-1">{settings.adText}</p>
      </div>
    </a>
  );
}

export function ShareButtons({ post }: { post: Post }) {
  const url = `https://viralpana.com/articles/${post.slug}`;
  const shareText = post.title;

  return (
    <div className="flex gap-2">
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        title="शेयर फेसबुकमा"
      >
        <Share2 className="h-5 w-5" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600 transition"
        title="ट्वीट गर्नुहोस्"
      >
        <Share2 className="h-5 w-5" />
      </a>
      <button
        onClick={() => navigator.clipboard.writeText(url)}
        className="p-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
        title="लिंक कपी गर्नुहोस्"
      >
        <Share2 className="h-5 w-5" />
      </button>
    </div>
  );
}

export function LoadingSkeletons() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse rounded-2xl bg-gray-200 h-64" />
      ))}
    </div>
  );
}

export function EmptyState() {
  return (
    <div className="rounded-2xl bg-gray-50 p-12 text-center">
      <p className="text-lg font-bold text-gray-900">कोई लेख नहीं मिला</p>
      <p className="mt-2 text-gray-600">अन्य श्रेणियों को बेझिझक देखें।</p>
    </div>
  );
}
