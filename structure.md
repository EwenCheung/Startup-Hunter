# Startup Hunter — Project Structure

> **Autonomous AI agent platform that takes founders from "no idea" to tested MVP**

---

## 📋 Table of Contents

1. [What We Need to Do](#what-we-need-to-do)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Architecture Overview](#architecture-overview)
5. [Implementation Roadmap](#implementation-roadmap)
6. [API Integration Details](#api-integration-details)
7. [Demo Flow](#demo-flow)

---

## What We Need to Do

### Phase 1: Project Setup (15 min)
- [ ] Initialize Next.js 15 + TypeScript project
- [ ] Install core dependencies
- [ ] Configure environment variables
- [ ] Set up Tailwind CSS + base styling
- [ ] Create project directory structure

### Phase 2: Core Infrastructure (45 min)
- [ ] **Bright Data MCP Client** (`src/lib/mcp-client.ts`)
  - Connect to Bright Data MCP server
  - Implement parallel scraping wrapper
  - Error handling & retry logic
  
- [ ] **Acontext Client** (`src/lib/acontext-client.ts`)
  - Session management wrapper
  - Space/Disk/Task CRUD operations
  - Context persistence layer
  
- [ ] **ActionBook Client** (`src/lib/actionbook-client.ts`)
  - Browser automation wrapper
  - Screenshot capture utility
  - Test report generator
  
- [ ] **AI Agent Orchestrator** (`src/lib/ai-agent.ts`)
  - OpenAI integration with tool calling
  - Multi-step workflow coordinator
  - Context-aware reasoning

### Phase 3: Backend API Routes (60 min)
- [ ] `POST /api/trends/scan` — Trigger Bright Data scraping
- [ ] `GET /api/trends` — Retrieve cached trends
- [ ] `POST /api/ideas/generate` — LLM idea generation
- [ ] `POST /api/proposals/generate` — Deep proposal builder
- [ ] `PUT /api/proposals/:id` — Update proposal iterations
- [ ] `POST /api/mvp/scaffold` — Generate MVP code
- [ ] `POST /api/test/run` — Execute ActionBook tests
- [ ] `POST /api/publish/github` — Push to GitHub (optional)

### Phase 4: Frontend UI (90 min)
- [ ] **Landing Page** (`app/page.tsx`)
  - Hero section with value prop
  - Domain input or "No Direction" button
  - Start workflow CTA
  
- [ ] **Trends Dashboard** (`app/trends/page.tsx`)
  - Live scraping status with logs
  - Trend cards with momentum scores
  - Filter/sort by opportunity score
  - Select trend → trigger idea generation
  
- [ ] **Ideas Page** (`app/ideas/page.tsx`)
  - Generated ideas with rationale
  - Acontext memory display ("rejected X because Y")
  - Lock idea → proceed to proposal
  
- [ ] **Proposal Editor** (`app/proposal/page.tsx`)
  - 10-section proposal display
  - Inline editing with AI assist
  - Build MVP button
  - Test with ActionBook button
  
- [ ] **Test Results** (`app/test-results/page.tsx`)
  - Pass/fail summary
  - Screenshot gallery
  - Test step logs
  - Publish to GitHub CTA

### Phase 5: Core Features (120 min)
- [ ] **Trend Collector Module**
  - Parallel scraping: Product Hunt, GitHub, Reddit, Hacker News
  - Keyword clustering algorithm
  - Momentum score calculation
  - Store in Acontext Disk
  
- [ ] **Opportunity Score Algorithm**
  ```
  Score = (Momentum × 2) + (Pain Severity × 3) 
          - (Competition Density) - (Build Complexity)
  ```
  
- [ ] **Proposal Generator**
  - 10-section template (problem, persona, wedge, MVP, GTM, etc.)
  - Use Acontext context for personalization
  - Iterative refinement with user feedback
  
- [ ] **MVP Scaffolder**
  - Generate Next.js project structure
  - 3 pages: landing, dashboard, core workflow
  - Seed with sample JSON data
  - Auto-run `npm install` & `npm run dev`
  
- [ ] **ActionBook Test Suite**
  - Test scripts for common flows
  - Screenshot capture at key steps
  - Generate markdown test report

### Phase 6: Polish & Demo Prep (60 min)
- [ ] Loading states with animated "agent thinking" logs
- [ ] Error handling with user-friendly messages
- [ ] Responsive design (mobile-friendly)
- [ ] Add demo data for instant walkthrough
- [ ] Write comprehensive README with demo script
- [ ] Prepare 5-minute pitch deck

---

## Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: React Context + SWR for data fetching
- **UI Components**: 
  - TrendCard, ProposalEditor, TestReport
  - LoadingLogs (animated agent activity)
  - OpportunityScoreBadge

### Backend
- **Runtime**: Node.js 20+
- **API Routes**: Next.js App Router API handlers
- **LLM**: OpenAI GPT-4 via Vercel AI SDK
- **Storage**: In-memory + JSON files (no database for hackathon)

### AI Agent Tools
- **Bright Data MCP** (`@modelcontextprotocol/sdk`)
  - Real-time web scraping
  - Free tier: 5,000 requests/month
  - Tools: `search_engine`, `scrape_as_markdown`, `web_data_*`
  
- **Acontext** (`@acontext/acontext`)
  - Skill memory platform
  - Session/Space/Disk/Task management
  - Hosted at dash.acontext.io or self-hosted
  
- **ActionBook** (`@actionbookdev/sdk`)
  - Browser automation with action manuals
  - Isolated mode (fresh Chrome instance)
  - CLI + SDK integration

### Development Tools
- **Package Manager**: pnpm (or npm/yarn)
- **Linting**: ESLint + Prettier
- **Type Checking**: TypeScript strict mode
- **Git**: Conventional commits

---

## Project Structure

```
Startup-Hunter/
├── .env.local                 # API keys (gitignored)
├── .gitignore
├── README.md                  # Project overview + demo script
├── AGENTS.md                  # Detailed proposal document
├── structure.md               # This file
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
│
├── public/
│   ├── demo/                  # Demo screenshots/videos
│   └── logos/                 # Brand assets
│
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Landing page
│   │   ├── globals.css        # Global styles
│   │   │
│   │   ├── api/               # API routes
│   │   │   ├── trends/
│   │   │   │   ├── scan/route.ts
│   │   │   │   └── route.ts
│   │   │   ├── ideas/
│   │   │   │   └── generate/route.ts
│   │   │   ├── proposals/
│   │   │   │   ├── generate/route.ts
│   │   │   │   └── [id]/route.ts
│   │   │   ├── mvp/
│   │   │   │   └── scaffold/route.ts
│   │   │   ├── test/
│   │   │   │   └── run/route.ts
│   │   │   └── publish/
│   │   │       └── github/route.ts
│   │   │
│   │   ├── trends/
│   │   │   └── page.tsx       # Trends dashboard
│   │   ├── ideas/
│   │   │   └── page.tsx       # Ideas selection
│   │   ├── proposal/
│   │   │   └── page.tsx       # Proposal editor
│   │   └── test-results/
│   │       └── page.tsx       # Test report viewer
│   │
│   ├── lib/                   # Core utilities
│   │   ├── mcp-client.ts      # Bright Data MCP wrapper
│   │   ├── acontext-client.ts # Acontext session manager
│   │   ├── actionbook-client.ts # ActionBook automation
│   │   ├── ai-agent.ts        # OpenAI orchestrator
│   │   ├── trend-collector.ts # Scraping logic
│   │   ├── opportunity-score.ts # Scoring algorithm
│   │   ├── proposal-builder.ts # Proposal generator
│   │   ├── mvp-scaffolder.ts  # Code generator
│   │   └── utils.ts           # Helper functions
│   │
│   ├── components/            # React components
│   │   ├── ui/                # shadcn/ui base components
│   │   ├── TrendCard.tsx      # Trend display card
│   │   ├── OpportunityScore.tsx # Score badge
│   │   ├── ProposalEditor.tsx # Inline editor
│   │   ├── TestReport.tsx     # Test results display
│   │   ├── LoadingLogs.tsx    # Animated agent logs
│   │   ├── AgentMemory.tsx    # Acontext visualization
│   │   └── Layout/
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       └── Sidebar.tsx
│   │
│   ├── types/                 # TypeScript types
│   │   ├── trend.ts
│   │   ├── idea.ts
│   │   ├── proposal.ts
│   │   ├── test-result.ts
│   │   └── acontext.ts
│   │
│   └── config/                # Configuration
│       ├── prompts.ts         # LLM system prompts
│       ├── sources.ts         # Trend source URLs
│       └── constants.ts       # App constants
│
├── generated/                 # Generated MVPs (gitignored)
│   └── [timestamp]/           # Each MVP in timestamped folder
│
└── docs/                      # Additional documentation
    ├── api.md                 # API documentation
    ├── demo-script.md         # 5-minute pitch script
    └── architecture.md        # Technical deep dive
```

---

## Architecture Overview

### System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER INTERFACE                            │
│  (Next.js Frontend — React + Tailwind + shadcn/ui)              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Landing → Trends → Ideas → Proposal → Build → Test → Publish  │
│                                                                  │
└────────────┬────────────────────────────┬──────────────────────┘
             │                            │
             ▼                            ▼
┌─────────────────────────┐  ┌───────────────────────────┐
│   Next.js API Routes    │  │   AI Agent Orchestrator   │
│  (Backend Handlers)     │◄─┤   (OpenAI + Tool Calling) │
└────────────┬────────────┘  └───────────┬───────────────┘
             │                           │
             ▼                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    CORE MODULES                              │
├─────────────────┬──────────────────────┬────────────────────┤
│                 │                      │                     │
│  RESEARCH       │  COLLABORATION       │  VERIFICATION       │
│  (Bright Data)  │  (Acontext)          │  (ActionBook)       │
│                 │                      │                     │
├─────────────────┼──────────────────────┼────────────────────┤
│                 │                      │                     │
│ • MCP Client    │ • Session Manager    │ • Browser Client   │
│ • Parallel      │ • Space/Disk/Task    │ • Test Scripts     │
│   scraping      │   CRUD               │ • Screenshot       │
│ • Clustering    │ • Context Persist    │   capture          │
│ • Momentum      │ • Memory Retrieval   │ • Report Gen       │
│   scoring       │                      │                     │
│                 │                      │                     │
└─────────────────┴──────────────────────┴────────────────────┘
```

### Data Flow

```
1. USER INPUT
   ↓
   Domain preference OR "No direction"
   ↓
2. TREND SCAN (Bright Data)
   ↓
   • Scrape 4 sources in parallel
   • Extract: title, upvotes, comments, links
   • Cluster by keywords → Trend Cards
   • Calculate Opportunity Score
   ↓
3. STORE IN ACONTEXT
   ↓
   • Create Session (user journey)
   • Create Space (per idea)
   • Save to Disk (trends.json)
   ↓
4. IDEA GENERATION (OpenAI)
   ↓
   • Read Acontext context
   • Generate 5-10 ideas
   • Show reasoning ("rejected X because Y")
   ↓
5. USER SELECTS IDEA
   ↓
6. PROPOSAL GENERATION (OpenAI + Acontext)
   ↓
   • 10-section structured proposal
   • Personalized with Acontext memory
   • Iterative refinement
   ↓
7. USER APPROVES PROPOSAL
   ↓
8. MVP SCAFFOLD (Code Generator)
   ↓
   • Generate Next.js project
   • 3 pages + sample data
   • Auto-install dependencies
   • Start localhost:3000
   ↓
9. TEST WITH ACTIONBOOK
   ↓
   • Open browser (isolated mode)
   • Execute test scripts
   • Capture screenshots
   • Generate test report
   ↓
10. DELIVER
    ↓
    • Show localhost URL
    • Display test results
    • Optional: Push to GitHub
```

### Tool Integration Matrix

| Stage | Bright Data | Acontext | ActionBook | OpenAI |
|-------|-------------|----------|------------|--------|
| **Input** | ❌ | ✅ Store preferences | ❌ | ❌ |
| **Trend Scan** | ✅ Scrape sources | ✅ Save trends | ❌ | ✅ Cluster/analyze |
| **Ideas** | ❌ | ✅ Context retrieval | ❌ | ✅ Generate ideas |
| **Proposal** | ❌ | ✅ Persist iterations | ❌ | ✅ Generate proposal |
| **Build** | ❌ | ✅ Track progress | ❌ | ✅ Code generation |
| **Test** | ❌ | ✅ Store results | ✅ Browser tests | ✅ Analyze failures |
| **Publish** | ❌ | ✅ Final artifacts | ❌ | ❌ |

---

## Implementation Roadmap

### Day 1: Core Infrastructure (6-8 hours)

**Morning (4 hours)**
- ✅ Project initialization
- ✅ Install dependencies
- ✅ Environment setup
- ✅ Create directory structure
- ✅ Configure Tailwind + shadcn/ui

**Afternoon (4 hours)**
- ✅ Bright Data MCP client
- ✅ Acontext client wrapper
- ✅ ActionBook client wrapper
- ✅ OpenAI orchestrator
- ✅ Basic API routes

### Day 2: Frontend + Features (8-10 hours)

**Morning (5 hours)**
- ✅ Landing page
- ✅ Trends dashboard
- ✅ Ideas page
- ✅ Proposal editor
- ✅ Test results page

**Afternoon (5 hours)**
- ✅ Trend collector implementation
- ✅ Opportunity score algorithm
- ✅ Proposal generator
- ✅ MVP scaffolder
- ✅ ActionBook test suite

### Day 3: Polish + Demo (4-6 hours)

**Morning (3 hours)**
- ✅ Loading states + animations
- ✅ Error handling
- ✅ Responsive design
- ✅ Demo data seeding

**Afternoon (3 hours)**
- ✅ README + documentation
- ✅ Demo script rehearsal
- ✅ Pitch deck (optional)
- ✅ Video recording (optional)

---

## API Integration Details

### Bright Data MCP

**Connection**
```typescript
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const transport = new StdioClientTransport({
  command: 'npx',
  args: [
    '-y',
    '@brightdata-mcp/server@latest',
    '--api-key',
    process.env.BRIGHT_DATA_API_KEY!,
  ],
});

const client = new Client({
  name: 'startup-hunter',
  version: '1.0.0',
}, { capabilities: {} });

await client.connect(transport);
```

**Key Tools**
- `search_engine` — Google/Bing/Yandex search (FREE)
- `scrape_as_markdown` — Convert webpages to markdown (FREE)
- `web_data_reddit_posts` — Reddit scraping (Pro)
- `web_data_x_posts` — Twitter scraping (Pro)

**Usage Pattern**
```typescript
// Parallel scraping
const [ph, gh, reddit, hn] = await Promise.all([
  scrapeProductHunt(),
  scrapeGitHub(),
  scrapeReddit(),
  scrapeHackerNews(),
]);
```

### Acontext

**Connection**
```typescript
import { AcontextClient } from '@acontext/acontext';

const client = new AcontextClient({
  apiKey: process.env.ACONTEXT_API_KEY,
  // OR for self-hosted:
  // baseUrl: 'http://localhost:8029'
});
```

**Core Operations**
```typescript
// 1. Create Session (one startup journey)
const session = await client.sessions.create({
  metadata: { userId: 'user123', domain: 'fintech' }
});

// 2. Store messages
await client.sessions.storeMessage(session.id, {
  role: 'user',
  content: 'I want to build in fintech'
});

// 3. Create Space (per idea workspace)
const space = await client.spaces.create({
  name: 'AI meeting notes for nurses',
  sessionId: session.id
});

// 4. Store artifacts to Disk
await client.disk.upload({
  spaceId: space.id,
  path: 'trends.json',
  content: JSON.stringify(trends)
});

// 5. Auto-extract tasks
await client.sessions.flush(session.id);
const tasks = await client.sessions.getTasks(session.id);

// 6. Retrieve context
const messages = await client.sessions.getMessages(session.id);
const files = await client.disk.list({ spaceId: space.id });
```

### ActionBook

**Connection (SDK)**
```typescript
import { Actionbook } from '@actionbookdev/sdk';

const actionbook = new Actionbook();
// No API key required during open beta
```

**Test Script Pattern**
```typescript
// 1. Search for action manuals (optional, for smart selectors)
const actions = await actionbook.searchActions('login form');
const loginAction = await actionbook.getActionById(actions[0].id);

// 2. Execute via CLI (isolated mode)
import { exec } from 'child_process';
import { promisify } from 'util';
const execAsync = promisify(exec);

await execAsync('actionbook browser open http://localhost:3000');
await execAsync('actionbook browser click "[data-testid=signup-button]"');
await execAsync('actionbook browser fill "#email" "test@example.com"');
await execAsync('actionbook browser screenshot step1.png');
await execAsync('actionbook browser click "[type=submit]"');
await execAsync('actionbook browser screenshot step2.png');

// 3. Generate report
const report = {
  passed: true,
  steps: [
    { name: 'Open homepage', status: 'pass', screenshot: 'step1.png' },
    { name: 'Submit form', status: 'pass', screenshot: 'step2.png' }
  ]
};
```

### OpenAI (via Vercel AI SDK)

**Connection**
```typescript
import { generateText, tool } from 'ai';
import { openai } from '@ai-sdk/openai';

const { text } = await generateText({
  model: openai('gpt-4-turbo'),
  tools: {
    searchTrends: tool({
      description: 'Search for trending startups',
      parameters: z.object({ domain: z.string() }),
      execute: async ({ domain }) => {
        // Call Bright Data
        return await scrapeWithBrightData(domain);
      }
    }),
    storeMemory: tool({
      description: 'Store context in Acontext',
      parameters: z.object({ key: z.string(), value: z.any() }),
      execute: async ({ key, value }) => {
        // Call Acontext
        return await acontextClient.disk.upload({...});
      }
    })
  },
  prompt: 'Find trending fintech startups'
});
```

---

## Demo Flow

### 5-Minute Pitch Script

**T+0:00 — Opening Hook**
> "Hi everyone! I'm [Name], and I built an AI agent that takes you from 'I have no idea what to build' to a tested MVP — fully autonomous. Let me show you."

**T+0:30 — WOW #1: Autonomous Research**
> *[Open landing page, type "fintech"]*  
> "I just said I want to build something in fintech. Watch what happens..."  
> *[Click "Scan Trends"]*  
> "The agent is now using Bright Data to scrape Product Hunt, GitHub, Reddit, and Hacker News in parallel — resilient to anti-bot measures, always fresh data."  
> *[Show live logs: "Scraping Product Hunt... found 47 posts", "Clustering by keywords..."]*  
> "In 30 seconds, it clustered 200+ data points into 5 validated trend cards."

**T+1:30 — WOW #2: Memory-Driven Reasoning**
> *[Show trend cards with Opportunity Scores]*  
> "Each card has an Opportunity Score — momentum, pain severity, competition, build complexity."  
> *[Click on "AI expense tracking for freelancers"]*  
> "I'll pick this one. Now watch the agent reason..."  
> *[Show Acontext memory panel]*  
> "It remembers: 'Last time you rejected B2C because CAC is high. Prioritizing B2B tools.' This is Acontext — long-term memory across the entire workflow."

**T+2:30 — Deep Proposal**
> *[Scroll through 10-section proposal]*  
> "The agent generated a full startup proposal — problem statement, target persona, unique wedge, MVP scope, go-to-market strategy. I can edit inline, and it'll remember my changes."  
> *[Edit target market to 'SEA region', click "Rebuild"]*  
> "Now it's personalized to Southeast Asia. Let's build it."

**T+3:30 — WOW #3: Browser Automation**
> *[Click "Build MVP"]*  
> "The agent is scaffolding a Next.js app right now — landing page, dashboard, expense tracking flow. Done. Starting localhost..."  
> *[localhost:3000 opens]*  
> "Now comes the magic. ActionBook — autonomous browser testing."  
> *[Click "Test with Browser"]*  
> *[Browser window opens, clicks through signup → add expense → submit → logout]*  
> *[Show test report with 4 screenshots, all ✅ pass]*  
> "Real browser execution. Proof it works."

**T+4:30 — Close**
> "From 'I have no idea' to a tested MVP in under 5 minutes. Bright Data for research. Acontext for memory. ActionBook for verification. All autonomous."  
> *[Click "Push to GitHub"]*  
> "And if you're happy? One click to ship."  
> "Thank you!"

---

## Environment Variables

Create `.env.local`:

```bash
# OpenAI
OPENAI_API_KEY=sk-...

# Bright Data MCP
BRIGHT_DATA_API_KEY=...
PRO_MODE=true  # Optional: enable pro features
GROUPS=social,research,advanced_scraping  # Optional: tool groups

# Acontext
ACONTEXT_API_KEY=...
# OR for self-hosted:
# ACONTEXT_BASE_URL=http://localhost:8029

# ActionBook (no key needed during open beta)
# ACTIONBOOK_API_KEY=...

# Optional: GitHub (for publishing)
GITHUB_TOKEN=ghp_...
```

---

## Next Steps

1. **Read this document thoroughly** to understand the full scope
2. **Review AGENTS.md** for the strategic rationale
3. **Start with Phase 1** (Project Setup) when ready to build
4. **Test each integration** (Bright Data, Acontext, ActionBook) independently first
5. **Build incrementally** — get trend scanning working, then add Acontext, then ActionBook
6. **Prepare demo data** so you can show the flow even if APIs are slow
7. **Rehearse the pitch** multiple times — timing is critical for hackathons

---

**Questions?** Check the docs:
- Bright Data: https://docs.brightdata.com/llms.txt
- Acontext: https://docs.acontext.io/llms.txt
- ActionBook: https://actionbook.dev/docs/llms.txt

Good luck at the hackathon! 🚀
