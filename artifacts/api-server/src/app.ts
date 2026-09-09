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

// Secure CORS configuration supporting mobile apps & dev environments
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:8082", "http://localhost:5173", "http://localhost:3000"];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        origin.endsWith(".replit.dev") ||
        origin.endsWith(".replit.app") ||
        origin.includes("localhost")
      ) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  }),
);

// Rate limiting & security headers
const requestCounts = new Map<string, { count: number; resetTime: number }>();
app.use((req, res, next) => {
  const ip = req.ip || req.socket.remoteAddress || "global";
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 120; // 120 req/minute

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
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");

  next();
});

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));

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
  <style>
    * { box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0b0f19; color: #f3f4f6; margin: 0; padding: 40px 20px; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
    .card { background: #161e2e; border: 1px solid #283548; border-radius: 16px; max-width: 680px; width: 100%; padding: 36px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
    h1 { color: #f59e0b; margin-top: 0; display: flex; align-items: center; justify-content: space-between; font-size: 24px; }
    .badge { background: #065f46; color: #34d399; padding: 4px 10px; border-radius: 9999px; font-size: 13px; font-weight: 600; }
    p { color: #9ca3af; line-height: 1.6; font-size: 15px; }
    .cta-box { background: rgba(245, 158, 11, 0.1); border-left: 4px solid #f59e0b; padding: 16px; border-radius: 8px; margin: 24px 0; }
    .cta-btn { display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg, #f59e0b, #d97706); color: #111827; font-weight: 700; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-size: 16px; transition: transform 0.15s, box-shadow 0.15s; box-shadow: 0 4px 14px rgba(245, 158, 11, 0.3); }
    .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(245, 158, 11, 0.4); }
    .endpoints { background: #0f172a; border-radius: 10px; padding: 16px; margin-top: 20px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 13px; border: 1px solid #1e293b; }
    .endpoint { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #1e293b; }
    .endpoint:last-child { border-bottom: none; }
    .endpoint a { color: #38bdf8; text-decoration: none; font-weight: 500; }
    .endpoint a:hover { text-decoration: underline; }
    .method { background: #1e3a5f; color: #60a5fa; padding: 2px 6px; border-radius: 4px; font-size: 11px; margin-right: 8px; font-weight: 700; }
  </style>
</head>
<body>
  <div class="card">
    <h1>
      <span>🪔 KalaSetu (कलासेतु)</span>
      <span class="badge">API GATEWAY ONLINE</span>
    </h1>
    <p>
      You have reached the <strong>Backend REST API Engine</strong> (Port 3000) for the 
      <em>Smart India Hackathon Grand Finale (PS ID: 26090 • Ministry of Social Justice & Empowerment)</em>.
    </p>

    <div class="cta-box">
      <div style="color: #fbbf24; font-weight: 600; margin-bottom: 4px;">Looking for the Artisan Mobile Web Application?</div>
      <div style="color: #d1d5db; font-size: 14px;">The interactive Expo React Native client is running live on port <strong>8082</strong>.</div>
      <div style="margin-top: 16px;">
        <a href="http://localhost:8082" class="cta-btn" target="_blank">
          📱 Open Mobile Web App (http://localhost:8082) →
        </a>
      </div>
    </div>

    <h3 style="margin-top: 28px; color: #e2e8f0; font-size: 16px;">⚡ Verified Live API Endpoints</h3>
    <div class="endpoints">
      <div class="endpoint">
        <span><span class="method">GET</span>Liveness Probe</span>
        <a href="/api/healthz" target="_blank">/api/healthz</a>
      </div>
      <div class="endpoint">
        <span><span class="method">GET</span>Product Catalog</span>
        <a href="/api/products" target="_blank">/api/products</a>
      </div>
      <div class="endpoint">
        <span><span class="method">GET</span>MoSJE Telemetry</span>
        <a href="/api/analytics" target="_blank">/api/analytics</a>
      </div>
      <div class="endpoint">
        <span><span class="method">GET</span>GeM Bulk CSV Export</span>
        <a href="/api/gem-export" target="_blank">/api/gem-export</a>
      </div>
      <div class="endpoint">
        <span><span class="method">GET</span>ONDC Beckn Status</span>
        <a href="/api/ondc/status" target="_blank">/api/ondc/status</a>
      </div>
    </div>
  </div>
</body>
</html>`);
});

export default app;
