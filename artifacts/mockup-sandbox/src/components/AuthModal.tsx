import { useState, useEffect } from "react";

export interface ArtisanProfile {
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
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserChanged: (user: ArtisanProfile) => void;
}

const DEMO_ARTISANS: ArtisanProfile[] = [
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
  },
  {
    id: "artisan_demo_02",
    name: "Rameshwar Prasad",
    phone: "+91 98765 43211",
    state: "Uttar Pradesh",
    district: "Gorakhpur",
    craftCluster: "Gorakhpur Terracotta & Earthen Pottery",
    socialCategory: "OBC Traditional Artisan",
    udyamNumber: "UDYAM-UP-18-0094123",
    pehchanId: "KST-UP-2024-00189",
    aadhaarVerified: true,
    verifiedBy: "National Craft Board",
  },
  {
    id: "artisan_demo_03",
    name: "Sunita Devi",
    phone: "+91 98765 43212",
    state: "Bihar",
    district: "Madhubani",
    craftCluster: "Mithila Painting & Natural Pigments",
    socialCategory: "Women Self-Help Group (SHG)",
    udyamNumber: "UDYAM-BR-08-0033190",
    pehchanId: "KST-BR-2024-00215",
    aadhaarVerified: true,
    verifiedBy: "Ministry of Textiles",
  },
  {
    id: "artisan_demo_04",
    name: "Meera Rathore",
    phone: "+91 98765 43213",
    state: "Rajasthan",
    district: "Jaipur",
    craftCluster: "Sanganer Block Print & Dabu Indigo",
    socialCategory: "Traditional Craft Guild",
    udyamNumber: "UDYAM-RJ-12-0056789",
    pehchanId: "KST-RJ-2024-00342",
    aadhaarVerified: true,
    verifiedBy: "All India Handicrafts Board",
  },
];

export default function AuthModal({ isOpen, onClose, onUserChanged }: AuthModalProps) {
  const [mode, setMode] = useState<"switch" | "create">("create");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("Uttar Pradesh");
  const [district, setDistrict] = useState("Varanasi");
  const [craftCluster, setCraftCluster] = useState("Handloom Textiles");
  const [socialCategory, setSocialCategory] = useState("SC / ST Artisan Collective");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setIsSubmitting(true);

    const stateCode = (state || "IN").slice(0, 2).toUpperCase();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const pehchanId = `KST-${stateCode}-2024-${randomSuffix}`;

    const newArtisan: ArtisanProfile = {
      id: `user_${Date.now()}`,
      name: name.trim(),
      phone: phone || "+91 98765 00000",
      state,
      district: district || state,
      craftCluster,
      socialCategory,
      udyamNumber: `UDYAM-${stateCode}-24-${Math.floor(1000000 + Math.random() * 8999999)}`,
      pehchanId,
      aadhaarVerified: true,
      verifiedBy: "Ministry of Social Justice & Empowerment (MoSJE)",
    };

    // Try syncing with backend
    try {
      await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newArtisan),
      });
    } catch {
      // Offline fallback
    }

    // Save in localStorage
    localStorage.setItem("kalasetu_current_user", JSON.stringify(newArtisan));
    onUserChanged(newArtisan);
    setIsSubmitting(false);
    onClose();
  };

  const handleSwitch = async (artisan: ArtisanProfile) => {
    try {
      await fetch("/api/auth/switch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: artisan.id }),
      });
    } catch {
      // Offline fallback
    }
    localStorage.setItem("kalasetu_current_user", JSON.stringify(artisan));
    onUserChanged(artisan);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl flex flex-col gap-5 relative animate-fadeIn border border-surface-container max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-container transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-2xl">badge</span>
          </div>
          <div className="flex flex-col">
            <h3 className="font-headline-sm text-lg sm:text-xl text-on-surface font-bold">
              {mode === "create" ? "Create Artisan Account" : "Switch Demo Account"}
            </h3>
            <span className="font-body-sm text-xs text-on-surface-variant">
              Instant Sovereign Pehchan ID &amp; ONDC Network Registration
            </span>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center bg-surface-container-low p-1 rounded-full border border-surface-container">
          <button
            onClick={() => setMode("create")}
            className={`flex-1 py-1.5 rounded-full font-label-sm text-xs font-semibold transition-all cursor-pointer ${
              mode === "create"
                ? "bg-primary-container text-on-primary-container shadow-sm"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            + Register New Artisan
          </button>
          <button
            onClick={() => setMode("switch")}
            className={`flex-1 py-1.5 rounded-full font-label-sm text-xs font-semibold transition-all cursor-pointer ${
              mode === "switch"
                ? "bg-primary-container text-on-primary-container shadow-sm"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Switch Existing Profile
          </button>
        </div>

        {mode === "create" ? (
          <form onSubmit={handleCreate} className="flex flex-col gap-3.5 text-xs sm:text-sm">
            <div>
              <label className="font-semibold text-on-surface block mb-1">
                Full Name / कारीगर का नाम *
              </label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Kavita Devi / Ramesh Kumar"
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-on-surface block mb-1">
                  State / राज्य *
                </label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-on-surface focus:outline-none"
                >
                  <option>Uttar Pradesh</option>
                  <option>Rajasthan</option>
                  <option>Bihar</option>
                  <option>West Bengal</option>
                  <option>Gujarat</option>
                  <option>Madhya Pradesh</option>
                  <option>Tamil Nadu</option>
                  <option>Karnataka</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-on-surface block mb-1">
                  District / Cluster *
                </label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="e.g. Varanasi / Jaipur / Madhubani"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-on-surface focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-on-surface block mb-1">
                Craft Specialty / शिल्प प्रकार *
              </label>
              <select
                value={craftCluster}
                onChange={(e) => setCraftCluster(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-on-surface focus:outline-none"
              >
                <option>Handloom &amp; Banarasi Silk Textiles</option>
                <option>Terracotta Pottery &amp; Earthen Crafts</option>
                <option>Mithila Madhubani Folk Painting</option>
                <option>Saharanpur Woodcarving &amp; Brass Inlay</option>
                <option>Jaipur Blue Pottery &amp; Ceramics</option>
                <option>Sanganeri Hand Block Printing</option>
                <option>Moradabad Brass Artware</option>
                <option>Bengal Jute &amp; Golden Fiber Craft</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-on-surface block mb-1">
                Social Category / श्रेणी
              </label>
              <select
                value={socialCategory}
                onChange={(e) => setSocialCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-on-surface focus:outline-none"
              >
                <option>SC / ST Artisan Collective</option>
                <option>Women Self-Help Group (SHG)</option>
                <option>OBC Traditional Master Craftsman</option>
                <option>Divyangjan Artisan Guild</option>
                <option>General Traditional Artisan</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-on-surface block mb-1">
                Phone Number / मोबाइल नंबर
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-surface-container text-on-surface focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full py-3.5 rounded-full bg-gradient-to-r from-primary-container to-secondary text-white font-label-md font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined">how_to_reg</span>
              <span>{isSubmitting ? "Issuing Pehchan ID..." : "Register & Issue Sovereign Pehchan ID"}</span>
            </button>
          </form>
        ) : (
          <div className="flex flex-col gap-2.5">
            <span className="font-label-sm text-xs text-on-surface-variant font-semibold">
              Select one of the verified master artisan accounts to test:
            </span>
            {DEMO_ARTISANS.map((artisan) => (
              <div
                key={artisan.id}
                onClick={() => handleSwitch(artisan)}
                className="flex items-center justify-between p-3 rounded-2xl bg-surface-container-low hover:bg-surface-container border border-surface-container cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-container/30 text-primary flex items-center justify-center font-bold font-headline-sm text-sm">
                    {artisan.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-md text-xs sm:text-sm text-on-surface font-bold">
                      {artisan.name}
                    </span>
                    <span className="text-[11px] text-on-surface-variant">
                      {artisan.craftCluster} • {artisan.state}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-code-sm font-bold text-tertiary">
                    {artisan.pehchanId}
                  </span>
                  <span className="text-[10px] text-secondary font-semibold">
                    {artisan.socialCategory.split("•")[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
