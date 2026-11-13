import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { 
  Play, 
  Trash2, 
  ShieldCheck, 
  AlertTriangle, 
  Terminal, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  FileText,
  Copy,
  Check,
  Send
} from 'lucide-react';
import { samplePresets } from '../../services/mockData';
import { inspectHttpRequest } from '../../services/scannerService';
import type { ThreatAnalysis, HttpRequestItem } from '../../types/security';
import { formatVerdict } from '../../utils/securityFormatters';

interface PayloadInspectorViewProps {
  initialRaw?: string;
  onAddRequestToTable: (item: HttpRequestItem) => void;
}

const scanStatusMessages = [
  'Incanting Revelio on HTTP packet stream...',
  'Dissecting URI query strings & parameter encodings...',
  'Analyzing headers & User-Agent signatures against Dark Arts...',
  'Consulting ancient Citadel Wards & Auror intelligence...',
  'Synthesizing final magical security verdict...',
];

export const PayloadInspectorView: FC<PayloadInspectorViewProps> = ({
  initialRaw,
  onAddRequestToTable,
}) => {
  const [input, setInput] = useState(initialRaw || samplePresets[0].raw);
  const [result, setResult] = useState<ThreatAnalysis | null>(null);
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [statusMessageIndex, setStatusMessageIndex] = useState(0);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(true);
  const [copied, setCopied] = useState(false);
  const [addedToTable, setAddedToTable] = useState(false);

  // Update input if initialRaw changes
  useEffect(() => {
    if (initialRaw) {
      setInput(initialRaw);
      setResult(null);
      setAddedToTable(false);
    }
  }, [initialRaw]);

  const handleInspect = async () => {
    if (!input.trim() || scanning) return;
    setScanning(true);
    setScanProgress(5);
    setStatusMessageIndex(0);
    setResult(null);
    setAddedToTable(false);

    // Progress and status messages animation loop
    const progressInterval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 90) return prev;
        const next = prev + Math.floor(Math.random() * 18 + 10);
        return next > 90 ? 90 : next;
      });
    }, 200);

    const messageInterval = setInterval(() => {
      setStatusMessageIndex((prev) => (prev + 1) % scanStatusMessages.length);
    }, 350);

    try {
      // Execute the genuine, untouched detection function
      const [analysis] = await Promise.all([
        inspectHttpRequest(input),
        new Promise((resolve) => setTimeout(resolve, 1400)), // Cinematic magical reveal duration
      ]);

      setScanProgress(100);
      setResult(analysis);
    } finally {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
      setScanning(false);
    }
  };

  const handleClear = () => {
    setInput('');
    setResult(null);
    setAddedToTable(false);
  };

  const handleCopyInput = () => {
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleAddToTable = () => {
    if (!result) return;
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    const newItem: HttpRequestItem = {
      id: `REQ-${Math.floor(Math.random() * 900 + 100)}`,
      timestamp: timeStr,
      method: (result.method as any) || 'POST',
      path: result.path || '/api/inspect',
      sourceIp: '127.0.0.1 (Local Sentinel)',
      status: result.status,
      threat: result.attackType,
      reason: result.reason,
      rawRequest: input,
      house: result.status === 'SAFE' ? 'gryffindor' : 'slytherin',
    };
    onAddRequestToTable(newItem);
    setAddedToTable(true);
  };

  const verdict = result ? formatVerdict(result) : null;

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* Title & Overview */}
      <div className="border-b border-amber-600/20 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-amber-100 flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-amber-400 animate-wand-pulse" />
            <span>Revelio Spell Scanner • Raw HTTP Inspector</span>
          </h2>
          <p className="font-parchment text-sm sm:text-base text-amber-200/80 mt-1">
            Incant the Revelio charm upon incoming HTTP payloads to expose hidden curses, SQL injections, and malicious scripts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs px-3 py-1 rounded-full bg-amber-950/40 border border-amber-500/30 text-amber-300">
            Real-Time Heuristic Engine
          </span>
        </div>
      </div>

      {/* Attack Presets */}
      <div className="p-3 rounded-xl bg-[#090e1a]/80 border border-amber-500/20 backdrop-blur-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-cinzel text-xs font-semibold text-amber-300/90 mr-2 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            Test Incantations / Presets:
          </span>
          {samplePresets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInput(preset.raw);
                setResult(null);
                setAddedToTable(false);
              }}
              className="px-3 py-1.5 rounded-lg bg-[#070b14] hover:bg-[#12192e] text-xs font-mono text-amber-200/90 border border-amber-500/30 hover:border-amber-400 transition-all cursor-pointer shadow-sm hover:shadow-[0_0_10px_rgba(212,175,55,0.2)]"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Two Column Layout: Editor & Verdict */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left: Input Textarea */}
        <div className="rounded-2xl bg-[#0a0f1d]/90 border border-amber-500/30 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.7)] flex flex-col">
          {/* Header */}
          <div className="px-4 py-3 border-b border-amber-500/20 bg-[#070b14] flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-amber-300">
              <Terminal className="w-4 h-4 text-amber-400" />
              <span className="font-cinzel font-semibold tracking-wide">Raw HTTP Request Terminal</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyInput}
                className="text-stone-400 hover:text-amber-300 flex items-center gap-1 transition-colors cursor-pointer"
                title="Copy input"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="text-[11px]">{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <span className="text-stone-600">|</span>
              <button
                onClick={handleClear}
                className="text-stone-400 hover:text-rose-400 flex items-center gap-1 transition-colors cursor-pointer"
                title="Clear input"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="text-[11px]">Clear</span>
              </button>
            </div>
          </div>

          {/* Textarea with subtle scanline animation during scanning */}
          <div className="p-4 relative">
            {scanning && (
              <div className="absolute inset-x-4 h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent shadow-[0_0_15px_#f59e0b] animate-scan-sweep pointer-events-none z-10" />
            )}
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={15}
              spellCheck={false}
              placeholder="Paste raw HTTP request here (e.g. GET /search?q=1... or POST /login...)"
              className="w-full p-4 bg-[#050811] border border-stone-800 rounded-xl text-xs font-mono text-amber-100 placeholder-stone-600 focus:outline-none focus:border-amber-400/80 resize-none leading-relaxed selection:bg-amber-600/40"
            />

            {/* Scan Action Bar */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="font-parchment italic text-xs text-stone-400">
                Supports raw HTTP headers, query strings, and request bodies.
              </span>

              <button
                onClick={handleInspect}
                disabled={!input.trim() || scanning}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-cinzel font-bold text-xs tracking-wider transition-all cursor-pointer disabled:opacity-50 shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.7)] flex items-center justify-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-current text-stone-950" />
                <span>{scanning ? 'Incanting Revelio...' : 'Cast Revelio Scan'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Inspection Verdict / Scanning State */}
        <div className="rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.7)] flex flex-col min-h-[460px]">
          {/* Scanning Animation State */}
          {scanning ? (
            <div className="p-8 bg-[#0a0f1d] border border-amber-500/40 rounded-2xl flex-1 flex flex-col items-center justify-center text-center space-y-6">
              {/* Spinning Magical Glyphs */}
              <div className="relative w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-amber-400/60 animate-shield-spin" />
                <div className="absolute inset-2 rounded-full border border-amber-500/30" />
                <Sparkles className="w-10 h-10 text-amber-300 animate-wand-pulse" />
              </div>

              <div>
                <h3 className="font-cinzel text-lg font-bold text-amber-100">
                  Casting Revelio Charm
                </h3>
                <p className="font-parchment italic text-base text-amber-300 mt-1 min-h-[28px] transition-all">
                  &ldquo;{scanStatusMessages[statusMessageIndex]}&rdquo;
                </p>
              </div>

              {/* Golden Progress Bar */}
              <div className="w-full max-w-md space-y-2">
                <div className="w-full h-2.5 bg-[#050811] rounded-full overflow-hidden border border-amber-500/40 p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 rounded-full transition-all duration-300 shadow-[0_0_12px_rgba(212,175,55,0.8)]"
                    style={{ width: `${scanProgress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-amber-400/80">
                  <span>Inscribing Analysis Runes...</span>
                  <span>{scanProgress}%</span>
                </div>
              </div>
            </div>
          ) : result && verdict ? (
            /* Results Presentation: Parchment Style with Magical Shield or Dark Magic Warning */
            <div className="space-y-4">
              {/* Main Result Card */}
              <div
                className={`rounded-2xl p-6 border transition-all ${
                  verdict.decision === 'ALLOWED'
                    ? 'parchment-panel text-stone-900 border-amber-500/80'
                    : 'bg-gradient-to-b from-[#24080e] via-[#160509] to-[#0a0f1d] border-rose-600/70 text-amber-50 shadow-[0_0_30px_rgba(180,20,40,0.3)]'
                }`}
              >
                {/* Decision Header */}
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-black/10 dark:border-rose-900/40">
                  <div className="flex items-center gap-3.5">
                    {verdict.decision === 'ALLOWED' ? (
                      /* Magical Shield for ALLOWED */
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 p-0.5 shadow-[0_0_25px_rgba(212,175,55,0.6)] shrink-0 flex items-center justify-center">
                        <div className="w-full h-full rounded-[14px] bg-[#fbf5e6] flex items-center justify-center">
                          <ShieldCheck className="w-8 h-8 text-emerald-700 animate-pulse" />
                        </div>
                      </div>
                    ) : (
                      /* Dark Magic Warning for FLAGGED / BLOCKED */
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-600 via-rose-700 to-red-950 p-0.5 shadow-[0_0_25px_rgba(225,29,72,0.6)] shrink-0 flex items-center justify-center">
                        <div className="w-full h-full rounded-[14px] bg-[#1a0509] flex items-center justify-center">
                          <AlertTriangle className="w-8 h-8 text-rose-400 animate-bounce" />
                        </div>
                      </div>
                    )}

                    <div>
                      <span
                        className={`font-mono text-[11px] font-bold tracking-wider px-2.5 py-0.5 rounded-full inline-block ${
                          verdict.decision === 'ALLOWED'
                            ? 'bg-emerald-800 text-emerald-100'
                            : 'bg-rose-900 text-rose-100 border border-rose-500/40'
                        }`}
                      >
                        {verdict.label}
                      </span>
                      <h3
                        className={`font-cinzel text-xl sm:text-2xl font-bold mt-1 ${
                          verdict.decision === 'ALLOWED' ? 'text-stone-900' : 'text-rose-100'
                        }`}
                      >
                        {verdict.decision === 'ALLOWED'
                          ? 'Protego Warded • Request Allowed'
                          : `Morsmordre: ${result.attackType} Detected`}
                      </h3>
                    </div>
                  </div>

                  {/* Risk Score Pill */}
                  <div className="text-right shrink-0">
                    <span
                      className={`text-[10px] font-mono uppercase block ${
                        verdict.decision === 'ALLOWED' ? 'text-stone-600' : 'text-rose-300/80'
                      }`}
                    >
                      Risk Assessment
                    </span>
                    <span
                      className={`font-cinzel text-2xl font-bold ${
                        verdict.decision === 'ALLOWED' ? 'text-emerald-700' : 'text-rose-400'
                      }`}
                    >
                      {verdict.riskScore}
                      <span className="text-xs font-mono opacity-70"> / 100</span>
                    </span>
                    <span
                      className={`text-[10px] font-mono block font-bold ${
                        verdict.severity === 'CRITICAL'
                          ? 'text-rose-400'
                          : verdict.severity === 'HIGH'
                          ? 'text-amber-400'
                          : 'text-emerald-700'
                      }`}
                    >
                      Severity: {verdict.severity}
                    </span>
                  </div>
                </div>

                {/* Threat Findings & Reason */}
                <div className="py-4 space-y-3">
                  <div>
                    <span
                      className={`text-[11px] font-cinzel font-bold uppercase tracking-wider block mb-1 ${
                        verdict.decision === 'ALLOWED' ? 'text-stone-700' : 'text-amber-300'
                      }`}
                    >
                      Sentinel Heuristic Findings:
                    </span>
                    <p
                      className={`font-parchment text-base leading-relaxed ${
                        verdict.decision === 'ALLOWED' ? 'text-stone-800' : 'text-rose-100/90'
                      }`}
                    >
                      {result.reason}
                    </p>
                  </div>

                  {/* Matched Injection Vector if any */}
                  {result.matchedVector && (
                    <div className="p-3 rounded-xl bg-black/40 border border-rose-500/50">
                      <span className="font-cinzel text-[11px] text-amber-300 block mb-1 font-bold">
                        Offending Ingress Token / Vector:
                      </span>
                      <code className="font-mono text-xs text-rose-300 break-all bg-black/60 px-2 py-1 rounded block">
                        {result.matchedVector}
                      </code>
                    </div>
                  )}

                  {/* OWASP Classification */}
                  {result.owaspCategory && (
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className={verdict.decision === 'ALLOWED' ? 'text-stone-600' : 'text-stone-400'}>
                        OWASP Classification:
                      </span>
                      <span
                        className={`font-semibold px-2 py-0.5 rounded ${
                          verdict.decision === 'ALLOWED'
                            ? 'bg-emerald-100 text-emerald-900'
                            : 'bg-rose-950/80 text-rose-300 border border-rose-800/50'
                        }`}
                      >
                        {result.owaspCategory}
                      </span>
                    </div>
                  )}
                </div>

                {/* Actions Bar */}
                <div className="pt-4 border-t border-black/10 dark:border-rose-900/40 flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
                    className={`text-xs font-cinzel font-bold flex items-center gap-1.5 cursor-pointer ${
                      verdict.decision === 'ALLOWED' ? 'text-stone-800 hover:text-stone-950' : 'text-amber-300 hover:text-amber-200'
                    }`}
                  >
                    <span>{showTechnicalDetails ? 'Hide Technical Details' : 'Expand Technical Details'}</span>
                    {showTechnicalDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={handleAddToTable}
                    disabled={addedToTable}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 cursor-pointer transition-all ${
                      addedToTable
                        ? 'bg-emerald-800 text-emerald-100 opacity-80 cursor-default'
                        : verdict.decision === 'ALLOWED'
                        ? 'bg-stone-900 hover:bg-stone-800 text-amber-200'
                        : 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                    }`}
                  >
                    {addedToTable ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                        <span>Recorded in Traffic Feed</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Record to Ingress Traffic Feed</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Expandable Technical Details Panel */}
              {showTechnicalDetails && (
                <div className="rounded-2xl bg-[#080d1a] border border-amber-500/30 p-5 space-y-4 shadow-xl">
                  <h4 className="font-cinzel text-xs font-bold text-amber-200 uppercase tracking-wider flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-amber-400" />
                    <span>Parsed Request Token Architecture</span>
                  </h4>

                  <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                    <div className="p-2.5 rounded-lg bg-[#050811] border border-stone-800">
                      <span className="text-[10px] text-stone-500 block uppercase">Method</span>
                      <span className="font-bold text-amber-300">{result.method}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#050811] border border-stone-800 col-span-2">
                      <span className="text-[10px] text-stone-500 block uppercase">Target Path</span>
                      <span className="font-bold text-amber-100 truncate block">{result.path}</span>
                    </div>
                  </div>

                  {/* Headers Map */}
                  <div>
                    <span className="text-[10px] font-mono text-stone-400 uppercase block mb-1.5">
                      Parsed Headers ({Object.keys(result.headers).length}):
                    </span>
                    <div className="max-h-36 overflow-y-auto rounded-lg bg-[#050811] border border-stone-800 p-2.5 text-[11px] font-mono space-y-1">
                      {Object.keys(result.headers).length === 0 ? (
                        <span className="text-stone-500 italic">No headers detected in request.</span>
                      ) : (
                        Object.entries(result.headers).map(([key, value]) => (
                          <div key={key} className="flex gap-2 text-stone-300">
                            <span className="text-amber-400/90 shrink-0">{key}:</span>
                            <span className="text-stone-300 break-all">{value}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Body preview if present */}
                  {result.body && (
                    <div>
                      <span className="text-[10px] font-mono text-stone-400 uppercase block mb-1.5">
                        Parsed Body:
                      </span>
                      <pre className="p-2.5 rounded-lg bg-[#050811] border border-stone-800 text-[11px] font-mono text-amber-100/90 whitespace-pre-wrap max-h-28 overflow-y-auto">
                        {result.body}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* Idle Awaiting Inspection State */
            <div className="p-12 bg-[#090e1a]/80 border border-dashed border-amber-500/30 rounded-2xl flex-1 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[#0f172a] border border-amber-500/30 flex items-center justify-center text-amber-400/70 shadow-inner">
                <Sparkles className="w-8 h-8 animate-pulse" />
              </div>
              <div className="max-w-sm">
                <h3 className="font-cinzel text-base font-bold text-amber-200">
                  Awaiting Revelio Invocation
                </h3>
                <p className="font-parchment text-sm text-stone-400 mt-1">
                  Input a raw HTTP stream on the left or select an attack preset, then cast the Revelio charm to detect dark hexes.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
