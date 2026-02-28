# Startup Hunter — Autonomous AI Agent Platform

> **From "No Idea" to Tested MVP — Fully Autonomous**

**Hackathon Project**: AI agent that researches market trends, generates startup ideas, builds MVPs, and tests them automatically using Bright Data MCP, Acontext, and ActionBook.

---

## Executive Summary

**Startup Hunter** is an autonomous agent platform that turns vague founder intent into a shipped, tested MVP through an end-to-end AI-driven workflow.

**The Problem**: Aspiring founders struggle with three bottlenecks:
1. **Finding validated opportunities** (endless market research)
2. **Maintaining context** across ideation → validation → building (fragmented tools)
3. **Proving it works** (manual testing, no evidence)

**Our Solution**: An AI agent that:
- Uses **Bright Data MCP** for real-time market intelligence (Product Hunt, GitHub, Reddit, Hacker News)
- Uses **Acontext** for persistent memory across the entire startup journey (remembers preferences, rejected ideas, evolving requirements)
- Uses **ActionBook** for browser-based automated testing (real execution proof with screenshots)

**User Journey**: Input → Trend Scan → Idea Selection → Deep Proposal → MVP Build → Automated Test → Publish

**Target Audience**: Solo founders, hackathon participants, indie hackers, startup studios

**Demo Time**: 5 minutes (3 wow moments at T+0:30, T+1:30, T+3:30)

---

## 1) What You're Shipping (Tight Product Definition)

**Startup Hunter** is an AI platform that takes someone from **"no idea" → "validated idea" → "MVP shipped + tested"** in one guided flow:

### The 6-Stage Pipeline

1. **Trend Scan (Bright Data MCP)** → Find what's rising in real-time
   - Scrape Product Hunt, GitHub trending, Reddit, Hacker News
   - Cluster by keywords, calculate momentum scores
   - Extract pain points from comments and upvotes

2. **Idea Generation + Selection** → Shortlist & pick one
   - AI generates 5-10 startup ideas from trend data
   - Shows reasoning with Acontext memory ("rejected X because Y")
   - User selects the most promising idea

3. **Deep Proposal** → Market, user, wedge, MVP plan
   - 10-section structured proposal (problem, persona, wedge, MVP, GTM, risks)
   - Personalized using Acontext context
   - Iterative refinement with user feedback

4. **MVP Build** → Scaffold app + key pages
   - Generate Next.js project structure
   - 3 pages: landing, dashboard, core workflow
   - Seed with sample JSON data (no database)
   - Auto-run `npm install` & `npm run dev` on localhost
   - Minimal env config (avoid external dependencies where possible)

5. **MVP Test (ActionBook)** → Real browser E2E check
   - Open localhost in browser (isolated mode)
   - Execute test scripts: signup → core flow → validation
   - Capture screenshots as evidence
   - Generate pass/fail test report

6. **Deliver** → localhost link + (optional) GitHub push
   - Show working MVP URL
   - Display test results with screenshots
   - One-click publish to GitHub (if user approves)

**Your "Wow" Factor**: Agent researches + builds + tests by itself, with visible autonomy at every step.

---

## 2) Where Each Tool Is Used (Pitch Lines)

### 🟢 Bright Data MCP — "Research Engine"

**Used For:**
- Scraping trend sources: Product Hunt, Hacker News, Reddit subreddits, GitHub trending, YC news, tech blogs, app store categories
- Collecting evidence: titles, upvotes/stars, comments sentiment, recurring keywords
- Building a "Trend Graph": clusters + momentum scores

**Integration:**
- MCP client via `@modelcontextprotocol/sdk` (StdioClientTransport)
- Tools: `search_engine` (FREE), `scrape_as_markdown` (FREE), `web_data_reddit_posts` (Pro)
- Parallel scraping: 4 sources simultaneously
- Resilient to anti-bot/CAPTCHA (Bright Data's infrastructure)

**Pitch Line:**
> "Bright Data MCP powers real-time trend collection at scale, resilient to anti-bot measures, so the agent's research is always fresh."

---

### 🟣 Acontext — "Memory + Workflow Brain"

**Used For:**
- Storing user preferences, constraints, decisions across all 6 stages
- Keeping long-term context: chosen idea, rejected ideas + rationale, target persona, competitor notes
- Structuring work into primitives:
  - **Session** = one startup journey (user's full workflow)
  - **Space** = per-idea workspace (like a project room)
  - **Disk** = persistent artifacts (trends.json, proposal.md, test_report.md)
  - **Task** = auto-extracted from conversations (Research → Proposal → Build → Test → Ship)
  - **Skills** = reusable modules (trend_cluster, market_map, mvp_scaffold, test_plan)

**Memory Layers:**
- **Long-term**: User preferences (domain, market, constraints)
- **Mid-term**: Task execution state (current stage, progress)
- **Per-proposal**: One proposal = one long-term memory space

**Integration:**
- TypeScript SDK: `@acontext/acontext` (AcontextClient)
- Hosted at dash.acontext.io OR self-hosted with Docker (port 8029)
- Store/retrieve messages, files, tasks
- Automatic task extraction via `flush(sessionId)`

**Pitch Line:**
> "Acontext turns a chat into a multi-step agent workflow with persistent memory and reusable skills."

**Wow Moment:**
When the agent says:
> "Last time you rejected B2C ideas because CAC is high; I'm prioritizing B2B tools this time."

---

### 🔵 ActionBook — "Proof It Works"

**Used For:**
- Automated browser testing:
  - Homepage renders correctly
  - Key flows: signup/login, create item, search, checkout-like flow
  - Form validation
- Taking screenshots as evidence at each step
- Producing a test report: "✅ Pass/Fail + screenshots + step logs"

**Integration:**
- JavaScript SDK: `@actionbookdev/sdk` (Actionbook class)
- CLI: `actionbook browser open/click/fill/screenshot`
- Isolated mode (fresh Chrome instance for reproducible tests)
- Action manuals: pre-verified DOM selectors (10x faster, 100x token savings)

**Pitch Line:**
> "ActionBook gives our agent hands and eyes — real browser execution, not just code generation."

**Wow Moment:**
Browser opens live on stage, agent clicks through signup/dashboard/submit, screenshots appear in test report.

---

## 3) End-to-End User Flow (What User Sees)

### Stage 1: User Input

**User Journey:**
User wants to build a startup → has no direction OR has a chosen domain → prompts AI → AI uses Bright Data to find trends → AI generates ideas → user selects idea → AI generates deep proposal → user refines proposal → user approves → AI builds MVP → AI tests with ActionBook → if tests pass, provides localhost link → if user agrees, publishes to GitHub

**User can start with:**
- "No direction, just give me the best opportunities"
- OR "I want something in [fitness / finance / education / cybersecurity]"

**Acontext stores:**
- Domain preference
- Budget/time constraints
- Target market (SG/SEA/global)
- Skill constraints (solo dev, 24 hours)

---

### Stage 2: Trend Scan (Bright Data Heavy)

**What happens:**
Agent runs a 5–10 minute "trend sweep" across 4 sources in parallel.

**Output: Trend Cards (5–10)**
Each card shows:
- **Trend title** (e.g., "AI meeting notes for nurses")
- **Momentum score** (stars/upvotes growth rate)
- **Pain point summary** (extracted from comments)
- **Evidence links/snippets** (source URLs)
- **Competitor count estimate** (manual scraping + search)
- **"Why now"** (recent catalysts: regulation, tech breakthrough, zeitgeist)

**Opportunity Score Formula:**
```
Score = (Momentum × 2) + (Pain Severity × 3) 
        - (Competition Density) - (Build Complexity)

Where:
- Momentum = upvote growth rate (0-10)
- Pain Severity = keyword frequency in comments (0-10)
- Competition = # of existing solutions (0-10, inverted)
- Build Complexity = estimated hours ÷ 10 (0-10, inverted)
```

**User Action:** Select one trend card.

**Acontext logs:**
- Selected trend + reasons
- Rejected trends + reasons (shows smart reasoning)

---

### Stage 3: Deep Proposal Generator

**What happens:**
Agent outputs a structured 10-section proposal using OpenAI + Acontext context.

**Proposal Skeleton:**
1. **Problem Statement** (pain, who, urgency)
2. **Target User Persona** (1–2 key personas with jobs-to-be-done)
3. **Current Alternatives** (competitors + their weaknesses)
4. **Unique Wedge** (your unfair advantage)
5. **MVP Scope** (must-have features only)
6. **Key User Flows** (3-5 critical paths)
7. **Data & Model Plan** (optional: if AI-heavy)
8. **Go-to-Market** (first 50 users strategy)
9. **Risks & Mitigations** (technical, market, execution)
10. **2-Week Roadmap** (daily milestones)

**User Action:** Iterate on proposal (inline edits), agent updates using Acontext memory.

**User Action (final):** Approve proposal → trigger MVP build.

---

### Stage 4: MVP Build (Fast)

**For hackathon scope:**
- Next.js + simple backend OR minimal fullstack
- **No database** (use in-memory or JSON storage)
- 3 pages: landing, dashboard, core workflow
- Seeded sample data for demo
- Host on localhost
- **Minimal env config** (avoid external API dependencies where possible — platform should work without complex setup)

**Agent produces:**
- Repo scaffold
- Run instructions
- "MVP spec checklist" matched to proposal

**Acontext stores:**
- Final spec
- Build checklist
- Progress logs

---

### Stage 5: Test with ActionBook (Huge Demo)

**What happens:**
Agent runs automated browser tests using ActionBook in isolated mode.

**Test flows:**
- Open localhost
- Click through core flow (signup → create item → submit)
- Check UI text matches proposal
- Capture screenshots at each step

**Outputs:**
- ✅ Pass/Fail report
- Evidence screenshots
- Suggested fixes (if any failures)

---

### Stage 6: Deliver & Publish

**Agent gives:**
- localhost URL
- How to run instructions
- If user agrees: push to GitHub

**(For hackathon, GitHub push is sufficient — no cloud deployment needed.)**

---

## 4) Make It Look "Agentic" (How You Impress Judges)

### The 3 "Wow Moments" You MUST Show on Stage

#### Wow #1: Autonomous Trend Scan with Evidence (T+0:30)
- **Show:** Live "Trend Feed" updating in real-time
- **Visual:** Animated logs scrolling:
  - "🔍 Scraping Product Hunt... found 47 posts"
  - "🔍 Scraping GitHub trending... found 23 repos"
  - "🧠 Clustering by keywords... identified 5 trend clusters"
  - "📊 Calculating momentum scores..."
- **Why it impresses:** Visible autonomy, real scraping (not mocked)

#### Wow #2: Memory-Driven Reasoning (T+1:30)
- **Show:** Acontext memory panel
- **Visual:** Agent says in UI:
  > "I noticed you rejected B2C ideas last time because CAC is too high. This time I'm prioritizing B2B tools with lower acquisition costs."
- **Why it impresses:** Shows long-term memory, not just single-turn LLM

#### Wow #3: ActionBook Live Testing (T+3:30)
- **Show:** Browser window opening, clicking through MVP
- **Visual:**
  - Browser opens (isolated Chrome)
  - Clicks signup button
  - Fills form fields
  - Submits
  - Takes screenshot
  - Test report appears: ✅ All passed + 4 screenshots
- **Why it impresses:** Real browser execution (not simulated), visual proof

**Key Insight:** Judges LOVE visible autonomy. Don't just say "the agent does X" — SHOW logs, browser, memory panel.

---

## 5) Hackathon-Friendly Architecture (Simple But Sounds Advanced)

### Core Modules (Skill Blocks)

```
src/lib/
├── mcp-client.ts          # Bright Data MCP wrapper
├── acontext-client.ts     # Acontext session manager
├── actionbook-client.ts   # ActionBook automation
├── ai-agent.ts            # OpenAI orchestrator
├── trend-collector.ts     # Scraping logic
├── opportunity-score.ts   # Scoring algorithm
├── proposal-builder.ts    # Proposal generator
├── mvp-scaffolder.ts      # Code generator
└── test-runner.ts         # ActionBook test executor
```

**Skill Block Breakdown:**
- **`trend_collector`** (Bright Data) — Parallel scraping + clustering
- **`trend_clusterer`** (LLM + simple scoring) — Group similar trends, calculate scores
- **`idea_generator`** (LLM) — Generate startup ideas from trends
- **`proposal_builder`** (LLM + template) — 10-section structured output
- **`mvp_scaffolder`** (Code generator + file writer) — Generate Next.js project
- **`actionbook_tester`** (ActionBook scripts) — Browser automation tests
- **`reporter`** (Markdown + screenshots) — Test report generator

---

### Acontext Objects (How You "Name Drop" It)

When pitching, mention these exact terms:

| Object | Purpose | Example |
|--------|---------|---------|
| **Session** | One startup journey | `session-user123-fintech` |
| **Space** | Per-idea workspace | `space-ai-meeting-notes-nurses` |
| **Disk** | Persistent artifacts | `trends.json`, `proposal.md`, `test_report.md` |
| **Task** | Workflow stages | Research → Proposal → Build → Test → Ship |
| **Skill Block** | Reusable modules | `trend_cluster`, `market_map`, `mvp_scaffold` |

**Example pitch line:**
> "We use Acontext's Session object to track the user's entire journey, Space objects for per-idea workspaces, and Disk for persistent artifacts like proposals and test reports. Tasks are auto-extracted from conversations, so the agent knows exactly where it is in the pipeline."

---

## 6) What to Actually Build in 24–36 Hours (Realistic Scope)

### MVP Scope (Doable)

**Web UI with 3 Main Tabs:**
1. **Trends** — Live scraping status + trend cards
2. **Ideas** — Generated ideas with Acontext reasoning
3. **Proposal + Build + Test** — All-in-one editor with action buttons

**Key Buttons (Visible on Stage):**
- **"Run Trend Scan"** (Bright Data)
- **"Generate Ideas"** (OpenAI + Acontext)
- **"Lock Idea"** (User selection)
- **"Generate Proposal"** (OpenAI + Acontext)
- **"Build MVP"** (Code generator)
- **"Test with Browser"** (ActionBook)
- **"Push to GitHub"** (Optional)

**What MUST Be Real (Not Mocked):**
1. ✅ **Bright Data scraping** — actual API calls to 2-4 sources
2. ✅ **ActionBook browser automation** — real Chrome opening and clicking
3. ✅ **Acontext context storage** — save/retrieve from Acontext API

**What CAN Be Simplified:**
- ❌ No database (use in-memory + JSON files)
- ❌ No authentication (demo mode)
- ❌ No deployment (localhost only)
- ❌ Clustering can be simple keyword matching (not ML)
- ❌ Generated MVP is visual mockup with placeholder functionality (looks working, simple backend)

---

## 7) Polished Hackathon Submission Description

**Copy-Paste This:**

---

**Startup Hunter** is an autonomous agent platform that turns vague founder intent into a shipped, tested MVP.

**How It Works:**
- During **research**, it uses **Bright Data MCP** to continuously gather real-time trend signals across Product Hunt, GitHub trending, Reddit, and Hacker News — resilient to anti-bot measures.
- During **collaboration**, it uses **Acontext** to maintain long-horizon memory of user preferences, rejected ideas, and evolving requirements across structured tasks and persistent workspaces.
- During **verification**, it uses **ActionBook** to execute real browser-based tests against the generated product and produce an evidence-backed test report with screenshots.

**User Journey:**
Users can start with no direction or a chosen domain. The agent collects trends, proposes startup ideas with evidence and reasoning, generates a full 10-section proposal, scaffolds a Next.js MVP (visual mockup with working interactions), tests it end-to-end in the browser, then provides a localhost demo link and (with approval) pushes the code to GitHub.

**Why It's Impressive:**
- **Visible autonomy** at every stage (live scraping logs, memory-driven reasoning, browser automation)
- **Multi-tool orchestration** (Bright Data + Acontext + ActionBook working together seamlessly)
- **Real execution proof** (not just code generation — actual browser tests with screenshots)

**Target Audience:** Solo founders, hackathon participants, indie hackers, startup studios

**Tech Stack:** Next.js 15, TypeScript, OpenAI, Bright Data MCP, Acontext, ActionBook, Tailwind CSS

---

## 8) Extra Edge to Win (Killer Feature)

### **"Opportunity Score"** (Analytical Edge)

Display this on every trend card:

```
Opportunity Score = (Momentum × 2) + (Pain Severity × 3) 
                    - (Competition Density) - (Build Complexity)

Where:
- Momentum       = upvote/star growth rate (0-10)
- Pain Severity  = keyword frequency in comments (0-10)
- Competition    = # of existing solutions (0-10, inverted)
- Build Complexity = estimated hours ÷ 10 (0-10, inverted)
```

**Why this matters:**
Even if it's heuristic, it makes your system look **data-driven and analytical**.

---

## 9) Action Plan You Can Execute Immediately

1. Build the UI flow (Trends → Pick → Proposal → Build → Test)
2. Implement Bright Data trend collector for 3 sources first (Product Hunt + GitHub trending + Reddit)
3. Implement Acontext memory objects (Session + Space + Disk + Task)
4. Implement ActionBook test script for 3 flows (open → click → submit form)
5. Wrap everything into a "one button demo": **Start → Ship**

---

## 10) 5-Minute Demo Script (Exact Words + Timing)

### T+0:00 — Opening Hook
**You say:**
> "Hi everyone! I'm [Name], and I built an AI agent that takes you from 'I have no idea what to build' to a tested MVP — fully autonomous. Let me show you."

### T+0:30 — WOW #1: Autonomous Research
**You do:** Type "fintech", click **"Scan Trends"**

**Screen shows:** Live logs updating in real-time
```
🔍 Scraping Product Hunt... found 47 posts
🔍 Scraping GitHub trending... found 23 repos
🧠 Clustering by keywords... identified 5 trend clusters
✅ Trend scan complete
```

**You say:**
> "The agent is using Bright Data MCP to scrape Product Hunt, GitHub, Reddit, and Hacker News in parallel. In 30 seconds, it analyzed 200+ data points."

### T+1:30 — WOW #2: Memory-Driven Reasoning
**You do:** Click **"AI expense tracking for freelancers"**

**Screen shows:** Acontext memory panel:
```
💭 Acontext Memory:
"Last time you rejected B2C because CAC is high. 
Prioritizing B2B tools this time."
```

**You say:**
> "This is Acontext — the agent remembers past decisions across the entire workflow."

### T+3:30 — WOW #3: Browser Automation
**You do:** Click **"Build MVP"** → Click **"Test with Browser"**

**Screen shows:** Browser opens, clicks through MVP, takes screenshots

**Test report appears:**
```
✅ Test Report: All Passed (4/4)
✅ Homepage renders
✅ User signup flow
✅ Add expense
✅ Dashboard displays expense
```

**You say:**
> "Real browser execution. Proof it works."

### T+4:30 — Close
**You say:**
> "From 'I have no idea' to a tested MVP in under 5 minutes. Thank you!"

---

## Resources

- **Bright Data MCP**: https://docs.brightdata.com/llms.txt
- **Acontext**: https://docs.acontext.io/llms.txt
- **ActionBook**: https://actionbook.dev/docs/llms.txt
- **Project Structure**: `structure.md` (detailed implementation guide)
- **Tech Stack**: Next.js 15 + TypeScript + OpenAI + Tailwind CSS
