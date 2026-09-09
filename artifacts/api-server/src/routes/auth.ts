import { Router, type IRouter } from "express";
import { db, isDbConfigured, artisansTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const router: IRouter = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function getDataDir(): string {
  const candidates = [
    resolve(__dirname, "..", "..", "data"),
    resolve(__dirname, "..", "..", "..", "data"),
    resolve(process.cwd(), "artifacts", "data"),
    resolve(process.cwd(), "data"),
  ];
  for (const dir of candidates) {
    if (existsSync(dir)) return dir;
  }
  const fallback = resolve(process.cwd(), "artifacts", "data");
  try {
    mkdirSync(fallback, { recursive: true });
  } catch { /* ignore */ }
  return fallback;
}

const USERS_FILE = resolve(getDataDir(), "users.json");
const HISTORY_FILE = resolve(getDataDir(), "history.json");

export interface ArtisanUser {
  id: string;
  name: string;
  phone: string;
  state: string;
  district: string;
  craftCluster: string;
  socialCategory: string;
  udyamNumber?: string;
  pehchanId: string;
  aadhaarVerified: boolean;
  verifiedBy: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface ActivityHistoryEntry {
  id: string;
  userId: string;
  action: string;
  title: string;
  details: string;
  timestamp: string;
  category?: string;
  meta?: Record<string, any>;
}

function loadUsers(): ArtisanUser[] {
  try {
    if (existsSync(USERS_FILE)) {
      return JSON.parse(readFileSync(USERS_FILE, "utf-8"));
    }
  } catch (err) {
    console.warn("[Auth] Failed to read users.json:", err);
  }
  return [
    {
      id: "artisan_demo_01",
      name: "Radha Devi",
      phone: "+91 98765 43210",
      state: "Uttar Pradesh",
      district: "Varanasi",
      craftCluster: "Varanasi Handloom & Banarasi Silk",
      socialCategory: "SC Category • Master Weaver",
      udyamNumber: "UDYAM-UP-14-0028911",
      pehchanId: "KST-UP-2024-00142",
      aadhaarVerified: true,
      verifiedBy: "Ministry of Social Justice & Empowerment Cluster Cell",
      createdAt: new Date().toISOString(),
    },
  ];
}

function saveUsers(users: ArtisanUser[]) {
  try {
    writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
  } catch (err) {
    console.warn("[Auth] Failed to save users.json:", err);
  }
}

function loadHistory(): ActivityHistoryEntry[] {
  try {
    if (existsSync(HISTORY_FILE)) {
      return JSON.parse(readFileSync(HISTORY_FILE, "utf-8"));
    }
  } catch (err) {
    console.warn("[Auth] Failed to read history.json:", err);
  }
  return [];
}

function saveHistory(history: ActivityHistoryEntry[]) {
  try {
    writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2), "utf-8");
  } catch (err) {
    console.warn("[Auth] Failed to save history.json:", err);
  }
}

let activeUsers = loadUsers();
let currentArtisan: ArtisanUser = activeUsers[0] || {
  id: "artisan_demo_01",
  name: "Radha Devi",
  phone: "+91 98765 43210",
  state: "Uttar Pradesh",
  district: "Varanasi",
  craftCluster: "Varanasi Handloom & Banarasi Silk",
  socialCategory: "SC Category • Master Weaver",
  udyamNumber: "UDYAM-UP-14-0028911",
  pehchanId: "KST-UP-2024-00142",
  aadhaarVerified: true,
  verifiedBy: "Ministry of Social Justice & Empowerment Cluster Cell",
  createdAt: new Date().toISOString(),
};

// POST /api/auth/send-otp
router.post("/auth/send-otp", (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    res.status(400).json({ message: "Mobile number is required." });
    return;
  }
  res.json({
    message: "OTP sent successfully to registered mobile.",
    phone,
    demoOtp: "123456",
  });
});

// POST /api/auth/verify-otp
router.post("/auth/verify-otp", async (req, res) => {
  const { phone, otp } = req.body;
  if (otp !== "123456" && otp !== "000000") {
    res.status(401).json({ message: "Invalid OTP. For demo use 123456." });
    return;
  }

  const users = loadUsers();
  const matched = users.find((u) => u.phone === phone);
  if (matched) {
    currentArtisan = matched;
  } else {
    currentArtisan = {
      ...currentArtisan,
      phone: phone || currentArtisan.phone,
    };
  }

  res.json({
    token: `jwt_token_demo_${Date.now()}`,
    artisan: currentArtisan,
  });
});

// POST /api/auth/register
router.post("/auth/register", (req, res) => {
  const { name, phone, state = "Uttar Pradesh", district = "Varanasi", craftCluster = "Handloom Crafts", socialCategory = "General / Traditional Artisan" } = req.body;

  if (!name) {
    res.status(400).json({ message: "Name is required for artisan registration." });
    return;
  }

  const users = loadUsers();
  const stateCode = (state || "IN").slice(0, 2).toUpperCase();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const pehchanId = `KST-${stateCode}-2024-${randomSuffix}`;

  const newUser: ArtisanUser = {
    id: `artisan_${Date.now()}`,
    name,
    phone: phone || `+91 ${Math.floor(6000000000 + Math.random() * 3999999999)}`,
    state,
    district,
    craftCluster,
    socialCategory,
    udyamNumber: `UDYAM-${stateCode}-24-${Math.floor(1000000 + Math.random() * 8999999)}`,
    pehchanId,
    aadhaarVerified: true,
    verifiedBy: "Ministry of Social Justice & Empowerment (MoSJE)",
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);
  currentArtisan = newUser;

  // Record registration in history
  const history = loadHistory();
  history.unshift({
    id: `hist_${Date.now()}`,
    userId: newUser.id,
    action: "ACCOUNT_CREATED",
    title: `Artisan Account Registered: ${newUser.name}`,
    details: `Sovereign Pehchan ID issued (${pehchanId}) for cluster ${craftCluster}.`,
    timestamp: new Date().toISOString(),
    category: "Identity",
  });
  saveHistory(history);

  res.status(201).json({
    message: "Artisan account successfully created with Sovereign Pehchan ID.",
    token: `jwt_token_${newUser.id}`,
    artisan: newUser,
  });
});

// GET /api/auth/profile
router.get("/auth/profile", (_req, res) => {
  res.json(currentArtisan);
});

// POST /api/auth/profile
router.post("/auth/profile", async (req, res) => {
  const updates = req.body;
  currentArtisan = {
    ...currentArtisan,
    ...updates,
  };

  const users = loadUsers();
  const idx = users.findIndex((u) => u.id === currentArtisan.id);
  if (idx >= 0) {
    users[idx] = currentArtisan;
  } else {
    users.push(currentArtisan);
  }
  saveUsers(users);

  res.json(currentArtisan);
});

// GET /api/auth/users
router.get("/auth/users", (_req, res) => {
  const users = loadUsers();
  res.json({ users, currentId: currentArtisan.id });
});

// POST /api/auth/switch
router.post("/auth/switch", (req, res) => {
  const { userId } = req.body;
  const users = loadUsers();
  const found = users.find((u) => u.id === userId);
  if (found) {
    currentArtisan = found;
    res.json({ success: true, artisan: currentArtisan });
  } else {
    res.status(404).json({ message: "Artisan user not found." });
  }
});

// GET /api/history
router.get("/history", (req, res) => {
  const history = loadHistory();
  const { userId } = req.query;
  if (userId) {
    res.json(history.filter((h) => h.userId === userId));
  } else {
    res.json(history);
  }
});

// POST /api/history
router.post("/history", (req, res) => {
  const { action, title, details, category, meta } = req.body;
  if (!action || !title) {
    res.status(400).json({ message: "Action and title are required." });
    return;
  }

  const history = loadHistory();
  const newEntry: ActivityHistoryEntry = {
    id: `hist_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    userId: currentArtisan.id,
    action,
    title,
    details: details || "",
    timestamp: new Date().toISOString(),
    category: category || "General",
    meta: meta || {},
  };

  history.unshift(newEntry);
  // Keep last 100 entries
  if (history.length > 100) history.length = 100;
  saveHistory(history);

  res.status(201).json({ success: true, entry: newEntry });
});

export default router;
