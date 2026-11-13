import { useState } from 'react';
import type { FC } from 'react';
import { ShieldCheck, AlertOctagon, Wand2, Search } from 'lucide-react';
import type { HttpRequestItem } from '../../types/security';

interface ThreatFindingsViewProps {
  findings: HttpRequestItem[];
  onInspectInScanner: (raw: string) => void;
}

export const ThreatFindingsView: FC<ThreatFindingsViewProps> = ({
  findings,
  onInspectInScanner,
}) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'SUSPICIOUS' | 'SAFE'>('ALL');

  const filtered = findings.filter((f) => {
    const matchesSearch =
      f.path.toLowerCase().includes(search.toLowerCase()) ||
      f.threat.toLowerCase().includes(search.toLowerCase()) ||
      f.id.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filter === 'ALL' || f.status === filter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="relative min-h-[calc(100vh-69px)] w-full py-10 px-4 flex flex-col items-center overflow-hidden">
      {/* Background: Hogsmeade with snowy fantasy environment, warm shop lighting and Hedwig */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="/assets/hogsmeade.png"
          alt="Hogsmeade Village"
          className="w-full h-full object-cover object-center filter brightness-45 contrast-110 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060812] via-[#080d1a]/85 to-[#060812]/90" />
        <div className="absolute inset-0 bg-radial at-center from-transparent via-[#060812]/60 to-[#060812]/90" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto space-y-6">
        {/* Title */}
        <div className="text-center">
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-amber-100 tracking-wide candle-glow mb-2">
            The Marauder&apos;s Ledger — Threat Findings
          </h2>
          <p className="font-parchment italic text-base sm:text-lg text-amber-200/80">
            Recorded ingress packets and detected dark incantations.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl bg-[#080c18]/80 border border-amber-500/20 backdrop-blur-md">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-amber-400/70 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by path or threat..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-[#050811] border border-[#c49f55]/30 rounded-lg text-xs font-mono text-amber-100 placeholder-stone-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Status Buttons */}
          <div className="flex items-center gap-2 font-cinzel text-xs font-semibold">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                filter === 'ALL'
                  ? 'bg-amber-600/30 text-amber-200 border border-amber-400/50'
                  : 'text-stone-400 hover:text-amber-200'
              }`}
            >
              All Entries ({findings.length})
            </button>
            <button
              onClick={() => setFilter('SUSPICIOUS')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                filter === 'SUSPICIOUS'
                  ? 'bg-rose-950/60 text-rose-300 border border-rose-500/60'
                  : 'text-stone-400 hover:text-rose-300'
              }`}
            >
              Dark Magic
            </button>
            <button
              onClick={() => setFilter('SAFE')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                filter === 'SAFE'
                  ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/60'
                  : 'text-stone-400 hover:text-emerald-300'
              }`}
            >
              Protego Safe
            </button>
          </div>
        </div>

        {/* Ledger Entries (Storybook Parchment Cards) */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="p-12 text-center parchment-sheet rounded-2xl text-stone-700 font-parchment italic text-lg">
              No entries recorded in the ledger matching your search.
            </div>
          ) : (
            filtered.map((item) => {
              const isSuspicious = item.status === 'SUSPICIOUS';

              return (
                <div
                  key={item.id}
                  className={`rounded-2xl p-5 border transition-all ${
                    isSuspicious
                      ? 'bg-gradient-to-r from-[#260810] via-[#160509] to-[#0c0508] border-rose-600/50 text-amber-100 shadow-[0_4px_20px_rgba(180,20,40,0.2)]'
                      : 'parchment-sheet text-[#2d1f10]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/10 dark:border-rose-900/40">
                    <div className="flex items-center gap-2.5">
                      {isSuspicious ? (
                        <AlertOctagon className="w-5 h-5 text-rose-400 shrink-0" />
                      ) : (
                        <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                      )}
                      <div>
                        <span className="font-cinzel text-sm font-bold block">
                          {isSuspicious ? `DARK MAGIC: ${item.threat}` : 'PROTEGO SUCCESSFUL'}
                        </span>
                        <span className="font-mono text-[10px] opacity-70 block">
                          {item.id} • Logged at {item.timestamp}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                          isSuspicious
                            ? 'bg-rose-950 text-rose-200 border border-rose-600/50'
                            : 'bg-emerald-800 text-emerald-100'
                        }`}
                      >
                        {isSuspicious ? 'BLOCKED' : 'ALLOWED'}
                      </span>

                      <button
                        onClick={() => onInspectInScanner(item.rawRequest)}
                        className="px-3 py-1 rounded-lg bg-[#3a2814] hover:bg-[#26190a] text-amber-200 text-xs font-cinzel font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Wand2 className="w-3 h-3 text-amber-400" />
                        <span>Inspect in Scanner</span>
                      </button>
                    </div>
                  </div>

                  {/* Summary & Path */}
                  <div className="pt-3 space-y-1.5 text-xs">
                    <div className="flex items-center gap-2 font-mono">
                      <span className="font-bold text-amber-400 dark:text-amber-300">{item.method}</span>
                      <span className="truncate opacity-90">{item.path}</span>
                    </div>
                    <p className="font-parchment text-sm italic opacity-90">
                      &ldquo;{item.reason}&rdquo;
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
