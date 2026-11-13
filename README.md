# HOGWARTS SENTINEL 🛡️
> **Minimal HTTP Request Security Monitor**

A simple, minimal cybersecurity dashboard MVP designed for clear, direct HTTP ingress inspection. Built with React, Vite, Tailwind CSS, and Lucide React.

---

## 🎯 Architecture & Features

1. **Small Sidebar**:
   - Clean Hogwarts Sentinel brand icon with subtle purple/gold accents.
   - Quick navigation: **HTTP Requests** and **Inspect Payload**.
   - Flask API readiness indicator (`/api/inspect`).

2. **Simple Header ("HTTP Request Monitor")**:
   - **One Small Counter**: Real-time counts for **Total Requests** and **Suspicious Requests**.
   - **Test Custom Request** action button.

3. **Incoming HTTP Requests Table (Central Focus)**:
   - Full-width table displaying incoming requests:
     - Timestamp & Request ID
     - HTTP Method (`GET`, `POST`, `PUT`, `DELETE`)
     - Target Path
     - Source IP
     - Status badge (**`SAFE`** / **`SUSPICIOUS`**)
     - Detected Threat (`SQL Injection`, `XSS`, `Path Traversal`, `Command Injection`, or `None`)
   - Interactive row selection highlights and inspects the request immediately.
   - Built-in search and status filter.

4. **Threat Details Panel**:
   - Shows detected attack classification and plain-English detection reason for the selected request.
   - Source IP, timestamp, and raw HTTP payload preview with copy functionality.

5. **Python Flask Backend Readiness**:
   - [`src/services/scannerService.ts`](src/services/scannerService.ts) is modularized to easily swap the heuristic engine with `POST http://localhost:5000/api/inspect`.

---

## 🚀 Running the Project

```bash
cd hogwarts-sentinel
npm run dev
```

Visit [https://site-sentinel-s6dp.vercel.app/](https://site-sentinel-s6dp.vercel.app/).
