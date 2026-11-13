import type { ThreatAnalysis, HttpRequestItem } from '../types/security';

export interface DisplayVerdict {
  decision: 'ALLOWED' | 'BLOCKED' | 'FLAGGED';
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'NONE';
  riskScore: number;
  label: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
}

export function formatVerdict(analysis: ThreatAnalysis | HttpRequestItem): DisplayVerdict {
  const isSuspicious = 'isSuspicious' in analysis ? analysis.isSuspicious : analysis.status === 'SUSPICIOUS';
  const threat = 'attackType' in analysis ? analysis.attackType : analysis.threat;

  if (!isSuspicious || threat === 'None') {
    return {
      decision: 'ALLOWED',
      severity: 'NONE',
      riskScore: 0,
      label: 'ALLOWED • WARDED BY PROTEGO',
      colorClass: 'text-amber-300',
      bgClass: 'bg-emerald-950/40',
      borderClass: 'border-emerald-600/40',
    };
  }

  const t = (threat || '').toLowerCase();

  if (t.includes('command')) {
    return {
      decision: 'BLOCKED',
      severity: 'CRITICAL',
      riskScore: 98,
      label: 'BLOCKED • DARK INCANTATION RCE',
      colorClass: 'text-rose-400',
      bgClass: 'bg-rose-950/60',
      borderClass: 'border-rose-600/60',
    };
  }

  if (t.includes('sql')) {
    return {
      decision: 'BLOCKED',
      severity: 'CRITICAL',
      riskScore: 96,
      label: 'BLOCKED • CURSE OF TAUTOLOGY SQLi',
      colorClass: 'text-rose-400',
      bgClass: 'bg-rose-950/60',
      borderClass: 'border-rose-600/60',
    };
  }

  if (t.includes('xss') || t.includes('script')) {
    return {
      decision: 'BLOCKED',
      severity: 'HIGH',
      riskScore: 88,
      label: 'BLOCKED • HEX OF MALICIOUS SCRIPT XSS',
      colorClass: 'text-amber-400',
      bgClass: 'bg-amber-950/50',
      borderClass: 'border-amber-600/50',
    };
  }

  if (t.includes('traversal') || t.includes('path')) {
    return {
      decision: 'BLOCKED',
      severity: 'HIGH',
      riskScore: 84,
      label: 'BLOCKED • FORBIDDEN PATH TRAVERSAL',
      colorClass: 'text-amber-400',
      bgClass: 'bg-amber-950/50',
      borderClass: 'border-amber-600/50',
    };
  }

  return {
    decision: 'FLAGGED',
    severity: 'MEDIUM',
    riskScore: 72,
    label: 'FLAGGED • AUTOMATED DARK PROBE',
    colorClass: 'text-yellow-400',
    bgClass: 'bg-yellow-950/50',
    borderClass: 'border-yellow-600/50',
  };
}
