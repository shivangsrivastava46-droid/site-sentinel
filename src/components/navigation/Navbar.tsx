import type { FC } from 'react';

interface NavbarProps {
  currentView: 'landing' | 'hall' | 'findings';
  onNavigate: (view: 'landing' | 'hall' | 'findings') => void;
}

export const Navbar: FC<NavbarProps> = ({ currentView, onNavigate }) => {
  return (
    <nav className="relative z-30 w-full px-6 py-4 flex items-center justify-between backdrop-blur-md bg-[#05070f]/70 border-b border-amber-500/15">
      {/* Brand: Site Sentinel with subtle golden glow */}
      <button
        onClick={() => onNavigate('landing')}
        className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
      >
        <span className="w-2 h-2 rounded-full bg-amber-400 group-hover:scale-125 transition-transform shadow-[0_0_8px_#f5c542]" />
        <div>
          <span className="font-decorative text-base tracking-wider text-amber-100 group-hover:text-amber-200 block transition-colors leading-tight">
            SITE SENTINEL
          </span>
          <span className="font-parchment italic text-[11px] text-amber-300/70 block leading-none">
            Hogwarts Defence Terminal
          </span>
        </div>
      </button>

      {/* Navigation: Only 3 pure links */}
      <div className="flex items-center gap-6 sm:gap-8 font-cinzel text-xs sm:text-sm font-semibold tracking-wider">
        <button
          onClick={() => onNavigate('landing')}
          className={`transition-all duration-200 cursor-pointer pb-1 border-b-2 ${
            currentView === 'landing'
              ? 'text-amber-200 border-amber-400 shadow-[0_1px_10px_rgba(212,175,55,0.3)]'
              : 'text-stone-400 hover:text-amber-200 border-transparent hover:border-amber-400/50'
          }`}
        >
          The Great Hall
        </button>

        <button
          onClick={() => onNavigate('hall')}
          className={`transition-all duration-200 cursor-pointer pb-1 border-b-2 ${
            currentView === 'hall'
              ? 'text-amber-200 border-amber-400 shadow-[0_1px_10px_rgba(212,175,55,0.3)]'
              : 'text-stone-400 hover:text-amber-200 border-transparent hover:border-amber-400/50'
          }`}
        >
          Spell Scanner
        </button>

        <button
          onClick={() => onNavigate('findings')}
          className={`transition-all duration-200 cursor-pointer pb-1 border-b-2 ${
            currentView === 'findings'
              ? 'text-amber-200 border-amber-400 shadow-[0_1px_10px_rgba(212,175,55,0.3)]'
              : 'text-stone-400 hover:text-amber-200 border-transparent hover:border-amber-400/50'
          }`}
        >
          Threat Findings
        </button>
      </div>
    </nav>
  );
};
