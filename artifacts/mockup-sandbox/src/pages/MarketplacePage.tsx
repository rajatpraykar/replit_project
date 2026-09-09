import { useState, useEffect } from "react";

interface MarketplacePageProps {
  lang: "en" | "hi";
}

const API_BASE = "/api";

export default function MarketplacePage({ lang }: MarketplacePageProps) {
  const t = (en: string, hi: string) => (lang === "en" ? en : hi);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE}/products`);
      const data = await res.json();
      setProducts(data);
    } catch {
      // Fallback demo products if API not available
      setProducts([
        { id: "1", name: "Indigo Handwoven Dupatta", nameHindi: "नील दुपट्टा", price: 1480, craftCategory: "Handloom & Heritage Textiles", material: "Pure Cotton", views: 248, inquiries: 18, geoIndication: "Rajasthan Handloom", artisanName: "Rekha Devi", tags: ["#Handloom", "#FairTrade"] },
        { id: "2", name: "Carved Terracotta Diya Set", nameHindi: "मिट्टी दीया सेट", price: 420, craftCategory: "Terracotta & Clay Craft", material: "River Clay", views: 482, inquiries: 34, geoIndication: "Gorakhpur Terracotta", artisanName: "Ramu Prajapati", tags: ["#Terracotta", "#FestiveDecor"] },
        { id: "3", name: "Madhubani Tree of Life", nameHindi: "मधुबनी चित्रकला", price: 2800, craftCategory: "Madhubani & Traditional Painting", material: "Natural Pigments", views: 367, inquiries: 22, geoIndication: "Madhubani GI", artisanName: "Sunita Devi", tags: ["#MadhubaniArt"] },
        { id: "4", name: "Jaipur Blue Pottery Plate", nameHindi: "ब्लू पॉटरी प्लेट", price: 1200, craftCategory: "Blue Pottery & Ceramic Art", material: "Quartz Stone Dust", views: 312, inquiries: 19, geoIndication: "Jaipur Blue Pottery GI", artisanName: "Gopal Saini", tags: ["#BluePottery"] },
      ]);
    }
    setLoading(false);
  };

  const categories = ["all", ...new Set(products.map((p) => p.craftCategory))];

  const filtered = products.filter((p) => {
    const matchesSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || (p.nameHindi && p.nameHindi.includes(searchQuery));
    const matchesCategory = selectedCategory === "all" || p.craftCategory === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ maxWidth: "var(--content-max)", margin: "0 auto", padding: "40px 24px" }}>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, marginBottom: "8px" }}>
          🏪 <span className="text-gradient">{t("Artisan Marketplace", "कारीगर बाज़ार")}</span>
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "15px" }}>
          {t("Browse handcrafted products directly from verified artisans", "सत्यापित कारीगरों से सीधे हस्तनिर्मित उत्पाद देखें")}
        </p>
      </div>

      {/* Search & Filter */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
        <input
          className="input"
          placeholder={t("Search crafts...", "शिल्प खोजें...")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ maxWidth: "400px" }}
        />
        <select
          className="input"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ maxWidth: "300px" }}
        >
          <option value="all">{t("All Categories", "सभी श्रेणियाँ")}</option>
          {categories.filter((c) => c !== "all").map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "var(--text-tertiary)" }}>
          ⏳ {t("Loading products...", "उत्पाद लोड हो रहे हैं...")}
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}>
          {filtered.map((product) => (
            <div
              key={product.id}
              className="card"
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedProduct(product)}
            >
              {/* Image placeholder */}
              <div style={{
                height: "200px",
                background: "linear-gradient(135deg, rgba(245,166,35,0.08), rgba(139,92,246,0.08))",
                borderRadius: "var(--radius-md)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
                fontSize: "48px",
                position: "relative",
              }}>
                {product.craftCategory?.includes("Textile") ? "🧵" :
                  product.craftCategory?.includes("Terracotta") ? "🏺" :
                  product.craftCategory?.includes("Painting") ? "🎨" :
                  product.craftCategory?.includes("Wood") ? "🪵" :
                  product.craftCategory?.includes("Brass") ? "🔔" :
                  product.craftCategory?.includes("Blue") ? "🔵" :
                  product.craftCategory?.includes("Jute") ? "🧶" :
                  product.craftCategory?.includes("Toy") ? "🪆" : "🎁"}

                {/* GI Tag badge */}
                {product.geoIndication && (
                  <span className="badge badge-info" style={{
                    position: "absolute",
                    top: "8px",
                    left: "8px",
                    fontSize: "10px",
                  }}>
                    🏷️ GI Tagged
                  </span>
                )}

                {/* ONDC badge */}
                <span className="badge badge-success" style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  fontSize: "10px",
                }}>
                  ONDC Listed
                </span>
              </div>

              {/* Content */}
              <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "4px" }}>{product.name}</h3>
              {product.nameHindi && (
                <p className="hindi" style={{ fontSize: "13px", color: "var(--text-tertiary)", marginBottom: "8px" }}>
                  {product.nameHindi}
                </p>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <div>
                  <span style={{ fontSize: "22px", fontWeight: 700, color: "var(--saffron)" }}>₹{product.price}</span>
                  {product.b2bPrice && (
                    <span style={{ fontSize: "12px", color: "var(--text-tertiary)", marginLeft: "8px" }}>
                      B2B: ₹{product.b2bPrice}
                    </span>
                  )}
                </div>
              </div>

              <div style={{ fontSize: "12px", color: "var(--text-tertiary)", marginBottom: "8px" }}>
                {product.material} • {product.artisanName && `by ${product.artisanName}`}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--text-tertiary)" }}>
                <span>👁️ {product.views} views</span>
                <span>💬 {product.inquiries} inquiries</span>
              </div>

              {/* Tags */}
              {product.tags && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "10px" }}>
                  {product.tags.slice(0, 3).map((tag: string, i: number) => (
                    <span key={i} style={{
                      fontSize: "10px",
                      color: "var(--text-info)",
                      background: "rgba(59,130,246,0.08)",
                      padding: "2px 8px",
                      borderRadius: "var(--radius-full)",
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(8px)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="glass-strong"
            style={{
              maxWidth: "600px",
              width: "100%",
              maxHeight: "80vh",
              overflowY: "auto",
              borderRadius: "var(--radius-xl)",
              padding: "32px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
              <div>
                <h2 style={{ fontSize: "22px", fontWeight: 700 }}>{selectedProduct.name}</h2>
                <p className="hindi" style={{ color: "var(--text-tertiary)", fontSize: "14px" }}>{selectedProduct.nameHindi}</p>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                style={{ background: "none", border: "none", color: "var(--text-secondary)", fontSize: "24px", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: 1.6, marginBottom: "20px" }}>
              {selectedProduct.description || t("Handcrafted with love by verified artisan communities.", "सत्यापित कारीगर समुदायों द्वारा प्यार से हस्तनिर्मित।")}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "20px" }}>
              <div className="stat-card" style={{ padding: "12px" }}>
                <div className="stat-value text-gradient" style={{ fontSize: "20px" }}>₹{selectedProduct.price}</div>
                <div className="stat-label">{t("Retail", "खुदरा")}</div>
              </div>
              <div className="stat-card" style={{ padding: "12px" }}>
                <div className="stat-value text-gradient-cool" style={{ fontSize: "20px" }}>₹{selectedProduct.b2bPrice || Math.round(selectedProduct.price * 0.65)}</div>
                <div className="stat-label">{t("B2B", "थोक")}</div>
              </div>
              <div className="stat-card" style={{ padding: "12px" }}>
                <div className="stat-value" style={{ fontSize: "20px", color: "var(--text-success)" }}>₹{selectedProduct.exportPrice || Math.round(selectedProduct.price * 1.35)}</div>
                <div className="stat-label">{t("Export", "निर्यात")}</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button className="btn btn-primary" style={{ flex: 1 }}>
                💬 {t("Send Inquiry", "पूछताछ भेजें")}
              </button>
              <button className="btn btn-secondary" style={{ flex: 1 }}>
                🛒 {t("Export to ONDC", "ONDC पर निर्यात")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
