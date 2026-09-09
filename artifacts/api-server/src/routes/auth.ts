import { Router, type IRouter } from "express";
import { db, isDbConfigured, artisansTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

let currentArtisan = {
  id: "artisan_demo_01",
  phone: "+91 98765 43210",
  name: "Kavita Devi",
  state: "Rajasthan",
  district: "Jaipur",
  craftCluster: "Sanganer Handblock & Natural Indigo",
  socialCategory: "SC/ST Traditional Artisan",
  udyamNumber: "UDYAM-RJ-14-0028911",
  pehchanId: "PEHCHAN-TEX-2024-8842",
  aadhaarVerified: true,
  verifiedBy: "Ministry of Social Justice & Empowerment Cluster Cell",
};

// POST /auth/send-otp
router.post("/auth/send-otp", (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    res.status(400).json({ message: "Mobile number is required." });
    return;
  }

  // Demo OTP is 123456 for instant testing and live jury presentations
  res.json({
    message: "OTP sent successfully to registered mobile.",
    phone,
    demoOtp: "123456",
  });
});

// POST /auth/verify-otp
router.post("/auth/verify-otp", async (req, res) => {
  const { phone, otp } = req.body;

  if (otp !== "123456" && otp !== "000000") {
    res.status(401).json({ message: "Invalid OTP. For demo use 123456." });
    return;
  }

  if (isDbConfigured) {
    try {
      const existing = await db.select().from(artisansTable).where(eq(artisansTable.phone, phone)).limit(1);
      if (existing.length > 0) {
        res.json({
          token: `jwt_token_${Date.now()}`,
          artisan: existing[0],
        });
        return;
      }
    } catch (err) {
      console.warn("[Auth] DB lookup error:", err);
    }
  }

  res.json({
    token: `jwt_token_demo_${Date.now()}`,
    artisan: {
      ...currentArtisan,
      phone: phone || currentArtisan.phone,
    },
  });
});

// GET /auth/profile
router.get("/auth/profile", (_req, res) => {
  res.json(currentArtisan);
});

// POST /auth/profile
router.post("/auth/profile", async (req, res) => {
  const updates = req.body;
  currentArtisan = {
    ...currentArtisan,
    ...updates,
  };

  if (isDbConfigured) {
    try {
      await db
        .insert(artisansTable)
        .values({
          id: currentArtisan.id,
          phone: currentArtisan.phone,
          name: currentArtisan.name,
          state: currentArtisan.state,
          district: currentArtisan.district,
          craftCluster: currentArtisan.craftCluster,
          socialCategory: currentArtisan.socialCategory,
          udyamNumber: currentArtisan.udyamNumber,
          pehchanId: currentArtisan.pehchanId,
          aadhaarVerified: currentArtisan.aadhaarVerified,
        })
        .onConflictDoUpdate({
          target: artisansTable.id,
          set: {
            name: currentArtisan.name,
            state: currentArtisan.state,
            district: currentArtisan.district,
            craftCluster: currentArtisan.craftCluster,
            socialCategory: currentArtisan.socialCategory,
            udyamNumber: currentArtisan.udyamNumber,
            pehchanId: currentArtisan.pehchanId,
          },
        });
    } catch (err) {
      console.warn("[Auth] DB update error:", err);
    }
  }

  res.json({
    message: "Artisan profile updated successfully",
    artisan: currentArtisan,
  });
});

export default router;
