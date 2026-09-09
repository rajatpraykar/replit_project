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

---

---

# 🖥️ DESKTOP WEBSITE DESIGN PROMPTS (1440px Wide)
> **Format**: Full desktop browser, 1440×900px viewport  
> **Layout**: 12-column CSS Grid, max-content-width 1280px, centered  
> **Theme**: Same light & colourful palette — Saffron Cream bg, Marigold Gold CTAs, Indigo headings  
> **Navigation**: Fixed top navbar (72px tall, white background, subtle bottom shadow)  
> **Sidebar**: 240px left sidebar on dashboard pages  
> **Breakpoints defined**: 1440px (design target) → 1280px → 1024px → 768px (tablet)

---

## 🖥️ WEB SLIDE 1 — Public Marketing Landing Page (Homepage)

**Screen ID**: `web-landing`
**URL**: `http://localhost:8082/` or `kalasethu.in`
**Viewport**: 1440×900px desktop

**Prompt**:
> Design a stunning, world-class **marketing landing page** (1440px wide desktop) for **KalaSetu (कलासेतु)** — an AI-powered artisan marketplace for the Smart India Hackathon Grand Finale (MoSJE PS-26090). This page targets both artisans and B2B buyers.
>
> **Fixed Navbar** (72px tall, Cloud White #FFFFFF, 1px bottom border #E5E7EB, sticky on scroll):
> - Far left: KalaSetu diya logo (32px, marigold gold glow) + "KalaSetu" Poppins Bold 22px Indigo + "कलासेतु" Devanagari 14px Terracotta, side by side
> - Center navigation links (Inter Medium 15px Indigo): "Home" | "For Artisans" | "For Buyers" | "ONDC Market" | "Impact" | "About"
> - Active link has marigold gold underline (3px, rounded)
> - Right cluster: Language dropdown (🇮🇳 "हिन्दी ▾") | "B2B Login" outlined indigo button | "Start Free — शुरू करें" Sunrise Gradient pill button
>
> **Hero Section** (full-width, 100vh, split 50/50 left-right layout):
> - **Left half** (Saffron Cream #FFFBF2 background):
>   - Eyebrow badge: "🏆 Smart India Hackathon 2024 Grand Finalist" — lavender pill badge with trophy icon
>   - H1: "From Village Craft to Digital Market — गाँव की कला, डिजिटल बाज़ार" — Poppins ExtraBold 52px Indigo, 2-line, with "Digital Market" underlined in a marigold hand-drawn underline SVG stroke
>   - Body: "AI-powered in 30 seconds: professional photo enhancement, bilingual catalog, fair-trade pricing — distributed directly to ONDC & GeM." — Inter 18px #6B7280, max-width 500px
>   - CTA row: "📸 Create Your First Listing Free" — large Sunrise Gradient button (20px radius, 56px tall, Poppins Bold 17px white) | "▶ Watch Demo" — ghost button with play circle icon
>   - Trust strip below: Row of 5 small badges: "ONDC Certified ✓" | "GeM Seller Ready ✓" | "MoSJE Platform ✓" | "Bhashini AI ✓" | "Remove.bg Studio ✓" — all in gray/sage with checkmarks
> - **Right half** (white background, overflow visible):
>   - Large 3D-perspective mock of a phone (iPhone frame, slight left tilt 15°) showing the Home Dashboard screen (Slide 3) with marigold gradient glowing behind it
>   - Floating UI chips around the phone: "✨ AI Enhanced Photo" card floating top-right | "₹1,850 Fair-Trade Price" card floating bottom-left | "ONDC LIVE 🟢" badge floating right
>   - Behind phone: Large, very light mandala pattern in Saffron (#F5A623, 8% opacity)
>
> **Stats Ticker Strip** (full-width, Indigo Glow gradient #3D405B→#6B6FA8, 72px tall):
> - Horizontal auto-scrolling counter strip (white text): "12,400+ Artisans Registered" | "₹2.4 Crore+ Revenue Generated" | "+250% Avg Wage Premium" | "8 Indian States" | "3 Languages Live" | "ONDC Network Active" — separated by small marigold diya icons
>
> **How It Works Section** (white background, padding 80px 0):
> - Section header: "How KalaSetu Works — कैसे काम करता है" Poppins Bold 38px Indigo, centered; "Three steps. Thirty seconds. Your craft goes global." Inter 18px gray subtitle
> - **3-step horizontal card row** (each card 380px wide, white, 24px radius, shadow, connected by animated dotted orange arrows):
>   1. Card 1 (marigold top accent border): Illustration of hand holding phone photographing pottery | Step number "01" large Poppins Black 64px light marigold | "📸 Snap Your Craft" H3 Bold | "Just take a photo with your phone. AI removes background and creates a studio-grade professional image." body text | "AI Vision ✨" marigold chip
>   2. Card 2 (indigo top accent): Illustration of artisan speaking into mic | "02" | "🎙️ Speak in Your Language" | "Say your craft story in Hindi, Marathi, Bengali, or 4 other regional languages. Bhashini AI transcribes and generates bilingual SEO catalog." | "Bhashini ASR 🇮🇳" indigo chip
>   3. Card 3 (sage top accent): Illustration of rupee coins and online marketplace logos | "03" | "🌐 Publish & Earn" | "One tap lists your craft on ONDC Network and GeM with correct HSN codes, GI tags, and SC/ST reserved seller quotas." | "ONDC + GeM 📤" sage chip
>
> **Features Deep-Dive Section** (alternating left-right layout, Saffron Cream background, 80px padding each):
> - **Feature A** (text left, visual right):
>   - Left: "AI-Powered Fair-Trade Pricing Engine" H2 Bold Indigo | Body explaining wage compliance formula | "State: UP → ₹240 base → ×3.5 skilled → ₹87.5/hr" code-style callout box in #F0F4FF | "+250% above minimum wage" sage green badge
>   - Right: Beautiful animated price calculator UI card — sliders for "Making Hours" and "Material Cost", live updating 3-tier price display (B2C / B2B / Export) with color-coded results
> - **Feature B** (visual left, text right):
>   - Left: Split-screen product photo — before (raw photo on floor) vs after (AI studio white background with shadow)
>   - Right: "Studio-Grade Photo in Seconds" H2 | Body about Remove.bg + DALL-E 2 pipeline | "Zero Photography Skills Needed" badge
> - **Feature C** (text left, visual right):
>   - Left: "Direct ONDC & GeM Distribution" H2 | Body about Beckn Protocol 1.1.0, HSN codes, MSE reservations
>   - Right: Mockup of ONDC beckn JSON payload in a styled code block (dark background, syntax-highlighted) with "Live on Paytm, Mystore, Pincode" logos below
>
> **Impact / Social Proof Section** (white background, 80px padding):
> - Header: "Real Impact for Real Artisans — असली बदलाव" Poppins Bold 38px Indigo
> - **Artisan Testimonial Cards** (horizontal 3-column grid):
>   Each card (white, 24px radius, shadow, 380px wide): Artisan illustration avatar (80px circle, marigold ring) | Quote in italic Poppins Medium 16px | Hindi translation in Devanagari 14px Terracotta | Name + Location + Craft (bold 14px Indigo + caption gray) | Star rating row (5 marigold stars) | "SC • Varanasi, UP" sage badge
> - **Government Schemes Banner** (below testimonials, full-width sage gradient #81B29A→#A8D5BA, 24px radius): "🏛️ Eligible Artisans Access: PM Vishwakarma | AHVY Scheme | MUDRA Shishu | GeM MSE Exemption" — white text | "Check Your Eligibility →" white button
>
> **CTA Section** (full-width, Sunrise Gradient #F5A623→#E07A5F, 200px tall, centered):
> - "Ready to Take Your Craft to the World?" Poppins Bold 40px white
> - "Join 12,400+ artisans already earning more." Inter 18px white/80%
> - Two buttons: "📸 Create Free Account" white button with indigo text | "🛒 I'm a B2B Buyer" outlined white button
>
> **Footer** (Indigo #3D405B background, white text, 4-column layout):
> - Col 1: KalaSetu diya logo + mission tagline + social icons (Twitter, Instagram, YouTube, LinkedIn)
> - Col 2: "Platform" links — For Artisans | For Buyers | ONDC | GeM Export | Analytics
> - Col 3: "Resources" — Documentation | API Docs | SIH Project Report | Brain.md | GitHub
> - Col 4: "Government" — MoSJE | ONDC Network | GeM Portal | PM Vishwakarma | Bhashini
> - Bottom bar: "© 2024 KalaSetu | Smart India Hackathon Grand Finale | PS ID: 26090 | Ministry of Social Justice & Empowerment" — center, caption white/50%

---

## 🖥️ WEB SLIDE 2 — Artisan Web Dashboard (Logged In)

**Screen ID**: `web-artisan-dashboard`
**URL**: `/dashboard`
**Viewport**: 1440×900px desktop, sidebar layout

**Prompt**:
> Design a comprehensive **Artisan Web Dashboard** (1440px wide) for KalaSetu. Artisan is "Radha Devi" from Varanasi, UP. Background Saffron Cream (#FFFBF2). Sidebar + main content layout.
>
> **Fixed Left Sidebar** (240px wide, Cloud White #FFFFFF, right border 1px #E5E7EB, full-height):
> - Top: Artisan avatar (56px circle, marigold ring) + "Radha Devi" Poppins SemiBold 15px Indigo + "Varanasi, UP" caption + "Pehchan Verified ✓" sage chip
> - Navigation items (each 48px tall, 16px horizontal padding, 10px radius on hover/active):
>   - 🏠 Dashboard (active — marigold gold background, white text, left 4px marigold border)
>   - 📸 AI Studio
>   - 📦 My Products
>   - 🌐 ONDC Market
>   - 💰 Invoices
>   - 📊 Analytics
>   - 🏛️ Schemes
>   - 👤 Profile
> - Bottom section: "Support — सहायता" link + version "v2.1.0" caption
>
> **Top Bar** (full-width across content area, 72px, white, shadow):
> - Breadcrumb: "Dashboard" Poppins SemiBold 20px Indigo
> - Right: Search bar (300px, "Search products, orders..." placeholder) | Notification bell (badge "3") | Language toggle | Avatar dropdown
>
> **Main Content** (padding 32px, 12-column grid):
>
> **Row 1 — KPI Cards** (4 equal columns):
> - Card 1 (white, 20px radius, marigold top accent 4px): "₹24,500" Poppins Bold 36px Marigold | "Monthly Earnings" caption | "▲ +18% vs last month" small green badge
> - Card 2 (white, indigo top accent): "12" Bold 36px Indigo | "Total Products" | "8 ONDC Live 🟢"
> - Card 3 (white, sage top accent): "+250%" Bold 36px Sage | "Wage Premium" | "Above UP minimum wage"
> - Card 4 (white, terracotta top accent): "7" Bold 36px Terracotta | "B2B Inquiries" | "3 new this week"
>
> **Row 2 — Charts (8 cols) + Quick Actions (4 cols)**:
> - **Earnings Chart Card** (8 cols, white, 20px radius): "Monthly Earnings Trend" header | 12-month area chart (area fill in marigold/20% opacity, line in #F5A623) | Hover tooltip showing exact amount | Time range pills: "3M | 6M | 1Y"
> - **Quick Actions Card** (4 cols, white, 20px radius): "Quick Actions" header | Vertical list of 4 action buttons (each full-width, 48px, left icon + text): "📸 Create New Listing" (Sunrise Gradient) | "📤 Export GeM CSV" (sage outlined) | "🔄 Sync to ONDC" (indigo outlined) | "📄 Generate Invoice" (gray outlined)
>
> **Row 3 — Products Table (8 cols) + Scheme Alerts (4 cols)**:
> - **Products Table** (white card): Sortable table header (Product | Category | Price | ONDC | Views | Actions) | 5 rows showing real products with tiny thumbnail, name+hindi name, price, ONDC toggle switch (green on/off), view count, "Edit | Share" action buttons | "View All 12 Products →" link at bottom
> - **Scheme Eligibility** (4 cols, white card): "🏛️ Government Schemes" header | 3 scheme cards stacked: each shows scheme name, benefit amount, eligibility badge, "Apply Now →" marigold link
>
> **Row 4 — Recent B2B Inquiries** (full width, white card):
> - Table: Buyer | Organization | Product | Quantity | Quote | Date | Status | Action
> - 3 rows with real buyer data, status badges (New=amber, Quoted=indigo, Accepted=sage), "Reply" and "Send Quote" buttons

---

## 🖥️ WEB SLIDE 3 — B2B Buyer Portal / Marketplace

**Screen ID**: `web-buyer-marketplace`
**URL**: `/marketplace`
**Viewport**: 1440×900px desktop

**Prompt**:
> Design a premium **B2B Buyer Marketplace** web page (1440px) for KalaSetu — where wholesale buyers, export houses, and retail chains browse and bulk-order handmade crafts from verified Indian artisans. Clean, professional, trust-inspiring. Background Cloud White (#FFFFFF).
>
> **Navbar** (same as landing page but with "B2B Buyer Mode" amber badge visible, and "My Orders" replacing artisan-specific links)
>
> **Hero Search Banner** (full-width, 280px tall, Indigo Glow gradient background, centered):
> - Headline: "Source Authentic Indian Handmade Crafts at Wholesale Prices" Poppins Bold 36px white
> - Sub: "2,400+ verified SC/ST/OBC/Women artisans | GI Tagged | ONDC Certified" Inter 16px white/80%
> - Large search bar (800px wide, white, 14px radius, 56px tall): Placeholder "Search crafts, artisans, GI tags, states..." | Right side: Category dropdown "All Categories ▾" | "🔍 Search" Sunrise Gradient button
> - Below search: Quick filter pills (white outline): "🏷️ GI Tagged" | "Varanasi Silk" | "Terracotta" | "Madhubani Art" | "Wooden Craft" | "Block Print" | "Handloom"
>
> **Filter Sidebar (280px) + Product Grid (3 cols)**:
> - **Filter Sidebar** (left, white card, 20px radius):
>   - "Filters" header + "Clear All" link
>   - Category accordion: Textiles (checkboxes) | Pottery | Jewellery | Woodcraft | Paintings
>   - State filter: Multi-select pills for 10 major states
>   - Price Range: Dual handle range slider (marigold) — B2B Wholesale ₹200 to ₹5,000
>   - GI Tag: Toggle switch (marigold on/off)
>   - Artisan Category: SC | ST | OBC | Women — checkboxes with sage highlight
>   - Min Order Qty: Input field
>   - "Apply Filters" Sunrise Gradient button full-width
>
> - **Product Grid** (3 columns, each card white, 20px radius, shadow, hover: slight scale-up + deeper shadow):
>   Each Product Card (360px wide):
>   - Image (100% width, 240px tall, object-cover, rounded top corners): Product photo + "GI ✓" gold badge overlay + "ONDC ✓" green badge overlay
>   - Body padding 16px: Product name Poppins SemiBold 16px Indigo | Hindi name Devanagari 13px Terracotta | Artisan name + location (avatar 24px + "Radha Devi, Varanasi") | Tags row: craft category chip + material chip
>   - Price section: "B2B: ₹1,202 / pc" Bold 20px Indigo | "Min. 50 units" caption gray | "Retail: ₹1,850" small strikethrough gray
>   - Footer row: "★ 4.8 (22)" left | "💬 Inquire" outlined indigo button | "🛒 Add to RFQ" Sunrise Gradient button right
>
> **Pagination**: Centered, page numbers with marigold active state

---

## 🖥️ WEB SLIDE 4 — AI Studio (Web Desktop Version)

**Screen ID**: `web-ai-studio`
**URL**: `/studio`
**Viewport**: 1440×900px desktop

**Prompt**:
> Design a powerful, exciting **AI Studio web page** (1440px) for KalaSetu — the desktop version of the AI catalog generation feature. Split-panel workspace layout. Background #FFFBF2.
>
> **Left Panel** (640px, Workspace Input Area):
> - Panel header: "✨ AI Studio — कला स्टूडियो" Poppins Bold 22px Indigo + "Powered by GPT-4o Vision + Bhashini" small caption badge
> - **Step 1 — Upload Photo** (white card, 20px radius):
>   Large drag-and-drop zone (full width, 280px tall, dashed 2px marigold border, animated dash-offset): Center — cloud upload icon (64px marigold) + "Drag & drop your craft photo here" Poppins Medium 18px Indigo + "or click to browse files" caption + "Supports JPG, PNG, HEIF up to 20MB" fine print | Four corner block-print flower decorations in terracotta
>   When image uploaded: Full image preview fills the box with a "✓ Ready" sage badge top-right, "Change Photo" ghost link top-left, and "Before/After Preview" toggle
> - **Step 2 — Describe Your Craft** (white card, 20px radius):
>   - Language selector row: 7 tabs (हिन्दी | Marathi | বাংলা | ગુજ | தமிழ | TE | EN) — active tab: marigold underline
>   - Big textarea (6 rows): "Describe your craft materials, making time, and special story..." placeholder in Devanagari script | Character count bottom-right
>   - OR divider with mic button: Large circular mic (72px, Sunrise Gradient) "🎙️ Click to Record — बोलकर बताएं" | Waveform animation when recording (20 animated bars in marigold/terracotta/indigo)
>   - Real-time transcription box below: shows transcribed text as user speaks
> - **Generate Button**: Full-width, 56px, Sunrise Gradient, Poppins Bold 18px white: "⚡ Generate AI Catalog — AI से लिस्टिंग बनाएं"
>   Shimmer animation sweeping left to right on hover.
>
> **Right Panel** (800px, Results Area):
> - **Before → After Photo Strip** (side by side, each 340px):
>   - Left: "Original" label (gray pill) + raw artisan photo (warm shadow)
>   - Center: Animated arrow with "AI Studio ✨" text and sparkle particles
>   - Right: "Enhanced ✓" label (sage pill) + professional studio photo (crisp white bg, drop shadow)
> - **Generated Catalog Card** (white, 20px radius, full width below photos):
>   - English section: Editable title field (Poppins SemiBold 18px Indigo, inline edit on click) | Editable description textarea | Tag pills (editable, each with ×)
>   - Hindi section (sage green left border): Editable Hindi title | Editable Hindi description
>   - GI Tag + Care Tips fields
> - **Pricing Panel** (white card, 3-column pricing display with visual bar chart showing markup breakdown)
> - **Publish Row** (bottom, sticky in panel): "📤 Publish to ONDC & GeM" Sunrise Gradient large button | "💾 Save Draft" outlined | "📋 Copy" outlined | "📤 Share" outlined

---

## 🖥️ WEB SLIDE 5 — Impact Analytics & MoSJE Dashboard (Desktop)

**Screen ID**: `web-analytics`
**URL**: `/analytics`
**Viewport**: 1440px desktop, sidebar layout

**Prompt**:
> Design an inspiring, data-rich **Impact Analytics Dashboard** (1440px desktop) for KalaSetu — showing platform-wide MoSJE socio-economic impact metrics. Designed to impress SIH jury and government officials. Background Saffron Cream (#FFFBF2). Sidebar layout.
>
> **Page Header** (full-width content area): "Platform Impact — MoSJE Socio-Economic Dashboard" Poppins Bold 28px Indigo | "Real-time metrics proving dignified livelihood uplift for marginalized artisans" Inter 15px gray | Right: "📄 Download Report" sage button + "June 2024" date range picker
>
> **Row 1 — Hero KPI Strip** (4 large impact cards, white, 24px radius):
> - "+250%" giant Poppins Black 56px Marigold | "Average Wage Premium" | "vs State Statutory Minimum" | Progress bar full in marigold
> - "₹2.4 Cr" giant Bold 56px Sage | "Total Revenue Generated" | "12,400 artisans"
> - "100%" giant Bold 56px Indigo | "Middleman Elimination" | "Direct market linkage"
> - "8 States" giant Bold 56px Terracotta | "Geographic Reach" | "Across India"
>
> **Row 2 — Charts (two-thirds + one-third split)**:
> - **Left (two-thirds)** — Large area chart (white card): "Monthly Revenue & Wage Trend" — dual-axis chart: area in marigold/20% (revenue), line in sage (wage premium %). 12-month data. Tooltip on hover. Time period toggle: 3M | 6M | 1Y | All
> - **Right (one-third)** — Donut chart (white card): "Artisan Category Distribution" — SC (blue) 40% | ST (sage) 25% | OBC (marigold) 25% | Women (pink) 10%. Legend with actual counts below.
>
> **Row 3 — State Heatmap + Craft Category Bars**:
> - **Left** — India state choropleth map (simplified SVG, white card): States colored in marigold intensity scale by artisan count. Hover shows state name + artisan count + avg income. Color legend bar at bottom (light marigold → deep marigold).
> - **Right** — Horizontal bar chart (white card): "Top Craft Categories by Revenue" — 6 bars (Handloom, Terracotta, Woodcraft, Jewellery, Painting, Other) in alternating marigold/indigo/sage colors.
>
> **Row 4 — Government Schemes + Fair-Trade Formula Explainer**:
> - **Left** — Scheme Impact Table (white card): Table showing scheme name | Eligible artisans | Applied | Benefit disbursed | Status badge (Active/Pending)
> - **Right** — Fair-Trade Formula Visual Card (white card, marigold header): Step-by-step formula breakdown as a visual flowchart: State Wage → × Skilled Multiplier → + Material → + Packaging → × Complexity → = Retail Price. Each step in a colored box connected by arrows.

---

## 🖥️ WEB SLIDE 6 — Public Product Catalog / Marketplace Browse Page

**Screen ID**: `web-product-catalog`
**URL**: `/products`
**Viewport**: 1440px desktop

**Prompt**:
> Design a beautiful **Public Product Catalog** page (1440px desktop) for KalaSetu — like a premium Indian craft e-commerce site. Background Cloud White. This page is for any visitor browsing handmade crafts.
>
> **Sticky Top Category Bar** (below navbar, 64px, white, border-bottom):
> Full-width horizontally scrollable category strip with 8 category pills (each has icon + label, 48px tall, 20px radius):
> - 🧵 Handloom Textiles (active — Sunrise Gradient fill, white text) | 🏺 Terracotta | 💎 Jewellery | 🪵 Woodcraft | 🎨 Madhubani | 🧣 Stoles & Dupattas | 🛕 Décor | 🌿 Eco Craft
>
> **Hero Subcategory Banner** (full-width, 200px tall, block-print patterned background in marigold, dark overlay):
> - "Handloom Textiles — हस्तशिल्प वस्त्र" Poppins Bold 36px white center | "2,340 products from 847 verified artisans" caption white/70% | "GI Tagged | Directly from Artisans | Fair Trade" 3 white badge pills
>
> **Sort/Filter Bar** (full-width, white, 56px tall, border-bottom):
> - Left: "2,340 Products" text
> - Right: "Sort by: ▾ Most Popular" dropdown | "Price ▾" | "State ▾" | "GI Tag ▾" | Toggle between Grid/List view icons
>
> **Main Grid (4 columns)**:
> Each card (white, 20px radius, shadow, 320px wide, hover scale-up):
> - Product image (full width, 220px tall, object-cover, warm cream bg for crafts): GI badge overlay top-left | ONDC badge top-right | "AI Enhanced ✨" shimmer ribbon bottom-left
> - Body: Craft name Poppins SemiBold 15px Indigo | Hindi name Devanagari 12px Terracotta | Artisan avatar (28px) + name + state location | Tags row (2 tags max, pill chips)
> - Price: "₹1,850" Poppins Bold 22px Marigold | "B2B: ₹1,202 (50+)" small gray below | Star rating + review count
> - CTA row: "🛒 Add to Cart" Sunrise Gradient button (full-width) | "💬 B2B Inquiry" text link
>
> **Pagination + Load More**: Centered pagination numbers (active = marigold filled) + "Load More Crafts" ghost button

---

## 🖥️ WEB SLIDE 7 — About KalaSetu / Project Story Page

**Screen ID**: `web-about`
**URL**: `/about`
**Viewport**: 1440px desktop

**Prompt**:
> Design a heartfelt, visually storytelling **About KalaSetu** page (1440px desktop) that communicates the mission, problem, and solution for SIH jury, government officials, and media. Long-scroll page with bold editorial sections.
>
> **Hero Section** (full-width, 500px tall, Sunrise Gradient background):
> - Centered: "The Bridge Between Ancient Craft and Modern Market" Poppins ExtraBold 52px white
> - Subtitle: "कलासेतु — कला और बाज़ार के बीच का पुल" Devanagari 22px white/80%
> - Scroll-down arrow animation (white chevron bouncing) at bottom
> - Background: Beautiful watercolour-style block-print mandala pattern in white/15% opacity across full width
>
> **Problem Section** (white background, 80px padding, 2-column):
> - Left: Illustrated scene of an artisan at a crowded physical mela (craft fair) with a sad expression, surrounded by middlemen taking money | Caption: "Before KalaSetu"
> - Right: 5 numbered problem cards (stacked, white, left-colored border): 1. Low Digital Literacy (terracotta) | 2. Language Barrier (indigo) | 3. Bad Photography (marigold) | 4. Predatory Middlemen (red) | 5. Arbitrary Pricing (amber) — each with icon + bold stat ("40-60% margin stolen by middlemen")
>
> **Solution Section** (Saffron Cream, alternating 3 features, same layout as landing page Feature Deep-Dive):
> - AI Catalog Generator | Fair-Trade Pricing | ONDC Distribution — with product screenshots
>
> **Technology Stack Section** (white, centered, 80px padding):
> - "Built With" header Poppins Bold 32px Indigo
> - 3-row tech logo strip with labels: Frontend: Expo SDK 57 | React Native 0.86 | TypeScript | Backend: Node.js | Express 5 | TypeScript | AI Services: OpenAI GPT-4o Vision | Bhashini ASR | Remove.bg | Government: ONDC Beckn 1.1.0 | GeM CSV | MoSJE Analytics
> - Architecture diagram: Clean flowchart (Expo App → API Gateway → AI Services / DB / ONDC) in white card with colored connection lines
>
> **Team Section** (white, centered):
> - "SIH Grand Finale Team" header
> - Team member cards (4, horizontal): Each — circular avatar illustration (80px, marigold ring) | Name Poppins SemiBold 16px | Role Inter 14px gray | Institute caption
>
> **Problem Statement Footer Card** (full-width, Indigo Glow gradient, white text):
> - "SIH 2024 Grand Finale • PS ID: 26090 • Ministry of Social Justice & Empowerment • Heritage & Culture Theme"
> - GitHub | Report | API Docs action links

---

## 🖥️ WEB SLIDE 8 — Artisan Registration / Onboarding Wizard (Web)

**Screen ID**: `web-register`
**URL**: `/register`
**Viewport**: 1440px desktop

**Prompt**:
> Design a friendly, step-by-step **Artisan Registration Wizard** web page (1440px desktop) for KalaSetu. 3-step onboarding form. White background. The form should feel welcoming, not bureaucratic — use warm colors, large text, bilingual labels.
>
> **Left Panel** (480px, fixed, full-height, Sunrise Gradient background):
> - Top: KalaSetu diya logo + name in white
> - Step progress indicator (vertical): 3 steps connected by a vertical line — Step 1 "Personal Details" (active, white circle filled) → Step 2 "Craft & Identity" → Step 3 "Digital ID Setup". Completed steps show a sage green check.
> - Below progress: Motivational text block — Quote from an artisan in Italic white + Hindi translation | "Join 12,400+ artisans" + small artisan avatar cluster (5 overlapping circles showing illustrated faces)
> - Bottom: "Need help? — सहायता चाहिए?" + phone number + WhatsApp icon, white
>
> **Right Panel** (960px, scrollable, white, 32px padding):
> - **Step 1 — Personal Details** (active):
>   - "Let's get started! — चलिए शुरू करते हैं 🙏" Poppins Bold 28px Indigo
>   - "Enter your details below / नीचे अपनी जानकारी भरें" Inter 16px gray
>   - Form fields (each with Hindi + English label, 48px tall, 12px radius, marigold focus border):
>     - Full Name / पूरा नाम | Mobile Number / मोबाइल नंबर | State / राज्य (dropdown with all states) | District / जिला | Preferred Language / पसंदीदा भाषा (grid of 7 flag+language radio cards)
>   - "Continue — आगे बढ़ें" full-width Sunrise Gradient button 56px
>
> **Step 2 — Craft & Identity** (next state):
>   - Craft Category selector (visual grid of 8 craft type cards with illustrations — each a 160×120px card with icon + label, selected state = marigold border + light fill)
>   - Social Category dropdown (SC | ST | OBC | General | Women) with info tooltip explaining GeM MSE benefits
>   - Udyam / Aadhaar optional fields with "Why we ask this →" expandable info
>
> **Step 3 — Digital ID Setup** (final state):
>   - Preview of generated Pehchan ID card (styled like physical ID card, showing filled details) with QR code
>   - "Confirm & Register — पुष्टि करें" button
>   - Success state: Confetti animation + "Welcome to KalaSetu, Radha Devi! 🎉" + next steps checklist

---

---

## 🖥️ WEB SLIDE 9 — B2B Product Detail & Wholesale RFQ Workspace

**Screen ID**: `web-b2b-product-detail`  
**URL**: `/products/:id` or `/marketplace/product/:id`  
**Viewport**: 1440×900px desktop  

**Prompt**:
> Design an ultra-premium, high-conversion **B2B Wholesale Product Detail & Request For Quote (RFQ) Workspace** (1440px desktop) for KalaSetu. Tailored for corporate buyers, boutique owners, and international fair-trade importers sourcing Banarasi Silk crafts. Background is Cloud White (#FFFFFF) with warm Saffron Cream (#FFFBF2) accent containers.
>
> **Top Navigation & Breadcrumb Bar** (72px, fixed):
> - Standard KalaSetu desktop navbar with active "ONDC Marketplace" tab.
> - Breadcrumb: "Marketplace > Handloom Textiles > Banarasi Silk > Handwoven Banarasi Silk Dupatta" in Inter 14px Indigo with marigold dividers.
>
> **Main Content Grid** (2-column 55/45 split, max-width 1280px, padding 32px 0):
> - **Left Column (Gallery & Provenance, 680px)**:
>   - **Hero Image Showcase**: 680×460px high-res display card with rounded 24px corners and subtle drop shadow. Shows a handwoven Banarasi Silk Dupatta draped elegantly on natural unbleached raw silk background. 
>   - Floating badging overlay: "🏷️ GI Varanasi Silk Certified" gold badge (top-left), "ONDC Beckn Live 🟢" (top-right), and "✨ AI Enhanced Studio Shot" marigold pill (bottom-left).
>   - **Interactive Zoom & Thumbnail Carousel**: Row of 5 thumbnails (Original raw artisan photo, Loom closeup, Zari metallic weave detail, Artisan weaving portrait, Reverse hand-knotting) with 3px gold ring on active thumbnail.
>   - **Artisan Provenance Story Card** (warm Saffron Cream card, 24px radius, padding 24px):
>     - Header: "Artisan Heritage & Craft Cluster" with miniature block-print lotus icon.
>     - Avatar (64px circular portrait, gold trim) of Radha Devi, Varanasi, UP.
>     - Text: "Master Handloom Weaver with 22 years of heritage practice. 4th-generation weaver family from the Sarai Mohana cluster, Varanasi."
>     - Badges: "MoSJE Pehchan Verified ✓" (sage) | "SC Reserved Enterprise" (lavender) | "Fair-Wage Guaranteed +250%" (gold).
>     - "View Verified Pehchan Profile →" link with arrow.
>
> - **Right Column (Specifications, Pricing Tiers & Bulk RFQ Desk, 560px)**:
>   - **Title & Metadata**:
>     - "Handwoven Banarasi Silk Dupatta — Zari Kadwa Weave" in Poppins Bold 32px Indigo.
>     - "हस्तनिर्मित बनारसी रेशमी दुपट्टा (ज़री कढ़वा बुनाई)" in Noto Sans Devanagari 18px Terracotta.
>     - Rating: 5 marigold stars "4.9/5 (38 B2B buyer reviews)" + "HSN: 5007.20.10".
>   - **Tiered Fair-Trade Wholesale Pricing Table** (white card, 20px radius, 2px sage green border):
>     - Tier 1: "Sample / Retail (1–9 pcs)" — ₹1,850 / pc
>     - Tier 2 (Highlighted): "Wholesale Lot (10–49 pcs)" — ₹1,420 / pc (Save 23%)
>     - Tier 3 (Best Value): "Bulk Export (50+ pcs)" — ₹1,202 / pc (Save 35%)
>     - Transparent wage disclosure callout: "₹87.50/hr guaranteed artisan wage factored into this price."
>   - **Interactive Bulk Order Calculator**:
>     - Quantity input spinner + Preset buttons (+25, +50, +100, +250 pcs).
>     - Live summary box: Subtotal, GST (5% Handloom exemption), Estimated Lead Time ("14 days handcrafted batch production"), and ONDC Logistics Partner options (Delhivery / Blue Dart).
>   - **Dual CTAs**:
>     - Primary: "⚡ Submit Wholesale RFQ / Buy Batch" (Sunrise Gradient pill button, 56px tall, white Poppins Bold).
>     - Secondary: "💬 Chat Directly with Radha Devi (Hindi/Voice Enabled)" (Indigo outline button with audio wave icon).
>   - **Compliance & GI Authenticity Tabs**:
>     - Accordion tabs: Material Specifications (100% Katan Mulberry Silk + Pure Gold-Plated Zari), Care Guide, GeM Tender Eligibility, and Certificate of Origin download link.

---

## 🖥️ WEB SLIDE 10 — Artisan Inventory & Live Stock Command Desk

**Screen ID**: `web-inventory-desk`  
**URL**: `/dashboard/inventory`  
**Viewport**: 1440×900px desktop, sidebar layout  

**Prompt**:
> Design a highly efficient, joyful **Artisan Inventory & Bulk Stock Management Desk** (1440px desktop) for KalaSetu. Empowers artisans and Self-Help Group (SHG) leaders to manage active craft batches, stock alerts, and multi-channel publishing without technical confusion. Background Saffron Cream (#FFFBF2) with sidebar layout.
>
> **Sidebar & Header**:
> - Standard 240px white sidebar with "📦 My Products & Inventory" selected in Marigold Gold.
> - Page Header: "Inventory Command Center — शिल्प भंडार प्रबंधन" Poppins Bold 26px Indigo + "Real-time stock across ONDC, GeM, and WhatsApp Storefront" subtitle.
> - Top Action Bar: "+ Add New Craft (AI Studio)" Sunrise Gradient button | "📤 Bulk GeM Export (CSV)" sage button | "🔄 Sync All Channels" indigo button.
>
> **Stock Metric Ribbon** (4 cards in a row, 12-column grid):
> - Metric 1: "24 Total SKU Listings" | Marigold border | "18 Active in Store"
> - Metric 2: "142 Units in Stock" | Sage border | "Valued at ₹2,14,800"
> - Metric 3: "3 Low Stock Alerts" | Amber border | "Needs handloom weaving re-batch"
> - Metric 4: "9 ONDC Synced" | Indigo border | "Published to Paytm, Mystore, Pincode"
>
> **Interactive Data Table Card** (Cloud White card, 24px radius, padding 24px, 12 columns):
> - **Search & Filter Header**:
>   - Search input with craft icon: "Filter by craft name, HSN code, or GI batch..."
>   - Category filter pills: All (active) | Textiles | Terracotta Pottery | Wood Carvings | Madhubani Art.
>   - Stock status dropdown: In Stock (Green) | Low Stock (Amber) | Out of Stock (Red).
> - **The Master Table**:
>   - Columns: Craft & Thumbnail | Category & HSN | Unit Price (Retail / B2B) | Available Stock | ONDC Channel Status | Monthly Sales | Actions.
>   - Row 1: Banarasi Silk Dupatta | 5007.20.10 | ₹1,850 / ₹1,202 | 18 pcs (Green pill) | Toggle Switch ON (Sage green ONDC badge) | 12 units sold | "Edit | Re-stock | QR Tag" buttons.
>   - Row 2: Terracotta Clay Surahi Pot | 6912.00.10 | ₹450 / ₹280 | 4 pcs (Amber low stock alert) | Toggle Switch ON | 28 units sold | "Edit | Re-stock | QR Tag".
>   - Row 3: Madhubani Tree of Life Canvas | 9701.10.00 | ₹3,200 / ₹2,100 | 0 pcs (Red out of stock) | Toggle Switch OFF | 6 units sold | "Edit | Re-stock | QR Tag".
> - **Batch Bulk Action Footer**:
>   - "3 items selected" | "Set Bulk Discount" | "Export Barcode Labels (PDF)" | "Pause ONDC Listing".
>   - Pagination: "Showing 1–10 of 24 crafts" with marigold numeric pagination buttons.

---

## 🖥️ WEB SLIDE 11 — Orders, Invoicing & Digital Receipts Hub

**Screen ID**: `web-orders-invoices`  
**URL**: `/dashboard/invoices`  
**Viewport**: 1440×900px desktop, sidebar layout  

**Prompt**:
> Design a transparent, legally certified **Digital Orders, Invoicing & Financial Records Hub** (1440px desktop) for KalaSetu. Designed to provide marginalized artisans with verifiable banking records for MUDRA micro-loans and tax-exempt handicraft bookkeeping. Saffron Cream background with clean white data surfaces.
>
> **Top Bar & Summary Ribbon**:
> - Title: "Orders & Tax-Compliant Invoices — आदेश व रसीदें" Poppins Bold 26px Indigo.
> - 3 Quick Stats Cards:
>   - "₹1,84,200" Paid Lifetime Earnings (Sage Green + checkmark)
>   - "₹32,400" Escrow Held / In Transit (Marigold Gold clock icon)
>   - "0% Platform Commission" — MoSJE 100% Direct Artisan Payout Policy
>
> **Split Screen Interactive Layout (70% List / 30% Live Invoice Preview)**:
> - **Left Section (70%, Orders & Invoices Ledger Table)**:
>   - Tab switcher: "All Orders (42)" | "Wholesale RFQs (8)" | "GeM Procurement (4)" | "Completed Invoices (30)".
>   - Filter row: Date range selector (e.g. "Last 90 Days"), Buyer search, and Payment method filter (UPI / NEFT / GeM e-Challan).
>   - Invoice Table:
>     - Invoice ID (e.g. `INV-2024-0482` with link) | Buyer Name & Org ("FabIndia Sourcing Hub, Delhi") | Date | Amount | Payment Status Badge ("Paid via UPI ✓" in sage or "Escrow Secured" in indigo) | Action: "View | Print | PDF".
>     - Interactive row click updates the right-hand live invoice preview instantaneously.
> - **Right Section (30%, Live Digital Tax Invoice & Pehchan Authenticator)**:
>   - Styled as an official government-recognized Tax Invoice document on Cloud White with subtle paper texture.
>   - Top Bar: Marigold & Terracotta dual stripe with KalaSetu Diya crest and "MoSJE Verified Artisan Invoice".
>   - QR Code (Scan to verify on `kalasethu.gov.in/verify`).
>   - Itemized table showing Craft title, HSN code, Quantity, GST @ 5%, and Total Amount.
>   - Bottom Signature Stamp: "Digitally Signed via Aadhaar Pehchan Token: Radha Devi".
>   - Action Buttons: "📥 Download Signed PDF" (Sage Gradient) | "🖨️ Thermal Print Label" | "📲 Send WhatsApp Receipt".

---

## 🖥️ WEB SLIDE 12 — ONDC Beckn Network & GeM Government Procurement Command Center

**Screen ID**: `web-distribution-hub`  
**URL**: `/dashboard/distribution`  
**Viewport**: 1440×900px desktop, sidebar layout  

**Prompt**:
> Design an authoritative, high-tech **ONDC Beckn Protocol & GeM Government Procurement Command Center** (1440px desktop) for KalaSetu. This screen highlights how the platform connects village artisans directly into India's open digital commerce infrastructure and government tenders. Background Saffron Cream with Indigo and Sage accents.
>
> **Top Live Status Header**:
> - Header: "Open Commerce & GeM Procurement Engine" Poppins Bold 26px Indigo.
> - Real-time Network Pulse: Live pulsating green beacon with "Beckn Protocol v1.1.0 Gateway: Active & Connected".
> - Subtitle: "Distributing your crafts seamlessly across buyer apps and Central Government procurement desks."
>
> **Main Content: 2 Primary Command Blocks**:
> - **Block 1: ONDC Buyer Network Distribution Grid (12 cols, white card, 24px radius)**:
>   - Title: "Active ONDC Buyer Channels" with logos of Paytm Mall, Mystore, Pincode (PhonePe), Craftsvilla, and Meesho.
>   - Interactive Channel Matrix:
>     - For each channel: Buyer App Logo | Active Listings count (e.g., "8 Crafts Live") | Total Orders this month | Sync Latency ("140ms — Healthy") | Live Catalog link.
>     - Visual Beckn Protocol Payload Inspector: Collapsible code drawer showing the formatted Beckn JSON catalog schema (`bap_id`, `bpp_id`, `item.descriptor`, `fulfillment.tags`) with syntax highlighting in Indigo and Gold.
> - **Block 2: GeM (Government e-Marketplace) MSE Tender Desk (12 cols, white card, 24px radius)**:
>   - Banner: "🏛️ MoSJE Special SC/ST Artisan Procurement Quota (25% Mandatory Government Procurement)".
>   - GeM Direct Exporter Tool:
>     - "One-Click GeM Catalog Generator": Pre-fills HSN 6304, Udyam Registration, and MSE Certificate.
>     - Active Government Tenders for Indian Handicrafts table:
>       - Tender: "Supply of 500 Handloom Banarasi Silk Shawls for Ministry of External Affairs Diplomatic Gifts".
>       - Budget: ₹9,25,000 | Tender Deadline: 18 Oct 2024 | Eligibility: "Radha Devi Qualifies ✓".
>       - Button: "🚀 Submit Automated GeM Bid with KalaSetu Catalog".

---

## 🖥️ WEB SLIDE 13 — Public Artisan Digital Identity & Pehchan Authenticity Portal

**Screen ID**: `web-artisan-verification`  
**URL**: `/verify/:pehchan_id` or `/artisan/radha-devi`  
**Viewport**: 1440×900px desktop  

**Prompt**:
> Design a dignified, world-class **Public Artisan Digital Identity & Pehchan Authenticity Verification Portal** (1440px desktop) for KalaSetu. This is the public URL visited when a buyer scans the QR code on a physical craft tag or invoice. It guarantees authenticity, eliminates fake machine-made knockoffs, and showcases the artisan's genuine craft lineage. Background is warm Saffron Cream (#FFFBF2) with a majestic Indian block-print backdrop.
>
> **Header**:
> - Minimalist trust header with KalaSetu diya emblem, MoSJE crest, and "Official Government Handicraft Authenticity Registry".
>
> **Central Verification Stage (Max width 1080px, centered)**:
> - **The Sovereign Pehchan Smart ID Card (Interactive 3D Glassmorphic Card)**:
>   - 1000×380px horizontal credential card with gold foil metallic border and subtle tilt animation on mouse movement.
>   - Left third: Large high-resolution portrait of Radha Devi in traditional attire weaving at her handloom, with gold halo border and green "Identity Verified & Active" holographic badge.
>   - Center third:
>     - Name: "Radha Devi — राधा देवी" Poppins Bold 28px Indigo.
>     - Official Pehchan Reg No: `KST-UP-2024-00142` in JetBrains Mono.
>     - Craft Specialization: "Master Weaver, Banarasi Silk & Zari Kadwa".
>     - Cluster: "Sarai Mohana GI Handloom Cluster, Varanasi, Uttar Pradesh".
>     - Social Classification: "SC Artisan Beneficiary — MoSJE Welfare Registered".
>   - Right third:
>     - Cryptographic Authenticity QR Code with Ministry digital signature stamp.
>     - Issue Date: "August 2024" | Validity: "Lifetime Sovereign Credential".
>     - Direct verification badge: "100% Genuine Handcrafted Guarantee ✓".
>
> **Provenance & Impact Exhibition (Below ID Card)**:
> - 3-Column Showcase:
>   - Col 1 (The Handloom Workshop): 3 photos of Radha Devi's traditional pit-loom workshop, raw silk yarn dyeing, and traditional wooden shuttle.
>   - Col 2 (Fair-Trade Economic Impact): Infographic showing Radha Devi's monthly earnings (₹24,500), supporting her children's education in Varanasi.
>   - Col 3 (GI Tag Pedigree): Official Geographical Indication registration certificate excerpt with government seals.
> - Direct Action Bar: "🛍️ Browse Radha Devi's Complete Catalog (12 Crafts)" Sunrise Gradient button | "🤝 Commission Custom Handloom Work" outlined indigo button.

---

## 🎨 WEB SLIDE 14 — Desktop Master Design System, Component Kit & Color Tokens (1440px)

**Screen ID**: `web-master-design-system`  
**Type**: Master Specification & Component Architecture Sheet  
**Viewport**: 1440×1200px master poster sheet  

**Prompt**:
> Create an exhaustive, visually breathtaking **Master Desktop Design System & Component Kit Specification Sheet** (1440px desktop) for KalaSetu. Styled as a design tokens poster for frontend engineers and hackathon judges. Light & colourful theme on Saffron Cream (#FFFBF2).
>
> **Section 1: The Cultural Color Palette Matrix**:
> - 8 High-fidelity interactive swatch cards with Hex, RGB, HSL, CSS variable name, and cultural significance:
>   1. **Marigold Gold** (`#F5A623` / `--color-marigold`): Auspicious celebrations, primary CTAs, active states.
>   2. **Terracotta Orange** (`#E07A5F` / `--color-terracotta`): Earthy pottery, secondary badges, Devanagari subtitles.
>   3. **Indigo Heritage** (`#3D405B` / `--color-indigo`): Traditional indigo dyers, primary headings, deep navigation.
>   4. **Sage Herbal Green** (`#81B29A` / `--color-sage`): Ayurvedic healing, positive wage metrics, verified status.
>   5. **Saffron Cream Canvas** (`#FFFBF2` / `--color-canvas`): Unbleached handloom silk, soothing page backdrop.
>   6. **Cloud White** (`#FFFFFF` / `--color-surface`): Clean card surfaces, floating modals, input fields.
>   7. **Blush Rose Pink** (`#F2C4CE` / `--color-blush`): Gulabi Meenakari craft accents, delicate hover glows.
>   8. **Sky Lavender** (`#C9B8E8` / `--color-lavender`): Ajrakh block-print indigo mist, category tags.
>
> **Section 2: Typography & Bilingual Rhythm**:
> - Dual English + Devanagari typographic pairing scale:
>   - Display XL: Poppins ExtraBold 52px / Devanagari 38px
>   - Headline L: Poppins Bold 32px / Devanagari 24px
>   - Headline M: Poppins SemiBold 22px / Devanagari 18px
>   - Body & Data: Inter Regular 15px / JetBrains Mono 14px (HSN & Codes)
>
> **Section 3: Interactive UI Component Suite (Desktop View)**:
> - Button variants: Primary Sunrise Gradient, Outlined Indigo, Ghost Marigold, Sage Success, Thermal Print Icon.
> - Form Elements: Bilingual Input Field with flag selector, Drag-and-drop Photo Box, Pulsing Waveform Audio Mic.
> - Navigation Elements: Fixed Top Nav (72px), Desktop Sidebar (240px) with active pill indicators, Step Progress Stepper.
> - Badges & Seals: "GI Tagged Varanasi", "MoSJE Pehchan Verified", "ONDC Live", "+250% Wage Premium".
>
> **Section 4: Authentic Indian Decorative SVG Motifs**:
> - Reusable SVG assets: Sanganeri block-print flower border, Paisley (Kalka/Buta) divider, Mandala hero accent, and brass Diya lamp vector.

---

## 📋 COMPLETE 14-SCREEN DESKTOP SITEMAP & FLOW MATRIX

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                    PUBLIC VISITOR / BUYER FLOW                                    │
│                                                                                                  │
│   [WEB-1: Landing Page] ──► [WEB-7: About Story]                                                │
│            │                                                                                     │
│            ├──► [WEB-6: Public Catalog] ──► [WEB-9: B2B Product Detail & RFQ] ──► [Instant RFQ]  │
│            │                                         │                                           │
│            ├──► [WEB-3: B2B Marketplace] ────────────┘                                           │
│            │                                                                                     │
│            └──► [WEB-13: Pehchan Digital ID / QR Verify]                                         │
└─────────────────────────────────────────┬────────────────────────────────────────────────────────┘
                                          │
                                          ▼
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                    ARTISAN LOGGED-IN PORTAL                                      │
│                                                                                                  │
│   [WEB-8: Registration Wizard] ──► [WEB-2: Artisan Dashboard]                                    │
│                                              │                                                   │
│                                              ├──► [WEB-4: AI Studio (Photo + Voice)]             │
│                                              │                                                   │
│                                              ├──► [WEB-10: Inventory & Stock Command]            │
│                                              │                                                   │
│                                              ├──► [WEB-11: Orders & Invoices Hub]                │
│                                              │                                                   │
│                                              ├──► [WEB-12: ONDC & GeM Network Hub]               │
│                                              │                                                   │
│                                              └──► [WEB-5: Impact Analytics & MoSJE Dashboard]    │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Desktop Responsive Breakpoint Guidelines
- **1440px+**: Master Desktop standard (12 columns, 24px gutter, 1280px max container).
- **1200px – 1439px**: Auto-scale font sizes by 8%, collapse secondary side-panels.
- **1024px – 1199px** (Laptop/Tablet Landscape): Left sidebar collapses to 72px icon-only rail; table columns hide secondary telemetry.
- **< 768px** (Mobile): Route seamlessly to Mobile App Screens (Slides 1–14).

### Key Frontend Implementation Dependencies
- **Styling**: Pure CSS Variables (`var(--color-marigold)`, etc.) + Flexbox / CSS Grid.
- **Icons**: Lucide Icons or Heroicons (20px & 24px).
- **Charts**: Recharts / Chart.js for Impact Analytics, Monthly Trends, and Category Distribution.
- **Fonts**: `@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600&family=Noto+Sans+Devanagari:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');`

