import React from "react";
import { Home, RotateCcw, ShieldAlert, Trash2 } from "lucide-react";
import { BrandLogo } from "./PublicPortal";

export default class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; message: string }> {
  state = { hasError: false, message: "" };
  static getDerivedStateFromError(error: Error) { return { hasError: true, message: error.message }; }
  componentDidCatch(error: Error) { console.error("ViralPANA runtime error:", error); }
  render() {
    if (!this.state.hasError) return this.props.children;
    return <main className="grid min-h-screen place-items-center bg-[#071827] p-4 text-white"><section className="w-full max-w-xl rounded-[32px] border border-white/10 bg-white/6 p-8 text-center shadow-2xl backdrop-blur-xl"><BrandLogo compact framed /><ShieldAlert className="mx-auto mt-9 h-12 w-12 text-[#ff7045]" /><h1 className="mt-5 text-4xl font-black tracking-[-.05em]">Portal पुनः लोड आवश्यक छ</h1><p className="mt-4 leading-8 text-white/58">पुरानो cached data वा browser plugin ले website खोल्न नदिएको हुन सक्छ। नयाँ build मा safe fallback तयार छ।</p>{this.state.message && <p className="mt-4 rounded-xl bg-black/20 p-3 text-xs text-white/35">{this.state.message}</p>}<div className="mt-8 grid gap-3 sm:grid-cols-2"><button onClick={() => window.location.reload()} className="flex items-center justify-center gap-2 rounded-xl bg-[#ff501f] px-5 py-4 font-black"><RotateCcw className="h-4 w-4" /> Reload गर्नुहोस्</button><button onClick={() => { Object.keys(localStorage).filter(k => k.startsWith("viralpana.")).forEach(k => localStorage.removeItem(k)); window.location.href = "/"; }} className="flex items-center justify-center gap-2 rounded-xl border border-white/15 px-5 py-4 font-bold text-white/78"><Trash2 className="h-4 w-4" /> Cache reset</button></div><button onClick={() => window.location.href = "/"} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-white/50 hover:text-white"><Home className="h-4 w-4" /> Homepage</button></section></main>;
  }
}
