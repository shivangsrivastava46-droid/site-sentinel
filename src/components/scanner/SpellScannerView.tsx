import { useState } from 'react';
import type { FC } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  AlertOctagon, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Copy,
  Wand2,
  BookmarkPlus
} from 'lucide-react';
import { samplePresets } from '../../services/mockData';
import { inspectHttpRequest } from '../../services/scannerService';
import type { ThreatAnalysis, HttpRequestItem } from '../../types/security';
import { formatVerdict } from '../../utils/securityFormatters';

interface SpellScannerViewProps {
  onAddFinding: (item: HttpRequestItem) => void;
  totalInspected: number;
  threatsDetected: number;
  requestsAllowed: number;
}

const scanningIncantations = [
  'Examining the incoming request...',
  'Searching for forbidden patterns...',
  'Consulting the ancient defence spells...',
  'Channeling Protego shielding...',
];

export const SpellScannerView: FC<SpellScannerViewProps> = ({
  onAddFinding,
  totalInspected,
  threatsDetected,
  requestsAllowed,
}) => {
  const [input, setInput] = useState(samplePresets[0].raw);
  const [isScanning, setIsScanning] = useState(false);
  const [incantationIndex, setIncantationIndex] = useState(0);
  const [result, setResult] = useState<ThreatAnalysis | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleCastProtego = async () => {
    if (!input.trim() || isScanning) return;
    setIsScanning(true);
    setResult(null);
    setIsSaved(false);
    setIncantationIndex(0);

    const messageInterval = setInterval(() => {
      setIncantationIndex((prev) => (prev + 1) % scanningIncantations.length);
    }, 400);

    try {
      // Execute the genuine, untouched detection function
      const [analysis] = await Promise.all([
        inspectHttpRequest(input),
        new Promise((resolve) => setTimeout(resolve, 1400)), // Cinematic magical reveal
      ]);

      setResult(analysis);

      // Automatically register the real result into the session
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const newItem: HttpRequestItem = {
        id: `REQ-${Math.floor(Math.random() * 900 + 100)}`,
        timestamp: timeStr,
        method: (analysis.method as any) || 'POST',
        path: analysis.path || '/ingress',
        sourceIp: '127.0.0.1 (Ingress Gate)',
        status: analysis.status,
        threat: analysis.attackType,
        reason: analysis.reason,
        rawRequest: input,
        house: analysis.status === 'SAFE' ? 'gryffindor' : 'slytherin',
      };
      onAddFinding(newItem);
    } finally {
      clearInterval(messageInterval);
      setIsScanning(false);
    }
  };

  const handleCopyInput = () => {
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const verdict = result ? formatVerdict(result) : null;

  return (
    <div className="relative min-h-[calc(100vh-69px)] w-full py-10 px-4 flex flex-col items-center justify-between overflow-hidden">
      {/* Background: Platform 9¾ with warm lantern lighting and Hogwarts Express ambiance */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="/assets/platform-934.png"
          alt="Platform 9 3/4"
          className="w-full h-full object-cover object-center filter brightness-50 contrast-110 scale-105"
        />
        {/* Soft atmospheric overlay keeping the warm lantern glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060812] via-[#090e1c]/80 to-[#060812]/90" />
        <div className="absolute inset-0 bg-radial at-top from-amber-500/15 via-transparent to-transparent" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-3xl mx-auto flex-1 flex flex-col items-center justify-center">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-amber-100 tracking-wide candle-glow mb-2">
            Welcome to the Defence Against the Dark Arts
          </h2>
          <p className="font-parchment italic text-lg sm:text-xl text-amber-200/80">
            Your magical security centre is ready.
          </p>
        </div>

        {/* The Parchment-Style Scanner Panel */}
        <div className="w-full parchment-sheet rounded-2xl p-6 sm:p-8 relative overflow-hidden transition-all duration-300">
          {/* Wand Sweep Light during Scanning */}
          {isScanning && (
            <div className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-amber-300/40 to-transparent shadow-[0_0_25px_#f5c542] animate-wand-sweep pointer-events-none z-20" />
          )}

          {/* Panel Header */}
          <div className="flex items-center justify-between border-b border-[#c9a65a]/60 pb-3 mb-4">
            <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#3d2c18] tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#a67c2e]" />
              <span>Inspect an HTTP Request</span>
            </h3>

            {/* Presets: discreet magical incantations */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-parchment">
              <span className="text-[#6d512a] italic mr-1">Presets:</span>
              {samplePresets.slice(0, 4).map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInput(preset.raw);
                    setResult(null);
                  }}
                  className="px-2 py-0.5 rounded bg-[#ebd7af] hover:bg-[#dfc495] text-[#3a2814] border border-[#c49f55]/60 cursor-pointer transition-colors"
                >
                  {preset.label.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Scanning Animation State */}
          {isScanning ? (
            <div className="py-16 flex flex-col items-center justify-center text-center space-y-5">
              {/* Spinning glowing rune circle */}
              <div className="relative w-20 h-20 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#a67c2e] animate-spin" style={{ animationDuration: '8s' }} />
                <div className="absolute inset-2 rounded-full border border-[#c9a65a]/50" />
                <Wand2 className="w-8 h-8 text-[#a67c2e] animate-pulse" />
              </div>

              <div>
                <h4 className="font-cinzel text-lg font-bold text-[#2d1f10]">
                  Casting Protego Charm
                </h4>
                <p className="font-parchment italic text-lg text-[#6d512a] mt-1 transition-all">
                  &ldquo;{scanningIncantations[incantationIndex]}&rdquo;
                </p>
              </div>

              {/* Magical golden particle dots */}
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
                <span className="w-2 h-2 rounded-full bg-[#b89228] animate-ping" style={{ animationDelay: '0.2s' }} />
                <span className="w-2 h-2 rounded-full bg-[#a67c2e] animate-ping" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          ) : result && verdict ? (
            /* Threat Results: Antique Magical Letter / Scroll */
            <div className="space-y-4">
              {verdict.decision === 'ALLOWED' ? (
                /* PROTEGO SUCCESSFUL */
                <div className="p-6 rounded-xl bg-[#fffcf5] border-2 border-[#b89228] shadow-inner text-center space-y-4">
                  {/* Shield Illustration */}
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-b from-amber-200 to-amber-400 p-1 flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                    <ShieldCheck className="w-10 h-10 text-emerald-800" />
                  </div>

                  <div>
                    <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                      ALLOWED • SAFE INGRESS
                    </span>
                    <h4 className="font-cinzel text-2xl font-bold text-[#2d1f10] mt-2">
                      PROTEGO SUCCESSFUL
                    </h4>
                    <p className="font-parchment italic text-base text-[#4a351d] mt-2 max-w-lg mx-auto leading-relaxed">
                      &ldquo;{result.reason}&rdquo;
                    </p>
                  </div>
                </div>
              ) : (
                /* DARK MAGIC DETECTED (Rich burgundy and dark red accents) */
                <div className="p-6 rounded-xl bg-gradient-to-b from-[#2b0c14] to-[#16050a] border-2 border-rose-600/70 text-amber-50 shadow-[0_0_30px_rgba(180,20,40,0.4)] space-y-4">
                  <div className="flex items-start justify-between border-b border-rose-900/60 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-rose-950 border border-rose-500/50 flex items-center justify-center text-rose-400 shadow-sm shrink-0">
                        <AlertOctagon className="w-7 h-7 animate-pulse" />
                      </div>
                      <div>
                        <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-rose-300 bg-rose-950/80 px-2.5 py-0.5 rounded-full border border-rose-700/60">
                          CURSED INGRESS • BLOCKED
                        </span>
                        <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-rose-100 mt-1">
                          DARK MAGIC DETECTED
                        </h4>
                      </div>
                    </div>

                    <div className="text-right font-cinzel">
                      <span className="text-[10px] text-rose-300/80 block uppercase">Risk Score</span>
                      <span className="text-2xl font-bold text-rose-400">
                        {verdict.riskScore}<span className="text-xs font-mono opacity-70"> / 100</span>
                      </span>
                    </div>
                  </div>

                  {/* Threat Details */}
                  <div className="space-y-2 text-xs">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-cinzel font-bold text-amber-300">Threat Type:</span>
                      <span className="font-mono text-amber-100 bg-black/40 px-2 py-0.5 rounded border border-rose-900/40">
                        {result.attackType}
                      </span>
                      <span className="text-rose-400/80">•</span>
                      <span className="font-cinzel font-bold text-amber-300">Severity:</span>
                      <span className="font-mono font-bold text-rose-300">
                        {verdict.severity}
                      </span>
                    </div>

                    <p className="font-parchment text-base text-rose-100/90 leading-relaxed italic">
                      {result.reason}
                    </p>

                    {result.matchedVector && (
                      <div className="p-2.5 rounded-lg bg-black/50 border border-rose-700/50 font-mono text-xs text-rose-300 break-all">
                        <span className="text-amber-400 font-cinzel text-[11px] mr-2">Matched Detection Rule:</span>
                        <code>{result.matchedVector}</code>
                      </div>
                    )}

                    <div className="pt-2 text-xs font-parchment text-amber-200/80">
                      <strong className="font-cinzel text-amber-300">Recommended Action: </strong>
                      Banish this parameter payload from Citadel ingress gates. Sanitize incoming tokens.
                    </div>
                  </div>
                </div>
              )}

              {/* Collapsible: Reveal the Details */}
              <div className="pt-2">
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="font-cinzel text-xs font-bold text-[#4a351d] hover:text-[#2d1f10] flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <span>{showDetails ? 'Hide the Details' : 'Reveal the Details'}</span>
                  {showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {showDetails && (
                  <div className="mt-3 p-4 rounded-xl bg-[#231a0f] text-amber-100 text-xs font-mono space-y-2 border border-[#8b6b2c]/50 shadow-inner">
                    <div className="flex gap-2">
                      <span className="text-amber-400 font-bold">{result.method}</span>
                      <span className="text-stone-300 break-all">{result.path}</span>
                      <span className="text-stone-500">{result.protocol}</span>
                    </div>

                    {Object.keys(result.headers).length > 0 && (
                      <div className="border-t border-stone-800 pt-2 space-y-0.5 text-[11px]">
                        <span className="text-amber-400 font-cinzel block text-[10px]">Headers:</span>
                        {Object.entries(result.headers).map(([k, v]) => (
                          <div key={k} className="truncate text-stone-300">
                            <span className="text-amber-300/80">{k}:</span> {v}
                          </div>
                        ))}
                      </div>
                    )}

                    {result.body && (
                      <div className="border-t border-stone-800 pt-2">
                        <span className="text-amber-400 font-cinzel block text-[10px] mb-1">Body:</span>
                        <pre className="text-stone-300 text-[11px] whitespace-pre-wrap max-h-24 overflow-y-auto">
                          {result.body}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action buttons after result */}
              <div className="flex items-center justify-between pt-3 border-t border-[#c9a65a]/50">
                <button
                  onClick={() => setResult(null)}
                  className="font-cinzel text-xs font-bold text-[#4a351d] hover:text-[#2d1f10] cursor-pointer"
                >
                  ← Inspect Another Request
                </button>

                <button
                  onClick={() => setIsSaved(true)}
                  disabled={isSaved}
                  className="px-4 py-1.5 rounded-lg bg-[#3a2814] text-amber-200 hover:bg-[#281b0c] text-xs font-cinzel font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <BookmarkPlus className="w-3.5 h-3.5" />
                  <span>{isSaved ? 'Recorded in Findings' : 'Record Finding'}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Input State (Clean, Large Textarea & CAST PROTEGO button) */
            <div className="space-y-4">
              <div className="relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  rows={9}
                  spellCheck={false}
                  placeholder="Paste your HTTP request here..."
                  className="w-full p-4 bg-[#fcf9f2] border border-[#c49f55]/80 rounded-xl font-mono text-xs text-[#2b1f14] placeholder-[#8a6e45] focus:outline-none focus:ring-2 focus:ring-[#d4af37] resize-none leading-relaxed shadow-inner"
                />

                <button
                  onClick={handleCopyInput}
                  className="absolute top-3 right-3 text-[#7a5d33] hover:text-[#2d1f10] text-[11px] font-mono flex items-center gap-1 cursor-pointer transition-colors bg-[#f4e8cc] px-2 py-0.5 rounded border border-[#c49f55]/50"
                  title="Copy text"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-700" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* The One Prominent Button: CAST PROTEGO */}
              <div className="flex justify-center pt-2">
                <button
                  onClick={handleCastProtego}
                  disabled={!input.trim()}
                  className="btn-protego w-full sm:w-auto px-10 py-4 rounded-xl font-cinzel font-bold text-sm tracking-widest uppercase cursor-pointer flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  <Wand2 className="w-4 h-4 text-stone-900" />
                  <span>CAST PROTEGO</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Below it: ONLY three simple, elegant statistics */}
        <div className="w-full max-w-xl mx-auto mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="p-3 rounded-xl bg-[#090d18]/70 border border-amber-500/20 backdrop-blur-sm">
            <span className="font-cinzel text-2xl sm:text-3xl font-bold text-amber-200 block candle-glow">
              {totalInspected}
            </span>
            <span className="font-parchment italic text-xs sm:text-sm text-stone-300 block mt-0.5">
              Requests inspected
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#090d18]/70 border border-rose-500/20 backdrop-blur-sm">
            <span className="font-cinzel text-2xl sm:text-3xl font-bold text-rose-300 block">
              {threatsDetected}
            </span>
            <span className="font-parchment italic text-xs sm:text-sm text-stone-300 block mt-0.5">
              Threats detected
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#090d18]/70 border border-emerald-500/20 backdrop-blur-sm">
            <span className="font-cinzel text-2xl sm:text-3xl font-bold text-emerald-300 block">
              {requestsAllowed}
            </span>
            <span className="font-parchment italic text-xs sm:text-sm text-stone-300 block mt-0.5">
              Requests allowed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
