import type { ThreatAnalysis } from '../types/security';

/**
 * Parses raw HTTP text into structured tokens.
 */
export function parseRawHttpRequest(raw: string): {
  method: string;
  path: string;
  protocol: string;
  headers: Record<string, string>;
  body: string;
} {
  const trimmed = raw.trim();
  if (!trimmed) {
    return {
      method: 'GET',
      path: '/',
      protocol: 'HTTP/1.1',
      headers: {},
      body: '',
    };
  }

  const lines = trimmed.split(/\r?\n/);
  const firstLine = lines[0].trim();
  const parts = firstLine.split(/\s+/);

  let method = 'GET';
  let path = '/';
  let protocol = 'HTTP/1.1';

  if (parts.length >= 2) {
    method = parts[0].toUpperCase();
    path = parts[1];
    if (parts.length >= 3) {
      protocol = parts[2];
    }
  } else if (trimmed.startsWith('/') || trimmed.startsWith('http')) {
    path = trimmed;
  }

  const headers: Record<string, string> = {};
  let bodyStartIndex = -1;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === '') {
      bodyStartIndex = i + 1;
      break;
    }
    const colonPos = line.indexOf(':');
    if (colonPos !== -1) {
      headers[line.substring(0, colonPos).trim()] = line.substring(colonPos + 1).trim();
    }
  }

  let body = '';
  if (bodyStartIndex !== -1 && bodyStartIndex < lines.length) {
    body = lines.slice(bodyStartIndex).join('\n');
  }

  return { method, path, protocol, headers, body };
}

/**
 * Clean heuristic detection engine.
 * Modular and ready to be replaced with:
 * const res = await fetch('http://localhost:5000/api/inspect', { ... });
 */
export async function inspectHttpRequest(rawRequest: string): Promise<ThreatAnalysis> {
  const parsed = parseRawHttpRequest(rawRequest);
  const target = `${parsed.path} ${JSON.stringify(parsed.headers)} ${parsed.body}`.toLowerCase();

  // 1. SQL Injection
  const sqliMatch = target.match(/('|"|%27)\s*(or|and)\s*('1'='1|1=1|true|\w+=\w+)|union(\s+all)?\s+select|--|;\s*drop\s+table/i);
  if (sqliMatch) {
    return {
      isSuspicious: true,
      status: 'SUSPICIOUS',
      attackType: 'SQL Injection',
      reason: `Detected SQL injection pattern ('${sqliMatch[0]}') in query/body.`,
      matchedVector: sqliMatch[0],
      owaspCategory: 'A03:2021 - Injection',
      method: parsed.method,
      path: parsed.path,
      protocol: parsed.protocol,
      headers: parsed.headers,
      body: parsed.body,
    };
  }

  // 2. Cross-Site Scripting (XSS)
  const xssMatch = target.match(/<script[\s\S]*?>[\s\S]*?<\/script>|javascript:|onerror=|onload=|alert\(/i);
  if (xssMatch) {
    return {
      isSuspicious: true,
      status: 'SUSPICIOUS',
      attackType: 'Cross-Site Scripting (XSS)',
      reason: `Detected unescaped HTML/JavaScript payload ('${xssMatch[0]}').`,
      matchedVector: xssMatch[0],
      owaspCategory: 'A03:2021 - Injection (XSS)',
      method: parsed.method,
      path: parsed.path,
      protocol: parsed.protocol,
      headers: parsed.headers,
      body: parsed.body,
    };
  }

  // 3. Path Traversal
  const traversalMatch = target.match(/(\.\.\/|\.\.\\|%2e%2e%2f|\/etc\/passwd|\/etc\/shadow|c:\\windows)/i);
  if (traversalMatch) {
    return {
      isSuspicious: true,
      status: 'SUSPICIOUS',
      attackType: 'Path Traversal',
      reason: `Detected directory escape sequence ('${traversalMatch[0]}') targeting system paths.`,
      matchedVector: traversalMatch[0],
      owaspCategory: 'A01:2021 - Broken Access Control',
      method: parsed.method,
      path: parsed.path,
      protocol: parsed.protocol,
      headers: parsed.headers,
      body: parsed.body,
    };
  }

  // 4. Command Injection
  const cmdMatch = target.match(/(;\s*(cat|ls|whoami|id|bash|sh|powershell|curl|wget)\s+|\|\s*(cat|sh|bash))/i);
  if (cmdMatch) {
    return {
      isSuspicious: true,
      status: 'SUSPICIOUS',
      attackType: 'Command Injection',
      reason: `Detected operating system shell command delimiter ('${cmdMatch[0]}').`,
      matchedVector: cmdMatch[0],
      owaspCategory: 'A03:2021 - Injection (RCE)',
      method: parsed.method,
      path: parsed.path,
      protocol: parsed.protocol,
      headers: parsed.headers,
      body: parsed.body,
    };
  }

  // 5. Automated Scanner
  const scannerMatch = (parsed.headers['User-Agent'] || parsed.headers['user-agent'] || '').match(/(sqlmap|nikto|nmap|acunetix|nessus)/i);
  if (scannerMatch) {
    return {
      isSuspicious: true,
      status: 'SUSPICIOUS',
      attackType: 'Vulnerability Scanner',
      reason: `User-Agent signature matches automated security scanner ('${scannerMatch[0]}').`,
      matchedVector: scannerMatch[0],
      owaspCategory: 'A05:2021 - Security Misconfiguration',
      method: parsed.method,
      path: parsed.path,
      protocol: parsed.protocol,
      headers: parsed.headers,
      body: parsed.body,
    };
  }

  // Clean / Safe
  return {
    isSuspicious: false,
    status: 'SAFE',
    attackType: 'None',
    reason: 'Request conforms to normal protocol syntax. No malicious signatures detected.',
    owaspCategory: 'Legitimate Request',
    method: parsed.method,
    path: parsed.path,
    protocol: parsed.protocol,
    headers: parsed.headers,
    body: parsed.body,
  };
}
