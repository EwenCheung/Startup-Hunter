# Startup Hunter

> From "no idea" to tested MVP — fully autonomous AI agent platform

**Hackathon Project**: AI agent that researches market trends, generates startup ideas, builds MVPs, and tests them automatically using Bright Data MCP, Acontext, and ActionBook.

---

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the interface.

---

## What It Does

**Startup Hunter** takes founders from idea discovery to tested MVP through a 6-stage autonomous workflow:

1. **Trend Scan** → Real-time market intelligence from Product Hunt, GitHub, Reddit, Hacker News
2. **Idea Generation** → 5 startup ideas with AI reasoning and opportunity scores
3. **Deep Proposal** → 10-section structured proposal (problem, persona, wedge, MVP, GTM, risks)
4. **MVP Build** → Scaffold Next.js application with 3 core pages
5. **Automated Testing** → Browser-based E2E tests with ActionBook
6. **Deliver** → localhost URL + test report with screenshots

---

## Tech Stack

- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS + shadcn/ui
- **State Management**: React Context
- **Tools (Placeholder)**: Bright Data MCP, Acontext, ActionBook
- **AI (Placeholder)**: OpenAI GPT-4 / Claude

---

## Project Structure

```
app/
├── components/
│   ├── chat/           # Basic chat UI (5 components)
│   └── embeds/         # Rich embedded cards (5 components)
├── lib/
│   ├── chat-context.tsx        # React Context for state
│   ├── mock-data.ts            # Demo data
│   ├── mcp-client.ts           # Bright Data placeholder
│   ├── acontext-client.ts      # Acontext placeholder
│   ├── actionbook-client.ts    # ActionBook placeholder
│   └── ai-agent.ts             # OpenAI orchestrator placeholder
├── app/
│   ├── page.tsx                # Main chat interface
│   ├── globals.css             # Custom styles
│   └── api/chat/route.ts       # API placeholder
└── public/screenshots/         # Test screenshots (placeholders)
```

---

## Demo Flow (5 Minutes)

### T+0:00 — Opening
"Hi, I'm [Name]. I built an AI agent that takes you from 'no idea' to a tested MVP — fully autonomous."

### T+0:30 — WOW #1: Live Scraping
Type "fintech" → Click **Scan Trends**

Watch live logs:
```
🔍 Scraping Product Hunt... found 47 posts
🔍 Scraping GitHub trending... found 23 repos
🧠 Clustering by keywords... identified 5 trend clusters
✅ Trend scan complete
```

### T+1:30 — WOW #2: Acontext Memory Reasoning
Select trend → See Acontext memory box:
```
🧠 Acontext Memory Reasoning:
"Prioritizing B2B because you rejected B2C ideas last time for high CAC."
```

### T+3:30 — WOW #3: Browser Automation Testing
Click **Build MVP** → Click **Test with Browser**

Watch browser open → Click through flows → See test report:
```
✅ Test Report: All Passed (4/4)
✅ Homepage renders
✅ User signup flow
✅ Add expense
✅ Dashboard displays expense
```

### T+4:30 — Close
"From 'no idea' to tested MVP in under 5 minutes. Thank you!"

---

## Current Status

### ✅ Completed (Frontend - DEMO READY)
- [x] All 10 UI components built and styled
- [x] Chat flow with 6 stages
- [x] 3 WOW moments visually implemented
- [x] Anti-AI-slop design (blue accents, sharp edges, left-aligned)
- [x] Build passes with no TypeScript errors
- [x] Mock data for full demo
- [x] SVG screenshot placeholders created (4 test steps)

### ⏳ TODO (Backend - For Teammates)
- [ ] Implement Bright Data MCP scraping (`lib/mcp-client.ts`)
- [ ] Implement Acontext memory integration (`lib/acontext-client.ts`)
- [ ] Implement ActionBook browser automation (`lib/actionbook-client.ts`)
- [ ] Implement OpenAI orchestration (`lib/ai-agent.ts`)
- [ ] (Optional) Replace SVG screenshots with real browser screenshots

---

## Design Principles

**Anti-AI-slop:**
- ✅ Blue primary (`#2563eb`) — NO purple
- ✅ Left-aligned layouts — NO centered
- ✅ Mixed border radius — NO uniform rounded corners
- ✅ Geist Sans font — NO Inter

**3 Visual WOW Moments:**
1. **BuildProgress** → Animated terminal logs (green monospace)
2. **IdeaCard** → Acontext reasoning box (blue gradient)
3. **TestReport** → Screenshot thumbnails with modal zoom

---

## Resources

- **Bright Data MCP**: https://docs.brightdata.com/llms.txt
- **Acontext**: https://docs.acontext.io/llms.txt
- **ActionBook**: https://actionbook.dev/docs/llms.txt
- **Project Proposal**: `../AGENTS.md`
- **Implementation Plan**: `../structure.md`
- **Frontend Spec**: `../frontend.md`

---

## Commands

```bash
npm run dev       # Start development server
npm run build     # Production build
npm run start     # Run production server
npm run lint      # Run ESLint
```

---

## License

Hackathon project - MIT License
