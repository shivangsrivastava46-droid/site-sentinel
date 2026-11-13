import type { FC } from 'react';
import { Shield, Sparkles, ArrowRight, Lock, Eye, Zap, Flame } from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
  onQuickScan: () => void;
  totalRequests: number;
  suspiciousCount: number;
}

const houses = [
  { name: 'Gryffindor Gate', crest: '/assets/crests/gryffindor.svg', status: 'Warded', color: 'from-amber-600/30 to-rose-950/40', border: 'border-amber-600/30' },
  { name: 'Slytherin Sector', crest: '/assets/crests/slytherin.svg', status: 'Monitored', color: 'from-emerald-600/30 to-teal-950/40', border: 'border-emerald-600/30' },
  { name: 'Ravenclaw Tower', crest: '/assets/crests/ravenclaw.svg', status: 'Inspected', color: 'from-blue-600/30 to-indigo-950/40', border: 'border-blue-600/30' },
  { name: 'Hufflepuff Sanctum', crest: '/assets/crests/hufflepuff.svg', status: 'Shielded', color: 'from-yellow-600/30 to-amber-950/40', border: 'border-yellow-600/30' },
];

export const LandingPage: FC<LandingPageProps> = ({
  onEnter,
  onQuickScan,
  totalRequests,
  suspiciousCount,
}) => {
  return (
    <div className="relative min-h-screen w-full bg-[#04060b] text-[#f7eed7] flex flex-col justify-between overflow-x-hidden font-sans">
      {/* Background: Cinematic Hogwarts Castle with Dark Overlay for Maximum Readability */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/assets/hogwarts-castle.png"
          alt="Hogwarts Castle at Night"
          className="w-full h-full object-cover object-center scale-105 filter brightness-75 contrast-110"
        />
        {/* Layered dark fantasy gradients for depth and text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#04060b] via-[#070a12]/85 to-[#04060b]/90" />
        <div className="absolute inset-0 bg-radial at-center from-transparent via-[#04060b]/60 to-[#04060b]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.15),transparent_60%)]" />

        {/* Floating Magical Golden Embers / Stars */}
        <div className="absolute top-1/4 left-1/6 w-1.5 h-1.5 rounded-full bg-amber-300 blur-[1px] animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-amber-400 blur-[1px] animate-ping" style={{ animationDuration: '4s' }} />
        <div className="absolute top-2/3 left-1/3 w-1.5 h-1.5 rounded-full bg-yellow-200 blur-[0.5px] animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute top-1/2 right-1/5 w-1 h-1 rounded-full bg-amber-200 animate-ping" style={{ animationDuration: '5s' }} />
      </div>

      {/* Top Header Bar */}
      <header className="relative z-10 w-full px-6 py-5 flex items-center justify-between border-b border-amber-600/20 backdrop-blur-md bg-[#070a12]/70">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-b from-[#1b233a] to-[#0d1220] border border-amber-500/50 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
            <Shield className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <span className="font-cinzel text-sm font-bold tracking-wider text-amber-100 block">
              SITE SENTINEL
            </span>
            <span className="font-mono text-[10px] text-amber-400/80 block uppercase tracking-widest">
              Hogwarts Citadel Defense
            </span>
          </div>
        </div>

        {/* Telemetry pill */}
        <div className="hidden sm:flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a0f1d]/80 border border-amber-500/30 text-amber-200/90 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Ingress Wards Active</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-400/80">
            <span>{totalRequests} Requests Monitored</span>
            <span>•</span>
            <span className="text-rose-400 font-semibold">{suspiciousCount} Dark Arts Blocked</span>
          </div>
        </div>

        <div>
          <button
            onClick={onEnter}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-600/80 to-amber-700/80 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-cinzel font-bold text-xs tracking-wider transition-all cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.7)]"
          >
            <span>Enter Security Centre</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 py-12 max-w-5xl mx-auto">
        {/* Enchanted Shield Monogram */}
        <div className="relative mb-6">
          <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 via-rose-900/30 to-amber-500/20 rounded-full blur-2xl opacity-75" />
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-b from-[#182138] to-[#0c101d] border-2 border-amber-400/60 p-4 flex items-center justify-center text-amber-300 shadow-[0_0_35px_rgba(212,175,55,0.45)]">
            <Shield className="w-12 h-12 text-amber-300 animate-wand-pulse" />
            <Sparkles className="w-5 h-5 text-amber-200 absolute -top-2 -right-2 animate-bounce" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="font-decorative text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#fff3cf] via-[#f7df94] to-[#cba344] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] mb-3">
          SITE SENTINEL
        </h1>

        {/* Defence Against the Dark Arts Subtitle */}
        <p className="font-cinzel text-xs sm:text-sm md:text-base font-semibold tracking-[0.25em] uppercase text-amber-300/90 mb-4 drop-shadow">
          Defence Against the Dark Arts • Cybersecurity Terminal
        </p>

        {/* Core Tagline */}
        <p className="font-parchment italic text-xl sm:text-2xl md:text-3xl text-amber-100/90 max-w-2xl mb-8 leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
          &ldquo;Protecting the Wizarding World, One Request at a Time.&rdquo;
        </p>

        <p className="text-xs sm:text-sm text-stone-300/80 max-w-xl mb-10 leading-relaxed font-sans">
          Real-time HTTP ingress threat intelligence, automated counter-curse mitigation,
          and deep packet heuristic inspection fortified with the ancient wards of Hogwarts.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-14">
          <button
            onClick={onEnter}
            className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f5c542] to-[#b89228] text-stone-950 font-cinzel font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:shadow-[0_0_45px_rgba(212,175,55,0.85)] cursor-pointer flex items-center gap-3 border border-amber-200/50"
          >
            <Sparkles className="w-4 h-4 text-stone-950 group-hover:rotate-12 transition-transform" />
            <span>Enter Security Centre</span>
            <ArrowRight className="w-4 h-4 text-stone-950 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onQuickScan}
            className="px-6 py-4 rounded-xl bg-[#0c1222]/80 hover:bg-[#141d33] text-amber-200/90 hover:text-amber-100 font-mono text-xs tracking-wide transition-all border border-amber-500/30 hover:border-amber-400/60 shadow-[0_4px_20px_rgba(0,0,0,0.5)] cursor-pointer flex items-center gap-2"
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Cast Revelio Payload Scan</span>
          </button>
        </div>

        {/* House Sectors Bar */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl">
          {houses.map((house) => (
            <div
              key={house.name}
              className={`p-3 rounded-xl bg-gradient-to-b ${house.color} ${house.border} border backdrop-blur-sm flex items-center gap-3 transition-transform hover:-translate-y-0.5`}
            >
              <img
                src={house.crest}
                alt={house.name}
                className="w-7 h-8 object-contain shrink-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
              />
              <div className="text-left min-w-0">
                <span className="font-cinzel text-xs font-semibold text-amber-100 block truncate">
                  {house.name}
                </span>
                <span className="font-mono text-[10px] text-emerald-400 block">
                  ● {house.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Bottom Highlights & Feature Pills */}
      <footer className="relative z-10 w-full px-6 py-4 border-t border-amber-600/20 backdrop-blur-md bg-[#070a12]/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-amber-200/60">
        <div className="flex flex-wrap items-center justify-center gap-6">
          <span className="flex items-center gap-1.5 text-stone-400">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            OWASP Top 10 Deflection
          </span>
          <span className="flex items-center gap-1.5 text-stone-400">
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            Heuristic Revelio Detection
          </span>
          <span className="flex items-center gap-1.5 text-stone-400">
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            Dark Arts Ingress Filtration
          </span>
        </div>

        <div className="text-center md:text-right text-[11px] text-stone-400 font-cinzel">
          Hogwarts Cybersecurity Council • Ministry of Magic Approved
        </div>
      </footer>
    </div>
  );
};
