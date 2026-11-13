import { useState } from 'react';
import type { FC } from 'react';
import { Search, ShieldCheck, AlertTriangle, Radio } from 'lucide-react';
import type { HttpRequestItem, RequestStatus, HogwartsHouse } from '../../types/security';

interface RequestTableProps {
  requests: HttpRequestItem[];
  selectedId: string | null;
  onSelectRequest: (item: HttpRequestItem) => void;
  selectedHouse?: string;
  selectedThreatCategory?: string;
}

const houseCrests: Record<HogwartsHouse, { name: string; src: string }> = {
  gryffindor: { name: 'Gryffindor Sector', src: '/assets/crests/gryffindor.svg' },
  slytherin: { name: 'Slytherin Sector', src: '/assets/crests/slytherin.svg' },
  ravenclaw: { name: 'Ravenclaw Tower', src: '/assets/crests/ravenclaw.svg' },
  hufflepuff: { name: 'Hufflepuff Sanctum', src: '/assets/crests/hufflepuff.svg' },
};

export const RequestTable: FC<RequestTableProps> = ({
  requests,
  selectedId,
  onSelectRequest,
  selectedHouse = 'all',
  selectedThreatCategory = 'all',
}) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | RequestStatus>('ALL');

  const filtered = requests.filter((r) => {
    const matchesSearch =
      r.path.toLowerCase().includes(filterQuery.toLowerCase()) ||
      r.sourceIp.toLowerCase().includes(filterQuery.toLowerCase()) ||
      r.threat.toLowerCase().includes(filterQuery.toLowerCase()) ||
      r.id.toLowerCase().includes(filterQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'ALL' || r.status === statusFilter;

    const matchesHouse =
      selectedHouse === 'all' || r.house === selectedHouse;

    const matchesCategory =
      selectedThreatCategory === 'all' ||
      (selectedThreatCategory === 'SAFE' && r.status === 'SAFE') ||
      r.threat.toLowerCase().includes(selectedThreatCategory.toLowerCase());

    return matchesSearch && matchesStatus && matchesHouse && matchesCategory;
  });

  const getMethodBadge = (method: string) => {
    const methodStyles: Record<string, string> = {
      GET: 'text-sky-300 bg-sky-950/70 border-sky-600/40',
      POST: 'text-amber-300 bg-amber-950/70 border-amber-600/40',
      PUT: 'text-purple-300 bg-purple-950/70 border-purple-600/40',
      DELETE: 'text-rose-300 bg-rose-950/70 border-rose-600/40',
    };

    return (
      <span
        className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold border tracking-wider ${
          methodStyles[method] || 'text-stone-300 bg-stone-900 border-stone-700'
        }`}
      >
        {method}
      </span>
    );
  };

  return (
    <div className="bg-[#080d1a]/95 border border-amber-500/30 rounded-2xl overflow-hidden flex flex-col shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-md">
      {/* Table Toolbar */}
      <div className="p-4 border-b border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#060a14]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="font-cinzel text-sm font-bold text-amber-100">
              Marauder&apos;s Live Ingress Stream
            </span>
          </div>

          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#0a0f20] text-amber-300 border border-amber-500/30 font-mono">
            {filtered.length} packets
          </span>

          {selectedHouse !== 'all' && (
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-950/60 text-amber-200 border border-amber-600/40 font-mono capitalize">
              Gate: {selectedHouse}
            </span>
          )}

          {selectedThreatCategory !== 'all' && (
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-rose-950/60 text-rose-300 border border-rose-600/40 font-mono">
              Vector: {selectedThreatCategory}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2.5">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-amber-400/70 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by path, IP, threat..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-56 pl-9 pr-3 py-1.5 bg-[#050811] border border-stone-800 rounded-xl text-xs text-amber-100 placeholder-stone-500 focus:outline-none focus:border-amber-400/70 font-mono"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="bg-[#050811] border border-stone-800 rounded-xl px-3 py-1.5 text-xs text-amber-200 focus:outline-none focus:border-amber-400/70 cursor-pointer font-mono"
          >
            <option value="ALL">All Verdicts</option>
            <option value="SAFE">PROTEGO (Safe)</option>
            <option value="SUSPICIOUS">DARK ARTS (Suspicious)</option>
          </select>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#050812] text-amber-300/80 font-cinzel text-[11px] uppercase tracking-wider border-b border-amber-500/20">
            <tr>
              <th className="py-3 px-4 font-bold">House Gateway / ID</th>
              <th className="py-3 px-4 font-bold">Method</th>
              <th className="py-3 px-4 font-bold">Target Ingress Path</th>
              <th className="py-3 px-4 font-bold">Source IP</th>
              <th className="py-3 px-4 font-bold">Verdict</th>
              <th className="py-3 px-4 font-bold">Detected Threat</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-amber-500/10">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-stone-500 font-mono text-xs">
                  No HTTP requests match the current filtration runes.
                </td>
              </tr>
            ) : (
              filtered.map((item) => {
                const isSelected = item.id === selectedId;
                const isSuspicious = item.status === 'SUSPICIOUS';
                const houseInfo = item.house ? houseCrests[item.house] : null;

                return (
                  <tr
                    key={item.id}
                    onClick={() => onSelectRequest(item)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-gradient-to-r from-amber-600/25 via-[#230b13]/60 to-transparent border-l-4 border-amber-400'
                        : 'hover:bg-amber-500/5'
                    }`}
                  >
                    {/* House Crest & ID */}
                    <td className="py-3 px-4 font-mono text-amber-100">
                      <div className="flex items-center gap-2.5">
                        {houseInfo ? (
                          <img
                            src={houseInfo.src}
                            alt={houseInfo.name}
                            className="w-4 h-5 object-contain shrink-0 drop-shadow-sm"
                            title={houseInfo.name}
                          />
                        ) : (
                          <div className="w-4 h-5 rounded bg-stone-800 shrink-0" />
                        )}
                        <div>
                          <span className="font-bold text-amber-200 block leading-tight">{item.id}</span>
                          <span className="text-[10px] text-stone-400 block leading-tight font-mono">{item.timestamp}</span>
                        </div>
                      </div>
                    </td>

                    {/* Method */}
                    <td className="py-3 px-4">
                      {getMethodBadge(item.method)}
                    </td>

                    {/* Path */}
                    <td className="py-3 px-4 font-mono text-amber-100/90 max-w-xs sm:max-w-md truncate" title={item.path}>
                      {item.path}
                    </td>

                    {/* Source IP */}
                    <td className="py-3 px-4 font-mono text-stone-400">
                      {item.sourceIp}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3 px-4">
                      {isSuspicious ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-950/70 text-rose-300 border border-rose-600/50 font-mono shadow-[0_0_8px_rgba(225,29,72,0.2)]">
                          <AlertTriangle className="w-3 h-3 text-rose-400" />
                          <span>BLOCKED</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/70 text-emerald-300 border border-emerald-600/50 font-mono shadow-[0_0_8px_rgba(16,185,129,0.2)]">
                          <ShieldCheck className="w-3 h-3 text-emerald-400" />
                          <span>ALLOWED</span>
                        </span>
                      )}
                    </td>

                    {/* Threat */}
                    <td className="py-3 px-4 font-mono text-xs">
                      <span
                        className={
                          isSuspicious
                            ? 'text-amber-300 font-semibold flex items-center gap-1'
                            : 'text-stone-400'
                        }
                      >
                        {item.threat}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
