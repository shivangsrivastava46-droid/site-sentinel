import type { HttpRequestItem } from '../types/security';

export const initialRequests: HttpRequestItem[] = [
  {
    id: 'REQ-101',
    timestamp: '17:28:14',
    method: 'POST',
    path: '/api/v1/auth/login',
    sourceIp: '185.220.101.44',
    status: 'SUSPICIOUS',
    threat: 'SQL Injection',
    reason: "Detected tautology `' OR '1'='1'` in login payload",
    house: 'gryffindor',
    rawRequest: `POST /api/v1/auth/login HTTP/1.1
Host: sentinel.hogwarts.local
User-Agent: Mozilla/5.0
Content-Type: application/json

{
  "username": "admin' OR '1'='1' --",
  "password": "password123"
}`,
  },
  {
    id: 'REQ-102',
    timestamp: '17:27:50',
    method: 'GET',
    path: '/search?query=<script>alert(1)</script>',
    sourceIp: '91.240.118.15',
    status: 'SUSPICIOUS',
    threat: 'Cross-Site Scripting (XSS)',
    reason: "Detected unescaped inline `<script>` in search query parameter",
    house: 'ravenclaw',
    rawRequest: `GET /search?query=%3Cscript%3Ealert(1)%3C/script%3E HTTP/1.1
Host: sentinel.hogwarts.local
User-Agent: Mozilla/5.0
Accept: text/html`,
  },
  {
    id: 'REQ-103',
    timestamp: '17:27:12',
    method: 'GET',
    path: '/api/v1/users/me',
    sourceIp: '192.168.1.104',
    status: 'SAFE',
    threat: 'None',
    reason: 'Normal authenticated user session request',
    house: 'gryffindor',
    rawRequest: `GET /api/v1/users/me HTTP/1.1
Host: sentinel.hogwarts.local
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
Accept: application/json`,
  },
  {
    id: 'REQ-104',
    timestamp: '17:26:40',
    method: 'GET',
    path: '/files?path=../../../../etc/passwd',
    sourceIp: '194.26.29.112',
    status: 'SUSPICIOUS',
    threat: 'Path Traversal',
    reason: "Detected relative directory escape sequence `../../` targeting `/etc/passwd`",
    house: 'slytherin',
    rawRequest: `GET /files?path=../../../../etc/passwd HTTP/1.1
Host: sentinel.hogwarts.local
User-Agent: curl/7.88.1
Accept: */*`,
  },
  {
    id: 'REQ-105',
    timestamp: '17:25:55',
    method: 'POST',
    path: '/api/v1/orders',
    sourceIp: '192.168.1.88',
    status: 'SAFE',
    threat: 'None',
    reason: 'Legitimate JSON order creation payload',
    house: 'hufflepuff',
    rawRequest: `POST /api/v1/orders HTTP/1.1
Host: sentinel.hogwarts.local
Content-Type: application/json

{
  "item_id": 42,
  "quantity": 1
}`,
  },
  {
    id: 'REQ-106',
    timestamp: '17:24:30',
    method: 'GET',
    path: '/api/v1/health',
    sourceIp: '10.0.0.12',
    status: 'SAFE',
    threat: 'None',
    reason: 'Internal cluster health check ping',
    house: 'ravenclaw',
    rawRequest: `GET /api/v1/health HTTP/1.1
Host: sentinel.hogwarts.local
User-Agent: Kube-Probe/1.28`,
  },
  {
    id: 'REQ-107',
    timestamp: '17:23:18',
    method: 'POST',
    path: '/tools/ping',
    sourceIp: '45.142.122.9',
    status: 'SUSPICIOUS',
    threat: 'Command Injection',
    reason: "Detected shell command chaining delimiter `; whoami`",
    house: 'slytherin',
    rawRequest: `POST /tools/ping HTTP/1.1
Host: sentinel.hogwarts.local
Content-Type: application/x-www-form-urlencoded

target=127.0.0.1; whoami`,
  },
  {
    id: 'REQ-108',
    timestamp: '17:22:05',
    method: 'GET',
    path: '/static/css/main.css',
    sourceIp: '192.168.1.150',
    status: 'SAFE',
    threat: 'None',
    reason: 'Static asset fetch',
    house: 'hufflepuff',
    rawRequest: `GET /static/css/main.css HTTP/1.1
Host: sentinel.hogwarts.local
Accept: text/css`,
  },
];

export const samplePresets = [
  {
    label: 'SQL Injection',
    raw: `POST /api/v1/auth/login HTTP/1.1
Host: sentinel.hogwarts.local
Content-Type: application/json

{
  "username": "admin' OR 1=1 --",
  "password": "any"
}`,
  },
  {
    label: 'XSS Attack',
    raw: `GET /search?q=%3Cscript%3Ealert(document.cookie)%3C/script%3E HTTP/1.1
Host: sentinel.hogwarts.local
User-Agent: Mozilla/5.0`,
  },
  {
    label: 'Path Traversal',
    raw: `GET /download?file=../../../../etc/shadow HTTP/1.1
Host: sentinel.hogwarts.local
Accept: */*`,
  },
  {
    label: 'Command Injection',
    raw: `POST /api/diagnostics HTTP/1.1
Host: sentinel.hogwarts.local
Content-Type: application/json

{
  "ip": "8.8.8.8; cat /etc/passwd"
}`,
  },
  {
    label: 'Safe GET Request',
    raw: `GET /api/v1/students?house=gryffindor HTTP/1.1
Host: sentinel.hogwarts.local
Authorization: Bearer token_abc123
Accept: application/json`,
  },
];
