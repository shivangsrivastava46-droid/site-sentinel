import { useState } from 'react';
import type { FC } from 'react';
import { 
  X, 
  Play, 
  Trash2, 
  ShieldCheck, 
  AlertTriangle, 
  Sparkles, 
  FileText
} from 'lucide-react';
import { samplePresets } from '../../services/mockData';
import { inspectHttpRequest } from '../../services/scannerService';
import type { ThreatAnalysis, HttpRequestItem } from '../../types/security';
import { formatVerdict } from '../../utils/securityFormatters';

interface InspectRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRequest: (item: HttpRequestItem) => void;
  initialPayload?: string;
}

const scanMessages = [
  'Casting Revelio on packet...',
  'Checking OWASP Dark Arts signatures...',
  'Consulting Citadel wards...',
  'Rendering verdict...',
];

export const InspectRequestModal: FC<InspectRequestModalProps> = ({
  isOpen,
  onClose,
  onAddRequest,
  initialPayload,
}) => {
  const [input, setInput] = useState(initialPayload || samplePresets[0].raw);
  const [result, setResult] = useState<ThreatAnalysis | null>(null);
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);

  if (!isOpen) return null;

  const handleInspect = async () => {
    if (!input.trim() || scanning) return;
    setScanning(true);
    setScanProgress(10);
    setResult(null);

    const progressTimer = setInterval(() => {
      setScanProgress((prev) => (prev >= 90 ? prev : prev + 15));
    }, 180);

    const msgTimer = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % scanMessages.length);
    }, 300);

    try {
      const [res] = await Promise.all([
        inspectHttpRequest(input),
        new Promise((resolve) => setTimeout(resolve, 1100)),
      ]);
      setScanProgress(100);
      setResult(res);
    } finally {
      clearInterval(progressTimer);
      clearInterval(msgTimer);
      setScanning(false);
    }
  };

  const handleAddToMonitor = () => {
    if (!result) return;
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    const newItem: HttpRequestItem = {
      id: `REQ-${Math.floor(Math.random() * 900 + 100)}`,
      timestamp: timeStr,
      method: (result.method as any) || 'POST',
      path: result.path || '/api/inspect',
      sourceIp: '127.0.0.1 (Ingress Gate)',
      status: result.status,
      threat: result.attackType,
      reason: result.reason,
      rawRequest: input,
      house: result.status === 'SAFE' ? 'gryffindor' : 'slytherin',
    };
    onAddRequest(newItem);
    onClose();
  };

  const handleClear = () => {
    setInput('');
    setResult(null);
  };

  const verdict = result ? formatVerdict(result) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div 
        className="w-full max-w-2xl bg-[#090e1c] border-2 border-amber-500/40 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-amber-500/30 bg-[#060a14] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-400 animate-wand-pulse" />
            <span className="font-cinzel text-sm font-bold text-amber-100 tracking-wide">
              Revelio Ingress Packet Inspector
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-amber-200 hover:bg-stone-800/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 overflow-y-auto">
          {/* Quick Presets */}
          <div>
            <span className="font-cinzel text-[11px] font-semibold text-amber-300 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
              <FileText className="w-3 h-3 text-amber-400" />
              Quick Incantation Presets:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {samplePresets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInput(preset.raw);
                    setResult(null);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-[#050811] hover:bg-[#12192e] text-[11px] font-mono text-amber-200/90 border border-amber-500/30 hover:border-amber-400 cursor-pointer transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Textarea */}
          <div className="relative">
            {scanning && (
              <div className="absolute inset-x-2 h-0.5 bg-amber-400 shadow-[0_0_10px_#f59e0b] animate-scan-sweep pointer-events-none z-10" />
            )}
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={8}
              spellCheck={false}
              placeholder="Paste raw HTTP request stream..."
              className="w-full p-3.5 bg-[#050811] border border-stone-800 rounded-xl text-xs font-mono text-amber-100 placeholder-stone-600 focus:outline-none focus:border-amber-400/80 resize-none leading-relaxed"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={handleClear}
              className="px-3.5 py-2 rounded-xl bg-[#050811] hover:bg-rose-950/40 text-stone-400 hover:text-rose-300 border border-stone-800 text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>

            <button
              onClick={handleInspect}
              disabled={!input.trim() || scanning}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-cinzel font-bold text-xs tracking-wider transition-all cursor-pointer disabled:opacity-50 shadow-[0_0_15px_rgba(212,175,55,0.4)] flex items-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-current text-stone-950" />
              <span>{scanning ? 'Incanting...' : 'Cast Revelio Scan'}</span>
            </button>
          </div>

          {/* Scanning Progress state */}
          {scanning && (
            <div className="p-4 rounded-xl bg-[#050811] border border-amber-500/30 text-center space-y-2">
              <span className="font-parchment italic text-sm text-amber-300 block">
                &ldquo;{scanMessages[msgIndex]}&rdquo;
              </span>
              <div className="w-full h-1.5 bg-stone-900 rounded-full overflow-hidden border border-amber-500/30">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 transition-all duration-200"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Result view */}
          {result && verdict && (
            <div
              className={`p-4 rounded-xl border transition-all ${
                verdict.decision === 'ALLOWED'
                  ? 'parchment-panel text-stone-900 border-amber-500'
                  : 'bg-gradient-to-b from-[#24080e] to-[#0d0407] border-rose-600/60 text-amber-100'
              }`}
            >
              <div className="flex items-center justify-between pb-2 border-b border-black/10 dark:border-rose-900/40">
                <div className="flex items-center gap-2.5">
                  {verdict.decision === 'ALLOWED' ? (
                    <ShieldCheck className="w-6 h-6 text-emerald-700" />
                  ) : (
                    <AlertTriangle className="w-6 h-6 text-rose-400" />
                  )}
                  <div>
                    <span className="font-cinzel text-sm font-bold block">
                      {verdict.decision === 'ALLOWED' ? 'Warded by Protego (Allowed)' : `Curse Detected: ${result.attackType}`}
                    </span>
                    <span className="font-mono text-[10px] opacity-80 block">
                      Risk Score: {verdict.riskScore}/100 • Severity: {verdict.severity}
                    </span>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                    verdict.decision === 'ALLOWED'
                      ? 'bg-emerald-800 text-emerald-100'
                      : 'bg-rose-900 text-rose-100'
                  }`}
                >
                  {verdict.decision}
                </span>
              </div>

              <p className="mt-2 text-xs font-parchment leading-relaxed">
                {result.reason}
              </p>

              {result.matchedVector && (
                <div className="mt-2 p-2 rounded bg-black/40 border border-rose-500/40 font-mono text-xs text-rose-300">
                  <span className="text-amber-400 mr-2 font-cinzel text-[10px]">Vector:</span>
                  <code>{result.matchedVector}</code>
                </div>
              )}

              <div className="mt-3 pt-2.5 border-t border-black/10 dark:border-rose-900/40 flex justify-end">
                <button
                  onClick={handleAddToMonitor}
                  className="px-3.5 py-1.5 rounded-lg bg-stone-950 hover:bg-stone-800 text-amber-200 text-xs font-cinzel font-semibold cursor-pointer shadow-md transition-colors"
                >
                  Save to Traffic Monitor Feed
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
