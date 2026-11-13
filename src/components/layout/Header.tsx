import type { FC } from 'react';
import { ShieldAlert, ShieldCheck, Sparkles, Home, Activity } from 'lucide-react';

interface HeaderProps {
  totalCount: number;
  suspiciousCount: number;
  onOpenTestModal: () => void;
  selectedHouse?: string;
  onSelectHouse?: (house: string) => void;
  onGoToLanding?: () => void;
  currentView?: string;
  onViewChange?: (view: 'table' | 'inspector' | 'landing') => void;
}

const houses = [
  { id: 'all', name: 'All Gates', icon: null },
  { id: 'gryffindor', name: 'Gryffindor', icon: '/assets/crests/gryffindor.svg', color: 'hover:text-amber-300' },
  { id: 'slytherin', name: 'Slytherin', icon: '/assets/crests/slytherin.svg', color: 'hover:text-emerald-300' },
  { id: 'ravenclaw', name: 'Ravenclaw', icon: '/assets/crests/ravenclaw.svg', color: 'hover:text-blue-300' },
  { id: 'hufflepuff', name: 'Hufflepuff', icon: '/assets/crests/hufflepuff.svg', color: 'hover:text-yellow-300' },
];

export const Header: FC<HeaderProps> = ({
  totalCount,
  suspiciousCount,
  onOpenTestModal,
  selectedHouse = 'all',
  onSelectHouse,
  onGoToLanding,
  currentView,
  onViewChange,
}) => {
  const safeCount = Math.max(0, totalCount - suspiciousCount);

  return (
    <header className="h-18 bg-[#060913] border-b border-amber-600/30 px-5 flex items-center justify-between z-20 shrink-0 relative overflow-hidden backdrop-blur-md">
      {/* Subtle Castle Atmosphere Accent with dark gradient overlay */}
      <div className="absolute right-0 top-0 bottom-0 w-96 pointer-events-none opacity-25 overflow-hidden">
        <img
          src="/assets/hogwarts-castle.png"
          alt="Hogwarts Castle Silhouette"
          className="w-full h-full object-cover object-right filter brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060913] via-[#060913]/80 to-transparent" />
      </div>

      {/* Left Area: Citadel Badge & Title */}
      <div className="flex items-center gap-4 relative z-10">
        {/* Navigation to Landing / Citadel */}
        <button
          onClick={onGoToLanding}
          className="flex items-center gap-2 p-1.5 rounded-xl bg-[#0c1222] border border-amber-500/40 hover:border-amber-400 hover:bg-[#131d38] transition-all cursor-pointer shadow-[0_0_12px_rgba(212,175,55,0.15)] group"
          title="Return to The Great Hall (Landing Page)"
        >
          <img
            src="/assets/castle.jpg"
            alt="Hogwarts Citadel"
            className="w-8 h-8 rounded-lg object-cover border border-amber-400/50 group-hover:scale-105 transition-transform"
          />
          <div className="pr-1.5 hidden md:block text-left">
            <span className="font-cinzel text-xs font-bold text-amber-100 block leading-tight flex items-center gap-1">
              <Home className="w-3 h-3 text-amber-400 inline" />
              <span>Great Hall</span>
            </span>
            <span className="font-mono text-[9px] text-amber-400/80 block leading-tight">
              Site Sentinel
            </span>
          </div>
        </button>

        {/* View Switcher Pills */}
        {onViewChange && (
          <div className="hidden sm:flex items-center p-1 rounded-xl bg-[#090e1c] border border-amber-500/20 text-xs font-cinzel font-semibold">
            <button
              onClick={() => onViewChange('table')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                currentView === 'table'
                  ? 'bg-amber-600/30 text-amber-200 border border-amber-400/40 shadow-sm'
                  : 'text-stone-400 hover:text-amber-200'
              }`}
            >
              Traffic Feed
            </button>
            <button
              onClick={() => onViewChange('inspector')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                currentView === 'inspector'
                  ? 'bg-amber-600/30 text-amber-200 border border-amber-400/40 shadow-sm'
                  : 'text-stone-400 hover:text-amber-200'
              }`}
            >
              Revelio Scanner
            </button>
          </div>
        )}

        {/* Telemetry Counter Badges */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0c1222] border border-amber-500/30 text-amber-200 shadow-inner">
            <Activity className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-stone-400 hidden lg:inline">Ingress:</span>
            <span className="font-bold text-amber-100">{totalCount}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/40 border border-emerald-600/40 text-emerald-300 shadow-inner">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-400/80 hidden lg:inline">Allowed:</span>
            <span className="font-bold text-emerald-300">{safeCount}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-950/50 border border-rose-600/50 text-rose-300 shadow-inner">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span className="text-rose-300/80 hidden lg:inline">Dark Arts:</span>
            <span className="font-bold text-rose-300">{suspiciousCount}</span>
          </div>
        </div>

        {/* Hogwarts House Gate Filters */}
        <div className="hidden xl:flex items-center gap-1 bg-[#090e1c] p-1 rounded-xl border border-amber-500/20 text-[11px] font-mono">
          {houses.map((house) => (
            <button
              key={house.id}
              onClick={() => onSelectHouse && onSelectHouse(house.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                selectedHouse === house.id
                  ? 'bg-gradient-to-r from-amber-600/40 to-amber-700/40 text-amber-100 border border-amber-400/50 font-bold shadow-sm'
                  : `text-stone-400 ${house.color} hover:bg-stone-800/40`
              }`}
            >
              {house.icon && (
                <img src={house.icon} alt={house.name} className="w-3.5 h-4 object-contain" />
              )}
              <span>{house.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Right Area: Test Request CTA */}
      <div className="flex items-center gap-3 relative z-10">
        <button
          onClick={onOpenTestModal}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-cinzel font-bold text-xs tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:shadow-[0_0_25px_rgba(212,175,55,0.7)]"
        >
          <Sparkles className="w-3.5 h-3.5 fill-current text-stone-950" />
          <span className="hidden sm:inline">Cast Revelio Test</span>
          <span className="sm:hidden">Test</span>
        </button>
      </div>
    </header>
  );
};
