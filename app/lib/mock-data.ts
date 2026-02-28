/**
 * Mock data for Startup Hunter demo
 * 
 * This file contains pre-defined data for:
 * - Trend cards (5 trends with opportunity scores)
 * - Idea cards (5 ideas with Acontext reasoning)
 * - Proposal sections (10-section structured proposal)
 * - Test report (4 test steps with screenshots)
 */

// ===== TYPES =====

export interface Trend {
  id: number;
  title: string;
  score: number;
  momentum: number;
  pain: number;
  competition: number;
  build: number;
  painPoints: string[];
  evidence: string[];
}

export interface Idea {
  id: number;
  title: string;
  concept: string;
  targetUser: string;
  advantages: string[];
  acontextReasoning: string;
  recommended?: boolean;
}

export interface ProposalSection {
  title: string;
  content: string;
}

export interface TestStep {
  name: string;
  status: 'pass' | 'fail';
  screenshot: string;
  checks: string[];
}

export interface TestReport {
  passed: number;
  failed: number;
  executionTime: string;
  browser: string;
  steps: TestStep[];
}

// ===== MOCK TRENDS =====

export const MOCK_TRENDS: Trend[] = [
  {
    id: 1,
    title: "Premium Pet E-commerce Boom",
    score: 8.5,
    momentum: 9,
    pain: 9,
    competition: 5,
    build: 4,
    painPoints: [
      "Amazon/Chewy have cluttered UI, too many options",
      "Local pet stores overpriced, limited selection",
      "Hard to find trusted, quality pet products online"
    ],
    evidence: [
      "Product Hunt: 'PetBox' got 1,247 upvotes",
      "Reddit r/Entrepreneur: 147 posts about pet e-commerce success",
      "GitHub: react-pet-store trending (2.3k stars this month)"
    ]
  },
  {
    id: 2,
    title: "AI-Powered Pet Health Monitoring",
    score: 7.2,
    momentum: 9,
    pain: 8,
    competition: 7,
    build: 9,
    painPoints: [
      "Vet visits expensive for routine check-ups",
      "Hard to track pet health metrics daily",
      "Miss early warning signs of health issues"
    ],
    evidence: [
      "Product Hunt: 'PetWatch AI' - 892 upvotes",
      "Hacker News: 'Our dog's heart issue caught by FitBark'",
      "GitHub: pet-health-tracker (1.8k stars)"
    ]
  },
  {
    id: 3,
    title: "Pet-Friendly Workspace Tools",
    score: 6.1,
    momentum: 7,
    pain: 6,
    competition: 5,
    build: 6,
    painPoints: [
      "Pet daycare management done via Excel",
      "No automated check-in/check-out system",
      "Hard to track 50+ dogs daily"
    ],
    evidence: [
      "Reddit r/startups: 'Built pet daycare SaaS, $10k MRR'",
      "Product Hunt: 'PetDesk' - 634 upvotes",
      "Return-to-office increasing demand"
    ]
  },
  {
    id: 4,
    title: "Sustainable Pet Products",
    score: 6.3,
    momentum: 7,
    pain: 6,
    competition: 6,
    build: 7,
    painPoints: [
      "Feel guilty about plastic pet toys",
      "Hard to find truly eco-friendly products",
      "Pet industry has huge carbon footprint"
    ],
    evidence: [
      "Product Hunt: 'EcoPaws' - 723 upvotes",
      "Hacker News: Discussion about pet sustainability",
      "Gen Z/Millennial owners prioritize green products"
    ]
  },
  {
    id: 5,
    title: "Pet Social Networks",
    score: 5.3,
    momentum: 7,
    pain: 5,
    competition: 8,
    build: 5,
    painPoints: [
      "My dog needs friends but I'm introverted",
      "Nextdoor full of lost pet posts",
      "No good app for dog playdates"
    ],
    evidence: [
      "Product Hunt: 'PawParty' - 445 upvotes",
      "Reddit: 'Built PetTinder for playdates'",
      "Pets becoming larger part of owner identity"
    ]
  }
];

// ===== MOCK IDEAS =====

export const MOCK_IDEAS: Idea[] = [
  {
    id: 1,
    title: "Pawsome Pet Boutique — Premium Pet E-commerce",
    concept: "Mobile-first online store for curated, high-quality pet accessories. Beautiful product photography, seamless UX, fast checkout.",
    targetUser: "Urban millennials/Gen Z (26-35 years old), $60k+ income, treat pets like family",
    advantages: [
      "Mobile-first design (competitors are desktop-era)",
      "Curated selection (500 SKUs vs Chewy's 50,000)",
      "Trust through testing (all products tested by our pets)",
      "Community-driven (customer photos, viral sharing)"
    ],
    acontextReasoning: "You selected Premium Pet E-commerce (highest score: 8.5). This idea has low build complexity (standard e-commerce stack), clear monetization (40-60% margins), and strong demand (pet ownership up 67% post-pandemic). First revenue possible in Week 1.",
    recommended: true
  },
  {
    id: 2,
    title: "PetBox — Monthly Subscription for Pet Goodies",
    concept: "Recurring subscription ($29/month) with themed boxes. Partner with pet brands for co-marketing.",
    targetUser: "Busy professionals who want to spoil their pets without shopping",
    advantages: [
      "Predictable MRR (pets don't churn)",
      "High lifetime value",
      "Brand partnerships reduce COGS",
      "Gift-friendly (easy to buy for friends' pets)"
    ],
    acontextReasoning: "Strong business model but BarkBox already dominates this space. Would need niche positioning (e.g., 'for senior dogs only') to compete. Inventory complexity is medium-high.",
    recommended: false
  },
  {
    id: 3,
    title: "Custom Pet Collar Marketplace — Etsy for Pet Gear",
    concept: "Two-sided marketplace connecting artisan makers with pet owners. Platform takes 15% commission.",
    targetUser: "Pet owners wanting unique/personalized items, artisan makers",
    advantages: [
      "No inventory risk (marketplace model)",
      "Network effects create moat",
      "Pet-specific features (size guides, material safety)",
      "Scalable without holding stock"
    ],
    acontextReasoning: "Marketplace model is capital-efficient but faces chicken-and-egg problem. Need both makers AND buyers to launch. First revenue likely Month 2-3 after reaching liquidity.",
    recommended: false
  },
  {
    id: 4,
    title: "PetGram — Social Network for Pets",
    concept: "Instagram-style photo sharing but pet-only. Features: pet profiles, playdate matching, local pet events.",
    targetUser: "Pet influencers, social pet owners who love sharing pet photos",
    advantages: [
      "Pet-only community (higher engagement)",
      "Playdate matching feature",
      "Local events discovery",
      "Pet-specific filters and frames"
    ],
    acontextReasoning: "Viral potential but hard monetization. Instagram already serves this need. Would need strong differentiation beyond 'pets only' to justify separate app.",
    recommended: false
  },
  {
    id: 5,
    title: "VetConnect — Telehealth for Pets",
    concept: "Video consultations with licensed vets. $39 per session, partner with vet clinics for network.",
    targetUser: "Pet owners with non-emergency health questions, saving vet visit time/cost",
    advantages: [
      "Clear value prop (save $80-150 vs in-person)",
      "Proven model (human telehealth works)",
      "Vet network monetization",
      "Prescription management integration"
    ],
    acontextReasoning: "Strong business model but regulatory complexity is high (state-by-state vet licenses). Need vet network to launch. Build complexity is medium-high.",
    recommended: false
  }
];

// ===== MOCK PROPOSAL =====

export const MOCK_PROPOSAL: ProposalSection[] = [
  {
    title: "1. Problem Statement",
    content: "Pet owners want to buy high-quality accessories (collars, beds, toys) but current options are frustrating:\n\n**Amazon/Chewy**: Cluttered UI, overwhelming selection (50k+ SKUs), low trust due to fake reviews and inconsistent quality.\n\n**Local pet stores**: Limited selection, overpriced (30-50% markup), inconvenient hours.\n\n**Etsy**: Too artsy/niche, long shipping times (2-3 weeks), no standardized returns.\n\n**Who feels this pain**: Urban millennials/Gen Z (26-35 years old) who treat pets like family members, value aesthetics and brand trust, prefer mobile shopping, and are willing to pay 20-30% premium for quality.\n\n**Urgency**: Pet ownership surged 67% post-pandemic. These new owners have no brand loyalty and are actively searching for their 'go-to' pet shop."
  },
  {
    title: "2. Target User Persona",
    content: "**Primary: 'Mobile Maya' (70% of revenue)**\n\n• Age: 28, works in tech/marketing\n• Income: $75k/year\n• Pets: 1 dog (Golden Retriever named Mochi)\n• Behavior: Shops on phone during commute, follows pet influencers on Instagram, spends $150/month on pet products\n• Values: Fast shipping, easy returns, aesthetics\n• Job-to-be-done: 'I want to spoil my dog without spending hours researching products'\n\n**Secondary: 'Gifter Gary' (30% of revenue)**\n\n• Age: 32, buying gifts for friends' pets\n• Behavior: Impulse buyer, values presentation (gift-ready packaging)\n• Job-to-be-done: 'I need a thoughtful pet gift that arrives fast and looks premium'"
  },
  {
    title: "3. Current Alternatives & Their Weaknesses",
    content: "**Chewy.com** (Market Leader)\n✅ Strengths: Fast shipping, good customer service\n❌ Weaknesses: Desktop-era UI, overwhelming catalog (50k+ SKUs), no curation\n→ Our Wedge: Mobile-first design + curated selection (500 SKUs max)\n\n**Amazon Pet Supplies**\n✅ Strengths: Price, Prime shipping\n❌ Weaknesses: Low trust (fake reviews), commoditized, no brand loyalty\n→ Our Wedge: Trust through curation + brand storytelling\n\n**Local Pet Stores**\n✅ Strengths: Immediate pickup, personal advice\n❌ Weaknesses: Limited hours, overpriced, small selection\n→ Our Wedge: 24/7 availability + competitive pricing + wider selection"
  },
  {
    title: "4. Unique Wedge (Why You Can Win)",
    content: "**Core Differentiation**: First mobile-first, curated pet boutique for premium accessories.\n\n**3 Moats**:\n\n1. **Curation as a Service**\n   • Test every product with our team's pets\n   • Max 500 SKUs (vs Chewy's 50,000)\n   • 'Pawsome Approved' trust badge\n\n2. **Mobile-First UX**\n   • Built for one-thumb browsing\n   • Product pages load in <1 second\n   • 3-tap checkout (Apple Pay / Google Pay)\n   • Swipe-based product discovery\n\n3. **Community-Driven Content**\n   • Customer photos featured prominently\n   • Pet profiles for personalized recommendations\n   • Shareable: 'Share your pet's new collar' → viral loop"
  },
  {
    title: "5. MVP Scope (Must-Have Features Only)",
    content: "**✅ Must-Have**:\n\n• Homepage (hero banner, category tiles, featured products grid)\n• Categories page (Dogs, Cats, Birds, Fish, Reptiles)\n• Product detail page (image gallery, add to cart, quantity selector)\n• Shopping cart (quantity adjustment, remove items, subtotal)\n• Mobile-first design (bottom nav, dark mode toggle)\n• Checkout redirect (Stripe test mode)\n\n**❌ Explicitly Out of Scope**:\n\n• User accounts / authentication\n• Real payment processing (use test mode)\n• Order history\n• Product reviews\n• Shipping calculations\n• Inventory management\n• Admin dashboard"
  },
  {
    title: "6. Key User Flows (3-5 Critical Paths)",
    content: "**Flow 1: Quick Add to Cart (30 seconds)**\n1. User lands on homepage\n2. Scrolls to Featured Products\n3. Sees 'Premium Leather Collar' - $32\n4. Taps product card → Product Detail opens\n5. Taps 'Add to Cart'\n6. Toast notification: 'Added to cart! ✓'\n7. Cart icon updates: (0) → (1)\n\n**Flow 2: Browse by Category (45 seconds)**\n1. Taps 'Categories' in bottom nav\n2. Sees all product categories\n3. Filters by 'Dogs'\n4. Scrolls through 12 dog products\n5. Taps 'Orthopedic Dog Bed' - $68\n6. Adjusts quantity to 2\n7. Taps 'Add to Cart'\n\n**Flow 3: Checkout (2 minutes)**\n1. Taps Cart icon (badge shows 3 items)\n2. Reviews cart contents\n3. Adjusts quantity (−1 on one item)\n4. Taps 'Checkout'\n5. Redirects to Stripe Checkout\n6. Enters test card\n7. Sees 'Thank you' page"
  },
  {
    title: "7. Technical Stack",
    content: "**Frontend**: React 19 + TypeScript, Vite 6 (fast builds), React Router 7 (routing), Tailwind CSS 4 (styling), Material Symbols (icons), Framer Motion (animations)\n\n**State**: React Context API for cart management (no Redux - overkill for MVP)\n\n**Data**: JSON mock data (products.json), LocalStorage for cart persistence, No database (post-MVP: Supabase)\n\n**Payments**: Stripe Checkout (test mode), No custom payment form (reduces PCI compliance scope)\n\n**Hosting (Post-MVP)**: Vercel (auto-deploy from GitHub), Custom domain: pawsome.shop\n\n**Why This Stack**: ⚡ Fast (Vite builds <2s), 🎨 Beautiful (Tailwind + Motion), 🔒 Type-safe (TypeScript), 📱 Mobile-first (React responsive)"
  },
  {
    title: "8. Go-to-Market (First 50 Users Strategy)",
    content: "**Week 1-2: Friends & Family Alpha**\n• Share link in personal networks\n• Goal: 20 test orders, collect feedback\n• Incentive: 'Founding members get 20% off forever'\n\n**Week 3-4: Reddit/HN Launch**\n• Post to: r/SideProject, r/EntrepreneurRideAlong\n• Hacker News Show HN: 'I built a mobile-first pet boutique'\n• Goal: 500 visitors, 50 signups\n\n**Week 5-8: Pet Influencer Seeding**\n• DM 50 micro-influencers (5k-20k followers)\n• Offer: Free $50 product credit for Instagram Story mention\n• Goal: 5 influencers accept, 1,000 visitors\n\n**Week 9-12: Paid Acquisition Test**\n• Meta Ads (Instagram): $500 budget\n• Target: Women 25-35, pet owners, USA\n• Goal: <$20 CAC, >3% conversion rate"
  },
  {
    title: "9. Risks & Mitigations",
    content: "**Risk 1: Low Traffic / No PMF**\n• Likelihood: High (most startups fail here)\n• Impact: Critical (no revenue)\n• Mitigation: Launch with 100+ pet owner emails pre-collected, offer 30% launch discount, pivot product mix based on first 50 orders\n\n**Risk 2: High CAC, Low LTV**\n• Likelihood: Medium\n• Impact: High (unprofitable)\n• Mitigation: Focus on organic channels first (SEO, influencers), build email list for repeat purchases, introduce subscriptions for predictable LTV\n\n**Risk 3: Supplier Issues (Inventory)**\n• Likelihood: Medium\n• Impact: Medium (stockouts hurt conversion)\n• Mitigation: Multi-source top 10 SKUs, 30-day inventory buffer, dropship option for long-tail products\n\n**Risk 4: Amazon/Chewy Copies Us**\n• Likelihood: Low (we're too small)\n• Impact: High (if it happens)\n• Mitigation: Build brand moat (Pawsome = premium curation), move upmarket (exclusive artisan products)"
  },
  {
    title: "10. 2-Week Roadmap (Daily Milestones)",
    content: "**Day 1-2**: React app scaffolding + routing setup\n**Day 3-4**: Homepage UI (hero, categories, product grid)\n**Day 5-6**: Product detail page + cart context\n**Day 7**: Categories page + filtering\n**Day 8-9**: Shopping cart page + checkout flow\n**Day 10**: Mobile responsive polish + dark mode\n**Day 11**: Stripe test mode integration\n**Day 12**: Product images + mock data\n**Day 13**: Final testing + bug fixes\n**Day 14**: Deploy to Vercel + share with 10 friends\n\n**Checkpoint**: 10 test orders by Day 14"
  }
];

// ===== MOCK TEST REPORT =====

export const MOCK_TEST_REPORT: TestReport = {
  passed: 3,
  failed: 0,
  executionTime: "42 seconds",
  browser: "Chrome 120 (Isolated)",
  steps: [
    {
      name: "Homepage Renders",
      status: "pass",
      screenshot: "/test_image/homepage.png",
      checks: [
        "Verified header: 'Pawsome Pet Boutique'",
        "Search bar visible and functional",
        "Category circles loaded (Dogs, Cats, Birds, Fish, Reptiles)",
        "Featured products grid displays 4 items"
      ]
    },
    {
      name: "Product Exploration",
      status: "pass",
      screenshot: "/test_image/explore.png",
      checks: [
        "Product browse page loaded successfully",
        "Product cards display with images and prices",
        "Filter and search controls functional",
        "Navigation and breadcrumbs working"
      ]
    },
    {
      name: "Checkout Flow Completion",
      status: "pass",
      screenshot: "/test_image/checkout.png",
      checks: [
        "Checkout page loaded with cart items",
        "Form fields for shipping and payment visible",
        "Order summary displays correct totals",
        "Submit order button enabled and functional"
      ]
    }
  ]
};

// ===== BUILD LOGS (for animated terminal) =====

export const MOCK_BUILD_LOGS = [
  { timestamp: "12:45:01", level: "info", message: "⚙️  Scaffolding Pet Store application..." },
  { timestamp: "12:45:03", level: "success", message: "✅ Created pages/home.tsx" },
  { timestamp: "12:45:03", level: "success", message: "✅ Created pages/products.tsx" },
  { timestamp: "12:45:03", level: "success", message: "✅ Created pages/cart.tsx" },
  { timestamp: "12:45:04", level: "info", message: "⚙️  Installing dependencies..." },
  { timestamp: "12:45:12", level: "success", message: "✅ npm install complete (299 packages)" },
  { timestamp: "12:45:13", level: "info", message: "⚙️  Configuring Tailwind CSS..." },
  { timestamp: "12:45:14", level: "success", message: "✅ Tailwind configured" },
  { timestamp: "12:45:14", level: "info", message: "⚙️  Setting up product routes..." },
  { timestamp: "12:45:15", level: "success", message: "✅ Created /products/[id]" },
  { timestamp: "12:45:15", level: "success", message: "✅ Created /cart/checkout" },
  { timestamp: "12:45:16", level: "info", message: "🚀 Starting development server..." },
  { timestamp: "12:45:18", level: "success", message: "✅ Server running at http://localhost:4000" },
  { timestamp: "12:45:18", level: "success", message: "🎉 Build complete! Opening browser..." }
];

// ===== STATUS MESSAGES (for live scraping effect) =====

export const MOCK_STATUS_MESSAGES = [
  { icon: "🔍", text: "Scraping Product Hunt...", delay: 0 },
  { icon: "✅", text: "Found 47 posts (1,247 upvotes)", delay: 1200 },
  { icon: "🔍", text: "Scraping GitHub trending...", delay: 1400 },
  { icon: "✅", text: "Found 23 repos (2.3K stars)", delay: 2600 },
  { icon: "🔍", text: "Scraping Reddit r/Entrepreneur...", delay: 2800 },
  { icon: "✅", text: "Found 147 discussions (892 comments)", delay: 4000 },
  { icon: "🔍", text: "Scraping Hacker News...", delay: 4200 },
  { icon: "✅", text: "Found 12 relevant threads (234 points)", delay: 5400 },
  { icon: "🧠", text: "Clustering by keywords...", delay: 5600 },
  { icon: "✅", text: "Identified 5 pet-related trends", delay: 6800 }
];
