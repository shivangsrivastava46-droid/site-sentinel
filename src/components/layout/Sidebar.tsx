import type { FC } from 'react';
import { Shield, List, SearchCode, Sparkles, Home, CheckCircle2 } from 'lucide-react';

interface SidebarProps {
  currentView: 'table' | 'inspector' | 'landing';
  onViewChange: (view: 'table' | 'inspector' | 'landing') => void;
  selectedWarden?: string;
  onSelectWarden?: (name: string) => void;
}

const wardens = [
  {
    name: 'Albus Dumbledore',
    title: 'Chief Overseer',
    avatar: '/assets/characters/dumbledore.jpg',
    specialty: 'Master Citadel Wards & Archmage Logic',
    house: 'Gryffindor',
  },
  {
    name: 'Harry Potter',
    title: 'Lead Auror',
    avatar: '/assets/characters/harry.jpg',
    specialty: 'Exploit Defense & Protego Shielding',
    house: 'Gryffindor',
  },
  {
    name: 'Hermione Granger',
    title: 'Threat Intel Analyst',
    avatar: '/assets/characters/hermione.jpg',
    specialty: 'OWASP Signature Heuristics & Lexical Tokens',
    house: 'Gryffindor',
  },
  {
    name: 'Ron Weasley',
    title: 'Perimeter Warden',
    avatar: '/assets/characters/ron.jpg',
    specialty: 'Traffic Routing & Ingress Filtration',
    house: 'Gryffindor',
  },
];

export const Sidebar: FC<SidebarProps> = ({ 
  currentView, 
  onViewChange,
  selectedWarden = 'Harry Potter',
  onSelectWarden,
}) => {
  return (
    <aside className="w-68 bg-[#05070e] border-r border-amber-600/30 flex flex-col h-screen shrink-0 select-none relative z-20">
      {/* Platform 9 3/4 Header Accent with rich burgundy and warm lantern warmth */}
      <div className="p-4 border-b border-amber-600/30 bg-gradient-to-r from-[#2a070f] via-[#1a050a] to-[#070a13] relative overflow-hidden">
        {/* Subtle lantern glow overlay */}
        <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-amber-500/15 blur-xl pointer-events-none" />

        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#4a0d1a] to-[#1e050b] border-2 border-amber-400/60 p-1 flex items-center justify-center text-amber-300 shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
            <Shield className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <span className="font-decorative text-sm font-bold text-amber-100 tracking-wider block">
              SITE SENTINEL
            </span>
            <span className="font-mono text-[9px] text-amber-400/90 uppercase tracking-widest block">
              Platform 9¾ Gateway
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="p-3 space-y-1.5 border-b border-amber-600/20">
        <button
          onClick={() => onViewChange('landing')}
          className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-cinzel font-semibold transition-all text-left cursor-pointer ${
            currentView === 'landing'
              ? 'bg-amber-600/30 text-amber-200 border border-amber-400/50 shadow-[0_0_12px_rgba(212,175,55,0.2)]'
              : 'text-stone-400 hover:text-amber-200 hover:bg-stone-900/60'
          }`}
        >
          <Home className="w-4 h-4 text-amber-400" />
          <span>The Great Hall</span>
        </button>

        <button
          onClick={() => onViewChange('table')}
          className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-cinzel font-semibold transition-all text-left cursor-pointer ${
            currentView === 'table'
              ? 'bg-gradient-to-r from-amber-600/30 to-rose-950/40 text-amber-100 border border-amber-400/50 shadow-[0_0_12px_rgba(212,175,55,0.2)]'
              : 'text-stone-400 hover:text-amber-200 hover:bg-stone-900/60'
          }`}
        >
          <List className="w-4 h-4 text-amber-400" />
          <span>Marauder&apos;s Traffic Feed</span>
        </button>

        <button
          onClick={() => onViewChange('inspector')}
          className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-cinzel font-semibold transition-all text-left cursor-pointer ${
            currentView === 'inspector'
              ? 'bg-gradient-to-r from-amber-600/30 to-rose-950/40 text-amber-100 border border-amber-400/50 shadow-[0_0_12px_rgba(212,175,55,0.2)]'
              : 'text-stone-400 hover:text-amber-200 hover:bg-stone-900/60'
          }`}
        >
          <SearchCode className="w-4 h-4 text-amber-400" />
          <span>Revelio Spell Scanner</span>
        </button>
      </nav>

      {/* Sentinel Guardians Section */}
      <div className="p-3.5 flex-1 overflow-y-auto space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-cinzel text-[11px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-amber-400" />
            Sentinel Guardians
          </span>
          <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-600/40">
            On Duty
          </span>
        </div>

        <div className="space-y-2">
          {wardens.map((warden) => {
            const isSelected = selectedWarden === warden.name;

            return (
              <div
                key={warden.name}
                onClick={() => onSelectWarden && onSelectWarden(warden.name)}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#2b0c14] to-[#14060b] border-amber-400/80 text-amber-50 shadow-[0_0_15px_rgba(212,175,55,0.25)] ring-1 ring-amber-400/40'
                    : 'bg-[#090e1a]/70 border-stone-800/80 hover:border-amber-500/40 text-stone-300'
                }`}
                title={warden.specialty}
              >
                <div className="relative shrink-0">
                  <img
                    src={warden.avatar}
                    alt={warden.name}
                    className="w-9 h-9 rounded-full object-cover border-2 border-amber-400/60 shadow-sm"
                  />
                  {isSelected && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#05070e]" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-cinzel text-xs font-bold block truncate leading-tight text-amber-100">
                      {warden.name}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 ml-1" />
                    )}
                  </div>
                  <span className="font-parchment italic text-[11px] text-amber-300/80 block truncate">
                    {warden.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* House Crests Minimal Strip */}
      <div className="px-4 py-3 bg-[#070a14] border-t border-amber-600/20 flex items-center justify-between">
        <span className="font-cinzel text-[10px] font-semibold text-stone-400 uppercase">Citadel Houses:</span>
        <div className="flex items-center gap-2">
          <img src="/assets/crests/gryffindor.svg" alt="Gryffindor" className="w-4 h-5 opacity-80 hover:opacity-100 hover:scale-110 transition-all" title="Gryffindor Sector" />
          <img src="/assets/crests/slytherin.svg" alt="Slytherin" className="w-4 h-5 opacity-80 hover:opacity-100 hover:scale-110 transition-all" title="Slytherin Sector" />
          <img src="/assets/crests/ravenclaw.svg" alt="Ravenclaw" className="w-4 h-5 opacity-80 hover:opacity-100 hover:scale-110 transition-all" title="Ravenclaw Tower" />
          <img src="/assets/crests/hufflepuff.svg" alt="Hufflepuff" className="w-4 h-5 opacity-80 hover:opacity-100 hover:scale-110 transition-all" title="Hufflepuff Sanctum" />
        </div>
      </div>

      {/* Subtle Ingress Port Status */}
      <div className="p-3 border-t border-amber-600/20 text-[10px] font-mono text-stone-400 flex items-center justify-between bg-[#04060c]">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Wards Online</span>
        </span>
        <span className="text-amber-400/80">Revelio v2.0</span>
      </div>
    </aside>
  );
};
