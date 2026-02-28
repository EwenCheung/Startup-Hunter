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
    title: "AI Meeting Notes for Nurses",
    score: 8.7,
    momentum: 9,
    pain: 9,
    competition: 3,
    build: 5,
    painPoints: [
      "We waste 2 hours/day on notes",
      "Existing tools don't understand medical terms",
      "Manual SOAP formatting is tedious"
    ],
    evidence: [
      "Product Hunt: 342 upvotes (↑ 312%)",
      "Reddit r/nursing: 47 comments, 89% positive",
      "GitHub trending: Similar repos gained 2.3K stars this month"
    ]
  },
  {
    id: 2,
    title: "AI Expense Tracking for Freelancers",
    score: 7.4,
    momentum: 7,
    pain: 8,
    competition: 6,
    build: 4,
    painPoints: [
      "Manual categorization takes hours each month",
      "Miss tax deductions due to poor tracking",
      "Receipt management is a nightmare"
    ],
    evidence: [
      "Product Hunt: 218 upvotes",
      "Hacker News: 34 comments, front page for 8 hours",
      "Reddit r/freelance: 'I'd pay $50/month for this'"
    ]
  },
  {
    id: 3,
    title: "AI Code Review for Solo Developers",
    score: 6.8,
    momentum: 8,
    pain: 7,
    competition: 7,
    build: 6,
    painPoints: [
      "No senior dev to review code",
      "Security vulnerabilities slip through",
      "Hard to maintain consistency alone"
    ],
    evidence: [
      "GitHub trending: 5 similar projects launched this quarter",
      "Dev.to: 156 upvotes on 'I need AI code review'",
      "Product Hunt: 3 competing tools, all 500+ upvotes"
    ]
  },
  {
    id: 4,
    title: "Voice-to-CRM for Sales Teams",
    score: 6.2,
    momentum: 6,
    pain: 8,
    competition: 5,
    build: 7,
    painPoints: [
      "Salespeople hate manual CRM data entry",
      "Call notes get lost or forgotten",
      "Poor data quality hurts forecasting"
    ],
    evidence: [
      "Product Hunt: 189 upvotes",
      "LinkedIn Sales groups: 'This would save 5 hours/week'",
      "G2 reviews: Existing CRMs have 2.3★ on 'ease of data entry'"
    ]
  },
  {
    id: 5,
    title: "AI Contract Review for Startups",
    score: 5.9,
    momentum: 5,
    pain: 7,
    competition: 8,
    build: 8,
    painPoints: [
      "Legal review costs $500-2000 per contract",
      "Turnaround time is 3-5 days",
      "Can't afford full-time legal counsel"
    ],
    evidence: [
      "Product Hunt: 167 upvotes",
      "Reddit r/startups: 'We need this yesterday'",
      "YC companies: 12% mention contract review pain in batches"
    ]
  }
];

// ===== MOCK IDEAS =====

export const MOCK_IDEAS: Idea[] = [
  {
    id: 1,
    title: "NurseNote AI — Voice-to-Chart for Healthcare",
    concept: "Voice-activated notes that auto-transcribe to SOAP format, integrate with EMR systems, and suggest ICD-10 codes.",
    targetUser: "Registered nurses (12-hour shifts), spending 2+ hours/day on documentation",
    advantages: [
      "Medical terminology model (trained on 500K+ clinical notes)",
      "HIPAA-compliant infrastructure from day 1",
      "EMR partnerships (Epic, Cerner integration roadmap)",
      "Offline mode for low-connectivity hospital areas"
    ],
    acontextReasoning: "Prioritizing B2B because you rejected B2C ideas last time for high CAC. Healthcare has strong unit economics ($100-200 per user/month is normal). Hospitals have budget.",
    recommended: true
  },
  {
    id: 2,
    title: "ExpenseIQ — AI-Powered Expense Categorization",
    concept: "Snap receipts, auto-categorize for taxes, integrates with accounting software (QuickBooks, Xero).",
    targetUser: "Freelancers and solopreneurs earning $50K-200K/year, filing quarterly taxes",
    advantages: [
      "Receipt OCR with 98% accuracy",
      "Tax optimization suggestions (saves users $2-5K/year)",
      "Accountant collaboration features",
      "Multi-currency support for global freelancers"
    ],
    acontextReasoning: "This is B2B (freelancers run businesses) but has some B2C vibes. CAC is manageable at $30-50 via content marketing. LTV is strong ($600-1200/year).",
    recommended: false
  },
  {
    id: 3,
    title: "CodeSensei — AI Senior Developer for Solo Founders",
    concept: "AI code review, architecture suggestions, security audits for solo developers building MVPs.",
    targetUser: "Solo founders, indie hackers, junior devs working alone",
    advantages: [
      "Learns your codebase patterns (contextual review)",
      "Security scan integrated (OWASP Top 10 checks)",
      "Refactoring suggestions with diffs",
      "Supports 12 languages (JS, TS, Python, Go, Rust, etc.)"
    ],
    acontextReasoning: "Strong B2B SaaS potential. Developers will pay $20-50/month. But competition is fierce (GitHub Copilot, Cursor, others). Need a differentiation wedge.",
    recommended: false
  },
  {
    id: 4,
    title: "SalesWhisper — Voice-to-CRM Automation",
    concept: "Salespeople speak after calls, AI writes CRM notes, suggests follow-up actions, updates deal stages.",
    targetUser: "B2B sales reps at 10-500 person companies using Salesforce/HubSpot",
    advantages: [
      "Salesforce & HubSpot native integrations",
      "Call recording + transcription (Zoom, Meet, Teams)",
      "Automatic next-step suggestions",
      "Manager dashboard (deal quality scoring)"
    ],
    acontextReasoning: "Strong B2B play. Sales teams have budget. But build complexity is high (integrations are hard). Might take 6-12 months to ship.",
    recommended: false
  },
  {
    id: 5,
    title: "ContractSafe AI — Startup Legal Review",
    concept: "Upload contracts (NDAs, vendor agreements, leases), get AI review with risk flags and redline suggestions.",
    targetUser: "Early-stage startups (pre-Series A) without in-house legal",
    advantages: [
      "Trained on 100K+ startup contracts",
      "Identifies 'gotcha' clauses (IP assignment, unlimited liability)",
      "Lawyer marketplace for complex issues",
      "Template library (500+ startup-friendly contracts)"
    ],
    acontextReasoning: "Clear B2B SaaS. Startups will pay $100-300/month. But legal is a regulated space—liability risk is high. May need to partner with law firms.",
    recommended: false
  }
];

// ===== MOCK PROPOSAL =====

export const MOCK_PROPOSAL: ProposalSection[] = [
  {
    title: "1. Problem Statement",
    content: "Nurses spend 2+ hours per 12-hour shift (16% of their time) on documentation, reducing direct patient care. Current EMR systems require manual typing, don't understand medical terminology, and force tedious SOAP format entry. This documentation burden contributes to nurse burnout (53% report feeling overwhelmed by paperwork) and medical errors (poor documentation is cited in 40% of malpractice cases)."
  },
  {
    title: "2. Target User Persona",
    content: "Sarah Chen, 32, RN at Urban General Hospital. Works three 12-hour shifts per week in med-surg. Spends 2.5 hours per shift on charting. Frustrated with Epic's clunky interface. Dreams of spending more time with patients. Tech-savvy (uses iPhone, Spotify, owns AirPods). Would pay out-of-pocket for tools that save time."
  },
  {
    title: "3. Current Alternatives & Their Weaknesses",
    content: "**Manual EMR Entry** (Epic, Cerner): Clunky, time-consuming, requires typing. **Dragon Medical** ($1,500/year): Expensive, requires training, poor at medical context. **Nuance PowerScribe** ($3,000/year): Radiology-focused, not for floor nurses. **Consumer voice apps** (Siri, Google): Not HIPAA-compliant, no medical vocabulary. **Our edge**: HIPAA-native, nurse-specific workflow, EMR integration, affordable ($50/month)."
  },
  {
    title: "4. Unique Wedge (Why You Can Win)",
    content: "1. **Vertical focus**: Built exclusively for floor nurses (not doctors, not admins). 2. **SOAP-native**: Understands clinical documentation structure. 3. **Offline-first**: Works in hospital dead zones. 4. **EMR plugins**: Epic & Cerner integrations (not just 'export to PDF'). 5. **Clinical validation**: Partnered with 3 RN advisors from day 0. 6. **Pricing**: $50/month (vs. Dragon's $125/month), hospitals will reimburse."
  },
  {
    title: "5. MVP Scope (Must-Have Features Only)",
    content: "**Core Features**: Voice recording (60sec max), SOAP transcription (auto-format), basic medical terminology (1,000 terms), copy to clipboard (paste into EMR). **Not in MVP**: EMR integrations (Phase 2), ICD-10 suggestions (Phase 2), team sharing (Phase 3), offline mode (Phase 3). **Success metric**: 10 nurses use it daily for 2 weeks, save 30+ min per shift."
  },
  {
    title: "6. Key User Flows (3-5 Critical Paths)",
    content: "**Flow 1**: Nurse ends patient visit → Opens NurseNote app → Speaks notes for 45sec → Reviews SOAP output → Copies to EMR → Done (2min total). **Flow 2**: Nurse makes verbal error → Taps 'Redo' → Speaks correction → Updated instantly. **Flow 3**: Nurse unsure about term → App suggests 3 alternatives → Selects correct one. **Flow 4**: End of shift → Reviews 8 patient notes → Batch copy all to EMR. **Flow 5**: Onboarding → 60sec tutorial video → Records first practice note → Gets instant feedback."
  },
  {
    title: "7. Data & Model Plan (Optional: If AI-Heavy)",
    content: "**Model**: Fine-tuned Whisper Large v3 on 10K clinical voice samples (public datasets + synthetic). **Medical terms**: Custom vocabulary overlay (1,000 → 5,000 terms by launch). **SOAP formatting**: Rule-based post-processing (Subjective/Objective/Assessment/Plan structure). **Privacy**: On-device processing (no cloud) OR encrypted cloud with BAA. **Training data sources**: MIMIC-III notes (deidentified), synthetic data from clinical advisors, user opt-in feedback loop."
  },
  {
    title: "8. Go-to-Market (First 50 Users Strategy)",
    content: "**Week 1-2**: Recruit 3 nurse advisors (offer free lifetime access). **Week 3-4**: Ship TestFlight beta to advisors + their 10 colleagues (30 total nurses). **Week 5-6**: Nursing subreddits (r/nursing, 500K members) + Facebook groups (10 groups, 50K+ members). **Week 7-8**: Nurse influencer partnerships (TikTok: @nurselifern has 400K followers). **Week 9-10**: Hospital pilot at advisor's hospital (Urban General, 200 nurses). **Week 11-12**: YC application + ProductHunt launch. **Target**: 50 DAU by end of Month 3."
  },
  {
    title: "9. Risks & Mitigations",
    content: "**Technical Risk**: Whisper accuracy <90% → Mitigation: Medical term overlay + user corrections feedback loop. **Regulatory Risk**: HIPAA violation → Mitigation: Hire healthcare compliance consultant ($5K), get BAA from infrastructure providers. **Market Risk**: Nurses won't pay out-of-pocket → Mitigation: Offer hospital billing option, free tier with limits. **Competition Risk**: Epic/Cerner builds this → Mitigation: Move fast, own the nurse community, become the standard before they wake up. **Adoption Risk**: Nurses resistant to new tools → Mitigation: Dead simple onboarding (60sec), show time savings immediately."
  },
  {
    title: "10. 2-Week Roadmap (Daily Milestones)",
    content: "**Day 1-2**: Voice recording + playback (mobile app). **Day 3-4**: Whisper API integration (basic transcription). **Day 5-6**: SOAP formatting logic (rule-based). **Day 7**: Medical term overlays (top 100 terms). **Day 8-9**: Copy-to-clipboard + basic UI polish. **Day 10**: TestFlight build #1 → Send to 3 advisors. **Day 11**: Feedback incorporation (top 3 issues). **Day 12**: TestFlight build #2 → Send to 10 more nurses. **Day 13**: Onboarding tutorial video (record + edit). **Day 14**: ProductHunt post draft + landing page launch. **Checkpoint**: 10 nurses using daily by Day 14."
  }
];

// ===== MOCK TEST REPORT =====

export const MOCK_TEST_REPORT: TestReport = {
  passed: 4,
  failed: 0,
  executionTime: "42 seconds",
  browser: "Chrome 120 (Isolated)",
  steps: [
    {
      name: "Homepage Renders",
      status: "pass",
      screenshot: "/screenshots/step1.svg",
      checks: [
        "Verified hero text: 'NurseNote AI'",
        "CTA button visible and clickable",
        "Hero image loaded (nurses-working.jpg)",
        "Navigation menu responsive"
      ]
    },
    {
      name: "User Signup Flow",
      status: "pass",
      screenshot: "/screenshots/step2.svg",
      checks: [
        "Form accepts valid email format",
        "Password requirements met (8+ chars, 1 number)",
        "Signup button enabled after validation",
        "Success message appears after submit"
      ]
    },
    {
      name: "Voice Recording Feature",
      status: "pass",
      screenshot: "/screenshots/step3.svg",
      checks: [
        "Microphone permission prompt appears",
        "Recording button changes to 'Stop' when active",
        "Waveform animation displays during recording",
        "Audio playback works after recording"
      ]
    },
    {
      name: "SOAP Note Generation",
      status: "pass",
      screenshot: "/screenshots/step4.svg",
      checks: [
        "Transcription appears within 3 seconds",
        "SOAP format applied (S/O/A/P sections visible)",
        "Copy button functional (clipboard API works)",
        "Character count displayed (247 characters)"
      ]
    }
  ]
};

// ===== BUILD LOGS (for animated terminal) =====

export const MOCK_BUILD_LOGS = [
  { timestamp: "12:45:01", level: "info", message: "⚙️  Scaffolding Next.js application..." },
  { timestamp: "12:45:03", level: "success", message: "✅ Created pages/index.tsx" },
  { timestamp: "12:45:03", level: "success", message: "✅ Created pages/dashboard.tsx" },
  { timestamp: "12:45:03", level: "success", message: "✅ Created pages/record.tsx" },
  { timestamp: "12:45:04", level: "info", message: "⚙️  Installing dependencies..." },
  { timestamp: "12:45:12", level: "success", message: "✅ npm install complete (247 packages)" },
  { timestamp: "12:45:13", level: "info", message: "⚙️  Configuring Tailwind CSS..." },
  { timestamp: "12:45:14", level: "success", message: "✅ Tailwind configured" },
  { timestamp: "12:45:14", level: "info", message: "⚙️  Setting up API routes..." },
  { timestamp: "12:45:15", level: "success", message: "✅ Created /api/transcribe" },
  { timestamp: "12:45:15", level: "success", message: "✅ Created /api/format-soap" },
  { timestamp: "12:45:16", level: "info", message: "🚀 Starting development server..." },
  { timestamp: "12:45:18", level: "success", message: "✅ Server running at http://localhost:3000" },
  { timestamp: "12:45:18", level: "success", message: "🎉 Build complete! Opening browser..." }
];

// ===== STATUS MESSAGES (for live scraping effect) =====

export const MOCK_STATUS_MESSAGES = [
  { icon: "🔍", text: "Scraping Product Hunt...", delay: 0 },
  { icon: "✅", text: "Found 47 posts (342 upvotes)", delay: 1200 },
  { icon: "🔍", text: "Scraping GitHub trending...", delay: 1400 },
  { icon: "✅", text: "Found 23 repos (4.2K stars)", delay: 2600 },
  { icon: "🔍", text: "Scraping Reddit r/nursing...", delay: 2800 },
  { icon: "✅", text: "Found 67 discussions (892 comments)", delay: 4000 },
  { icon: "🔍", text: "Scraping Hacker News...", delay: 4200 },
  { icon: "✅", text: "Found 12 relevant threads (234 points)", delay: 5400 },
  { icon: "🧠", text: "Clustering by keywords...", delay: 5600 },
  { icon: "✅", text: "Identified 5 trend clusters", delay: 6800 }
];
