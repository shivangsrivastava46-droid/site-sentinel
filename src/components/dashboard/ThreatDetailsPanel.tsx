import { useState } from 'react';
import type { FC } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Copy, 
  Check, 
  Terminal, 
  ExternalLink, 
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import type { HttpRequestItem } from '../../types/security';
import { formatVerdict } from '../../utils/securityFormatters';
import { parseRawHttpRequest } from '../../services/scannerService';

interface ThreatDetailsPanelProps {
  request: HttpRequestItem | null;
  onInspectInEditor?: (raw: string) => void;
}

export const ThreatDetailsPanel: FC<ThreatDetailsPanelProps> = ({
  request,
  onInspectInEditor,
}) => {
  const [copied, setCopied] = useState(false);
  const [showTokens, setShowTokens] = useState(false);

  const handleCopy = () => {
    if (!request?.rawRequest) return;
    navigator.clipboard.writeText(request.rawRequest);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (!request) {
    return (
      <div className="bg-[#080d1a]/90 border border-amber-500/20 rounded-2xl p-8 text-center text-stone-400 text-xs flex flex-col items-center justify-center gap-3">
        <img
          src="/assets/characters/hermione.jpg"
          alt="Hermione Granger"
          className="w-12 h-12 rounded-full object-cover border-2 border-amber-400/50 opacity-80"
        />
        <span className="font-parchment text-base text-amber-200/80 max-w-md">
          Select an incoming HTTP request from the Marauder&apos;s Ingress Stream above to inspect threat analysis and parchment findings.
        </span>
      </div>
    );
  }

  const isSuspicious = request.status === 'SUSPICIOUS';
  const verdict = formatVerdict(request);
  const parsed = parseRawHttpRequest(request.rawRequest);

  // Character artwork in threat/safety visual area
  const analystAvatar = isSuspicious 
    ? (request.threat.includes('SQL') || request.threat.includes('Command') 
        ? { name: 'Harry Potter', role: 'Lead Auror • Counter-Curse Defense', img: '/assets/characters/harry.jpg', note: 'Detected high-velocity intrusion vectors matching forbidden dark incantations.' }
        : { name: 'Hermione Granger', role: 'Threat Intelligence • OWASP Heuristics', img: '/assets/characters/hermione.jpg', note: 'Heuristic pattern matches unescaped code execution payloads in request stream.' })
    : { name: 'Albus Dumbledore', role: 'Chief Overseer • Archmage Wards', img: '/assets/characters/dumbledore.jpg', note: 'Traffic conforms to standard Citadel ingress protocols. Protego wards holding strong.' };

  return (
    <div className="rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex flex-col border border-amber-500/30">
      {/* Panel Header */}
      <div className="p-4 border-b border-amber-500/20 bg-[#060a14] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-cinzel text-sm font-bold text-amber-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Threat Analysis Dossier</span>
          </span>
          <span className="font-mono text-xs text-amber-400 px-2.5 py-0.5 rounded-full bg-black/40 border border-amber-500/30">
            {request.id}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {verdict.decision === 'ALLOWED' ? (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/70 text-emerald-300 border border-emerald-600/50 font-mono flex items-center gap-1.5 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>PROTEGO ALLOWED</span>
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-950/70 text-rose-300 border border-rose-600/50 font-mono flex items-center gap-1.5 shadow-[0_0_10px_rgba(225,29,72,0.3)]">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>DARK ARTS BLOCKED</span>
            </span>
          )}

          {onInspectInEditor && (
            <button
              onClick={() => onInspectInEditor(request.rawRequest)}
              className="px-3 py-1 rounded-xl bg-gradient-to-r from-amber-600/40 to-amber-700/40 hover:from-amber-600 hover:to-amber-700 text-amber-200 hover:text-stone-950 border border-amber-400/50 text-xs font-cinzel font-semibold cursor-pointer transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>Analyze in Revelio</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Main Parchment-Inspired Result Surface */}
      <div
        className={`p-5 space-y-4 ${
          !isSuspicious
            ? 'parchment-panel text-stone-900 border-t border-amber-400/60'
            : 'bg-gradient-to-b from-[#22070d] via-[#140508] to-[#080d1a] text-amber-100 border-t border-rose-600/40'
        }`}
      >
        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Threat Classification */}
          <div className={`p-3.5 rounded-xl border ${
            !isSuspicious ? 'bg-white/60 border-amber-600/30' : 'bg-[#050811] border-stone-800'
          }`}>
            <span className="text-[10px] uppercase font-cinzel font-bold text-stone-500 block mb-1">
              Threat Classification
            </span>
            <span className={`font-cinzel text-sm font-bold block ${
              isSuspicious ? 'text-amber-300' : 'text-emerald-800'
            }`}>
              {request.threat}
            </span>
          </div>

          {/* Severity & Score */}
          <div className={`p-3.5 rounded-xl border ${
            !isSuspicious ? 'bg-white/60 border-amber-600/30' : 'bg-[#050811] border-stone-800'
          }`}>
            <span className="text-[10px] uppercase font-cinzel font-bold text-stone-500 block mb-1">
              Risk Score & Severity
            </span>
            <div className="flex items-center justify-between">
              <span className={`font-cinzel text-lg font-bold ${
                isSuspicious ? 'text-rose-400' : 'text-emerald-700'
              }`}>
                {verdict.riskScore} <span className="text-xs font-mono opacity-70">/ 100</span>
              </span>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                verdict.severity === 'CRITICAL'
                  ? 'bg-rose-950 text-rose-200 border border-rose-700/50'
                  : verdict.severity === 'HIGH'
                  ? 'bg-amber-950 text-amber-200 border border-amber-700/50'
                  : 'bg-emerald-100 text-emerald-900'
              }`}>
                {verdict.severity}
              </span>
            </div>
          </div>

          {/* Source IP & Timestamp */}
          <div className={`p-3.5 rounded-xl border ${
            !isSuspicious ? 'bg-white/60 border-amber-600/30' : 'bg-[#050811] border-stone-800'
          }`}>
            <span className="text-[10px] uppercase font-cinzel font-bold text-stone-500 block mb-1">
              Source Coordinates
            </span>
            <span className="font-mono text-xs font-semibold block text-stone-700 dark:text-stone-300">
              {request.sourceIp}
            </span>
            <span className="text-[10px] font-mono text-stone-500 block">
              Logged at {request.timestamp}
            </span>
          </div>
        </div>

        {/* Sentinel Guardian Assessment Callout */}
        <div className={`p-4 rounded-xl border flex items-start gap-3.5 ${
          !isSuspicious ? 'bg-white/70 border-amber-600/40' : 'bg-[#0a0f1d] border-amber-500/30'
        }`}>
          <img
            src={analystAvatar.img}
            alt={analystAvatar.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-amber-400/70 shadow-md shrink-0 mt-0.5"
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="font-cinzel text-sm font-bold text-stone-900 dark:text-amber-100">
                {analystAvatar.name}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-600/20 text-amber-800 dark:text-amber-300 border border-amber-500/30">
                {analystAvatar.role}
              </span>
            </div>
            <p className="font-parchment text-sm text-stone-800 dark:text-stone-300 leading-relaxed italic">
              &ldquo;{request.reason}&rdquo;
            </p>
          </div>
        </div>

        {/* Technical Token Architecture Toggle */}
        <div className="pt-1">
          <button
            onClick={() => setShowTokens(!showTokens)}
            className="text-xs font-cinzel font-bold flex items-center gap-1.5 cursor-pointer text-stone-700 dark:text-amber-300 hover:text-amber-400 transition-colors"
          >
            <span>{showTokens ? 'Hide Parsed HTTP Tokens' : 'Show Parsed HTTP Tokens'}</span>
            {showTokens ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showTokens && (
            <div className="mt-3 p-3.5 rounded-xl bg-[#050811] border border-stone-800 space-y-2 text-xs font-mono text-stone-300">
              <div className="flex gap-2">
                <span className="text-amber-400 font-bold">{parsed.method}</span>
                <span className="text-stone-100 break-all">{parsed.path}</span>
                <span className="text-stone-500">{parsed.protocol}</span>
              </div>
              {Object.keys(parsed.headers).length > 0 && (
                <div className="text-[11px] text-stone-400 border-t border-stone-800 pt-2 space-y-0.5">
                  <span className="text-[10px] font-cinzel uppercase text-amber-300 block">Headers:</span>
                  {Object.entries(parsed.headers).slice(0, 5).map(([k, v]) => (
                    <div key={k} className="truncate">
                      <span className="text-amber-400/80">{k}:</span> {v}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Raw Ingress Preview */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] uppercase font-cinzel font-bold text-stone-600 dark:text-stone-400 flex items-center gap-1.5">
              <Terminal className="w-3 h-3 text-amber-400" />
              <span>Raw HTTP Ingress Stream</span>
            </span>
            <button
              onClick={handleCopy}
              className="text-[11px] font-mono text-stone-500 hover:text-amber-300 flex items-center gap-1 cursor-pointer transition-colors"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Payload'}</span>
            </button>
          </div>
          <pre className="p-3.5 rounded-xl bg-[#04060d] border border-stone-800 text-[11px] font-mono text-amber-100/90 overflow-x-auto whitespace-pre-wrap max-h-40 selection:bg-amber-600/40">
            {request.rawRequest}
          </pre>
        </div>
      </div>
    </div>
  );
};
