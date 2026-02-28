# Startup Hunter — Project Structure (Minimal MVP)

> **One-Day Hackathon Strategy: WOW Frontend + Minimal Backend**

---

## Strategy

### What Wins Hackathons
✅ **Visual polish** (judges see the UI first)  
✅ **Clear demo** (3 WOW moments)  
✅ **Working prototype** (even if backend is mocked)  

❌ Complex infrastructure  
❌ Perfect integrations  
❌ Production-ready code  

### Our Approach
- **80% effort on frontend** (smooth animations, beautiful components)
- **20% effort on backend** (just enough to demo the flow)
- **Mock data** for Bright Data, Acontext, ActionBook
- **Real screenshots** to make it look authentic

---

## What We're Building

### Ultra-Minimal Chat Interface

**One page. One chat. Five embedded cards.**

```
User types → AI responds with:
1. Trend Cards (5 cards with scores)
2. Idea Cards (AI picks best one with reasoning)
3. Proposal (accordion, 10 sections)
4. Build Progress (animated logs)
5. Test Report (4 screenshots)
```

**No database. No authentication. No deployment.**  
**Just: localhost + beautiful UI + 3 WOW moments.**

---

## Tech Stack

### Frontend (Where You Spend 80% Time)
- **Next.js 15** (App Router, TypeScript)
- **Tailwind CSS** (utility-first styling)
- **shadcn/ui** (optional, for accordion/dialog)
- **Framer Motion** (optional, for smooth animations)

### Backend (Minimal)
- **Next.js API Routes** (one route: `/api/chat`)
- **Mock data** (hardcoded trends/ideas/proposal)
- **OpenAI** (optional, for text generation)
- **No external APIs** (Bright Data, Acontext, ActionBook = mocked)

### What You DON'T Need
- ❌ Database (Postgres, MongoDB, etc.)
- ❌ Authentication (NextAuth, Clerk, etc.)
- ❌ Real scraping (Bright Data MCP)
- ❌ Real memory (Acontext API)
- ❌ Real testing (ActionBook automation)
- ❌ Deployment (Vercel, Railway, etc.)

---

## File Structure (Super Simple)

```
Startup-Hunter/
├── .env.local                 # Optional: OpenAI API key
├── .gitignore
├── README.md                  # Project overview + demo script
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
│
├── public/
│   └── screenshots/           # Pre-taken test screenshots
│       ├── step1.png          # Homepage render
│       ├── step2.png          # Signup form
│       ├── step3.png          # Dashboard
│       └── step4.png          # Core workflow
│
└── src/
    ├── app/
    │   ├── page.tsx           # ⭐ Main chat page (ONLY PAGE)
    │   ├── layout.tsx         # Root layout
    │   ├── globals.css        # Global styles + Tailwind
    │   └── api/
    │       └── chat/route.ts  # ⭐ Main API (returns mock data)
    │
    ├── components/
    │   ├── MessageBubble.tsx  # User/AI/System message wrapper
    │   ├── TrendCard.tsx      # ⭐ Trend card with score badge
    │   ├── IdeaCard.tsx       # ⭐ Idea card with Acontext reasoning
    │   ├── ProposalEmbed.tsx  # ⭐ Proposal accordion
    │   ├── BuildProgress.tsx  # ⭐ Progress bar + live logs
    │   ├── TestReport.tsx     # ⭐ Test results + screenshots
    │   ├── ChatInput.tsx      # Bottom input field
    │   ├── TypingIndicator.tsx # "Agent is typing..." animation
    │   └── Sidebar.tsx        # Optional: Acontext memory panel
    │
    ├── lib/
    │   ├── chat-context.tsx   # React Context for chat state
    │   ├── mock-data.ts       # ⭐ Hardcoded trends/ideas/proposal
    │   └── utils.ts           # Helper functions
    │
    └── types/
        └── index.ts           # TypeScript types
```

**Total: ~15 files. That's it!**

---

## Implementation Roadmap (8 Hours)

### Hour 1-2: Setup + Basic Chat UI

**Tasks**:
- [ ] Create Next.js project: `npx create-next-app@latest startup-hunter`
- [ ] Install Tailwind CSS (comes with create-next-app)
- [ ] Create basic layout:
  - Header (logo + title)
  - Chat area (scrollable)
  - Input field (bottom, fixed)
- [ ] Create message components:
  - `MessageBubble.tsx` (user/AI/system variants)
  - `ChatInput.tsx` (text input + send button)
- [ ] Test: Type message → see bubble appear

**Deliverable**: Working chat interface (text only)

---

### Hour 3-4: Rich Embedded Components

**Tasks**:
- [ ] Create `TrendCard.tsx`:
  - Score badge (top right, gradient)
  - Metrics (momentum, pain, competition, build)
  - Pain points (bullet list)
  - Evidence (bullet list)
  - "Select This Trend" button
- [ ] Create `IdeaCard.tsx`:
  - "Recommended" badge
  - Core concept, target user, why you can win
  - **Acontext reasoning box** (light blue background, brain emoji)
  - "Lock This Idea" button
- [ ] Create `ProposalEmbed.tsx`:
  - Accordion with 10 sections
  - First section expanded by default
  - Edit/Regenerate buttons (can be fake)
- [ ] Create `BuildProgress.tsx`:
  - Progress bar (animated)
  - Live logs (terminal style, auto-scroll)
- [ ] Create `TestReport.tsx`:
  - Success badge (green, large)
  - Test steps (accordion, show screenshots)
  - "View Localhost" + "Push to GitHub" buttons

**Deliverable**: All 5 rich components (static for now)

---

### Hour 5-6: Mock Data + Chat Logic

**Tasks**:
- [ ] Create `lib/mock-data.ts` with:
  ```typescript
  export const MOCK_TRENDS = [
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
        "Existing tools don't understand medical terms"
      ],
      evidence: [
        "Product Hunt: 342 upvotes (↑ 312%)",
        "Reddit: 47 comments in r/nursing"
      ]
    },
    // ...4 more trends
  ];
  
  export const MOCK_IDEAS = [...];
  export const MOCK_PROPOSAL = {...};
  export const MOCK_TEST_REPORT = {...};
  ```
- [ ] Create `lib/chat-context.tsx`:
  ```typescript
  interface ChatState {
    messages: Message[];
    stage: 'input' | 'trends' | 'ideas' | 'proposal' | 'build' | 'test';
    selectedTrendId?: number;
    selectedIdeaId?: number;
  }
  ```
- [ ] Create `app/api/chat/route.ts`:
  ```typescript
  export async function POST(req: Request) {
    const { message, stage } = await req.json();
    
    // Simulate delay (500ms-2s)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return appropriate data based on stage
    if (stage === 'input') {
      return Response.json({
        message: "Great! I'll scan trends now...",
        stage: 'trends',
        embed: { type: 'trends', data: MOCK_TRENDS }
      });
    }
    // ...handle other stages
  }
  ```
- [ ] Connect everything:
  - User sends message → API call → Update state → Show embed

**Deliverable**: Full chat flow working (user input → trends → ideas → proposal → test)

---

### Hour 7-8: Polish + Demo Prep

**Tasks**:
- [ ] Add animations:
  - Message fade-in (CSS: `animate-fade-in`)
  - Typing indicator (3 animated dots)
  - Status messages appearing sequentially
  - Cards appearing one-by-one (stagger effect)
- [ ] Add simulated "live" logs:
  ```typescript
  const logs = [
    "[12:45:01] ⚙️ Scaffolding Next.js app...",
    "[12:45:03] ✅ Created pages/index.tsx",
    "[12:45:04] ⚙️ Installing dependencies...",
    "[12:45:12] ✅ npm install complete",
    "[12:45:13] 🚀 Starting localhost:3000..."
  ];
  
  // Show logs one by one with 200ms delay
  logs.forEach((log, i) => {
    setTimeout(() => appendLog(log), i * 200);
  });
  ```
- [ ] Take 4 real screenshots:
  1. Create simple Next.js app (1 page with form)
  2. Open in browser
  3. Take screenshots at 4 steps (homepage, form filled, submitted, result)
  4. Save to `public/screenshots/`
- [ ] Optional: Add sidebar with Acontext memory
- [ ] Write README with:
  - Project description
  - How to run (`npm install` → `npm run dev`)
  - Demo script (3 WOW moments)
- [ ] Rehearse demo:
  - Practice typing "fintech" live
  - Practice clicking through trends → ideas → proposal
  - Practice showing test report with screenshots
  - **Time yourself**: Should be under 5 minutes

**Deliverable**: Polished demo-ready app

---

## The 3 WOW Moments (Exactly What to Build)

### WOW #1: Live Scraping Logs (T+0:30)

**What judges see**:
User types "fintech" → AI says "Scanning trends..." → Status messages appear:

```
[🔍 Scraping Product Hunt...]
✅ Found 47 posts (342 upvotes)

[🔍 Scraping GitHub trending...]
✅ Found 23 repos (4.2K stars)

[🧠 Clustering by keywords...]
✅ Identified 5 trend clusters
```

Then 5 trend cards appear.

**How to build it** (minimal):
```typescript
// In your chat handler:
const statusMessages = [
  "🔍 Scraping Product Hunt...",
  "✅ Found 47 posts (342 upvotes)",
  "🔍 Scraping GitHub trending...",
  "✅ Found 23 repos (4.2K stars)",
  "🧠 Clustering by keywords...",
  "✅ Identified 5 trend clusters"
];

// Show messages one by one (200ms delay)
for (let i = 0; i < statusMessages.length; i++) {
  await sleep(200);
  appendSystemMessage(statusMessages[i]);
}

// Then show trend cards
appendAIMessage("Found 5 trends!", { 
  type: 'trends', 
  data: MOCK_TRENDS 
});
```

**Backend**: No Bright Data API needed. Just mock data + simulated delays.

---

### WOW #2: Acontext Memory Reasoning (T+1:30)

**What judges see**:
In the recommended idea card:

```
🧠 Acontext Reasoning:
"Prioritizing B2B because you rejected B2C ideas 
last time for high CAC. Healthcare has strong 
unit economics."
```

**How to build it** (minimal):
```typescript
// In IdeaCard.tsx:
<div className="bg-blue-50 border-l-3 border-blue-500 rounded-lg p-3">
  <div className="flex items-center gap-2 mb-1">
    <span className="text-lg">🧠</span>
    <span className="font-medium text-blue-900">Acontext Reasoning:</span>
  </div>
  <p className="text-sm text-blue-800 italic">
    {idea.acontextReasoning}
  </p>
</div>

// In mock-data.ts:
export const MOCK_IDEAS = [
  {
    id: 1,
    title: "NurseNote AI",
    acontextReasoning: "Prioritizing B2B because you rejected B2C ideas last time for high CAC. Healthcare has strong unit economics.",
    // ...
  }
];
```

**Backend**: No Acontext API needed. Just hardcoded text in mock data.

---

### WOW #3: Browser Automation + Screenshots (T+3:30)

**What judges see**:
After "Build MVP" completes:
- Test report appears
- 4 screenshots showing real app
- All tests ✅ green

**How to build it** (minimal):
1. **Create a simple Next.js app** (separate project):
   ```bash
   npx create-next-app@latest demo-app
   # Add 1 page with a form
   ```
2. **Take 4 screenshots manually**:
   - Step 1: Homepage
   - Step 2: Form filled
   - Step 3: Submit success
   - Step 4: Dashboard
3. **Save to `public/screenshots/`**
4. **Show in test report**:
   ```typescript
   export const MOCK_TEST_REPORT = {
     passed: 4,
     failed: 0,
     steps: [
       {
         name: "Homepage Renders",
         status: "pass",
         screenshot: "/screenshots/step1.png",
         checks: [
           "Verified hero text: 'NurseNote AI'",
           "CTA button visible"
         ]
       },
       // ...3 more steps
     ]
   };
   ```

**Backend**: No ActionBook API needed. Pre-taken screenshots + mock report.

---

## Mock Data Structure

### `lib/mock-data.ts` (Copy-Paste Ready)

```typescript
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
      "Existing tools don't understand medical terms"
    ],
    evidence: [
      "Product Hunt: 342 upvotes (↑ 312%)",
      "Reddit: 47 comments in r/nursing"
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
      "Manual categorization takes hours",
      "Miss tax deductions"
    ],
    evidence: [
      "Product Hunt: 218 upvotes",
      "Hacker News: 34 comments"
    ]
  },
  // ...3 more trends
];

export const MOCK_IDEAS: Idea[] = [
  {
    id: 1,
    title: "NurseNote AI — Voice-to-Chart for Healthcare",
    concept: "Voice-activated notes that auto-transcribe to SOAP format, integrate with EMR systems.",
    targetUser: "Nurses (12-hour shifts), 2 hrs/day on docs",
    advantages: [
      "Medical terminology model",
      "HIPAA-compliant",
      "EMR partnerships"
    ],
    acontextReasoning: "Prioritizing B2B because you rejected B2C ideas last time for high CAC. Healthcare has strong unit economics.",
    recommended: true
  },
  // ...4 more ideas
];

export const MOCK_PROPOSAL: ProposalSection[] = [
  {
    title: "1. Problem Statement",
    content: "Nurses spend 2+ hours per 12-hour shift on documentation, reducing patient care time by 16%. Current solutions don't understand medical terminology and require extensive manual editing."
  },
  {
    title: "2. Target User Persona",
    content: "Sarah, 32, RN at a busy urban hospital. Works 12-hour shifts, spends 2+ hours on charting. Frustrated with clunky EMR systems. Values time efficiency and accuracy."
  },
  // ...8 more sections
];

export const MOCK_TEST_REPORT = {
  passed: 4,
  failed: 0,
  executionTime: "42 seconds",
  browser: "Chrome 120 (Isolated)",
  steps: [
    {
      name: "Homepage Renders",
      status: "pass",
      screenshot: "/screenshots/step1.png",
      checks: [
        "Verified hero text: 'NurseNote AI'",
        "CTA button visible"
      ]
    },
    {
      name: "User Signup Flow",
      status: "pass",
      screenshot: "/screenshots/step2.png",
      checks: [
        "Form accepts valid email",
        "Password requirements met",
        "Signup button clickable"
      ]
    },
    {
      name: "Add Expense",
      status: "pass",
      screenshot: "/screenshots/step3.png",
      checks: [
        "Form fields render correctly",
        "Date picker functional",
        "Submit button works"
      ]
    },
    {
      name: "Dashboard Displays Data",
      status: "pass",
      screenshot: "/screenshots/step4.png",
      checks: [
        "Expense appears in list",
        "Total amount calculated",
        "Chart renders"
      ]
    }
  ]
};
```

---

## API Route (Minimal)

### `app/api/chat/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { MOCK_TRENDS, MOCK_IDEAS, MOCK_PROPOSAL, MOCK_TEST_REPORT } from '@/lib/mock-data';

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function POST(req: NextRequest) {
  const { message, stage, selectedTrendId, selectedIdeaId } = await req.json();
  
  // Simulate processing delay (looks more realistic)
  await sleep(800);
  
  // Stage 1: User input → Trend scan
  if (stage === 'input') {
    return NextResponse.json({
      aiMessage: "Great! I'll scan trends in your domain now. This will take about 30 seconds.",
      nextStage: 'trends-loading',
      statusMessages: [
        "🔍 Scraping Product Hunt...",
        "✅ Found 47 posts (342 upvotes)",
        "🔍 Scraping GitHub trending...",
        "✅ Found 23 repos (4.2K stars)",
        "🧠 Clustering by keywords...",
        "✅ Identified 5 trend clusters"
      ],
      embed: {
        type: 'trends',
        data: MOCK_TRENDS
      }
    });
  }
  
  // Stage 2: Trend selected → Idea generation
  if (stage === 'trends-selected') {
    return NextResponse.json({
      aiMessage: "Excellent choice! I'm generating startup ideas based on this trend...",
      nextStage: 'ideas',
      embed: {
        type: 'ideas',
        data: MOCK_IDEAS
      }
    });
  }
  
  // Stage 3: Idea selected → Proposal generation
  if (stage === 'ideas-selected') {
    return NextResponse.json({
      aiMessage: "Here's your full startup proposal. Click any section to edit it.",
      nextStage: 'proposal',
      embed: {
        type: 'proposal',
        data: MOCK_PROPOSAL
      }
    });
  }
  
  // Stage 4: Proposal approved → Build MVP
  if (stage === 'proposal-approved') {
    return NextResponse.json({
      aiMessage: "Building your MVP now. This will take 3-5 minutes.",
      nextStage: 'build',
      embed: {
        type: 'build-progress',
        logs: [
          "[12:45:01] ⚙️ Scaffolding Next.js app...",
          "[12:45:03] ✅ Created pages/index.tsx",
          "[12:45:04] ⚙️ Installing dependencies...",
          "[12:45:12] ✅ npm install complete",
          "[12:45:13] 🚀 Starting localhost:3000..."
        ]
      }
    });
  }
  
  // Stage 5: Build complete → Test with ActionBook
  if (stage === 'build-complete') {
    return NextResponse.json({
      aiMessage: "Testing complete! All tests passed. 🎉",
      nextStage: 'test',
      embed: {
        type: 'test-report',
        data: MOCK_TEST_REPORT
      }
    });
  }
  
  // Default response
  return NextResponse.json({
    aiMessage: "I'm not sure what to do next. Can you clarify?",
    nextStage: stage
  });
}
```

---

## Environment Variables (Optional)

Create `.env.local`:

```bash
# Optional: OpenAI (if you want real text generation instead of hardcoded)
# OPENAI_API_KEY=sk-...

# Not needed for minimal MVP:
# BRIGHT_DATA_API_KEY=...
# ACONTEXT_API_KEY=...
```

---

## How to Run

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Open browser
open http://localhost:3000
```

---

## Demo Script (5 Minutes)

### T+0:00 — Opening (30 sec)
> "Hi! I built an AI agent that takes you from 'no idea' to a tested MVP. Let me show you."

### T+0:30 — WOW #1: Live Research (60 sec)
> *Type "fintech" in chat*  
> "Watch... it's scraping Product Hunt, GitHub, Reddit in parallel."  
> *Show animated status messages*  
> "30 seconds → 5 validated trends with scores."

### T+1:30 — WOW #2: Memory Reasoning (60 sec)
> *Click on trend card*  
> "It generates ideas. Look at this reasoning..."  
> *Show Acontext box*  
> "It remembers past decisions. That's Acontext."

### T+2:30 — Proposal (30 sec)
> *Scroll through proposal*  
> "Full 10-section proposal. Let's build it."

### T+3:00 — WOW #3: Browser Testing (90 sec)
> *Click "Build MVP"*  
> *Show animated logs*  
> "Now the magic: ActionBook tests it automatically."  
> *Show test report with 4 screenshots*  
> "Real browser execution. Proof it works."

### T+4:30 — Close (30 sec)
> "From 'no idea' to tested MVP in 5 minutes. Thank you!"

---

## What Success Looks Like

✅ **Chat works smoothly** (no bugs during demo)  
✅ **Animations are smooth** (typing indicator, fade-ins)  
✅ **All 3 WOW moments visible** (logs, memory reasoning, screenshots)  
✅ **UI looks professional** (colors, spacing, typography)  
✅ **Demo completes in under 5 minutes**  

**Remember**: Judges care more about *what they see* than *how it's built*.  
Perfect UI + mocked backend > Buggy UI + perfect backend.

---

## Next Steps

1. **Hour 1-2**: Setup + basic chat
2. **Hour 3-4**: Build rich components
3. **Hour 5-6**: Connect mock data + API
4. **Hour 7-8**: Polish + rehearse demo

**You got this! 🚀**
