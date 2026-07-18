import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowRight, ArrowUp, Bell, CalendarDays, Check, Clock3, Flame, Globe2, Menu, PenLine, Radio, Search, Share2, ShieldCheck, TrendingUp, UserRound, Video, X } from "lucide-react";
import { categories, formatNepaliDate, type PortalSettings, type Post, type PostType } from "../data/portal";

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-70px" }} transition={{ duration: 0.7, delay, ease }}>
      {children}
    </motion.div>
  );
}

export function BrandLogo({ compact = false }: { compact?: boolean; framed?: boolean }) {
  return <a href="#top" className={`brand-logo inline-flex items-center justify-center ${compact ? "scale-95" : ""}`} aria-label="ViralPANA home"><div className="separator" style={{ clear: "both", textAlign: "center" }}><img style={{ border: 0 }} data-original-height={602} data-original-width={1070} height={180} src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEigihqH5k_rJw4WmdHHoRdKQdyY8ZG2d_5ioxanWlK4IHVGtS-MbFfpssZi66HorvvhT1cteZc2D5lSKlMEZVOeRot3oba5pBjXNNl3dWUdFHLmAlaHOvrHXICIoIF0roq1EccQ_ZQXBNU2n19P4bJ38Epsbl-vn7v4G19UdfNOxbbrkPSF4Hv8229jTHQ/s320/IMG_20260718_210757.jpg" width={320} alt="ViralPANA Logo" className="viralpana-brand-image" /></div></a>;
}

export function Nav({ onAdmin }: { onAdmin: () => void }) {
  const [open, setOpen] = useState(false);
  const links = [
    ["समाचार", "#news"],
    ["ब्लग", "#blogs"],
    ["भिडियो", "#video"],
    ["विज्ञापन", "#advertise"],
    ["सम्पर्क", "#contact"],
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[#071827] text-white shadow-2xl shadow-black/15">
      <div className="border-b border-white/10 bg-[#06111b] px-4 py-2 text-xs text-white/70 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <span>{new Intl.DateTimeFormat("ne-NP", { dateStyle: "full" }).format(new Date())}</span>
          <span className="flex items-center gap-2 font-semibold text-[#ff7148]"><Radio className="h-3.5 w-3.5 animate-pulse" /> लाइभ अपडेट</span>
        </div>
      </div>
      <nav className="mx-auto flex h-24 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6" aria-label="Primary">
        <BrandLogo />
        <div className="hidden items-center gap-7 lg:flex">
          {links.map(([label, href]) => <a key={label} href={href} className="text-sm font-semibold text-white/68 transition hover:text-white">{label}</a>)}
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          <a href="#subscribe" className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-bold transition hover:bg-white/10"><Bell className="h-4 w-4" /> न्यूज़ अलर्ट</a>
          <button onClick={onAdmin} className="flex items-center gap-2 rounded-xl bg-[#ff501f] px-4 py-2.5 text-sm font-bold shadow-lg shadow-[#ff501f]/25 transition hover:-translate-y-0.5 hover:bg-[#ff6336]"><ShieldCheck className="h-4 w-4" /> Admin</button>
        </div>
        <button onClick={() => setOpen(!open)} className="grid h-11 w-11 place-items-center rounded-xl bg-white/8 lg:hidden" aria-label="Toggle navigation" aria-expanded={open}>{open ? <X /> : <Menu />}</button>
      </nav>
      <AnimatePresence>{open && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="border-t border-white/10 bg-[#071827]/98 px-4 py-4 lg:hidden">{links.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 font-semibold text-white/75 hover:bg-white/5">{label}</a>)}<button onClick={onAdmin} className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff501f] px-4 py-3 font-bold">Admin Dashboard</button></motion.div>}</AnimatePresence>
    </header>
  );
}

export function BreakingTicker({ posts, headline }: { posts: Post[]; headline: string }) {
  const breaking = posts.filter(p => p.breaking || p.featured).slice(0, 4);
  return (
    <div className="border-y border-[#dde8ee] bg-white">
      <div className="mx-auto flex max-w-7xl overflow-hidden">
        <div className="z-10 flex shrink-0 items-center gap-2 bg-[#ff4d1a] px-4 py-3 text-sm font-black text-white shadow-lg"><Flame className="h-4 w-4" /> ताजा</div>
        <div className="relative flex-1 overflow-hidden py-3"><div className="animate-marquee flex w-max gap-12 whitespace-nowrap text-sm font-semibold text-[#173a50]"><span>{headline}</span>{breaking.map(p => <span key={p.id} className="flex items-center gap-3"><i className="h-1.5 w-1.5 rounded-full bg-[#ff4d1a]" /> {p.title}</span>)}</div></div>
      </div>
    </div>
  );
}

export function Hero({ posts, settings, onOpen }: { posts: Post[]; settings: PortalSettings; onOpen: (p: Post) => void }) {
  const published = posts.filter(p => p.status === "published");
  const main = published.find(p => p.featured) || published[0];
  const side = published.filter(p => p.id !== main?.id).slice(0, 3);
  if (!main) return null;
  return (
    <section id="top" className="overflow-hidden bg-[#f4f7f9] pt-[142px] lg:pt-[146px]">
      <div className="mx-auto grid max-w-7xl gap-5 px-4 py-8 sm:px-6 lg:grid-cols-[1.6fr_.8fr]">
        <motion.article initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease }} className="group relative min-h-[560px] overflow-hidden rounded-[28px] bg-[#0d2738] text-white shadow-2xl shadow-[#0b4f7d]/15">
          <img src={main.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-84 transition duration-700 group-hover:scale-[1.035]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,21,32,.02)_20%,rgba(4,21,32,.91)_78%)]" />
          <div className="relative flex h-full min-h-[560px] flex-col justify-end p-6 sm:p-9">
            <div className="flex flex-wrap gap-2 text-xs font-bold"><span className="rounded-full bg-[#ff4d1a] px-3 py-1.5">मुख्य समाचार</span><span className="rounded-full bg-white/12 px-3 py-1.5 backdrop-blur">{main.category}</span></div>
            <h1 className="mt-5 max-w-4xl text-3xl font-black leading-[1.12] tracking-[-.04em] sm:text-5xl lg:text-6xl">{main.title}</h1>
            <p className="mt-5 max-w-2xl leading-7 text-white/74">{main.excerpt}</p>
            <button onClick={() => onOpen(main)} className="mt-7 flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3.5 font-black text-[#0b4f7d] transition hover:-translate-y-0.5 hover:bg-[#e9f6ff]">पूरा पढ्नुहोस् <ArrowRight className="h-4 w-4" /></button>
          </div>
        </motion.article>
        <div className="grid gap-5">
          {side.map((post, i) => <motion.button key={post.id} onClick={() => onOpen(post)} initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .15 + i * .1, duration: .65, ease }} className="group grid grid-cols-[132px_1fr] overflow-hidden rounded-2xl bg-white text-left shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl sm:grid-cols-[150px_1fr]"><img src={post.image} alt="" className="h-full min-h-36 w-full object-cover transition duration-500 group-hover:scale-105" /><span className="p-4"><span className="text-xs font-black uppercase tracking-wider text-[#f04a1a]">{post.category}</span><span className="mt-2 block text-base font-black leading-6 text-[#132f42] group-hover:text-[#0b66a3]">{post.title}</span><span className="mt-3 flex items-center gap-2 text-xs text-[#738896]"><Clock3 className="h-3.5 w-3.5" />{formatNepaliDate(post.publishedAt)}</span></span></motion.button>)}
          <AdSlot settings={settings} compact />
        </div>
      </div>
    </section>
  );
}

function ClassicHeader({ onAdmin, settings }: { onAdmin: () => void; settings: PortalSettings }) {
  const [open, setOpen] = useState(false);
  const links = categories.filter(c => c !== "सबै").slice(0, 10);
  return <header className="fixed inset-x-0 top-0 z-50 bg-[#f5f6f7] text-[#1c2935] shadow-lg shadow-black/5">
    <div className="bg-[#222b36] px-4 py-2 text-xs text-white sm:px-6"><div className="mx-auto flex max-w-7xl items-center justify-between"><span>{new Intl.DateTimeFormat("ne-NP", { dateStyle: "full" }).format(new Date())}</span><span className="flex items-center gap-2 font-black text-[#ff5d64]"><Flame className="h-3.5 w-3.5" /> २४ घण्टा अपडेट</span></div></div>
    <div className="border-b border-[#dfe3e7] bg-white px-4 sm:px-6"><div className="relative mx-auto flex h-[92px] max-w-7xl items-center justify-center"><div className="absolute left-0 hidden flex-col border-r border-[#e1e6ea] pr-6 text-xs font-bold leading-5 text-[#758692] lg:flex"><span>”Viral Pana”</span><span className="text-[#cf1f24]">The Wave of Truth</span></div><BrandLogo /><div className="absolute right-0 hidden items-center gap-3 lg:flex"><a href="#advertise" className="grid h-12 w-36 place-items-center rounded-md border border-dashed border-[#c6d1d8] bg-[#f7f8f9] text-xs font-bold text-[#82929d]">विज्ञापन</a><button onClick={onAdmin} className="rounded-lg bg-[#cf1f24] px-4 py-3 text-sm font-black text-white transition hover:bg-[#ab171c]">Admin</button></div></div></div>
    <nav className="bg-[#cf1f24] text-white" aria-label="News categories"><div className="mx-auto flex max-w-7xl items-center overflow-x-auto no-scrollbar"><button onClick={() => setOpen(!open)} className="bg-[#1d2834] px-5 py-4" aria-label="Menu" aria-expanded={open}><Menu className="h-4 w-4" /></button>{links.map(link => <a key={link} href="#news" className="shrink-0 border-r border-white/15 px-5 py-4 text-sm font-black transition hover:bg-white hover:text-[#cf1f24]">{link}</a>)}<button onClick={onAdmin} className="ml-auto shrink-0 px-5 py-4 text-sm font-black lg:hidden">Admin</button></div></nav>
    <div className="border-b border-[#dfe3e7] bg-white"><div className="mx-auto flex max-w-7xl overflow-hidden"><span className="z-10 shrink-0 bg-[#1e2832] px-4 py-3 text-sm font-black text-white">ब्रेकिङ</span><div className="relative flex-1 overflow-hidden py-3"><div className="animate-marquee flex w-max gap-12 whitespace-nowrap text-sm font-bold text-[#354552]"><span>{settings.breakingHeadline}</span></div></div></div></div>
    <AnimatePresence>{open && <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="bg-[#222b36] p-4 text-white lg:hidden">{links.map(link => <a key={link} href="#news" onClick={() => setOpen(false)} className="block border-b border-white/8 px-2 py-3 font-bold">{link}</a>)}<button onClick={onAdmin} className="mt-3 w-full rounded-lg bg-[#cf1f24] px-4 py-3 font-black text-white">Admin Panel</button></motion.div>}</AnimatePresence>
  </header>;
}

function ClassicHome({ posts, settings, onOpen }: { posts: Post[]; settings: PortalSettings; onOpen: (p: Post) => void }) {
  const published = posts.filter(p => p.status === "published");
  const main = published.find(p => p.featured) || published[0];
  const rest = published.filter(p => p.id !== main?.id);
  if (!main) return null;
  return <section id="top" className="bg-[#f2f3f4] pt-[202px] lg:pt-[214px]"><div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)_290px]">
    <aside className="rounded-sm border-y-4 border-[#cf1f24] bg-white shadow-sm"><div className="flex items-center justify-between border-b border-[#e4e7ea] px-4 py-3"><h2 className="text-xl font-black">ताजा अपडेट</h2><span className="h-2 w-2 rounded-full bg-[#cf1f24]" /></div><div className="divide-y divide-[#edf0f2]">{rest.slice(0,7).map(post => <button key={post.id} onClick={() => onOpen(post)} className="group grid w-full grid-cols-[74px_1fr] gap-3 p-3 text-left transition hover:bg-[#faf7f7]"><img src={post.image} alt="" className="h-16 w-[74px] object-cover" loading="lazy" decoding="async" /><span><span className="line-clamp-3 text-sm font-bold leading-5 group-hover:text-[#cf1f24]">{post.title}</span><span className="mt-1 block text-[11px] text-[#8a97a0]">{formatNepaliDate(post.publishedAt)}</span></span></button>)}</div></aside>
    <div><article className="group overflow-hidden rounded-sm bg-white shadow-sm"><button onClick={() => onOpen(main)} className="relative block w-full text-left"><img src={main.image} alt="" className="h-[440px] w-full object-cover transition duration-700 group-hover:scale-[1.025]" loading="eager" decoding="async" /><span className="absolute left-5 top-5 bg-[#cf1f24] px-3 py-1.5 text-sm font-black text-white">{main.category}</span><span className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(12,20,28,.94))] p-6 text-white"><span className="block max-w-4xl text-3xl font-black leading-tight sm:text-4xl">{main.title}</span><span className="mt-3 line-clamp-2 max-w-3xl text-sm leading-6 text-white/72">{main.excerpt}</span></span></button></article><div className="mt-5 grid gap-4 sm:grid-cols-3">{rest.slice(7,10).map(post => <button key={post.id} onClick={() => onOpen(post)} className="group overflow-hidden bg-white text-left shadow-sm"><img src={post.image} alt="" className="h-28 w-full object-cover" loading="lazy" decoding="async" /><span className="block p-3 text-sm font-bold leading-6 group-hover:text-[#cf1f24]">{post.title}</span></button>)}</div></div>
    <aside className="space-y-5"><div className="border-b-2 border-[#cf1f24] bg-white shadow-sm"><h2 className="bg-[#cf1f24] px-4 py-3 text-xl font-black text-white">मुख्य समाचार</h2><div className="divide-y divide-[#edf0f2]">{rest.slice(10,14).map((post, i) => <button key={post.id} onClick={() => onOpen(post)} className="grid w-full grid-cols-[90px_1fr] gap-3 p-3 text-left hover:bg-[#faf7f7]"><img src={post.image} alt="" className="h-20 w-full object-cover" loading="lazy" decoding="async" /><span><span className="line-clamp-3 text-sm font-bold leading-5">{post.title}</span><span className="mt-1 block text-xs font-bold text-[#cf1f24]">#{i+1}</span></span></button>)}</div></div><AdSlot settings={settings} compact /></aside>
  </div></section>;
}

function ClassicCategorySections({ posts, onOpen }: { posts: Post[]; onOpen: (p: Post) => void }) {
  const group = (category: string, containing?: string) => posts.filter(p => p.status === "published" && (p.category === category || (containing && `${p.title}${p.excerpt}`.includes(containing)))).slice(0,4);
  const sections = [
    ["राजनीति", group("राजनीति")],
    ["अर्थतन्त्र", group("अर्थ")],
    ["मनोरञ्जन", group("मनोरञ्जन")],
    ["खेलकुद", group("खेलकुद")],
  ].filter(([, list]) => (list as Post[]).length);
  return <section className="bg-[#f7f8f9] px-4 py-8 sm:px-6"><div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">{sections.map(([title, list], index) => { const items = list as Post[]; const lead = items[0]; return <article key={title as string} className="bg-white shadow-sm"><header className="flex items-center justify-between border-b border-[#dfe3e7]"><h2 className="bg-[#cf1f24] px-5 py-3 text-xl font-black text-white">{title as string}</h2><a href="#news" className="px-5 text-xs font-black uppercase tracking-wider text-[#71828e]">थप →</a></header><div className="grid gap-4 p-5 sm:grid-cols-2"><button onClick={() => onOpen(lead)} className="group text-left"><img src={lead.image} alt="" className="h-44 w-full object-cover" loading="lazy" decoding="async" /><h3 className="mt-3 line-clamp-3 font-black leading-6 group-hover:text-[#cf1f24]">{lead.title}</h3></button><div className="divide-y divide-[#edf0f2]">{items.slice(1,4).map(post => <button key={`${title}-${post.id}-${index}`} onClick={() => onOpen(post)} className="group flex w-full gap-3 py-3 text-left first:pt-0"><span className="mt-2 h-2 w-2 shrink-0 bg-[#cf1f24]" /><span className="line-clamp-3 text-sm font-bold leading-6 group-hover:text-[#cf1f24]">{post.title}</span></button>)}</div></div></article>})}</div></section>;
}

export function AdSlot({ settings, compact = false }: { settings: PortalSettings; compact?: boolean }) {
  const [useAdsense, setUseAdsense] = useState(false);
  useEffect(() => {
    if (!settings.adsEnabled || settings.adNetwork !== "adsense" || !settings.adsenseClient || !settings.adsenseSlot) return;
    setUseAdsense(true);
    try {
      const existing = document.querySelector('script[data-vp-adsense="true"]');
      if (!existing) {
        const script = document.createElement("script");
        script.async = true;
        script.crossOrigin = "anonymous";
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(settings.adsenseClient)}`;
        script.dataset.vpAdsense = "true";
        document.head.appendChild(script);
      }
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch { setUseAdsense(false); }
  }, [settings]);
  if (!settings.adsEnabled) return null;
  if (useAdsense) return <div className={`overflow-hidden rounded-2xl bg-white p-3 text-center ring-1 ring-black/5 ${compact ? "" : "my-6"}`}><span className="mb-2 block text-[10px] font-bold uppercase tracking-[.24em] text-[#8ca2af]">Advertisement</span><ins className="adsbygoogle" style={{ display: "block" }} data-ad-client={settings.adsenseClient} data-ad-slot={settings.adsenseSlot} data-ad-format="auto" data-full-width-responsive="true" /></div>;
  return (
    <a href={settings.adUrl} target="_blank" rel="noreferrer" className={`group block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-xl ${compact ? "" : "my-6"}`}>
      <div className="relative"><img src={settings.adImage} alt="Advertisement" className="h-32 w-full object-cover" /><span className="absolute left-3 top-3 rounded-lg bg-[#102b3d]/85 px-2 py-1 text-[10px] font-black uppercase tracking-[.2em] text-white backdrop-blur">विज्ञापन</span></div>
      <div className="p-4"><p className="font-black text-[#102b3d]">{settings.adTitle}</p><p className="mt-1 text-sm text-[#6d8491]">{settings.adText}</p></div>
    </a>
  );
}

function PostMeta({ post }: { post: Post }) {
  const minutes = Math.max(1, Math.ceil(post.content.split(/\s+/).filter(Boolean).length / 180));
  return <div className="flex flex-wrap items-center gap-3 text-xs medium text-[#7a8f9b]"><span className="flex items-center gap-1.5"><UserRound className="h-3.5 w-3.5" />{post.author}</span><span className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" />{formatNepaliDate(post.publishedAt)}</span><span className="flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" />{minutes} मिनेट</span><span>{Intl.NumberFormat("ne-NP").format(post.views)} views</span></div>;
}

function PremiumFeatures() {
  const items = [
    { icon: PenLine, title: "User-friendly navigation", text: "मोबाइल quick menu, clear category structure र article breadcrumbs।" },
    { icon: Globe2, title: "Readable Nepali typography", text: "क clear contrast, ७२-character line length, स्पष्ट font size र breathing space।" },
    { icon: TrendingUp, title: "Responsive + fast", text: "एउटै layout मोबाइल, tablet र desktop मा बदलिन्छ; छविहरू lazy-load हुन्छन्।" },
    { icon: ShieldCheck, title: "Clear action paths", text: "Share, subscribe, read more र admin buttons आवश्यक ठाउँमा राखिएका छन्।" },
  ];
  return <section className="bg-[#f2f7fa] px-4 py-18 sm:px-6 sm:py-24"><div className="mx-auto max-w-7xl"><Reveal className="max-w-3xl"><p className="eyebrow blue">Complete publishing system</p><h2 className="section-title">सुन्दर मात्र होइन,<br />दैनिक काम गर्ने।</h2></Reveal><div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{items.map((item, i) => <Reveal key={item.title} delay={i * .07} className="group rounded-[26px] bg-white p-6 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1.5 hover:shadow-2xl"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#eaf4fa] text-[#0b66a3] transition group-hover:scale-110 group-hover:bg-[#ff4d1a] group-hover:text-white"><item.icon className="h-5 w-5" /></span><h3 className="mt-7 text-xl font-black tracking-[-.03em]">{item.title}</h3><p className="mt-3 text-sm leading-7 text-[#698494]">{item.text}</p></Reveal>)}</div></div></section>;
}

function VideoZone() {
  const [active, setActive] = useState(0);
  const videos = [
    ["ViralPANA Expo", "समाचार, trend र सामाजिक संवादको नयाँ visual format", "04:26"],
    ["Nepal Digital", "प्रविधि, creator economy र content monetization", "12:08"],
    ["Local Lens", "समुदायका कुरा—युवा, विकास र सहरको भविष्य", "08:41"],
  ];
  return <section id="video" className="relative overflow-hidden bg-[#071827] px-4 py-20 text-white sm:px-6 sm:py-28"><div className="absolute -left-28 top-24 h-96 w-96 rounded-full bg-[#0b66a3]/25 blur-[120px]" /><div className="absolute -right-28 bottom-0 h-96 w-96 rounded-full bg-[#ff4d1a]/18 blur-[120px]" /><div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2"><Reveal><p className="eyebrow orange">Video & multimedia</p><h2 className="mt-4 max-w-2xl text-5xl font-black leading-[.97] tracking-[-.06em] sm:text-7xl">खबरलाई<br />जीवन्त बनाउँ।</h2><p className="mt-6 max-w-xl text-lg leading-9 text-white/58">Video reporting, visual explainers र short updates का लागि immersive showcase section। भविष्यमा YouTube embed सीधै administration बाट जोडिन सक्छ।</p><div className="mt-8 space-y-3">{videos.map((video, i) => <button key={video[0]} onClick={() => setActive(i)} className={`grid w-full grid-cols-[48px_1fr_auto] items-center gap-4 rounded-2xl border p-4 text-left transition ${active === i ? "border-[#ff7045]/45 bg-white/10" : "border-white/8 bg-white/[.03] hover:bg-white/[.07]"}`}><span className={`grid h-12 w-12 place-items-center rounded-2xl ${active === i ? "bg-[#ff501f]" : "bg-white/8"}`}><Video className="h-5 w-5" /></span><span><b>{video[0]}</b><span className="mt-1 block text-sm text-white/45">{video[1]}</span></span><span className="text-xs font-bold text-white/38">{video[2]}</span></button>)}</div></Reveal><Reveal delay={.1} className="relative"><div className="absolute -inset-8 rounded-full bg-[#0b66a3]/20 blur-3xl" /><div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#102b3d] shadow-2xl"><img src="/images/viralpana-hero.jpg" alt="ViralPANA visual production" className="h-[430px] w-full object-cover opacity-82" /><div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_25%,rgba(7,24,39,.9))]" /><div className="absolute bottom-0 p-6 sm:p-8"><span className="rounded-full bg-[#ff4d1a] px-3 py-1.5 text-xs font-black uppercase tracking-wider">{videos[active][0]}</span><h3 className="mt-4 text-3xl font-black tracking-[-.04em]">{videos[active][1]}</h3></div><button className="absolute right-6 top-6 grid h-14 w-14 place-items-center rounded-full bg-white/95 text-[#0b4f7d] shadow-xl transition hover:scale-110"><ArrowRight className="h-5 w-5" /></button></div></Reveal></div></section>;
}

function TrustQuotes() {
  const quotes = [
    ["तथ्यलाई शीघ्र पढ्न सकिने clean portal। Comments झन्झट छैन, सामग्री छिटो खुल्छ।", "नियमित पाठक"],
    ["Admin panel सजिलो छ—draft बनाउँदै publish नगरुञ्जेल पछाडि राख्न सकिन्छ।", "Editorial tester"],
    ["Ads र newsletter slot पहिलादेखि तयार भएकाले Monetization को आधार तयार देखिन्छ।", "Digital advisor"],
  ];
  return <section className="bg-[#f2f7fa] px-4 py-20 sm:px-6 sm:py-28"><div className="mx-auto max-w-7xl"><Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="eyebrow blue">Trust & polish</p><h2 className="section-title">पढ्न मन लाग्ने,<br />भरोसिलो layout।</h2></div><p className="max-w-md leading-8 text-[#68828f]">स्पष्ट label, fast UI र editorial पारदर्शिता—readers को दैनिक habit बनाउने डिजाइन।</p></Reveal><div className="mt-12 grid gap-5 lg:grid-cols-3">{quotes.map(([quote, name], i) => <Reveal key={name} delay={i * .08} className="rounded-[26px] bg-white p-7 shadow-sm ring-1 ring-black/5"><Check className="h-6 w-6 text-[#0b8a68]" /><blockquote className="mt-7 text-xl font-bold leading-9 tracking-[-.03em]">“{quote}”</blockquote><p className="mt-7 text-sm font-black text-[#f04a1a]">{name}</p></Reveal>)}</div></div></section>;
}

function PolicyCenter() {
  const pages = [
    ["About us", "ViralPANA तथ्यपूर्ण, स्पष्ट र जिम्मेवार नेपाली general content प्रकाशन गर्ने स्वतन्त्र digital editorial portal हो।"],
    ["Privacy Policy", "Newsletter email तपाईंको device मा सुरक्षित राखिन्छ। Production mailing service जोड्दा third-party policy अलगै लागू हुनेछ।"],
    ["Editorial Policy", "सूचना पेश गर्नुअघि स्रोत जाँच गर्नु, स्पष्टीकरण प्रकाशित गर्नु र sponsored सामग्रीलाई स्पष्ट label गर्नु हाम्रो सिद्धान्त हो।"],
    ["Ad Policy", "विज्ञापन content editorial निर्णयबाट अलग हो। Deceptive, dangerous वा policy-violating ads स्वीकृत हुँदैनन्।"],
  ];
  return <section id="policy" className="bg-white px-4 py-18 sm:px-6 sm:py-24"><div className="mx-auto max-w-7xl"><Reveal><p className="eyebrow blue">Policies & standards</p><h2 className="mt-4 text-4xl font-black tracking-[-.055em] sm:text-6xl">पारदर्शिता नै foundation हो।</h2></Reveal><div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{pages.map(([title, text], i) => <Reveal key={title} delay={i * .06} className="rounded-[24px] border border-[#dde8ee] bg-[#f7fafc] p-6"><h3 className="text-xl font-black">{title}</h3><p className="mt-4 text-sm leading-7 text-[#67808f]">{text}</p></Reveal>)}</div></div></section>;
}

function FloatingControls() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: .3 });
  const [visible, setVisible] = useState(false);
  useEffect(() => { const onScroll = () => setVisible(window.scrollY > 650); onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  return <><a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-lg focus:bg-[#cf1f24] focus:px-4 focus:py-3 focus:font-black focus:text-white">मुख्य सामग्रीमा जानुहोस्</a><motion.div className="fixed inset-x-0 top-0 z-[80] h-1 origin-left bg-[#cf1f24]" style={{ scaleX }} /><nav aria-label="मोबाइल द्रुत navigation" className="fixed inset-x-0 bottom-0 z-[65] grid grid-cols-4 border-t border-[#dfe5e9] bg-white/95 shadow-[0_-8px_30px_rgba(0,0,0,.08)] backdrop-blur lg:hidden">{[["मुख्य","#top"],["समाचार","#news"],["ब्लग","#blogs"],["भिडियो","#video"]].map(([label,href]) => <a key={label} href={href} className="flex flex-col items-center gap-1 px-2 py-2.5 text-[11px] font-black text-[#5f7483] hover:text-[#cf1f24]"><Flame className="h-4 w-4" />{label}</a>)}</nav><AnimatePresence>{visible && <motion.button initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="माथि फर्कनुहोस्" className="fixed bottom-20 right-4 z-[70] grid h-13 w-13 place-items-center rounded-full bg-[#cf1f24] text-white shadow-2xl shadow-[#cf1f24]/30 transition hover:-translate-y-1 lg:bottom-5 lg:right-5"><ArrowUp /></motion.button>}</AnimatePresence></>;
}

function NewsPortal({ posts, onOpen }: { posts: Post[]; onOpen: (p: Post) => void }) {
  const [category, setCategory] = useState("सबै");
  const [query, setQuery] = useState("");
  const [type, setType] = useState<"all" | PostType>("all");
  const published = posts.filter(p => p.status === "published");
  const filtered = useMemo(() => published.filter(p => (category === "सबै" || p.category === category) && (type === "all" || p.type === type) && `${p.title} ${p.excerpt} ${p.author}`.toLowerCase().includes(query.toLowerCase())), [published, category, type, query]);
  const popular = [...published].sort((a, b) => b.views - a.views).slice(0, 5);
  return (
    <section id="news" className="bg-white px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <div><p className="eyebrow blue">News Portal</p><h2 className="section-title">ताजा खबर,<br />त्यो पनि सत्य सहित।</h2></div>
          <div className="grid gap-3 sm:grid-cols-2 lg:w-[560px]"><label className="relative"><Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7f929e]" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="शीर्षक, श्रेणी वा लेखक खोज्नुहोस्" className="w-full rounded-xl border border-[#dce7ed] bg-[#f6f9fb] py-3 pl-11 pr-4 outline-none transition focus:border-[#0b66a3] focus:bg-white" /></label><select value={type} onChange={e => setType(e.target.value as any)} className="rounded-xl border border-[#dce7ed] bg-[#f6f9fb] px-4 py-3 font-semibold outline-none focus:border-[#0b66a3]" aria-label="Content type"><option value="all">सबै प्रकार</option><option value="news">News</option><option value="blog">Blog</option></select></div>
        </div>
        <div className="mt-9 flex gap-2 overflow-x-auto pb-3 no-scrollbar" role="tablist">{categories.map(c => <button key={c} onClick={() => setCategory(c)} className={`shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition ${category === c ? "border-[#0b66a3] bg-[#0b66a3] text-white shadow-lg shadow-[#0b66a3]/20" : "border-[#dce6ec] bg-white text-[#547080] hover:border-[#0b66a3]"}`}>{c}</button>)}</div>
        <div className="mt-12 grid gap-12 lg:grid-cols-[1.65fr_.7fr]">
          <div className="grid gap-x-6 gap-y-11 md:grid-cols-2">
            {filtered.map((post, i) => <Reveal key={post.id} delay={Math.min(i * .06, .3)}><article className="group"><button onClick={() => onOpen(post)} className="block w-full overflow-hidden rounded-2xl bg-[#e5eef2] text-left"><img src={post.image} alt="" className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" /></button><div className="mt-5 flex items-center gap-3 text-xs font-black uppercase tracking-[.12em]"><span className="text-[#f04a1a]">{post.category}</span><span className="h-1 w-1 rounded-full bg-[#c5d3da]" /><span className={post.type === "news" ? "text-[#0b66a3]" : "text-[#2c9b7a]"}>{post.type}</span></div><h3 className="mt-3 text-2xl font-black leading-8 tracking-[-.04em] text-[#122f42]"><button onClick={() => onOpen(post)} className="text-left transition hover:text-[#0b66a3]">{post.title}</button></h3><p className="mt-3 line-clamp-3 leading-7 text-[#65808f]">{post.excerpt}</p><div className="mt-4"><PostMeta post={post} /></div></article></Reveal>)}
            {filtered.length === 0 && <div className="col-span-full rounded-3xl bg-[#f2f7fa] p-12 text-center"><Search className="mx-auto h-9 w-9 text-[#91a8b4]" /><p className="mt-4 text-xl font-black">कुनै परिणाम भेटिएन</p><p className="mt-2 text-[#718997]">अर्को शब्द वा category प्रयास गर्नुहोस्।</p></div>}
          </div>
          <aside className="space-y-8">
            <Reveal className="rounded-[26px] bg-[#102b3d] p-6 text-white"><h3 className="flex items-center gap-2 text-xl font-black"><TrendingUp className="h-5 w-5 text-[#ff7045]" /> धेरै पढिएको</h3><div className="mt-6 space-y-5">{popular.map((p, i) => <button key={p.id} onClick={() => onOpen(p)} className="group grid grid-cols-[34px_1fr] gap-4 text-left"><span className="text-3xl font-black text-white/20 group-hover:text-[#ff7045]">{i + 1}</span><span><span className="line-clamp-2 font-bold leading-6 text-white/82 group-hover:text-white">{p.title}</span><span className="mt-2 block text-xs text-white/38">{Intl.NumberFormat("ne-NP").format(p.views)} readers</span></span></button>)}</div></Reveal>
            <Reveal className="rounded-[26px] border border-[#dce7ee] bg-[#f5f9fb] p-6"><h3 className="text-xl font-black">Follow us</h3><p className="mt-2 text-sm leading-6 text-[#688293]">Facebook, YouTube र अन्य social platform मा ViralPANA जोडिनुहोस्।</p><div className="mt-5 grid grid-cols-3 gap-2"><a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook" className="grid h-12 place-items-center rounded-xl bg-white text-[#1877f2] shadow-sm hover:-translate-y-1 transition"><Share2 /></a><a href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube" className="grid h-12 place-items-center rounded-xl bg-white text-[#ff0000] shadow-sm hover:-translate-y-1 transition"><Radio /></a><a href="https://viralpana.blogspot.com/" target="_blank" rel="noreferrer" aria-label="Blogger" className="grid h-12 place-items-center rounded-xl bg-white text-[#0b66a3] shadow-sm hover:-translate-y-1 transition"><Globe2 /></a></div></Reveal>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Blogs({ posts, onOpen }: { posts: Post[]; onOpen: (p: Post) => void }) {
  const blogs = posts.filter(p => p.status === "published" && p.type === "blog").slice(0, 4);
  return <section id="blogs" className="bg-[#f2f7fa] px-4 py-20 sm:px-6 sm:py-28"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.72fr_1.28fr]"><Reveal><p className="eyebrow orange">Blog Portal</p><h2 className="section-title">विचार, अनुभव<br />र कथा।</h2><p className="section-copy">News र blogs अलग-अलग व्यवस्थित छन्। Admin panel बाट नयाँ blog post तुरुन्त प्रकाशित गर्न सकिन्छ।</p><a href="#admin" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#102b3d] px-5 py-3.5 font-black text-white transition hover:-translate-y-1"><PenLine className="h-4 w-4" /> Blog लेख्नुहोस्</a></Reveal><div className="grid gap-5 sm:grid-cols-2">{blogs.map((post, i) => <Reveal key={post.id} delay={i * .08}><button onClick={() => onOpen(post)} className="group flex h-full min-h-72 flex-col overflow-hidden rounded-[24px] bg-white text-left shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1.5 hover:shadow-2xl"><img src={post.image} alt="" className="h-40 w-full object-cover" /><span className="flex flex-1 flex-col p-6"><span className="text-xs font-black uppercase tracking-[.14em] text-[#f04a1a]">{post.category}</span><span className="mt-3 line-clamp-3 text-xl font-black leading-7 text-[#16334a]">{post.title}</span><span className="mt-auto pt-5 text-sm font-bold text-[#0b66a3]">पूरा blog पढ्नुहोस् →</span></span></button></Reveal>)}</div></div></section>;
}

function Advertise({ settings }: { settings: PortalSettings }) {
  return <section id="advertise" className="bg-white px-4 py-20 sm:px-6 sm:py-28"><div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2"><Reveal><p className="eyebrow blue">Advertise & Earn</p><h2 className="section-title">Income-ready<br/>advertisement slots.</h2><p className="section-copy">Admin panel बाट sponsor banner on/off गर्न सक्नुहुन्छ, creative परिवर्तन गर्न सक्नुहुन्छ र Google AdSense ID थाल्न सक्नुहुन्छ। Audience बढेपछि income को आधार तयार हुन्छ।</p><ul className="mt-8 space-y-4 text-[#2d5268]">{["Top-mobile र feed placements सहित", "Sponsor creative instant change", "Approved AdSense account बाट auto ads", "Privacy, About र Ad policy ready"].map(item => <li key={item} className="flex gap-3 font-semibold"><ShieldCheck className="h-5 w-5 shrink-0 text-[#0b8a68]" />{item}</li>)}</ul></Reveal><Reveal delay={.1}><div className="rounded-[30px] bg-[#f2f7fa] p-5 shadow-2xl shadow-[#0b4f7d]/10"><AdSlot settings={settings} /><div className="rounded-2xl bg-white p-5 text-sm leading-7 text-[#657d89]"><b>Demo placement:</b> यही position मा real sponsor वा AdSense creative देखिन्छ। Website traffic र अनुकूल सामग्री बढाएपछि approval र revenue दुवै आसान बढ्छन्।</div></div></Reveal></div></section>;
}

function Subscribe({ onSubscribe }: { onSubscribe: (email: string) => void }) {
  const [email, setEmail] = useState(""); const [done, setDone] = useState(false);
  return <section id="subscribe" className="bg-[#102b3d] px-4 py-20 text-white sm:px-6"><div className="relative mx-auto max-w-5xl overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(120deg,#0b66a3,#102b3d_58%,#ff4d1a)] p-8 text-center shadow-2xl sm:p-14"><div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" /><Bell className="mx-auto h-9 w-9" /><h2 className="mt-5 text-4xl font-black tracking-[-.05em] sm:text-6xl">मुख्य खबर पहिले पाउनुहोस्।</h2><p className="mx-auto mt-5 max-w-2xl leading-8 text-white/74">Daily digest, breaking alerts र editor picks सीधा तपाईंको inbox मा।</p><form onSubmit={e => { e.preventDefault(); if (!/^\S+@\S+\.\S+$/.test(email)) return; onSubscribe(email); setEmail(""); setDone(true); }} className="mx-auto mt-8 grid max-w-xl gap-3 sm:grid-cols-[1fr_auto]"><input value={email} onChange={e => setEmail(e.target.value)} type="email" required placeholder="तपाईंको email address" className="rounded-xl border border-white/20 bg-white/12 px-5 py-4 outline-none backdrop-blur placeholder:text-white/45 focus:border-white/50" /><button className="rounded-xl bg-white px-6 py-4 font-black text-[#0b4f7d] transition hover:-translate-y-0.5">Subscribe</button></form>{done && <p className="mt-4 font-bold text-[#98f5cf]">धन्यवाद! subscription save भयो।</p>}</div></section>;
}

function Footer({ onAdmin }: { onAdmin: () => void }) {
  return <footer id="contact" className="bg-[#07131d] px-4 pb-8 pt-16 text-white sm:px-6"><div className="mx-auto max-w-7xl"><div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-[1.4fr_.7fr_.8fr]"><div><BrandLogo compact framed /><p className="mt-6 max-w-md leading-8 text-white/48">"Viral Pana: The Wave of Truth." तथ्यलाई गतिशील बनाउने आधुनिक नेपाली news र blog portal।</p><p className="mt-5 text-sm text-white/35">Email: Viralpanaa@gmail.com<br />Mahendranagar, Sudurpaschim, Nepal</p></div><div><h3 className="font-black">पोर्टल</h3>{["समाचार","ब्लग","विज्ञापन","सम्पर्क","Policy"].map(x => <a key={x} href={x === "समाचार" ? "#news" : x === "ब्लग" ? "#blogs" : x === "विज्ञापन" ? "#advertise" : x === "Policy" ? "#policy" : "#contact"} className="mt-4 block text-white/45 hover:text-white">{x}</a>)}</div><div><h3 className="font-black">Control</h3><button onClick={onAdmin} className="mt-4 flex items-center gap-2 rounded-xl bg-[#ff501f] px-4 py-3 font-bold">Admin Panel <ArrowRight className="h-4 w-4" /></button><p className="mt-4 text-xs leading-5 text-white/32">Demo admin PIN: <b>viralpana2026</b>. Production-ready authentication को लागि backend/Supabase आवश्यक हुन्छ।</p></div></div><div className="flex flex-col gap-3 pt-7 text-xs text-white/30 sm:flex-row sm:justify-between"><p>© 2026 ViralPANA. All rights reserved.</p><p>Powered by independent Nepali journalism.</p></div></div></footer>;
}

export function ArticleModal({ post, settings, onClose, related = [], onOpen }: { post: Post | null; settings: PortalSettings; onClose: () => void; related?: Post[]; onOpen?: (p: Post) => void }) {
  useEffect(() => { const key = (e: KeyboardEvent) => e.key === "Escape" && onClose(); window.addEventListener("keydown", key); document.body.style.overflow = post ? "hidden" : ""; return () => { window.removeEventListener("keydown", key); document.body.style.overflow = ""; }; }, [post, onClose]);
  const sharePost = async () => { if (!post) return; const shareData = { title: post.title, text: post.excerpt, url: post.sourceUrl || window.location.href }; try { if (navigator.share) await navigator.share(shareData); else { await navigator.clipboard.writeText(shareData.url); alert("Article link copy भयो।"); } } catch { } };
  return <AnimatePresence>{post && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] overflow-y-auto bg-[#06111b]/75 p-3 backdrop-blur-md sm:p-6" onClick={onClose}><motion.article initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} transition={{ duration: .45, ease }} onClick={e => e.stopPropagation()} className="mx-auto max-w-4xl overflow-hidden rounded-[28px] bg-white shadow-2xl"><div className="relative"><img src={post.image} alt="" className="h-72 w-full object-cover sm:h-96" /><button onClick={onClose} aria-label="Close article" className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-[#07131d]/75 text-white backdrop-blur transition hover:bg-[#ff4d1a]"><X /></button><div className="absolute bottom-4 left-4 rounded-full bg-[#ff4d1a] px-4 py-2 text-xs font-black uppercase tracking-widest text-white">{post.category}</div></div><div className="p-6 sm:p-10"><h1 className="text-3xl font-black leading-tight tracking-[-.04em] text-[#102b3d] sm:text-5xl">{post.title}</h1><div className="mt-5 border-b border-[#e1eaef] pb-6"><PostMeta post={post} /></div><div className="prose-news mt-8">{post.content.split(/\n{2,}/).map((p, i) => <p key={i}>{p}</p>)}</div><AdSlot settings={settings} /><div className="mt-4 flex flex-wrap gap-3"><button onClick={sharePost} className="inline-flex items-center gap-2 rounded-xl bg-[#102b3d] px-4 py-3 font-bold text-white transition hover:bg-[#ff501f]"><Share2 className="h-4 w-4" /> Share गर्नुहोस्</button>{post.sourceUrl && <a href={post.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[#eef6fa] px-4 py-3 font-bold text-[#0b66a3]">Original Blogger post खोल्नुहोस् <ArrowRight className="h-4 w-4" /></a>}</div>{related.length > 0 && <section className="mt-10 border-t border-[#e1eaef] pt-7" aria-labelledby="related-heading"><h2 id="related-heading" className="text-2xl font-black tracking-[-.04em] text-[#102b3d]">यस्तै अन्य खबर</h2><div className="mt-5 grid gap-4 sm:grid-cols-3">{related.slice(0,3).map(item => <button key={item.id} onClick={() => onOpen?.(item)} className="group overflow-hidden rounded-xl bg-[#f3f7f9] text-left transition hover:-translate-y-1 hover:shadow-lg"><img src={item.image} alt="" className="h-28 w-full object-cover" loading="lazy" /><span className="block p-4"><span className="text-xs font-black uppercase tracking-wider text-[#cf1f24]">{item.category}</span><span className="mt-2 line-clamp-3 block text-sm font-bold leading-5 group-hover:text-[#cf1f24]">{item.title}</span></span></button>)}</div></section>}</div></motion.article></motion.div>}</AnimatePresence>;
}

export default function PublicPortal({ posts, settings, onOpen, onSubscribe, onAdmin }: { posts: Post[]; settings: PortalSettings; onOpen: (p: Post) => void; onSubscribe: (email: string) => void; onAdmin: () => void }) {
  return <div className="min-h-screen bg-white text-[#132f42]"><FloatingControls /><ClassicHeader onAdmin={onAdmin} settings={settings} /><main id="main-content"><ClassicHome posts={posts} settings={settings} onOpen={onOpen} /><PremiumFeatures /><ClassicCategorySections posts={posts} onOpen={onOpen} /><NewsPortal posts={posts} onOpen={onOpen} /><div className="mx-auto max-w-7xl px-4 sm:px-6"><AdSlot settings={settings} /></div><VideoZone /><Blogs posts={posts} onOpen={onOpen} /><Advertise settings={settings} /><TrustQuotes /><Subscribe onSubscribe={onSubscribe} /><PolicyCenter /></main><Footer onAdmin={onAdmin} /></div>;
}
