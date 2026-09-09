import { useState } from "react";
import type { Page, Language } from "../components/Navbar";

interface MarketplacePageProps {
  lang: Language;
  onNavigate?: (page: Page) => void;
}

interface Product {
  id: string;
  name: string;
  hindiName: string;
  artisan: string;
  location: string;
  rating: number;
  reviews: number;
  tag: string;
  giTag: string;
  secondaryTag: string;
  badge: string;
  wholesalePrice: number;
  retailPrice: number;
  moq: string;
  leadTime: string;
  samplePrice: number;
  image: string;
}

const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Handwoven Banarasi Katan Silk Dupatta",
    hindiName: "हस्तनिर्मित बनारसी कतान रेशमी दुपट्टा",
    artisan: "Radha Devi",
    location: "Varanasi Cluster, UP",
    rating: 4.9,
    reviews: 48,
    tag: "Master Weaver",
    giTag: "GI: Varanasi Silk",
    secondaryTag: "ONDC Live",
    badge: "SC Artisan Enterprise",
    wholesalePrice: 1202,
    retailPrice: 1850,
    moq: "MOQ 50 units",
    leadTime: "14 Days Lead Time",
    samplePrice: 1400,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2KtUZgiKIt1GzyVzdpTdmFP-o9-_0LWQClIqvoDlFnod8MFDbc6Vvhc-PPOHxHLrn1LCu1ua9FnTGjPHDQBwUmeqH-7EyBpkQTqJAPWKZrac4Vw-UJImgUOxqzmTk1yIudqnSCp8_VKJsc4LKVZ6Z7jfOcVkfjTwAy2jD-vrOjAUy6iNEfpa-HKpfRSkwtovqRgzbCwG38soPMOQwvzNpLG7dBSOv2qE5fpW068Mup3bHujQ_rZLSsQ",
  },
  {
    id: "prod-2",
    name: "Hand-Moulded Terracotta Planters (Set of 3)",
    hindiName: "प्राकृतिक टेराकोटा सजावटी गमले",
    artisan: "Rameshwar Prasad",
    location: "Gorakhpur, UP",
    rating: 4.8,
    reviews: 32,
    tag: "Fired Kiln Certified",
    giTag: "GI: Gorakhpur Pottery",
    secondaryTag: "GeM Listed",
    badge: "State Awardee Potter",
    wholesalePrice: 320,
    retailPrice: 550,
    moq: "MOQ 100 sets",
    leadTime: "10 Days Lead Time",
    samplePrice: 450,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCiLq-z0MG89TdOPC8BC0NePkDp3YrGUrgHCEd8VOOi0IASEzP2Vamlv6KczhWHSw5VVqSUjU6V2EGX0Tw9sfFiteJKQMjr2ko5pQummloC2eWgw_x5RRrMWh0P1eUcSYybX43J5RErc_Y05FY4nsdU5Lli7iq5jcT75LTRqQHCh0oKVsEXTJHQo_hPzeZ1aNX2xdFYHqJbqzpmkAQ2_MjwBkIHHmKo9e8-rYaJjKLj-O8VSt1QA4tlrg",
  },
  {
    id: "prod-3",
    name: "Mithila Tree of Life Handpainted Canvas",
    hindiName: "मिथिला ट्री ऑफ लाइफ लोक चित्रकला",
    artisan: "Sunita Devi & Mithila SHG",
    location: "Madhubani, Bihar",
    rating: 5.0,
    reviews: 64,
    tag: "National Merit Certificate",
    giTag: "GI: Madhubani Painting",
    secondaryTag: "Women SHG Collective",
    badge: "100% Organic Dyes",
    wholesalePrice: 950,
    retailPrice: 1650,
    moq: "MOQ 25 units",
    leadTime: "20 Days Lead Time",
    samplePrice: 1100,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-eZSLlyo63OPKiyo_7OBUASaSN3uE73kcNVI_FwxqpDIRBWaov2MHgjLfsxGZVwjm4aTO0ymA9g2WiyqECkkDSdTI4fvjsxU40kG7DVtGuFrTvVpolC7MoJSyKskizrkkhfjKfxynlN5xM9G6YNIKSvAsTh5ed4y6GXS_seSBvd7ogQMjmuCI1ZYK3ImkeEezfmd9YMwyS-DmLsK04EdhV8InMailWA9AAlVpStFEAzxmgzn7Sz1bMA",
  },
  {
    id: "prod-4",
    name: "Intricate Carved Sheesham Wood Box",
    hindiName: "सहारनपुर शीशम नक्काशीदार बॉक्स",
    artisan: "Mohd. Aslam",
    location: "Saharanpur Cluster, UP",
    rating: 4.8,
    reviews: 19,
    tag: "Seasoned Sheesham",
    giTag: "FSC Certified Wood",
    secondaryTag: "Export Ready",
    badge: "Brass Wire Inlay",
    wholesalePrice: 480,
    retailPrice: 890,
    moq: "MOQ 50 units",
    leadTime: "12 Days Lead Time",
    samplePrice: 650,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB64jfoloOIYTC1nn2Ll01JNZUzApgZqa_R7iWO2mDW4dBcozcDXwptb3pS5SzlHRarYzSRXecJ1Ufj7Q7oJGALXjT3Edp8Twa_75b6WcDYSd7iFk4kFTrxEGhbjFucZ24o2UYtpNvCjTXxJp57y6Zgz6T0GpGJpfzqTrVfGRXXDG2u6s0GSayUCYx3w44FYatei1hbsOI3DVJwT2ld39E54I-6ACt6tPD7U-jGLGegH4KmEpq5w1awLg",
  },
  {
    id: "prod-5",
    name: "Authentic Sanganeri Block Print Cotton Set",
    hindiName: "सांगानेरी ब्लॉक प्रिंट बेडशीट",
    artisan: "Meera Rathore",
    location: "Jaipur, Rajasthan",
    rating: 4.9,
    reviews: 53,
    tag: "Export Grade Dabu",
    giTag: "GI: Sanganeri Print",
    secondaryTag: "Natural Indigo Dye",
    badge: "300 TC Cotton",
    wholesalePrice: 880,
    retailPrice: 1450,
    moq: "MOQ 40 sets",
    leadTime: "14 Days Lead Time",
    samplePrice: 1100,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1FwCbzZAj530S1ccuZUq_fb4lO2Q8tGqoNpT34DiPHRjXsDsst2DXyJEsu5LOqgkmgySWFtl-fFHT7nh--tS6oeIDSJaQ-W4m34mTBjTLVFpYgiKzCJ6i3OwCBtu7CQlM7E-rKpy6LtN7HiFtmxf4T7vN4LfrbsYG5uKgsr5hVXCMLJ3dyOsoVPhMVrhuqlYOpQQ5DEZeAoKt-zd5MnqCjwabIVZOohRbi6eLyvjtzUfhtrb5gXz6BQ",
  },
  {
    id: "prod-6",
    name: "Artisan Hammered Brass Tea Kettle Set",
    hindiName: "मुरादाबाद दस्तकारी पीतल केतली",
    artisan: "Rakesh Brassworks",
    location: "Moradabad, UP",
    rating: 4.7,
    reviews: 27,
    tag: "Tarnish Resistant",
    giTag: "GI: Moradabad Metal",
    secondaryTag: "Food Grade Lacquer",
    badge: "Heavy Gauge Brass",
    wholesalePrice: 1650,
    retailPrice: 2800,
    moq: "MOQ 30 sets",
    leadTime: "18 Days Lead Time",
    samplePrice: 1950,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAho5ThNAanV4ar4xPl6x_u4VDN3gIMdZtw7U7Ow0LhiBpGa_kKBxU5E9AogIGo0BAKcZHOH9Pm8DcZcBepW5nr0kgd3N7qgtl8b8RdHSWW9qYhcejtlinAbIlWzl5aUARWr9jmDoG4wPH8Wlzec5XzcfmNHSbDxVIGN8y0w1cURTdPTi7vSiLx18_Y1djP9q1P-NbYop7jSSsnSb_p7vWkhbHID4UFJGS4-Q7w8nq85UyRlEwfP02DFQ",
  },
];

export default function MarketplacePage({ lang }: MarketplacePageProps) {
  const [rfqCount, setRfqCount] = useState(3);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedCluster, setSelectedCluster] = useState<string>("All");
  const [giOnly, setGiOnly] = useState(true);

  const handleAddToRFQ = (productName: string) => {
    setRfqCount((prev) => prev + 1);
    setToastMessage(`${productName} added to RFQ basket`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const filteredProducts = PRODUCTS.filter((p) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.hindiName.includes(q) ||
        p.artisan.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full bg-surface pb-16">
      {/* ═══ Top Notice / Mode Indicator Banner ═══ */}
      <section className="w-full bg-surface-container-low py-2.5 border-b border-surface-container">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm font-bold shadow-sm">
              <span className="material-symbols-outlined text-sm text-primary">verified</span>
              B2B Procurement Portal
            </span>
            <span className="font-body-sm text-on-surface-variant flex items-center gap-2">
              <span>Verified SC / ST / OBC &amp; Women Artisans</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-tertiary"></span>
              <span>Beckn ONDC Protocol Active</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary"></span>
              <span className="font-bold text-tertiary">0% Middleman Commission</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-lowest shadow-sm border border-surface-container">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-ping"></span>
              <span className="font-label-sm text-on-surface font-semibold">
                Corporate &amp; Export Mode
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-on-primary-container font-label-sm font-bold shadow-sm">
              <span className="material-symbols-outlined text-base">request_quote</span>
              <span>RFQ Basket:</span>
              <span className="px-1.5 py-0.5 rounded-full bg-surface-container-lowest text-on-surface font-bold text-xs">
                {rfqCount} Items
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Hero Search & Sourcing Banner ═══ */}
      <section className="w-full py-8 sm:py-12">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#3D405B] via-[#4F537A] to-[#6B6FA8] p-6 sm:p-12 text-white shadow-xl">
            {/* Subtle Sacred Geometry Pattern Backdrop */}
            <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-around">
              <svg fill="currentColor" height="240" viewBox="0 0 100 100" width="240">
                <path d="M50 0 C60 25 75 40 100 50 C75 60 60 75 50 100 C40 75 25 60 0 50 C25 40 40 25 50 0 Z"></path>
              </svg>
              <svg fill="currentColor" height="280" viewBox="0 0 100 100" width="280">
                <path d="M50 0 C60 25 75 40 100 50 C75 60 60 75 50 100 C40 75 25 60 0 50 C25 40 40 25 50 0 Z"></path>
              </svg>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white font-label-sm text-xs mb-1 font-semibold">
                <span className="material-symbols-outlined text-amber-300 text-base">
                  local_shipping
                </span>
                Direct Sourcing from Ministry Registered Clusters
              </div>

              <h1 className="font-headline-xl text-2xl sm:text-4xl lg:text-5xl text-white font-extrabold tracking-tight leading-snug">
                Source Authentic Indian Handmade Crafts at Wholesale Prices
              </h1>

              <p className="font-body-lg text-sm sm:text-base text-white/85 max-w-2xl leading-relaxed">
                2,400+ verified SC/ST/OBC and Women artisan collectives. Geographical Indication (GI) tagged, ONDC certified, fully auditable supply chains.
              </p>

              {/* Search Bar Form */}
              <div className="w-full max-w-3xl mt-4 bg-surface-container-lowest rounded-2xl shadow-2xl p-1.5 flex flex-col sm:flex-row items-center gap-1.5 text-on-surface">
                <div className="flex items-center gap-2 pl-3 flex-1 w-full sm:w-auto">
                  <span className="material-symbols-outlined text-outline">search</span>
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-2.5 bg-transparent font-body-md text-sm text-on-surface focus:outline-none placeholder:text-outline"
                    placeholder="Search crafts, master artisans, GI clusters, state SHGs..."
                    type="text"
                  />
                </div>
                <div className="hidden sm:flex items-center gap-1 px-3 py-2 bg-surface-container rounded-xl cursor-pointer">
                  <span className="font-label-sm text-xs font-semibold text-on-surface-variant">
                    All Categories
                  </span>
                  <span className="material-symbols-outlined text-base text-on-surface-variant">
                    arrow_drop_down
                  </span>
                </div>
                <button
                  type="button"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-primary-container to-secondary text-white font-label-md text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">travel_explore</span>
                  <span>Search Wholesale</span>
                </button>
              </div>

              {/* Quick Filter Pills */}
              <div className="flex items-center justify-center flex-wrap gap-2 mt-2 text-white">
                <span className="font-label-sm text-xs opacity-75 mr-1 font-semibold">
                  Popular GI Clusters:
                </span>
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-3 py-1 rounded-full bg-primary-container text-on-primary-container font-label-sm text-xs font-bold flex items-center gap-1 shadow-sm hover:opacity-90 cursor-pointer"
                >
                  <span>🏷️ GI Tagged</span>
                </button>
                {["Varanasi Silk", "Gorakhpur Terracotta", "Madhubani Art", "Saharanpur Woodcraft", "Sanganer Block Print", "Kutch Embroidery"].map(
                  (cluster) => (
                    <button
                      key={cluster}
                      onClick={() => setSearchQuery(cluster)}
                      className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-label-sm text-xs transition-colors cursor-pointer"
                    >
                      {cluster}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Main Marketplace Layout: Sidebar + 3-Col Wholesale Grid ═══ */}
      <section className="w-full pb-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Filter Sidebar */}
            <aside className="w-full lg:w-[280px] shrink-0 bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-surface-container flex flex-col gap-4">
              <div className="flex items-center justify-between pb-2 border-b border-surface-container-low">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">tune</span>
                  <h2 className="font-headline-sm text-base text-on-surface font-bold">
                    Wholesale Filters
                  </h2>
                </div>
                <button
                  onClick={() => setSearchQuery("")}
                  className="font-label-sm text-xs text-primary hover:underline font-semibold cursor-pointer"
                >
                  Reset All
                </button>
              </div>

              {/* Provenance / GI Only Toggle */}
              <div className="p-3 rounded-xl bg-surface-container-low flex items-center justify-between border border-surface-container">
                <div className="flex flex-col">
                  <span className="font-label-md text-xs font-bold text-on-surface flex items-center gap-1">
                    <span className="material-symbols-outlined text-primary text-base">
                      verified_user
                    </span>
                    GI Certified Only
                  </span>
                  <span className="font-body-sm text-[11px] text-on-surface-variant">
                    Official craft origin seal
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={giOnly}
                    onChange={(e) => setGiOnly(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              {/* Craft Categories */}
              <div className="flex flex-col gap-2">
                <span className="font-label-md text-xs text-on-surface font-bold">
                  Craft Categories
                </span>
                <div className="flex flex-col gap-1 text-xs text-on-surface-variant">
                  <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-surface-container cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input defaultChecked className="rounded accent-primary w-4 h-4" type="checkbox" />
                      <span>Handloom &amp; Textiles</span>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-semibold">
                      840
                    </span>
                  </label>
                  <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-surface-container cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input defaultChecked className="rounded accent-primary w-4 h-4" type="checkbox" />
                      <span>Terracotta &amp; Pottery</span>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-semibold">
                      420
                    </span>
                  </label>
                  <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-surface-container cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input defaultChecked className="rounded accent-primary w-4 h-4" type="checkbox" />
                      <span>Woodcraft &amp; Carving</span>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-semibold">
                      310
                    </span>
                  </label>
                  <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-surface-container cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input defaultChecked className="rounded accent-primary w-4 h-4" type="checkbox" />
                      <span>Traditional Folk Art</span>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-semibold">
                      260
                    </span>
                  </label>
                  <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-surface-container cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input defaultChecked className="rounded accent-primary w-4 h-4" type="checkbox" />
                      <span>Brass &amp; Bell Metal</span>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-semibold">
                      190
                    </span>
                  </label>
                </div>
              </div>

              {/* Origin State / Cluster */}
              <div className="flex flex-col gap-2">
                <span className="font-label-md text-xs text-on-surface font-bold">
                  Origin State / Cluster
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {["Uttar Pradesh", "Rajasthan", "Bihar", "Gujarat", "West Bengal"].map((st) => (
                    <span
                      key={st}
                      onClick={() => setSearchQuery(st)}
                      className="px-2.5 py-1 rounded-full bg-surface-container hover:bg-primary hover:text-white text-on-surface font-label-sm text-xs font-semibold cursor-pointer transition-colors"
                    >
                      {st}
                    </span>
                  ))}
                </div>
              </div>

              {/* Wholesale Price Range */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-label-md font-bold text-on-surface">Price / Piece (INR)</span>
                  <span className="font-code-sm font-bold text-primary">₹200 - ₹5,000</span>
                </div>
                <div className="w-full bg-surface-container h-2 rounded-full relative overflow-hidden">
                  <div className="bg-gradient-to-r from-primary-container to-secondary h-full w-3/4 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-on-surface-variant">
                  <span>Min ₹200</span>
                  <span>Max ₹15,000+</span>
                </div>
              </div>

              {/* Minimum Order Quantity (MOQ) */}
              <div className="flex flex-col gap-2">
                <span className="font-label-md text-xs text-on-surface font-bold">
                  Wholesale MOQ Tier
                </span>
                <div className="grid grid-cols-1 gap-1.5 text-xs">
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer text-on-surface">
                    <input className="accent-primary" name="moq" type="radio" />
                    <span>10 - 50 pieces (Trial Order)</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer text-on-surface font-bold">
                    <input defaultChecked className="accent-primary" name="moq" type="radio" />
                    <span>50 - 200 pieces (Standard B2B)</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer text-on-surface">
                    <input className="accent-primary" name="moq" type="radio" />
                    <span>500+ pieces (Export Bulk)</span>
                  </label>
                </div>
              </div>

              {/* Social Inclusion Compliance */}
              <div className="flex flex-col gap-2">
                <span className="font-label-md text-xs text-on-surface font-bold">
                  Social Inclusion Compliance
                </span>
                <div className="flex flex-col gap-1.5 text-xs text-on-surface-variant">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input defaultChecked className="rounded accent-primary w-4 h-4" type="checkbox" />
                    <span>Pehchan Artisan ID Card</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input defaultChecked className="rounded accent-primary w-4 h-4" type="checkbox" />
                    <span>MoSJE Beneficiary Enrolled</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input defaultChecked className="rounded accent-primary w-4 h-4" type="checkbox" />
                    <span>SC / ST Artisan Enterprise</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input defaultChecked className="rounded accent-primary w-4 h-4" type="checkbox" />
                    <span>Women Self-Help Group (SHG)</span>
                  </label>
                </div>
              </div>

              {/* Sticky Apply Button */}
              <button
                type="button"
                onClick={() => alert("Filters applied: Showing verified GI craft lots with active production capacity.")}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-container to-secondary text-white font-label-md text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">filter_alt</span>
                <span>Apply Filters (1,842 Crafts)</span>
              </button>
            </aside>

            {/* Product Wholesale Grid Content */}
            <div className="flex-1 w-full flex flex-col gap-6">
              {/* Grid Header with Sorting & Views */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-surface-container-lowest p-3.5 rounded-2xl shadow-sm border border-surface-container">
                <div className="flex items-center gap-2">
                  <span className="font-label-md text-sm text-on-surface font-bold">
                    {filteredProducts.length} Wholesale Lots Shown
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-bold">
                    All Direct-from-Weaver
                  </span>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end text-xs">
                  <div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm">
                    <span className="font-semibold">Sort:</span>
                    <select className="bg-surface-container py-1.5 px-2.5 rounded-lg font-label-sm text-xs text-on-surface focus:outline-none font-semibold">
                      <option>Verified GI • High Capacity</option>
                      <option>Wholesale Price: Low to High</option>
                      <option>Production Lead Time</option>
                      <option>Artisan Rating: 4.8+</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-1 bg-surface-container p-1 rounded-lg">
                    <button className="p-1 rounded bg-surface-container-lowest text-primary shadow-sm">
                      <span className="material-symbols-outlined text-base">grid_view</span>
                    </button>
                    <button className="p-1 rounded text-on-surface-variant hover:text-on-surface">
                      <span className="material-symbols-outlined text-base">view_list</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 3-Column Wholesale Product Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((p) => (
                  <article
                    key={p.id}
                    className="bg-surface-container-lowest rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group border border-surface-container"
                  >
                    <div className="relative w-full h-64 overflow-hidden bg-surface-container">
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        alt={p.name}
                        src={p.image}
                      />
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                        <span className="px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary-container font-label-sm text-[11px] shadow-sm font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">verified</span>
                          {p.giTag}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-[11px] shadow-sm font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">hub</span>
                          {p.secondaryTag}
                        </span>
                      </div>
                      <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-inverse-surface/80 backdrop-blur-sm text-white font-label-sm text-[11px] font-semibold">
                        {p.badge}
                      </span>
                    </div>

                    <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                      <div className="flex flex-col gap-1">
                        <h3 className="font-headline-sm text-base text-on-surface group-hover:text-primary transition-colors line-clamp-1 font-bold">
                          {p.name}
                        </h3>
                        <span className="font-['Noto_Sans_Devanagari'] text-xs text-secondary font-semibold">
                          {p.hindiName}
                        </span>
                        <p className="font-body-sm text-xs text-on-surface-variant flex items-center gap-1 mt-0.5">
                          <span className="material-symbols-outlined text-sm text-primary">
                            person
                          </span>
                          <span>
                            {p.artisan} • {p.location}
                          </span>
                        </p>
                        <div className="flex items-center gap-2 text-xs text-on-surface-variant pt-1">
                          <span className="flex items-center text-primary font-bold">
                            <span
                              className="material-symbols-outlined text-sm text-primary"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              star
                            </span>{" "}
                            {p.rating}
                          </span>
                          <span>({p.reviews} B2B Reviews)</span>
                          <span className="px-1.5 py-0.5 rounded bg-surface-container font-semibold text-[10px]">
                            {p.tag}
                          </span>
                        </div>
                      </div>

                      <div className="pt-2 flex flex-col gap-2 border-t border-surface-container-low">
                        <div className="p-2.5 rounded-xl bg-surface-container-low flex items-baseline justify-between border border-surface-container">
                          <div>
                            <span className="font-headline-md text-xl text-on-surface font-bold">
                              ₹{p.wholesalePrice.toLocaleString("en-IN")}
                            </span>
                            <span className="text-xs text-on-surface-variant font-medium">
                              {" "}
                              / unit
                            </span>
                            <span className="text-xs line-through text-outline ml-1">
                              ₹{p.retailPrice.toLocaleString("en-IN")}
                            </span>
                          </div>
                          <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold">
                            {p.moq}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-xs text-on-surface-variant px-1 font-medium">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">timer</span>{" "}
                            {p.leadTime}
                          </span>
                          <span className="font-bold text-primary">
                            Sample: ₹{p.samplePrice}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mt-1">
                          <button
                            type="button"
                            onClick={() => alert(`Direct trade inquiry opened with ${p.artisan} (${p.location}). Escrow guaranteed.`)}
                            className="py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-base">chat</span>
                            <span>Inquire</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAddToRFQ(p.name)}
                            className="py-2.5 rounded-xl bg-gradient-to-r from-primary-container to-secondary text-white font-label-sm text-xs font-bold flex items-center justify-center gap-1 shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-base">
                              add_shopping_cart
                            </span>
                            <span>Add to RFQ</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination & Results Counter */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container mt-2">
                <span className="font-body-sm text-xs text-on-surface-variant font-medium">
                  Showing 1 - {filteredProducts.length} of 1,842 wholesale lots
                </span>
                <div className="flex items-center gap-1.5">
                  <button className="w-8 h-8 rounded-lg bg-surface-container text-on-surface-variant flex items-center justify-center hover:bg-surface-container-high">
                    <span className="material-symbols-outlined text-base">chevron_left</span>
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-primary text-white font-bold text-xs">
                    1
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-surface-container text-on-surface font-semibold text-xs hover:bg-surface-container-high">
                    2
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-surface-container text-on-surface font-semibold text-xs hover:bg-surface-container-high">
                    3
                  </button>
                  <span className="px-1 text-on-surface-variant text-xs">...</span>
                  <button className="w-8 h-8 rounded-lg bg-surface-container text-on-surface font-semibold text-xs hover:bg-surface-container-high">
                    12
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-surface-container text-on-surface-variant flex items-center justify-center hover:bg-surface-container-high">
                    <span className="material-symbols-outlined text-base">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Wholesale Guarantees Bar ═══ */}
      <section className="w-full bg-surface-container-lowest py-12 shadow-sm border-t border-surface-container">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-surface-container-low border border-surface-container">
              <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined">security</span>
              </div>
              <div className="flex flex-col">
                <h4 className="font-label-md text-xs sm:text-sm text-on-surface font-bold">
                  Government Escrow
                </h4>
                <p className="font-body-sm text-[11px] text-on-surface-variant mt-0.5 leading-relaxed">
                  Funds released to artisans strictly post QC approval and geo-tagged dispatch.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-surface-container-low border border-surface-container">
              <div className="w-10 h-10 rounded-full bg-tertiary text-white flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined">fact_check</span>
              </div>
              <div className="flex flex-col">
                <h4 className="font-label-md text-xs sm:text-sm text-on-surface font-bold">
                  Fair Wage Checked
                </h4>
                <p className="font-body-sm text-[11px] text-on-surface-variant mt-0.5 leading-relaxed">
                  MoSJE &amp; PM Vishwakarma compliance checks on every transaction.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-surface-container-low border border-surface-container">
              <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined">local_shipping</span>
              </div>
              <div className="flex flex-col">
                <h4 className="font-label-md text-xs sm:text-sm text-on-surface font-bold">
                  48h Sample Dispatch
                </h4>
                <p className="font-body-sm text-[11px] text-on-surface-variant mt-0.5 leading-relaxed">
                  Rapid production prototypes air-shipped with provenance certificates.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-surface-container-low border border-surface-container">
              <div className="w-10 h-10 rounded-full bg-inverse-surface text-white flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined">receipt_long</span>
              </div>
              <div className="flex flex-col">
                <h4 className="font-label-md text-xs sm:text-sm text-on-surface font-bold">
                  GST &amp; E-Way Bills
                </h4>
                <p className="font-body-sm text-[11px] text-on-surface-variant mt-0.5 leading-relaxed">
                  Direct ONDC protocol generation of B2B tax invoices and export documents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Live Animated Toast Notification ═══ */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl bg-inverse-surface text-white shadow-2xl animate-fadeIn border border-outline/30">
          <span className="material-symbols-outlined text-primary-container text-xl">
            check_circle
          </span>
          <span className="font-label-sm text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
