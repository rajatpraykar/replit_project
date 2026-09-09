# 🪔 KalaSetu (कलासेतु) — Frontend UI Design Prompts (Stitch.md)
> **Theme**: Light & Colourful • Warm Indian Craft Palette • Mobile-First (390×844px)  
> **Audience**: Marginalized Indian artisans (SC/ST/OBC/Women) + B2B buyers + SIH jury  
> **Design Language**: Warm whites + marigold gold + terracotta orange + indigo blue + sage green  
> **Font Stack**: `Poppins` (headings) + `Noto Sans Devanagari` (Hindi text) + `Inter` (body)  
> **Component Style**: Rounded cards (24px radius), soft shadows, gradient CTAs, micro-animations

---

## 🎨 GLOBAL DESIGN SYSTEM (Reference for All Slides)

```
PRIMARY PALETTE:
  Marigold Gold   : #F5A623  (primary CTA, icons, highlights)
  Terracotta      : #E07A5F  (secondary accents, category tags)
  Indigo Blue     : #3D405B  (headings, text primary)
  Sage Green      : #81B29A  (success, badges, positive metrics)
  Saffron Cream   : #FFFBF2  (page backgrounds, warm white)
  Cloud White     : #FFFFFF  (card backgrounds)
  Blush Pink      : #F2C4CE  (soft accents, shimmer effects)
  Sky Lavender    : #C9B8E8  (info badges, tags)

GRADIENTS:
  Sunrise CTA     : linear-gradient(135deg, #F5A623 → #E07A5F)
  Indigo Glow     : linear-gradient(135deg, #3D405B → #6B6FA8)
  Sage Breath     : linear-gradient(135deg, #81B29A → #A8D5BA)
  Gold Shimmer    : linear-gradient(135deg, #F5A623 → #FFD166)

TYPOGRAPHY:
  H1: Poppins Bold 28px, Indigo #3D405B
  H2: Poppins SemiBold 22px, Indigo #3D405B
  Body: Inter 15px, #4A4A4A
  Hindi: Noto Sans Devanagari 16px, #3D405B
  Caption: Inter 12px, #888888
  Badge: Inter Bold 11px, uppercase

SPACING: 16px base grid
SHADOWS: 0 8px 24px rgba(61,64,91,0.10)
RADIUS: Card=24px, Button=14px, Tag=20px, Icon=16px
```

---

## 📱 SLIDE 1 — Splash / Onboarding Screen

**Screen ID**: `onboarding`  
**Route**: App Launch → Before Login

**Prompt**:
> Design a stunning mobile splash/onboarding screen (390×844px) for **KalaSetu (कलासेतु)**, an AI-powered artisan market app for the Smart India Hackathon. Background is a warm **Saffron Cream (#FFFBF2)** with a large, lush decorative **mandala pattern** (translucent marigold gold, 40% opacity) centered behind the hero area, giving an authentic Indian craft aesthetic.
>
> **Top section** (40% of screen): A beautiful hand-painted style illustration of an Indian artisan woman in a bright teal saree, sitting cross-legged, weaving a colorful handloom cloth. Around her float colorful craft icons — a painted clay pot, a golden silk dupatta, a terracotta elephant, a block-print stamp — each in a soft rounded bubble (#FFD166 or #F2C4CE fill, white stroke).
>
> **Center section**: App logo — a stylized **oil lamp (दीया) icon** in Marigold Gold (#F5A623) with a warm glow halo. Below it, the name **"KalaSetu"** in Poppins Bold 32px Indigo (#3D405B), with **"कलासेतु"** in Noto Sans Devanagari 20px below in Terracotta (#E07A5F). A thin horizontal divider with a paisley motif.
>
> **Tagline**: "AI-Powered Bridge from Craft to Market" in Inter Medium 16px, soft gray (#6B7280), centered.
>
> **Bottom section** (25% of screen): Two stacked buttons —  
> 1. Primary CTA: **"Get Started — शुरू करें"** — full-width pill button with Sunrise Gradient (#F5A623→#E07A5F), white Poppins Bold text 16px, subtle pulse glow animation  
> 2. Secondary: **"I'm a B2B Buyer"** — outlined button, Indigo border, Indigo text  
>
> Below buttons: Three horizontal dot indicators (onboarding pagination). Footer: "Ministry of Social Justice & Empowerment | SIH 2024" in caption size.

---

## 📱 SLIDE 2 — OTP Login Screen

**Screen ID**: `login`  
**Route**: `/login` or App → Auth Flow

**Prompt**:
> Design a clean, trust-inspiring mobile **OTP login screen** (390×844px) for KalaSetu. Background is **Cloud White (#FFFFFF)** with a soft warm gradient band across the top 30% using **Saffron Cream (#FFFBF2)** fading down.
>
> **Top decorative strip** (top 28%): A colorful horizontal banner with a repeating block-print border pattern (alternating marigold, terracotta, indigo, sage) at the very top (12px tall). Below it, a centered circular avatar — white background circle (120px diameter) with a soft shadow, containing the **KalaSetu diya logo** in gold with a radiant glow.
>
> **App name**: "KalaSetu" in Poppins Bold 26px Indigo, "कलासेतु" below in Devanagari 16px Terracotta.
>
> **Content Card** (floating white card, 24px radius, soft shadow): 
> - Title: "Welcome Back! स्वागत है 🙏" — Poppins SemiBold 20px Indigo
> - Subtitle: "Enter your mobile number to continue" — Inter 14px gray
> - **Phone Input Field**: White background, 2px border (#E5E7EB), rounded 14px, left side has India flag emoji + "+91" in Indigo Bold, placeholder "9876543210" in light gray. On focus: border glows Marigold Gold.
> - Language selector row: 6 flag+language pill badges (🇮🇳 हिन्दी | मराठी | বাংলা | ગુજરાતી | தமிழ் | English) in small rounded pills with lavender (#C9B8E8) background — user taps to set their preferred language.
> - Primary button: "Send OTP — OTP भेजें" full-width Sunrise Gradient pill, white text.
>
> **Footer**: Padlock icon + "Secured by MoSJE Digital Identity (Pehchan)" — caption size sage green. Below: "New artisan? Register — नया पंजीकरण" link in marigold gold.

---

## 📱 SLIDE 3 — Home Dashboard

**Screen ID**: `home`  
**Route**: `/(tabs)/index`

**Prompt**:
> Design an energetic, vibrant **Home Dashboard** screen (390×844px) for a logged-in artisan named "Radha Devi" from Uttar Pradesh. Background is **Saffron Cream (#FFFBF2)**.
>
> **Top Header Bar**: Left — circular avatar (48px, marigold gold ring border) with illustrated artisan face; Center — "Namaste, Radha Devi! 🙏" in Poppins SemiBold 18px Indigo; Right — notification bell icon (badge with red dot showing "3") and a verified badge (sage green checkmark + "Pehchan Verified").
>
> **Hero Stats Banner** (full-width gradient card, #F5A623→#E07A5F, 24px radius, white text):
> - Left side: Large number "₹24,500" in Poppins Bold 34px white, label "This Month's Earnings" Inter 13px white/80%. Below: small upward arrow + "+250% above minimum wage" in sage green badge.
> - Right side: Cute illustration of stacked gold coins and a rising graph arrow.
>
> **Quick Action Grid** (2×2 grid, 16px gap, each card white background 24px radius shadow):
> 1. **📸 AI Catalog** — marigold gold icon, "Create Listing" title, "Snap & earn in 30 seconds" subtitle, Sunrise Gradient arrow button
> 2. **🎙️ Voice Record** — indigo mic icon, "Speak Your Craft" title, "Hindi & 6 regional languages" subtitle
> 3. **🛒 ONDC Market** — sage green icon, "Sell Online" title, "Live on ONDC & GeM" subtitle, green "LIVE" pulse badge
> 4. **📊 My Impact** — terracotta chart icon, "View Analytics" title, "MoSJE scheme eligibility" subtitle
>
> **Recent Activity Feed** (section below grid):
> - Section header: "Recent Activity — हाल की गतिविधि" Poppins SemiBold 16px + "See all" link in Marigold
> - 2–3 activity cards (white, 16px radius, horizontal layout): Each shows — small product thumbnail (rounded square), product name + Hindi name, "Listed on ONDC ✓" or "B2B inquiry received" label with appropriate colored badge, timestamp.
>
> **Government Scheme Alert Banner** (bottom sticky): Sage green gradient banner — "🎉 You qualify for PM Vishwakarma Scheme! ₹15,000 toolkit grant" with "Apply Now" white pill button.

---

## 📱 SLIDE 4 — AI Studio (Create Listing)

**Screen ID**: `create`  
**Route**: `/create`

**Prompt**:
> Design the most exciting screen of the app — the **AI Studio screen** (390×844px) for KalaSetu. This is where the artisan snaps a photo, records voice, and gets an AI-generated professional listing. Light background (#FFFBF2).
>
> **Header**: Back arrow (left), "AI Studio ✨ — कला स्टूडियो" Poppins Bold 20px Indigo (center), a sparkle AI chip icon (right, indigo).
>
> **Progress Stepper** (horizontal, 3 steps): Step bubbles connected by colored lines:
> - Step 1: Camera icon in marigold gold filled circle (active) — "Photo"
> - Step 2: Mic icon in light gray circle — "Voice"
> - Step 3: Sparkle icon in light gray — "Generate"
> Connecting lines: dashed gray → filled gold (animated progress).
>
> **Photo Capture Zone** (large, 340×240px rounded card, 24px radius, dashed 2px marigold border with animated dash-offset):
> - Inside: Large camera icon (64px marigold), "Tap to photograph your craft" centered Poppins Medium 16px Indigo, "or drag & drop image" caption below in gray.
> - Corner decorations: Tiny block-print flower patterns in the 4 corners in terracotta color.
> - When photo loaded: Full photo fills the card with a "✓ Photo Ready" sage green badge in top-right corner and a "Retake" ghost button in top-left.
>
> **Voice Description Section** (below photo zone, white card 24px radius):
> - Title row: Mic icon + "Describe in your language — अपनी भाषा में बताएं"
> - Horizontal scrollable language pills: हिन्दी | মারাঠি | বাংলা | ਪੰਜਾਬੀ | English — active pill in marigold gold, others in light gray
> - Large circular mic button (72px diameter) with Sunrise Gradient background, white mic icon. Outer ring pulses in marigold when recording. Label below: "Hold to Record — दबाकर बोलें"
> - Waveform visualization: When recording, show 20 animated vertical bars alternating between marigold, terracotta, indigo colors.
> - Transcribed text area: White box below with Devanagari + English transcribed text in real-time.
>
> **Generate Button** (full-width, 56px tall, Sunrise Gradient, 14px radius): "✨ Generate Listing with AI — AI से लिस्टिंग बनाएं" — Poppins Bold 16px white. Subtle shimmer animation sweeping left to right.
>
> **Loading State Overlay** (after Generate tapped): Semi-transparent white overlay with centered animated diya lamp (flickering glow animation) + "AI is crafting your listing..." + "इंतज़ार करें..." in Indigo. Below: animated 3-step text cycling: "📸 Analyzing your craft..." → "🗣️ Processing your voice..." → "📝 Writing your catalog..."

---

## 📱 SLIDE 5 — AI Catalog Result Screen

**Screen ID**: `catalog-result`  
**Route**: `/create` (Step 3 result state)

**Prompt**:
> Design the **AI Catalog Result screen** (390×844px) — shown after the AI generates a professional listing. This is the "WOW moment" screen. Background Saffron Cream (#FFFBF2).
>
> **Success Header**: Green confetti burst at top (animated, small particles in marigold/sage/indigo/terracotta), "🎉 Your Listing is Ready! तैयार हो गया!" Poppins Bold 22px Indigo, centered.
>
> **Product Preview Card** (full-width white card, 24px radius, elevated shadow):
> - **Photo strip** (top of card, 340×200px): Shows the original artisan photo on left (50%) and the **AI-enhanced studio photo** on right (50%) — both within the card. A label badge on left says "Original" and right says "✨ AI Enhanced" in a marigold gold pill.
> - **English Section**: "Handwoven Banarasi Silk Dupatta" — Poppins Bold 18px Indigo; 3-line description in Inter 14px gray.
> - **Hindi Section** (below, with a soft sage green left border): "हस्तनिर्मित बनारसी रेशमी दुपट्टा" — Devanagari SemiBold 16px Indigo; Hindi description 14px.
> - **GI Tag Badge**: Horizontal row — "🏷️ GI Tag: Varanasi Silk" in a indigo + gold badge pill; "+ HandmadeInIndia" terracotta tag; "VocalForLocal" sage tag.
> - **Care Tips**: Small section with a leaf icon + "Care: Gentle cold handwash, dry in shade" — caption 12px gray.
>
> **Pricing Breakdown Card** (white card, 16px radius, below product card):
> - Header row: "💰 Fair-Trade Price — न्यायसंगत मूल्य" Poppins SemiBold 16px Indigo
> - 3-column layout:
>   - **B2C Retail**: ₹1,850 — Poppins Bold 22px Marigold, "Consumer Price" caption
>   - **B2B Wholesale**: ₹1,202 — Poppins Bold 20px Indigo, "Bulk Price" caption  
>   - **Export**: ₹2,498 — Poppins Bold 20px Sage Green, "Global Market" caption
> - Bottom row: "⬆️ +250% above UP statutory minimum wage" — small sage green badge, left aligned
>
> **Action Buttons Row** (sticky at bottom of screen, white background):
> - "📤 List on ONDC & GeM" — full-width Sunrise Gradient button, white Poppins Bold 16px
> - Below: smaller row of 3 icon+text buttons: "✏️ Edit" (outlined indigo) | "📤 Share" (outlined sage) | "📁 Save Draft" (outlined gray)

---

## 📱 SLIDE 6 — Inventory / My Products

**Screen ID**: `inventory`  
**Route**: `/(tabs)/inventory`

**Prompt**:
> Design a beautiful **Inventory / My Products screen** (390×844px) for KalaSetu artisan app. Light background (#FFFBF2).
>
> **Header Row**: "My Crafts — मेरे शिल्प" Poppins Bold 22px Indigo (left); Filter icon + "Sort" text (right, indigo outlined pill button).
>
> **Stats Summary Strip** (horizontal scrollable row of 3 mini-cards, white background, 16px radius, shadow):
> - Card 1: "12" large marigold number, "Total Products" caption
> - Card 2: "8" large sage number, "ONDC Listed" caption with green "LIVE" pulse dot
> - Card 3: "3" large terracotta number, "Pending Sync" caption with orange warning dot
>
> **Search Bar**: Full-width white input (14px radius, gray border), magnifying glass icon left, placeholder "Search your crafts... शिल्प खोजें" — on focus border turns marigold gold.
>
> **Filter Pills Row** (horizontally scrollable): "All" (active, marigold fill white text) | "Textiles" | "Pottery" | "Jewellery" | "Wood Craft" | "Painting" — each in white background with gray border, rounded pill 20px radius. Active one has Sunrise Gradient fill.
>
> **Product Grid** (2-column grid, 8px gap):
> Each Product Card (white, 16px radius, shadow):
> - Square product image (100%) with rounded top corners
> - Status badge overlay (top-right corner of image): "ONDC ✓" in sage green OR "Sync Pending" in amber orange
> - Product name Poppins SemiBold 14px Indigo
> - Hindi name Devanagari 12px Terracotta
> - Price: "₹1,850" Poppins Bold 16px Marigold
> - Bottom row: small view count eye icon + "247 views" | inquiry bubble icon + "3 inquiries"
> - On long-press: Show "Edit | Share | Delete" micro-menu
>
> **FAB Button** (Floating Action Button, bottom-right): 56px circle, Sunrise Gradient, white "+" icon with sparkle. Label toast: "+ Add New Craft" appears on first visit.

---

## 📱 SLIDE 7 — ONDC / Market Screen

**Screen ID**: `market`  
**Route**: `/(tabs)/sell`

**Prompt**:
> Design the **ONDC Market & Distribution screen** (390×844px) for KalaSetu. This screen shows the artisan's live marketplace presence. Background Saffron Cream (#FFFBF2).
>
> **Header**: "Bazaar — बाज़ार" Poppins Bold 24px Indigo. Right: Live animated green dot + "ONDC Online" sage green badge.
>
> **ONDC Status Hero Card** (full-width, Indigo Glow gradient #3D405B→#6B6FA8, 24px radius, white text):
> - Top row: ONDC official logo (white) on left, "Beckn Protocol 1.1.0" version badge (pale lavender pill) on right
> - Center: "🌐 Your products are live on ONDC Network!" Poppins Bold 18px white
> - Stats row (3 columns): "8 Products Live" | "3 Platforms" | "₹4,200 Orders Today"
> - Bottom row: Paytm logo, Mystore logo, Pincode logo — all small white pills showing where the products appear.
>
> **GeM Export Section** (white card, 24px radius):
> - Header: Government e-Marketplace logo + "GeM Bulk Uploader" Poppins SemiBold 16px Indigo
> - Status chip: "MSE SC/ST Reserved" sage green badge + "Make In India ✓" saffron badge
> - Info row: "HSN: 63049200 (Handloom Textiles)" Inter 13px gray
> - Big button: "📥 Download GeM CSV" — full-width Sage Gradient button, Poppins SemiBold white
>
> **WhatsApp Catalog Card** (white card, 16px radius):
> - WhatsApp green icon + "Share Catalog on WhatsApp Business" Poppins SemiBold 16px
> - Preview of 3 tiny product thumbnails in a row
> - Button: "📤 Share All Products" — WhatsApp green button
>
> **B2B Inquiry Feed** (section below):
> - "📬 Recent Buyer Inquiries — खरीदार संपर्क" header
> - 2 inquiry cards (white, 12px radius): Buyer avatar + "Ritu Exports, Jaipur" name + "Interested in 50 units of Banarasi Dupatta" message + "Retail: ₹1,200/unit" quote + "Reply" indigo outline button + "Accept Quote" sage gradient button.

---

## 📱 SLIDE 8 — Impact Analytics Screen

**Screen ID**: `analytics`  
**Route**: `/(tabs)/analytics`

**Prompt**:
> Design an inspiring **Impact Analytics / MoSJE Dashboard** (390×844px) that shows an artisan their real social and economic impact. This should feel celebratory and empowering. Background Saffron Cream (#FFFBF2).
>
> **Header**: "My Impact — मेरा प्रभाव" Poppins Bold 24px Indigo. Right: "June 2024" month selector with left/right arrows.
>
> **Wage Impact Hero Card** (full-width, Sunrise Gradient #F5A623→#E07A5F, 24px radius, white text):
> - Top: Small "MoSJE Certified Metric" badge in white/20% background
> - Main metric: "+250%" in Poppins Bold 52px white with "₹ above minimum wage" below in 14px white/80%
> - Sub-row: "Your hourly wage: ₹87.5" vs "UP Statutory: ₹30" with a horizontal bar comparison (white bar 100% vs white/40% bar 34%)
> - Bottom row: Tiny green upward arrow + "You earned ₹24,500 extra vs floor wage this month" caption white.
>
> **Charts Section** (white card, 24px radius, padding 20px):
> - Title: "📈 Monthly Earnings Trend" Poppins SemiBold 16px Indigo
> - Bar chart (6 months): Bars in Sunrise Gradient colors, x-axis month labels in Inter 11px gray, y-axis in ₹. Current month bar is tallest and has a marigold glow.
> - Below chart: Craft category donut chart — slices in Marigold (Textiles 60%), Terracotta (Pottery 25%), Sage (Jewellery 15%). Legend on right with color dots.
>
> **Government Scheme Eligibility Section** (below charts):
> - Title: "🏛️ Schemes You Qualify For — सरकारी योजनाएं" Poppins SemiBold 16px
> - Scheme Cards (3 vertical cards, white 12px radius, left border stripe):
>   1. Left border: Marigold | "PM Vishwakarma" | "₹15,000 toolkit grant + 5% credit" | "Apply Now →" marigold text link
>   2. Left border: Indigo | "AHVY Scheme" | "Free exhibition stall at Dilli Haat" | "Check Dates →"
>   3. Left border: Sage | "GeM MSE Exemption" | "EMD & tender fee waived" | "Activate →"
>
> **Export PDF Banner** (bottom): Sage gradient full-width banner — "📄 Download MoSJE Impact Report" white button. Caption: "Share with scheme officials or bank for MUDRA loan".

---

## 📱 SLIDE 9 — Artisan Profile / Pehchan ID

**Screen ID**: `profile`  
**Route**: `/(tabs)/profile`

**Prompt**:
> Design a dignified, trust-inspiring **Artisan Digital Identity / Pehchan ID screen** (390×844px) for KalaSetu. This screen shows the artisan's verified government digital identity. Background Saffron Cream (#FFFBF2).
>
> **Profile Hero Section** (top 35%, Indigo Glow gradient card full-width, 0px top radius, 32px bottom radius):
> - Background pattern: Subtle block-print repeat pattern in white/10% opacity
> - Large circular avatar (96px, white border 3px, marigold gold outer ring) — artisan illustration face
> - "Radha Devi" Poppins Bold 22px white
> - "Master Weaver • Varanasi, UP" Inter 14px white/80%
> - Row of 3 verified badge pills: "🏛️ Pehchan ✓" sage | "📋 Udyam ✓" indigo | "🆔 Aadhaar ✓" marigold — all white background, small font
>
> **Digital Identity Card** (white card, 24px radius, elevated shadow — styled like a physical ID card):
> - Top bar: Marigold gold stripe with KalaSetu logo left + "MoSJE ARTISAN ID" right in white caps Poppins SemiBold 12px
> - Photo section left (60px circle): artisan mini-avatar
> - Details right: 
>   - Pehchan ID: "KST-UP-2024-00142" in Poppins Bold 14px Indigo
>   - Craft: "Handloom Weaving — हस्तशिल्प बुनाई" 
>   - Category: "SC — Scheduled Caste" sage green badge
>   - District: "Varanasi, Uttar Pradesh"
>   - Craft Cluster: "Banarasi Silk GI Cluster"
> - Bottom bar: QR code (60px) right + "Scan to verify authenticity" caption
>
> **Stats Grid** (2×2, white cards):
> 1. "12 Products" marigold
> 2. "₹2.4L Revenue" sage green  
> 3. "3 B2B Buyers" indigo
> 4. "4.8★ Rating" terracotta star
>
> **Settings List** (white card, 16px radius):
> - Edit Profile | Language Preference | Bank Account | Notifications | Help & Support | Logout
> - Each row: icon (marigold) + label + right chevron. Alternating subtle background rows.

---

## 📱 SLIDE 10 — B2B Buyer View (Product Detail)

**Screen ID**: `product-detail`  
**Route**: `/product/[id]`

**Prompt**:
> Design a premium **Product Detail page** (390×844px) optimized for both artisan sellers and B2B wholesale buyers. Background Cloud White (#FFFFFF).
>
> **Image Carousel Header** (full-width, 340px tall, no top padding — edge to edge):
> - Main image: large, high quality craft photo (handwoven dupatta) on warm cream background
> - Bottom overlay: gradient fade (transparent to black/60%) with product name overlaid in white
> - Left/right arrow buttons for image navigation (white circle buttons with shadow)
> - Image counter pill (top-right): "1/3" — white background, Inter 12px gray
> - Back button (top-left): white circle, back arrow icon
> - Share button (top-right): white circle, share icon
> - "✨ AI Enhanced Photo" badge (bottom-left of image): marigold gold pill with sparkle icon
>
> **Content Section** (scrollable below image):
> - **Title Row**: "Handwoven Banarasi Silk Dupatta" Poppins Bold 20px Indigo; "हस्तनिर्मित बनारसी रेशमी दुपट्टा" Devanagari 14px Terracotta
> - **Tags Row**: "🏷️ GI Varanasi Silk" indigo pill | "#HandmadeInIndia" terracotta | "#VocalForLocal" sage | "ONDC ✓" green
> - **Price Section** (white card, 16px radius, marigold left border):
>   - "B2C Retail" label + "₹1,850" Poppins Bold 28px Marigold
>   - "B2B (50+ units)" + "₹1,202/pc" Poppins SemiBold 20px Indigo
>   - "Export" + "₹2,498" Poppins SemiBold 18px Sage
>   - "Wage-compliant pricing — Fair Trade Certified" caption + green checkmark
> - **Artisan Info Row** (horizontal): Artisan avatar (40px circle) + "By Radha Devi, Varanasi" Inter 14px + "Verified Seller ✓" sage badge + "4.8★" (22 reviews) on right
> - **Description Tabs** (English | हिन्दी — tab toggle): Tab content below in Inter 14px gray
> - **Care Instructions**: Leaf icon + care tips in a sage green tinted box
>
> **Sticky CTA Footer** (white background, safe area bottom):
> - Left: "Send B2B Inquiry" outlined Indigo button
> - Right: "🛒 Add to Order" Sunrise Gradient button, white text Poppins Bold

---

## 📱 SLIDE 11 — Receipts & Invoice Screen

**Screen ID**: `receipts`  
**Route**: `/receipts`

**Prompt**:
> Design a professional **Digital Receipts & Invoice screen** (390×844px) for KalaSetu. Background Saffron Cream (#FFFBF2).
>
> **Header**: Back arrow + "Receipts & Invoices — रसीद" Poppins Bold 20px Indigo + "Generate New" marigold text button right.
>
> **Invoice Card Preview** (full-width white card, 24px radius, elevated shadow — looks like a real invoice):
> - Top header stripe: Sunrise Gradient, KalaSetu logo (white diya) left, "TAX INVOICE" right white text
> - Invoice details grid: Invoice #KST-2024-0892 | Date: 08 Sep 2024 | GSTIN (if applicable)
> - Bill To section: Buyer name, org, address in gray
> - Product line items table: Product name | Qty | Unit Price | Total — with alternating white/saffron cream rows
> - Subtotal, Tax, **Grand Total** (Poppins Bold 22px Marigold)
> - Footer: "Digitally verified by KalaSetu | MoSJE Platform | kalasethu.gov.in"
> - QR code bottom-right (scan to verify)
> - "Download PDF" sage gradient button full-width below card
>
> **Past Invoices List** (below):
> - Section header: "Past Invoices — पिछली रसीदें" SemiBold 16px + filter pills (All | Paid | Pending)
> - Invoice row cards (white, 12px radius): Invoice number + buyer name + date + amount (marigold) + status badge (green "Paid" or amber "Pending") + right arrow. Each row has a subtle colored left stripe (green=paid, amber=pending).

---

## 📱 SLIDE 12 — Notifications & Activity Feed

**Screen ID**: `notifications`  
**Route**: `/notifications`

**Prompt**:
> Design a lively **Notifications & Activity Feed screen** (390×844px) for KalaSetu artisan app. Background Cloud White (#FFFFFF).
>
> **Header**: "Notifications — सूचनाएं" Poppins Bold 22px Indigo. Right: "Mark all read" marigold text button + settings gear icon.
>
> **Unread Section** (grouped):
> - Group header: "New — नई" Inter SemiBold 13px uppercase gray + orange dot
> - **Notification Card** (white, 14px radius, left border stripe, soft shadow — unread ones have very pale marigold background tint #FFF8ED):
>   - Types with distinct left border colors:
>     - 🟡 **Order**: Marigold border — "New B2B Inquiry!" from Ritu Exports for 50 dupatta units. Time: 2 min ago
>     - 🟢 **ONDC**: Sage border — "Product 'Banarasi Dupatta' is now LIVE on ONDC Network ✓" — 15 min ago
>     - 🔵 **AI**: Indigo border — "Your catalog has been AI-enhanced and is ready to publish" — 1 hr ago
>     - 🟠 **Scheme**: Terracotta border — "🏛️ You qualify for PM Vishwakarma! ₹15,000 grant available" — Today
>   - Each card: Icon (left, 44px colored circle) + Title (SemiBold 14px Indigo) + Body (Inter 13px gray, 2 lines) + Time (caption 11px gray) + Optional action button right (small outlined pill)
>
> **Read Section** (below, grouped, lighter appearance):
> - Group header: "Earlier — पहले" 
> - Same card layout but with white background (no tint) and thinner left border
>
> **Empty State** (when no notifications): Centered illustration of a sleeping clay owl on a branch + "All caught up! — सब अप-टू-डेट है 🎉" Poppins Medium 18px Indigo + "No new notifications" caption gray.

---

## 📱 SLIDE 13 — Developer Portal / API Gateway Dashboard (localhost:3000)

**Screen ID**: `api-gateway`  
**Route**: `http://localhost:3000/` (Browser web page, NOT mobile)

**Prompt**:
> Design a sleek **API Gateway Developer Portal** web page (browser, desktop viewport 1200px wide) for KalaSetu's backend. This is seen by developers accessing port 3000 directly.
>
> **Theme**: DARK mode — background #0B0F19, card backgrounds #161E2E. Accent: Marigold Gold #F5A623 + Sage Green #34D399 + Sky Blue #38BDF8. Typography: JetBrains Mono (monospace) for API paths, Inter for body.
>
> **Header**: Full-width dark bar — KalaSetu diya logo (gold glow) left + "KalaSetu API Gateway" Inter Bold 22px white center + "API GATEWAY ONLINE" sage green animated pulse badge right.
>
> **Alert Banner**: Amber/orange gradient banner spanning full width — "📱 Looking for the Artisan Mobile App? → Open http://localhost:8082" with a prominent gold "Open App →" button.
>
> **Stats Row** (4 stat cards, dark background #161E2E, gold border highlight):
> - "13 API Endpoints" | "< 250ms Response" | "Mock DB Mode" (amber) | "Node.js v24 LTS"
>
> **Endpoints Grid** (2-column, dark cards): Each endpoint card shows:
> - HTTP method badge (GET=blue, POST=green, DELETE=red pill)
> - API path in JetBrains Mono: `/api/catalog/generate`
> - One-line description
> - "Try it →" sage green button (links to actual endpoint)
>
> **Architecture Diagram Section**: Simple horizontal flowchart: [Expo RN App] → [Express Gateway :3000] → [OpenAI GPT-4o | Remove.bg | Bhashini ASR] — boxes connected by animated dashed arrows in gold.
>
> **Footer**: Dark, KalaSetu logo + "Smart India Hackathon 2024 | MoSJE | PS ID: 26090" centered gray caption.

---

## 🎨 SLIDE 14 — Design System / Component Library Reference

**Screen ID**: `design-system`  
**Type**: Reference sheet for implementation

**Prompt**:
> Create a comprehensive **UI Component Library reference sheet** (1200px wide, tall infographic/poster format) for KalaSetu's design system. Warm white background (#FFFBF2).
>
> **Section 1 — Color Palette**: 8 color swatches in a horizontal row — each is a 100×80px rounded rectangle showing the color fill, hex value below, and name below that. Colors: Marigold Gold, Terracotta, Indigo Blue, Sage Green, Saffron Cream, Cloud White, Blush Pink, Sky Lavender.
>
> **Section 2 — Typography**: Show each font style with sample Hindi + English text pairs:
> - H1 Poppins Bold 28px / H2 22px / Body Inter 15px / Hindi Devanagari 16px / Caption 12px / Badge 11px uppercase
>
> **Section 3 — Buttons**: Row of button variants: Primary Sunrise Gradient | Secondary Outlined Indigo | Ghost | Danger Red | Success Sage | Disabled Gray
>
> **Section 4 — Cards**: Show small examples of: Stats Card | Product Card | Notification Card | Invoice Card — each floating with shadow
>
> **Section 5 — Badges & Tags**: Show all tag/badge types: "ONDC ✓" sage | "Pehchan Verified" indigo | "GI Tag" gold | "SC/ST" lavender | "AI Enhanced ✨" pink | "LIVE" green pulse
>
> **Section 6 — Icons**: 12 app icons in 2 rows: Camera | Mic | Sparkle/AI | ONDC | GeM | WhatsApp | Chart | Profile | Diya | Rupee | Location | QR Code — all in marigold/indigo style, rounded 12px containers.
>
> **Section 7 — Indian Craft Decorative Elements**: Block-print border, mandala pattern, paisley divider, kolam-inspired dot grid — all in terracotta/marigold color, shown as strip samples.
>
> **Footer bar**: KalaSetu logo + "Design System v1.0 | SIH Grand Finale 2024 | Heritage & Culture Theme"

---

## 📋 IMPLEMENTATION NOTES FOR STITCH

### Slide Sequence (Suggested Order)
1. **Slide 14** — Design System first (foundation)
2. **Slide 1** — Splash/Onboarding
3. **Slide 2** — Login
4. **Slide 3** — Home Dashboard
5. **Slide 4** — AI Studio (Create)
6. **Slide 5** — Catalog Result
7. **Slide 6** — Inventory
8. **Slide 7** — ONDC Market
9. **Slide 8** — Impact Analytics
10. **Slide 9** — Profile / Pehchan ID
11. **Slide 10** — Product Detail (B2B)
12. **Slide 11** — Receipts
13. **Slide 12** — Notifications
14. **Slide 13** — Developer Portal (Web)

### Key Content & Data to Use in All Screens
```
Artisan Name     : Radha Devi
Location         : Varanasi, Uttar Pradesh
Craft            : Handloom Weaving (Banarasi Silk)
Pehchan ID       : KST-UP-2024-00142
Category         : SC (Scheduled Caste)
Earnings/month   : ₹24,500
Wage Premium     : +250% above statutory minimum
GI Tag Product   : Banarasi Silk Dupatta
Price (B2C)      : ₹1,850
Price (B2B)      : ₹1,202 (50+ units)
Price (Export)   : ₹2,498
ONDC Status      : LIVE (8 products)
Government Scheme: PM Vishwakarma (₹15,000 grant)
```

### Fonts to Load (Google Fonts)
```
https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600&family=Noto+Sans+Devanagari:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap
```

### Cultural Motif Notes
- Use **block-print patterns** (Sanganer style) as subtle background textures
- Use **paisley (बूटा)** as decorative dividers
- Use **mandala** as hero background decorations (low opacity, terracotta or marigold)
- Use **rangoli-inspired dot grids** as section separators
- Craft category icons should reflect: Handloom Textiles | Pottery (Terracotta) | Woodcraft | Jewellery | Paintings (Madhubani style)
