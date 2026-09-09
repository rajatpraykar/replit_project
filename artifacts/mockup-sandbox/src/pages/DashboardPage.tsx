import { useState, useEffect } from "react";

interface DashboardPageProps {
  lang: "en" | "hi";
}

const API_BASE = "/api";

export default function DashboardPage({ lang }: DashboardPageProps) {
  const t = (en: string, hi: string) => (lang === "en" ? en : hi);
  const [profile, setProfile] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [ondcStatus, setOndcStatus] = useState<any>(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [profileRes, productsRes, inquiriesRes, ondcRes] = await Promise.allSettled([
        fetch(`${API_BASE}/auth/profile`).then((r) => r.json()),
        fetch(`${API_BASE}/products`).then((r) => r.json()),
        fetch(`${API_BASE}/inquiries`).then((r) => r.json()),
        fetch(`${API_BASE}/ondc/status`).then((r) => r.json()),
      ]);
      if (profileRes.status === "fulfilled") setProfile(profileRes.value);
      if (productsRes.status === "fulfilled") setProducts(productsRes.value);
      if (inquiriesRes.status === "fulfilled") setInquiries(inquiriesRes.value);
      if (ondcRes.status === "fulfilled") setOndcStatus(ondcRes.value);
    } catch {
      // Set demo defaults
      setProfile({
        name: "Kavita Devi", state: "Rajasthan", district: "Jaipur",
        craftCluster: "Sanganer Handblock", socialCategory: "SC/ST Artisan",
        pehchanId: "PEHCHAN-TEX-2024-8842", aadhaarVerified: true,
      });
    }
  };

  return (
    <div style={{ maxWidth: "var(--content-max)", margin: "0 auto", padding: "40px 24px" }}>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, marginBottom: "8px" }}>
          📊 <span className="text-gradient">{t("Artisan Dashboard", "कारीगर डैशबोर्ड")}</span>
        </h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "20px" }}>
        {/* ═══ Artisan Profile Card ═══ */}
        <div className="card">
          <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px", color: "var(--saffron)" }}>
            👨‍🎨 {t("Artisan Profile", "कारीगर प्रोफ़ाइल")}
          </h3>
          {profile ? (
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                <div style={{
                  width: "56px", height: "56px", borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--saffron), var(--terracotta))",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "24px", fontWeight: 700, color: "#111",
                }}>
                  {profile.name?.[0] || "K"}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "18px" }}>{profile.name}</div>
                  <div style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>
                    {profile.craftCluster} • {profile.district}, {profile.state}
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gap: "8px", fontSize: "13px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
                  <span style={{ color: "var(--text-tertiary)" }}>{t("Social Category", "सामाजिक श्रेणी")}</span>
                  <span className="badge badge-warning">{profile.socialCategory}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
                  <span style={{ color: "var(--text-tertiary)" }}>{t("Pehchan ID", "पहचान ID")}</span>
                  <span className="mono" style={{ color: "var(--text-info)", fontSize: "12px" }}>{profile.pehchanId}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
                  <span style={{ color: "var(--text-tertiary)" }}>{t("Aadhaar Verified", "आधार सत्यापित")}</span>
                  <span className="badge badge-success">{profile.aadhaarVerified ? "✓ Verified" : "Pending"}</span>
                </div>
              </div>
            </div>
          ) : (
            <p style={{ color: "var(--text-tertiary)" }}>{t("Loading profile...", "प्रोफ़ाइल लोड हो रही है...")}</p>
          )}
        </div>

        {/* ═══ ONDC Status ═══ */}
        <div className="card">
          <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px", color: "var(--saffron)" }}>
            🔗 {t("ONDC Network Status", "ONDC नेटवर्क स्थिति")}
          </h3>
          {ondcStatus ? (
            <div style={{ display: "grid", gap: "8px", fontSize: "13px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
                <span style={{ color: "var(--text-tertiary)" }}>Status</span>
                <span className="badge badge-success animate-pulse-glow">● {ondcStatus.status}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
                <span style={{ color: "var(--text-tertiary)" }}>Beckn Version</span>
                <span className="mono" style={{ color: "var(--text-info)" }}>{ondcStatus.becknVersion}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
                <span style={{ color: "var(--text-tertiary)" }}>Domain</span>
                <span style={{ fontSize: "12px" }}>{ondcStatus.networkDomain}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
                <span style={{ color: "var(--text-tertiary)" }}>Artisans Online</span>
                <span style={{ fontWeight: 600, color: "var(--saffron)" }}>{ondcStatus.verifiedArtisansOnboarded?.toLocaleString()}</span>
              </div>
            </div>
          ) : (
            <p style={{ color: "var(--text-tertiary)" }}>{t("Connecting to ONDC...", "ONDC से कनेक्ट हो रहा है...")}</p>
          )}
        </div>

        {/* ═══ My Products ═══ */}
        <div className="card" style={{ gridColumn: "1 / -1" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--saffron)" }}>
              📦 {t("My Products", "मेरे उत्पाद")} ({products.length})
            </h3>
            <button className="btn btn-primary btn-sm" onClick={() => window.location.hash = "studio"}>
              ➕ {t("Add Product", "उत्पाद जोड़ें")}
            </button>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--text-tertiary)", fontWeight: 500 }}>{t("Product", "उत्पाद")}</th>
                  <th style={{ textAlign: "left", padding: "10px 12px", color: "var(--text-tertiary)", fontWeight: 500 }}>{t("Category", "श्रेणी")}</th>
                  <th style={{ textAlign: "right", padding: "10px 12px", color: "var(--text-tertiary)", fontWeight: 500 }}>{t("Price", "मूल्य")}</th>
                  <th style={{ textAlign: "right", padding: "10px 12px", color: "var(--text-tertiary)", fontWeight: 500 }}>{t("Views", "दृश्य")}</th>
                  <th style={{ textAlign: "center", padding: "10px 12px", color: "var(--text-tertiary)", fontWeight: 500 }}>{t("Status", "स्थिति")}</th>
                </tr>
              </thead>
              <tbody>
                {products.slice(0, 8).map((p) => (
                  <tr key={p.id} style={{ borderBottom: "1px solid rgba(30,41,59,0.3)" }}>
                    <td style={{ padding: "12px" }}>
                      <div style={{ fontWeight: 500 }}>{p.name}</div>
                      <div className="hindi" style={{ fontSize: "11px", color: "var(--text-tertiary)" }}>{p.nameHindi}</div>
                    </td>
                    <td style={{ padding: "12px", color: "var(--text-secondary)" }}>{p.craftCategory}</td>
                    <td style={{ padding: "12px", textAlign: "right", fontWeight: 600, color: "var(--saffron)" }}>₹{p.price}</td>
                    <td style={{ padding: "12px", textAlign: "right", color: "var(--text-tertiary)" }}>{p.views}</td>
                    <td style={{ padding: "12px", textAlign: "center" }}>
                      <span className="badge badge-success">{p.status || "Published"}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ═══ Recent Inquiries ═══ */}
        <div className="card" style={{ gridColumn: "1 / -1" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px", color: "var(--saffron)" }}>
            💬 {t("B2B Inquiries", "B2B पूछताछ")} ({inquiries.length})
          </h3>
          {inquiries.length > 0 ? (
            <div style={{ display: "grid", gap: "12px" }}>
              {inquiries.map((inq, i) => (
                <div key={i} className="card-flat" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                  <div>
                    <div style={{ fontWeight: 500 }}>{inq.buyerName}</div>
                    <div style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>{inq.buyerOrg} • Qty: {inq.quantity}</div>
                    <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>"{inq.message}"</div>
                  </div>
                  <span className={`badge ${inq.status === "new" ? "badge-warning" : "badge-success"}`}>
                    {inq.status === "new" ? "🔔 New" : "✓ Contacted"}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: "var(--text-tertiary)" }}>{t("No inquiries yet", "अभी तक कोई पूछताछ नहीं")}</p>
          )}
        </div>
      </div>
    </div>
  );
}
