import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

// ─────────────────────────────────────────────────────────────────────────────
// CORS — Wide open for demo (SIH environment has rotating origins)
// ─────────────────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: true, // Reflect any origin — safe for demo, judges use various devices
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"],
    credentials: true,
    maxAge: 86400, // Cache preflight for 24h
  }),
);

// Rate limiting & security headers
const requestCounts = new Map<string, { count: number; resetTime: number }>();
app.use((req, res, next) => {
  const ip = req.ip || req.socket.remoteAddress || "global";
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 300; // Higher limit for demo — judges + team testing simultaneously

  const record = requestCounts.get(ip);
  if (!record || now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + windowMs });
  } else {
    record.count++;
    if (record.count > maxRequests) {
      res.status(429).json({ message: "Rate limit exceeded. Please try again in 1 minute." });
      return;
    }
  }

  // Standard security headers
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN"); // Allow iframe embedding in demo dashboard
  res.setHeader("X-XSS-Protection", "1; mode=block");

  next();
});

// Support large image payloads for studio enhancement
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/api", router);

// Interactive Developer Portal & Gateway Landing Page
app.get("/", (_req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🪔 KalaSetu (कलासेतु) • API Gateway</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', -apple-system, sans-serif; background: linear-gradient(135deg, #0b0f19 0%, #1a1030 50%, #0b0f19 100%); color: #f3f4f6; min-height: 100vh; display: flex; justify-content: center; align-items: center; padding: 40px 20px; }
    .card { background: rgba(22, 30, 46, 0.85); backdrop-filter: blur(20px); border: 1px solid rgba(245, 166, 35, 0.15); border-radius: 20px; max-width: 720px; width: 100%; padding: 40px; box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(245, 166, 35, 0.05); }
    h1 { color: #f5a623; display: flex; align-items: center; justify-content: space-between; font-size: 26px; margin-bottom: 8px; }
    .badge { background: linear-gradient(135deg, #065f46, #047857); color: #34d399; padding: 6px 14px; border-radius: 9999px; font-size: 12px; font-weight: 600; letter-spacing: 0.5px; animation: pulse 2s infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
    .subtitle { color: #9ca3af; line-height: 1.6; font-size: 14px; margin-bottom: 24px; }
    .cta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 24px 0; }
    .cta-btn { display: flex; align-items: center; justify-content: center; gap: 8px; font-weight: 600; padding: 16px 20px; border-radius: 12px; text-decoration: none; font-size: 14px; transition: all 0.2s; border: none; cursor: pointer; }
    .cta-primary { background: linear-gradient(135deg, #f5a623, #d97706); color: #111827; box-shadow: 0 4px 14px rgba(245, 166, 35, 0.3); }
    .cta-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(245, 166, 35, 0.4); }
    .cta-secondary { background: rgba(99, 102, 241, 0.12); color: #a5b4fc; border: 1px solid rgba(99, 102, 241, 0.25); }
    .cta-secondary:hover { background: rgba(99, 102, 241, 0.2); transform: translateY(-1px); }
    h3 { margin-top: 28px; color: #e2e8f0; font-size: 15px; margin-bottom: 12px; }
    .endpoints { background: rgba(15, 23, 42, 0.7); border-radius: 12px; padding: 4px 16px; font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 12.5px; border: 1px solid rgba(30, 41, 59, 0.5); }
    .endpoint { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid rgba(30, 41, 59, 0.5); }
    .endpoint:last-child { border-bottom: none; }
    .endpoint a { color: #38bdf8; text-decoration: none; font-weight: 500; }
    .endpoint a:hover { text-decoration: underline; }
    .method { background: rgba(30, 58, 95, 0.6); color: #60a5fa; padding: 2px 8px; border-radius: 4px; font-size: 10px; margin-right: 8px; font-weight: 700; letter-spacing: 0.5px; }
    .method.post { background: rgba(95, 58, 30, 0.6); color: #fbbf24; }
    .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 20px 0; }
    .stat { text-align: center; padding: 16px; background: rgba(15, 23, 42, 0.5); border-radius: 12px; border: 1px solid rgba(30, 41, 59, 0.4); }
    .stat-value { font-size: 28px; font-weight: 700; background: linear-gradient(135deg, #f5a623, #ef4444); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .stat-label { font-size: 11px; color: #6b7280; margin-top: 4px; text-transform: uppercase; letter-spacing: 1px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>
      <span>🪔 KalaSetu (कलासेतु)</span>
      <span class="badge">● API ONLINE</span>
    </h1>
    <p class="subtitle">
      Backend REST API Engine (Port 3000) for <strong>Smart India Hackathon Grand Finale</strong><br>
      PS ID: 26090 • Ministry of Social Justice & Empowerment
    </p>

    <div class="stats">
      <div class="stat"><div class="stat-value">8</div><div class="stat-label">Craft Categories</div></div>
      <div class="stat"><div class="stat-value">8</div><div class="stat-label">Languages</div></div>
      <div class="stat"><div class="stat-value">4</div><div class="stat-label">Govt Schemes</div></div>
    </div>

    <div class="cta-grid">
      <a href="http://localhost:5173" class="cta-btn cta-primary" target="_blank">
        🖥️ Open Desktop Web App →
      </a>
      <a href="/api/products" class="cta-btn cta-secondary" target="_blank">
        📦 Browse Product API →
      </a>
    </div>

    <h3>⚡ Live API Endpoints</h3>
    <div class="endpoints">
      <div class="endpoint">
        <span><span class="method">GET</span>Health Check</span>
        <a href="/api/healthz" target="_blank">/api/healthz</a>
      </div>
      <div class="endpoint">
        <span><span class="method">GET</span>Product Catalog (8 crafts)</span>
        <a href="/api/products" target="_blank">/api/products</a>
      </div>
      <div class="endpoint">
        <span><span class="method">GET</span>MoSJE Impact Analytics</span>
        <a href="/api/analytics" target="_blank">/api/analytics</a>
      </div>
      <div class="endpoint">
        <span><span class="method post">POST</span>AI Catalog Generator</span>
        <span style="color: #6b7280">/api/catalog/generate</span>
      </div>
      <div class="endpoint">
        <span><span class="method post">POST</span>Studio Image Enhancer</span>
        <span style="color: #6b7280">/api/enhance-image</span>
      </div>
      <div class="endpoint">
        <span><span class="method post">POST</span>Voice Transcription (8 langs)</span>
        <span style="color: #6b7280">/api/transcribe</span>
      </div>
      <div class="endpoint">
        <span><span class="method">GET</span>ONDC Beckn Status</span>
        <a href="/api/ondc/status" target="_blank">/api/ondc/status</a>
      </div>
      <div class="endpoint">
        <span><span class="method">GET</span>GeM CSV Export</span>
        <a href="/api/gem-export" target="_blank">/api/gem-export</a>
      </div>
    </div>
  </div>
</body>
</html>`);
});

export default app;
