"""
Hackathon Demo Data - Coherent "Pets" Journey
Matches pawsome-pet-boutique MVP perfectly
"""

# STAGE 1: Domain Input
USER_INPUT = "pets"

# STAGE 2: Trends (from Bright Data scraping)
TRENDS = [
    {
        "id": "trend-1",
        "title": "Premium Pet E-commerce Boom",
        "description": "Pet owners increasingly buying online - artisanal products, subscription boxes, and boutique items",
        "momentum_score": 8.7,
        "pain_severity": 9.2,
        "competition_density": 5.3,
        "build_complexity": 4.5,
        "opportunity_score": 8.5,
        "sources": [
            "Product Hunt: 'PetBox' got 1,247 upvotes",
            "Reddit r/Entrepreneur: 147 posts about pet e-commerce success",
            "GitHub: react-pet-store trending (2.3k stars)"
        ],
        "evidence": [
            "💬 Reddit user: 'Made $50k/month selling custom dog collars online'",
            "💬 HN: 'Pet industry is recession-proof, people will always spend on pets'",
            "💬 Product Hunt: 'Finally a pet store with actual style!'"
        ],
        "why_now": "Post-pandemic pet adoption surge (67% increase), Gen Z pet owners prefer online shopping"
    },
    {
        "id": "trend-2",
        "title": "AI-Powered Pet Health Monitoring",
        "description": "Wearables and apps tracking pet health metrics, vet telehealth integrations",
        "momentum_score": 9.1,
        "pain_severity": 7.8,
        "competition_density": 6.9,
        "build_complexity": 8.5,
        "opportunity_score": 7.2,
        "sources": [
            "Product Hunt: 'PetWatch AI' - 892 upvotes",
            "GitHub: pet-health-tracker (1.8k stars)"
        ],
        "evidence": [
            "💬 'Our dog's heart issue was caught early by FitBark'",
            "💬 'Need more affordable pet health monitoring'"
        ],
        "why_now": "IoT hardware costs dropping, pet insurance requiring health data"
    },
    {
        "id": "trend-3",
        "title": "Pet-Friendly Workspace Tools",
        "description": "Software for pet-friendly offices, daycare management, pet sitting platforms",
        "momentum_score": 6.5,
        "pain_severity": 6.2,
        "competition_density": 4.8,
        "build_complexity": 5.5,
        "opportunity_score": 6.1,
        "sources": [
            "Reddit r/startups: 'Built a pet daycare SaaS, $10k MRR'",
            "Product Hunt: 'PetDesk' - 634 upvotes"
        ],
        "evidence": [
            "💬 'Managing 50+ dogs daily with Excel is nightmare'",
            "💬 'Need automated check-in/check-out system'"
        ],
        "why_now": "Return-to-office increasing pet daycare demand"
    },
    {
        "id": "trend-4",
        "title": "Sustainable Pet Products",
        "description": "Eco-friendly toys, biodegradable poop bags, carbon-neutral pet food",
        "momentum_score": 7.3,
        "pain_severity": 5.9,
        "competition_density": 6.1,
        "build_complexity": 6.8,
        "opportunity_score": 6.3,
        "sources": [
            "Product Hunt: 'EcoPaws' - 723 upvotes",
            "HN: Discussion about pet industry carbon footprint"
        ],
        "evidence": [
            "💬 'Feel guilty about plastic pet toys'",
            "💬 'Hard to find truly sustainable pet products'"
        ],
        "why_now": "Gen Z/Millennial pet owners prioritize sustainability"
    },
    {
        "id": "trend-5",
        "title": "Pet Social Networks",
        "description": "Instagram for pets, playdate matching apps, pet influencer platforms",
        "momentum_score": 6.8,
        "pain_severity": 4.5,
        "competition_density": 7.8,
        "build_complexity": 5.2,
        "opportunity_score": 5.3,
        "sources": [
            "Product Hunt: 'PawParty' - 445 upvotes",
            "Reddit: 'Built PetTinder for dog playdates'"
        ],
        "evidence": [
            "💬 'My dog needs friends but I'm introverted'",
            "💬 'Nextdoor is full of lost pet posts, need better app'"
        ],
        "why_now": "Pets becoming larger part of owner identity online"
    }
]

# STAGE 3: Ideas Generated (after user selects Trend 1)
IDEAS = [
    {
        "id": "idea-1",
        "title": "Pawsome Pet Boutique",
        "tagline": "Premium pet products with modern shopping experience",
        "description": "Mobile-first e-commerce for curated, high-quality pet accessories. Focus on beautiful product photography, seamless UX, and fast checkout. Target millennial/Gen Z pet owners who want boutique-style shopping.",
        "opportunity_score": 8.9,
        "reasoning": [
            "✅ High demand: Pet e-commerce growing 23% YoY",
            "✅ Low build complexity: Standard e-commerce stack",
            "✅ Clear monetization: 40-60% margins on pet accessories",
            "✅ Defensible: Brand and curation become moat",
            "⚠️ Competition exists but fragmented - no dominant mobile-first player"
        ],
        "target_user": "26-35 year old urban pet owners, $60k+ income, mobile-first shoppers",
        "unfair_advantage": "Mobile-first design, curated inventory, modern UX (vs. legacy pet stores like Chewy's cluttered desktop-era UI)",
        "first_revenue": "Week 1 via Shopify/Stripe integration"
    },
    {
        "id": "idea-2",
        "title": "PetBox Subscription Service",
        "tagline": "Monthly surprise boxes of pet goodies",
        "description": "Recurring subscription ($29/month) with themed monthly boxes. Partner with pet brands for co-marketing.",
        "opportunity_score": 7.8,
        "reasoning": [
            "✅ Predictable MRR",
            "✅ High retention (pets don't churn)",
            "⚠️ Inventory complexity",
            "⚠️ BarkBox already dominates this space"
        ],
        "target_user": "Busy professionals who want to spoil pets",
        "unfair_advantage": "Niche positioning (e.g., 'for senior dogs only')",
        "first_revenue": "Week 2 after supplier deals"
    },
    {
        "id": "idea-3",
        "title": "Custom Pet Collar Marketplace",
        "tagline": "Etsy for pet accessories",
        "description": "Two-sided marketplace connecting artisan makers with pet owners. Take 15% commission.",
        "opportunity_score": 7.2,
        "reasoning": [
            "✅ No inventory risk",
            "✅ Defensible network effects",
            "⚠️ Chicken-and-egg problem (need makers AND buyers)",
            "⚠️ Payment processing complexity"
        ],
        "target_user": "Pet owners wanting unique/personalized items",
        "unfair_advantage": "Pet-specific features (size guides, material safety)",
        "first_revenue": "Month 2-3 after reaching liquidity"
    },
    {
        "id": "idea-4",
        "title": "PetGram - Social Feed for Pets",
        "tagline": "Instagram clone but pet-focused",
        "description": "Photo sharing app with pet-specific filters, playdate matching, and local pet events.",
        "opportunity_score": 5.9,
        "reasoning": [
            "✅ Viral potential",
            "⚠️ Hard monetization (ads? subscriptions?)",
            "⚠️ High engagement required to succeed",
            "⚠️ Instagram already serves this need"
        ],
        "target_user": "Pet influencers and social pet owners",
        "unfair_advantage": "Pet-only community = higher engagement",
        "first_revenue": "Year 1+ (need scale for ads)"
    },
    {
        "id": "idea-5",
        "title": "VetConnect Telehealth",
        "tagline": "Telemedicine for pets",
        "description": "Video consultations with licensed vets. $39 per session, partner with vet clinics.",
        "opportunity_score": 7.5,
        "reasoning": [
            "✅ Clear value prop (save vet visit time/cost)",
            "✅ Proven model (human telehealth works)",
            "⚠️ Regulatory complexity (state-by-state vet licenses)",
            "⚠️ Need vet network to launch"
        ],
        "target_user": "Pet owners with non-emergency health questions",
        "unfair_advantage": "First mover in SEA market",
        "first_revenue": "Week 3-4 with pilot vets"
    }
]

# STAGE 4: Proposal (after user selects Idea 1: Pawsome Pet Boutique)
PROPOSAL = [
    {
        "section": "1. Problem Statement",
        "content": """**The Pain:**
Pet owners want to buy high-quality accessories (collars, beds, toys) but current options are frustrating:
- **Amazon/Chewy**: Cluttered, overwhelming, low-trust (fake reviews, inconsistent quality)
- **Local pet stores**: Limited selection, overpriced, inconvenient hours
- **Etsy**: Too artsy, long shipping times, no returns

**Who Feels This:**
Urban millennials/Gen Z (26-35 years old) who:
- Treat pets like family members
- Value aesthetics and brand trust
- Prefer mobile shopping over desktop
- Willing to pay 20-30% premium for quality

**Urgency:**
Pet ownership surged 67% post-pandemic. These new owners have no brand loyalty and are actively searching for their "go-to" pet shop. First mover advantage in mobile-first pet e-commerce."""
    },
    {
        "section": "2. Target User Persona",
        "content": """**Primary: "Mobile Maya" (70% of revenue)**
- **Age:** 28, works in tech/marketing
- **Income:** $75k/year
- **Pets:** 1 dog (Golden Retriever named Mochi)
- **Behavior:** 
  - Shops on phone during commute
  - Follows pet influencers on Instagram
  - Spends $150/month on pet products
  - Values fast shipping and easy returns
- **Jobs-to-be-done:** "I want to spoil my dog without spending hours researching products"

**Secondary: "Gifter Gary" (30% of revenue)**
- **Age:** 32, buying gifts for friends' pets
- **Behavior:** Impulse buyer, values presentation (gift-ready packaging)
- **Jobs-to-be-done:** "I need a thoughtful pet gift that arrives fast and looks premium"

**Anti-Persona:** Budget-conscious pet owners buying bulk food (not our market)"""
    },
    {
        "section": "3. Current Alternatives & Weaknesses",
        "content": """**1. Chewy.com (Market Leader)**
- ✅ Strengths: Fast shipping, good customer service
- ❌ Weaknesses: Desktop-era UI, overwhelming catalog (50k+ SKUs), no curation
- **Our Wedge:** Mobile-first design + curated selection (500 SKUs max)

**2. Amazon Pet Supplies**
- ✅ Strengths: Price, Prime shipping
- ❌ Weaknesses: Low trust (fake reviews), commoditized, no brand loyalty
- **Our Wedge:** Trust through curation + brand storytelling

**3. Local Pet Stores**
- ✅ Strengths: Immediate pickup, personal advice
- ❌ Weaknesses: Limited hours, overpriced, small selection
- **Our Wedge:** 24/7 availability + competitive pricing + wider selection

**4. Instagram Shops (Small Brands)**
- ✅ Strengths: Aesthetic, authentic
- ❌ Weaknesses: Fragmented (must follow 10+ shops), inconsistent shipping
- **Our Wedge:** Aggregated discovery + unified checkout"""
    },
    {
        "section": "4. Unique Wedge (Unfair Advantage)",
        "content": """**Core Differentiation:**
We're the first mobile-first, curated pet boutique for premium accessories.

**3 Moats:**

1. **Curation as a Service**
   - We test every product with our team's pets
   - Max 500 SKUs (vs. Chewy's 50,000)
   - Category bestsellers updated weekly based on sales data
   - Trust signal: "Pawsome Approved" badge

2. **Mobile-First UX**
   - Built for one-thumb browsing
   - Product pages load in <1 second
   - 3-tap checkout (Apple Pay / Google Pay)
   - Swipe-based product discovery (Tinder for pet products)

3. **Community-Driven Content**
   - Customer photos featured prominently
   - Pet profiles (upload photo, get personalized recommendations)
   - Shareable: "Share your pet's new collar" → viral loop

**Defensibility Over Time:**
- Taste graph: The more you shop, the better our recommendations
- Supplier relationships: Exclusive products from artisan makers
- Brand: "Pawsome" becomes synonymous with premium pet shopping"""
    },
    {
        "section": "5. MVP Scope (4-Week Build)",
        "content": """**Must-Have Features:**

✅ **Homepage**
- Hero banner with featured products
- Category tiles (Dogs, Cats, Birds, Fish, Reptiles)
- Featured products grid (8-12 items)
- Search bar
- Cart icon with item count

✅ **Product Listing (Categories Page)**
- Filter by category
- Sort by: Popular, New, Price
- Product cards with:
  - Image
  - Name
  - Price
  - "Add to Cart" button
  - Heart icon (favorite - visual only for MVP)

✅ **Product Detail Page**
- Product image gallery (swipeable)
- Title, price, description
- Size/color selector (if applicable)
- Quantity picker
- "Add to Cart" CTA
- Customer photos section (3-4 sample images)

✅ **Shopping Cart**
- Line items with image, name, quantity, price
- Quantity adjustment (+/-)
- Remove item
- Subtotal calculation
- "Checkout" button (links to Stripe Checkout for MVP)

✅ **Mobile-First Design**
- Bottom navigation bar (Home, Categories, Cart, Profile)
- Smooth animations (framer-motion)
- Dark mode toggle
- Responsive on all screen sizes

**Explicitly Out of Scope (Post-MVP):**
- ❌ User accounts / authentication
- ❌ Real payment processing (use Stripe test mode)
- ❌ Order history
- ❌ Product reviews
- ❌ Shipping calculations
- ❌ Inventory management
- ❌ Admin dashboard"""
    },
    {
        "section": "6. Key User Flows",
        "content": """**Flow 1: Quick Add to Cart (30 seconds)**
1. User lands on homepage
2. Scrolls to Featured Products
3. Sees "Premium Leather Collar" - $32
4. Taps product card → Product Detail Page loads
5. Taps "Add to Cart"
6. Toast notification: "Added to cart! ✓"
7. Cart icon updates: (0) → (1)

**Flow 2: Browse by Category (45 seconds)**
1. User taps "Categories" in bottom nav
2. Sees all product categories
3. Filters by "Dogs"
4. Scrolls through 12 dog products
5. Taps "Orthopedic Dog Bed" - $68
6. Changes quantity to 2
7. Taps "Add to Cart"
8. Returns to Categories page

**Flow 3: Checkout (2 minutes)**
1. User taps Cart icon (shows badge: 3 items)
2. Reviews cart contents
3. Adjusts quantity of one item (−1)
4. Taps "Checkout"
5. Redirects to Stripe Checkout
6. Enters fake test card (for demo)
7. Completes payment
8. Sees "Thank you" page with order number

**Success Metrics:**
- ✅ All 3 flows complete without errors
- ✅ No broken links or images
- ✅ Cart state persists across page navigation
- ✅ Mobile responsive (iPhone 12 Pro viewport)"""
    },
    {
        "section": "7. Technical Stack",
        "content": """**Frontend:**
- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 6 (fast hot reload)
- **Routing:** React Router DOM 7
- **Styling:** Tailwind CSS 4 (utility-first)
- **Icons:** Material Symbols (Google Icons)
- **Fonts:** Plus Jakarta Sans (modern, readable)
- **Animations:** Framer Motion (smooth page transitions)

**State Management:**
- React Context API (CartContext)
- No Redux (overkill for MVP)

**Data Storage:**
- JSON mock data (products.json)
- LocalStorage for cart persistence
- No database (post-MVP: Supabase)

**Payments:**
- Stripe Checkout (test mode)
- No custom payment form (reduces PCI compliance scope)

**Hosting (Post-MVP):**
- Vercel (auto-deploy from GitHub)
- Custom domain: pawsome.shop
- SSL certificate (free via Vercel)

**Analytics (Post-MVP):**
- Vercel Analytics (built-in)
- Google Analytics 4

**Why This Stack:**
- ⚡ Fast: Vite builds in <2 seconds
- 🎨 Beautiful: Tailwind + Motion = polished UI
- 🔒 Type-safe: TypeScript catches bugs pre-runtime
- 📱 Mobile-first: React responsive by default
- 🚀 Deploy-ready: Vercel one-click deploy"""
    },
    {
        "section": "8. Go-to-Market (First 100 Customers)",
        "content": """**Week 1-2: Friends & Family Alpha**
- Share link in personal networks
- Goal: 20 test orders, collect feedback
- Incentive: "Founding members get 20% off forever"

**Week 3-4: Reddit/HN Launch**
- Post to: r/SideProject, r/EntrepreneurRideAlong
- Hacker News Show HN: "I built a mobile-first pet boutique"
- Goal: 500 visitors, 50 signups

**Week 5-8: Pet Influencer Seeding**
- DM 50 micro-influencers (5k-20k followers)
- Offer: Free $50 product credit for Instagram Story mention
- Goal: 5 influencers accept, 1,000 visitors from their posts

**Week 9-12: Paid Acquisition Test**
- Meta Ads (Instagram): $500 budget
- Target: Women 25-35, pet owners, USA
- Creative: User-generated content (customer photos)
- Goal: <$20 CAC, >3% conversion rate

**Month 4-6: SEO Foundation**
- Blog content: "Best Dog Collars for [Breed]"
- Google Shopping ads (product listings)
- Goal: Rank for "premium dog collar" (page 2)

**Metrics to Track:**
- Week 1-4: 100 visitors/week → 200/week
- Conversion rate: 1% → 3%
- AOV (Average Order Value): $45 → $60
- CAC: <$30 (LTV target: $150)"""
    },
    {
        "section": "9. Business Model & Unit Economics",
        "content": """**Revenue Model:**
- Direct-to-consumer e-commerce
- Transaction-based (one-time purchases)
- Average Order Value (AOV): $55
- Repeat purchase rate: 30% within 90 days

**Pricing Strategy:**
- Premium positioning: 20-30% above Amazon
- Free shipping on orders $50+ (encourages higher AOV)
- Keystone pricing: 2x wholesale cost (50% margin)

**Unit Economics (Per Order):**
```
Revenue:              $55.00 (AOV)
COGS:                -$22.00 (40% margin after shipping)
Gross Profit:         $33.00 (60%)

Variable Costs:
- Payment processing: -$1.65 (3% Stripe fee)
- Packaging:          -$2.00
- Shipping:           -$8.00 (subsidized)
- CAC (blended):      -$15.00

Contribution Margin:   $6.35 (11.5%)
```

**Path to Profitability:**
- Break-even: 500 orders/month ($27.5k GMV)
- Timeline: Month 6 if growth consistent
- Assumption: CAC drops to $10 via organic/repeat

**Funding Needs:**
- Bootstrapped: $5k initial inventory
- Or: $50k seed round for faster growth
- Use of funds: Inventory (60%), marketing (30%), ops (10%)"""
    },
    {
        "section": "10. Risks & Mitigations",
        "content": """**Risk 1: Low Traffic / No PMF**
- **Likelihood:** High (most startups fail here)
- **Impact:** Critical (no revenue)
- **Mitigation:**
  - Launch with 100+ pet owner emails pre-collected
  - Offer 30% launch discount to drive early orders
  - Pivot product mix based on first 50 orders data

**Risk 2: High CAC, Low LTV**
- **Likelihood:** Medium
- **Impact:** High (unprofitable)
- **Mitigation:**
  - Focus on organic channels first (SEO, influencers)
  - Build email list for repeat purchases (own the customer)
  - Introduce subscriptions (monthly treat box) for predictable LTV

**Risk 3: Supplier Issues (Inventory)**
- **Likelihood:** Medium
- **Impact:** Medium (stockouts hurt conversion)
- **Mitigation:**
  - Multi-source top 10 SKUs
  - 30-day inventory buffer for bestsellers
  - Dropship option for long-tail products

**Risk 4: Amazon/Chewy Copies Us**
- **Likelihood:** Low (we're too small to notice)
- **Impact:** High (if it happens)
- **Mitigation:**
  - Build brand moat (Pawsome = premium curation)
  - Move upmarket (exclusive artisan products)
  - Customer data = personalization they can't replicate

**Risk 5: Mobile-Only Limits Audience**
- **Likelihood:** Low
- **Impact:** Low (80% pet shopping is mobile)
- **Mitigation:**
  - Site is responsive (works on desktop)
  - Just optimized for mobile FIRST

**Kill Criteria (When to Pivot/Quit):**
- If <100 orders in first 3 months → pivot product category
- If CAC >$40 after 6 months → rethink channel strategy
- If <10% repeat rate after 6 months → consider subscription model"""
    }
]

# STAGE 5: Build Logs (what will be shown)
BUILD_LOGS = [
    {"step": "init", "message": "🎯 Using pre-built MVP: Pawsome Pet Boutique"},
    {"step": "skip_install", "message": "✅ Dependencies already installed"},
    {"step": "start_server", "message": "🚀 Starting development server..."},
    {"step": "server_ready", "message": "✅ MVP running at http://localhost:4000"},
    {"step": "complete", "message": "🎉 MVP build complete and ready for testing"}
]

# STAGE 6: Test Report (what will be shown)
TEST_REPORT = {
    "overall": "passed",
    "tests": [
        {
            "name": "Homepage renders correctly",
            "status": "passed",
            "screenshot": "/screenshots/homepage.png",
            "duration": "2.3s"
        },
        {
            "name": "Product categories display",
            "status": "passed",
            "screenshot": "/screenshots/categories.png",
            "duration": "1.8s"
        },
        {
            "name": "Add to cart functionality",
            "status": "passed",
            "screenshot": "/screenshots/add-to-cart.png",
            "duration": "3.1s"
        },
        {
            "name": "Cart page displays items",
            "status": "passed",
            "screenshot": "/screenshots/cart.png",
            "duration": "1.5s"
        }
    ],
    "summary": "✅ All 4 tests passed. MVP is production-ready!",
    "timestamp": "2026-02-28T15:42:33Z"
}
