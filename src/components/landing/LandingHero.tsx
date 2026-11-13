import type { FC } from 'react';
import { Sparkles, Wand2 } from 'lucide-react';

interface LandingHeroProps {
  onEnter: () => void;
  onScan: () => void;
}

export const LandingHero: FC<LandingHeroProps> = ({ onEnter, onScan }) => {
  return (
    <div className="relative min-h-[calc(100vh-69px)] w-full flex flex-col items-center justify-between overflow-hidden">
      {/* Background: Full-screen Illustrated Hogwarts Castle Poster */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="/assets/hogwarts-castle.png"
          alt="Hogwarts Castle"
          className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
        />
        {/* Delicate artistic dark vignette preserving the painting's sky & castle spires */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060812] via-[#060812]/40 to-[#060812]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(6,8,18,0.7)_90%)]" />

        {/* Floating subtle magical embers/particles */}
        <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 rounded-full bg-amber-300 blur-[0.5px] animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full bg-yellow-200 blur-[1px] animate-ping" style={{ animationDuration: '4s' }} />
        <div className="absolute top-1/2 left-1/5 w-1 h-1 rounded-full bg-amber-200 blur-[0.5px] animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 rounded-full bg-amber-400 blur-[0.5px] animate-pulse" style={{ animationDuration: '5s' }} />
      </div>

      {/* Main Poster Content (Spacious & Negative Space) */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto py-12">
        {/* Title: SITE SENTINEL */}
        <h1 className="font-decorative text-5xl sm:text-7xl md:text-8xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-[#fff7db] via-[#f5d787] to-[#c79b38] drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] mb-4">
          SITE SENTINEL
        </h1>

        {/* Core Tagline: "Protecting the Wizarding World, One Request at a Time." */}
        <p className="font-parchment italic text-2xl sm:text-3xl md:text-4xl text-amber-100 drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)] max-w-2xl leading-relaxed mb-4">
          &ldquo;Protecting the Wizarding World, One Request at a Time.&rdquo;
        </p>

        {/* Small Description: "Even the darkest magic leaves a trace. Let us uncover it." */}
        <p className="font-parchment text-base sm:text-lg text-amber-200/80 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] max-w-lg mb-10 tracking-wide">
          &ldquo;Even the darkest magic leaves a trace. Let us uncover it.&rdquo;
        </p>

        {/* Action Buttons: Minimal, Cinematic */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <button
            onClick={onEnter}
            className="btn-protego px-8 py-3.5 rounded-xl font-cinzel font-bold text-sm tracking-widest uppercase cursor-pointer flex items-center gap-2.5 transition-all shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-stone-900" />
            <span>Enter Hogwarts</span>
          </button>

          <button
            onClick={onScan}
            className="px-7 py-3.5 rounded-xl bg-[#0a0e1c]/70 hover:bg-[#121930] text-amber-200 hover:text-amber-100 font-cinzel text-xs font-semibold tracking-wider transition-all border border-amber-400/30 hover:border-amber-400/60 backdrop-blur-md cursor-pointer flex items-center gap-2 shadow-md"
          >
            <Wand2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Cast a Spell — Scan Request</span>
          </button>
        </div>
      </div>

      {/* Subtle Footer Note */}
      <div className="relative z-10 pb-6 text-center text-xs font-parchment italic text-amber-200/50">
        Fortified with the ancient wards of Hogwarts Citadel
      </div>
    </div>
  );
};
