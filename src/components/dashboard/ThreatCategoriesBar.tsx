import type { FC } from 'react';
import { Database, Code2, FolderGit2, Terminal, Radio, ShieldCheck } from 'lucide-react';
import type { HttpRequestItem } from '../../types/security';

interface ThreatCategoriesBarProps {
  requests: HttpRequestItem[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const ThreatCategoriesBar: FC<ThreatCategoriesBarProps> = ({
  requests,
  selectedCategory,
  onSelectCategory,
}) => {
  const sqliCount = requests.filter((r) => r.threat.toLowerCase().includes('sql')).length;
  const xssCount = requests.filter((r) => r.threat.toLowerCase().includes('cross-site') || r.threat.toLowerCase().includes('xss')).length;
  const traversalCount = requests.filter((r) => r.threat.toLowerCase().includes('traversal')).length;
  const cmdCount = requests.filter((r) => r.threat.toLowerCase().includes('command')).length;
  const scannerCount = requests.filter((r) => r.threat.toLowerCase().includes('scanner')).length;
  const safeCount = requests.filter((r) => r.status === 'SAFE').length;

  const categories = [
    {
      id: 'all',
      name: 'All Categories',
      loreName: 'Omni-Threat Scope',
      count: requests.length,
      icon: ShieldCheck,
      color: 'text-amber-300',
      border: 'border-amber-500/40',
      activeBg: 'bg-amber-950/60 border-amber-400',
    },
    {
      id: 'SQL Injection',
      name: 'SQL Injection',
      loreName: 'Curse of Tautology',
      count: sqliCount,
      icon: Database,
      color: 'text-rose-400',
      border: 'border-rose-500/30',
      activeBg: 'bg-rose-950/60 border-rose-500',
    },
    {
      id: 'Cross-Site Scripting (XSS)',
      name: 'Cross-Site Scripting',
      loreName: 'Script Hex (XSS)',
      count: xssCount,
      icon: Code2,
      color: 'text-amber-400',
      border: 'border-amber-500/30',
      activeBg: 'bg-amber-950/60 border-amber-500',
    },
    {
      id: 'Path Traversal',
      name: 'Path Traversal',
      loreName: 'Directory Escape',
      count: traversalCount,
      icon: FolderGit2,
      color: 'text-orange-400',
      border: 'border-orange-500/30',
      activeBg: 'bg-orange-950/60 border-orange-500',
    },
    {
      id: 'Command Injection',
      name: 'Command Injection',
      loreName: 'Dark Shell Incantation',
      count: cmdCount,
      icon: Terminal,
      color: 'text-red-400',
      border: 'border-red-500/30',
      activeBg: 'bg-red-950/60 border-red-500',
    },
    {
      id: 'Vulnerability Scanner',
      name: 'Security Scanners',
      loreName: 'Automated Dark Probes',
      count: scannerCount,
      icon: Radio,
      color: 'text-purple-300',
      border: 'border-purple-500/30',
      activeBg: 'bg-purple-950/60 border-purple-400',
    },
    {
      id: 'SAFE',
      name: 'Safe Packets',
      loreName: 'Protego Warded',
      count: safeCount,
      icon: ShieldCheck,
      color: 'text-emerald-400',
      border: 'border-emerald-500/30',
      activeBg: 'bg-emerald-950/60 border-emerald-500',
    },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="font-cinzel font-semibold text-amber-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          Threat Classifications & Ingress Vectors
        </span>
        <span className="text-stone-400 text-[10px]">
          Filter traffic by threat signature
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer backdrop-blur-sm flex flex-col justify-between ${
                isSelected
                  ? `${cat.activeBg} shadow-[0_0_15px_rgba(212,175,55,0.25)] ring-1 ring-amber-400/50`
                  : `bg-[#0a0f1d]/70 ${cat.border} hover:bg-[#12192e] hover:border-amber-500/40 text-stone-300`
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <Icon className={`w-3.5 h-3.5 ${cat.color}`} />
                <span className="font-mono text-xs font-bold text-amber-100 px-1.5 py-0.2 rounded bg-black/40 border border-white/5">
                  {cat.count}
                </span>
              </div>
              <div>
                <span className="font-cinzel text-xs font-bold block text-stone-100 truncate">
                  {cat.name}
                </span>
                <span className="font-parchment italic text-[11px] text-amber-300/80 block truncate">
                  {cat.loreName}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
