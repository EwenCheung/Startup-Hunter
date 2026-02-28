# Startup Hunter — Frontend Design (Ultra-Minimal MVP)

> **One-Day Hackathon MVP: WOW Frontend + Minimal Backend**

**Goal**: Impress judges with visual polish while keeping backend simple/mocked.

---

## Design Philosophy

### Core Principle: Chat-First Interface

**Single-column chat** (like ChatGPT) with rich embedded components.

**NO multi-page app. NO complex layouts. Just:**
- Chat messages scrolling up
- Rich cards embedded in AI responses
- Optional: Tiny sidebar showing Acontext memory

---

## Layout (Super Simple)

```
┌────────────────────────────────────────────────────────┐
│ 🎯 Startup Hunter                         [Settings]   │  ← Header (64px)
├────────────────────────────────────────────────────────┤
│                                                        │
│              Chat Messages (Scrollable)                │
│                                                        │
│  ┌──────────────────────────────────────────────┐    │
│  │ User: I want to build in fintech             │    │  ← User message
│  └──────────────────────────────────────────────┘    │
│                                                        │
│  ┌──────────────────────────────────────────────┐    │
│  │ AI: Great! Scanning trends now...            │    │  ← AI message
│  └──────────────────────────────────────────────┘    │
│                                                        │
│         [🔍 Scraping Product Hunt...]                 │  ← Status message
│                                                        │
│  ┌──────────────────────────────────────────────┐    │
│  │ AI: Found 5 trends!                          │    │
│  │                                              │    │
│  │ ┌────────────────────────────────────────┐  │    │
│  │ │ 🔥 Score 8.7/10                        │  │    │
│  │ │ AI Meeting Notes for Nurses            │  │    │  ← Trend Card
│  │ │ [Select This Trend]                    │  │    │
│  │ └────────────────────────────────────────┘  │    │
│  │                                              │    │
│  │ [...4 more trend cards...]                   │    │
│  └──────────────────────────────────────────────┘    │
│                                                        │
├────────────────────────────────────────────────────────┤
│  Type your message...                        [Send]   │  ← Input (72px)
└────────────────────────────────────────────────────────┘
```

**Dimensions**:
- **Chat area**: 800px max width, centered
- **Header**: 64px fixed height
- **Input**: 72px fixed height at bottom
- **Messages**: Scrollable (fills remaining space)

---

## Color Palette (Copy-Paste Ready)

```css
/* Primary */
--primary: #3b82f6;      /* Blue */
--primary-hover: #2563eb;

/* Accent */
--purple: #8b5cf6;       /* Ideas stage */
--green: #10b981;        /* Success/Pass */
--orange: #f59e0b;       /* Scores */
--red: #f43f5e;          /* Warnings */

/* Neutrals */
--bg: #f9fafb;           /* Page background */
--message-user: #3b82f6; /* User bubble */
--message-ai: #f3f4f6;   /* AI bubble */
--text: #111827;         /* Primary text */
--text-muted: #6b7280;   /* Secondary text */
--border: #e5e7eb;       /* Borders */
```

---

## Components (Only What You Need)

### 1. Message Bubbles

**User Message** (right-aligned, blue):
```tsx
<div className="flex justify-end mb-4">
  <div className="max-w-[70%] rounded-2xl rounded-br-sm bg-blue-500 text-white px-4 py-3">
    {message.content}
  </div>
</div>
```

**AI Message** (left-aligned, gray):
```tsx
<div className="flex justify-start mb-4">
  <div className="max-w-[70%] rounded-2xl rounded-bl-sm bg-gray-100 text-gray-900 px-4 py-3">
    {message.content}
  </div>
</div>
```

**System Status** (centered):
```tsx
<div className="flex justify-center mb-4">
  <div className="px-4 py-2 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-gray-600 text-sm">
    🔍 Scraping Product Hunt... found 47 posts
  </div>
</div>
```

---

### 2. Trend Card (Embedded in AI Message)

```tsx
<div className="border border-gray-200 rounded-xl p-5 bg-white hover:shadow-lg transition-shadow">
  {/* Score Badge */}
  <div className="flex justify-between items-start mb-3">
    <div className="text-2xl font-bold text-gray-900">
      AI Meeting Notes for Nurses
    </div>
    <div className="px-3 py-1 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold">
      🔥 8.7/10
    </div>
  </div>
  
  {/* Metrics */}
  <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
    <div>📈 Momentum: <span className="font-semibold">9/10</span></div>
    <div>💢 Pain: <span className="font-semibold">9/10</span></div>
    <div>🏢 Competition: <span className="font-semibold">3/10</span></div>
    <div>🛠️ Build: <span className="font-semibold">5/10</span></div>
  </div>
  
  {/* Pain Points */}
  <div className="mb-4">
    <div className="font-medium text-gray-700 mb-1">Pain Points:</div>
    <ul className="text-sm text-gray-600 space-y-1">
      <li>• "We waste 2 hours/day on notes"</li>
      <li>• "Existing tools don't understand medical terms"</li>
    </ul>
  </div>
  
  {/* Evidence */}
  <div className="mb-4">
    <div className="font-medium text-gray-700 mb-1">Evidence:</div>
    <ul className="text-sm text-gray-600 space-y-1">
      <li>• Product Hunt: 342 upvotes (↑ 312%)</li>
      <li>• Reddit: 47 comments in r/nursing</li>
    </ul>
  </div>
  
  {/* Button */}
  <button className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors">
    Select This Trend
  </button>
</div>
```

---

### 3. Idea Card (Embedded in AI Message)

```tsx
<div className="border-l-4 border-purple-500 bg-white rounded-xl p-5 shadow-sm">
  {/* Header */}
  <div className="flex items-center gap-2 mb-3">
    <div className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded">
      ⭐ RECOMMENDED
    </div>
    <div className="text-xl font-bold text-gray-900">
      NurseNote AI — Voice-to-Chart for Healthcare
    </div>
  </div>
  
  {/* Core Concept */}
  <div className="mb-4">
    <div className="font-medium text-gray-700 mb-1">Core Concept:</div>
    <p className="text-sm text-gray-600">
      Voice-activated notes that auto-transcribe to SOAP format, 
      integrate with EMR systems.
    </p>
  </div>
  
  {/* Target User */}
  <div className="mb-4">
    <div className="font-medium text-gray-700 mb-1">Target User:</div>
    <p className="text-sm text-gray-600">
      Nurses (12-hour shifts), 2 hrs/day on docs
    </p>
  </div>
  
  {/* Why You Can Win */}
  <div className="mb-4">
    <div className="font-medium text-gray-700 mb-1">Why You Can Win:</div>
    <ul className="text-sm text-gray-600 space-y-1">
      <li>✓ Medical terminology model</li>
      <li>✓ HIPAA-compliant</li>
      <li>✓ EMR partnerships</li>
    </ul>
  </div>
  
  {/* Acontext Reasoning (WOW MOMENT #2) */}
  <div className="bg-blue-50 border-l-3 border-blue-500 rounded-lg p-3 mb-4">
    <div className="flex items-center gap-2 mb-1">
      <span className="text-lg">🧠</span>
      <span className="font-medium text-blue-900">Acontext Reasoning:</span>
    </div>
    <p className="text-sm text-blue-800 italic">
      "Prioritizing B2B because you rejected B2C ideas last time 
      for high CAC. Healthcare has strong unit economics."
    </p>
  </div>
  
  {/* Button */}
  <button className="w-full py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors">
    Lock This Idea
  </button>
</div>
```

---

### 4. Proposal (Simple Accordion)

```tsx
<div className="bg-white rounded-xl border border-gray-200 p-5">
  <div className="text-xl font-bold mb-4">📄 Startup Proposal — NurseNote AI</div>
  
  {/* Section 1: Problem (Expanded) */}
  <div className="mb-3 border border-gray-200 rounded-lg overflow-hidden">
    <button className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 text-left font-medium flex justify-between items-center">
      <span>1. Problem Statement</span>
      <span>▼</span>
    </button>
    <div className="px-4 py-3 bg-white">
      <p className="text-sm text-gray-600 mb-3">
        Nurses spend 2+ hours per 12-hour shift on documentation...
      </p>
      <div className="flex gap-2">
        <button className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50">
          Edit
        </button>
        <button className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50">
          Regenerate
        </button>
      </div>
    </div>
  </div>
  
  {/* Section 2-10: Collapsed */}
  <div className="mb-3 border border-gray-200 rounded-lg">
    <button className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 text-left font-medium flex justify-between items-center">
      <span>2. Target User Persona</span>
      <span>▶</span>
    </button>
  </div>
  
  {/* ...repeat for sections 3-10... */}
  
  {/* Actions */}
  <div className="flex gap-3 mt-4">
    <button className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium">
      Build MVP
    </button>
    <button className="px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg">
      Download PDF
    </button>
  </div>
</div>
```

---

### 5. Build Progress (Live Logs)

```tsx
<div className="bg-white rounded-xl border border-gray-200 p-5">
  <div className="flex justify-between items-center mb-4">
    <div className="text-xl font-bold">🛠️ Building MVP...</div>
    <div className="text-sm text-gray-600">Step 3/5 (60%)</div>
  </div>
  
  {/* Progress Bar */}
  <div className="mb-4 h-2 bg-gray-200 rounded-full overflow-hidden">
    <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: '60%' }}></div>
  </div>
  
  {/* Live Logs (Terminal Style) */}
  <div className="bg-gray-900 rounded-lg p-3 h-48 overflow-y-auto font-mono text-xs">
    <div className="text-gray-400">[12:45:01]</div>
    <div className="text-green-400">⚙️ Scaffolding Next.js app...</div>
    <div className="text-gray-400">[12:45:03]</div>
    <div className="text-green-400">✅ Created pages/index.tsx</div>
    <div className="text-gray-400">[12:45:04]</div>
    <div className="text-yellow-400">⚙️ Installing dependencies...</div>
    <div className="text-gray-400">[12:45:12]</div>
    <div className="text-green-400">✅ npm install complete</div>
    <div className="text-gray-400">[12:45:13]</div>
    <div className="text-cyan-400">🚀 Starting localhost:3000...</div>
  </div>
</div>
```

---

### 6. Test Report (WOW MOMENT #3)

```tsx
<div className="bg-white rounded-xl border border-gray-200 p-5">
  {/* Header */}
  <div className="flex items-center gap-3 mb-4">
    <div className="text-3xl">✅</div>
    <div>
      <div className="text-xl font-bold text-green-600">All Tests Passed (4/4)</div>
      <div className="text-sm text-gray-600">Execution time: 42 seconds</div>
    </div>
  </div>
  
  {/* Test Steps */}
  <div className="space-y-3">
    {/* Step 1 (Expanded) */}
    <div className="border border-green-200 rounded-lg overflow-hidden">
      <button className="w-full px-4 py-2 bg-green-50 hover:bg-green-100 text-left flex justify-between items-center">
        <span className="font-medium">✅ Step 1: Homepage Renders</span>
        <span>▼</span>
      </button>
      <div className="p-4 bg-white">
        {/* Screenshot */}
        <img 
          src="/screenshots/step1.png" 
          alt="Homepage screenshot"
          className="w-full rounded-lg border border-gray-200 mb-3 cursor-pointer hover:opacity-90"
        />
        <div className="text-sm text-gray-600">
          <div>• Verified hero text: "NurseNote AI"</div>
          <div>• CTA button visible</div>
        </div>
      </div>
    </div>
    
    {/* Steps 2-4 (Collapsed) */}
    <div className="border border-green-200 rounded-lg">
      <button className="w-full px-4 py-2 bg-green-50 hover:bg-green-100 text-left flex justify-between items-center">
        <span className="font-medium">✅ Step 2: User Signup Flow</span>
        <span>▶</span>
      </button>
    </div>
    
    {/* ...repeat for steps 3-4... */}
  </div>
  
  {/* Actions */}
  <div className="flex gap-3 mt-4">
    <button className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium">
      View Localhost
    </button>
    <button className="flex-1 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg font-medium">
      Push to GitHub
    </button>
  </div>
</div>
```

---

## Optional: Tiny Sidebar (Acontext Memory)

**Only if you have extra time. NOT required for MVP.**

```tsx
{/* Left sidebar (280px, collapsible) */}
<div className="w-70 bg-blue-50 border-r border-blue-200 p-4 overflow-y-auto">
  <div className="text-lg font-bold mb-4">💭 Agent Memory</div>
  
  {/* Current Goal */}
  <div className="mb-4">
    <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Current Goal</div>
    <div className="text-sm text-gray-800">Find fintech opportunities</div>
  </div>
  
  {/* Progress */}
  <div className="mb-4">
    <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Progress</div>
    <div className="text-sm space-y-1">
      <div>✅ Scanned trends</div>
      <div>✅ Generated ideas</div>
      <div>⏳ Building MVP</div>
    </div>
  </div>
  
  {/* Context */}
  <div className="mb-4">
    <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Context</div>
    <div className="text-sm text-gray-600 space-y-1">
      <div>• Domain: Fintech</div>
      <div>• Market: SEA</div>
      <div>• Budget: $0</div>
    </div>
  </div>
  
  {/* Memory */}
  <div>
    <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Memory</div>
    <div className="text-sm text-gray-600 space-y-1">
      <div>• Rejected B2C (CAC too high)</div>
      <div>• Prefer B2B SaaS</div>
    </div>
  </div>
</div>
```

---

## Chat Input (Bottom)

```tsx
<div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
  <div className="max-w-3xl mx-auto flex gap-3">
    <input 
      type="text"
      placeholder="Type your message..."
      className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-medium">
      Send
    </button>
  </div>
</div>
```

---

## 3 WOW Moments (Exactly What to Show)

### WOW #1: Live Scraping Logs (T+0:30)

**What happens**:
User types "fintech" → AI responds "Scanning trends..." → Status messages appear:

```
[🔍 Scraping Product Hunt...]
✅ Found 47 posts (342 upvotes)

[🔍 Scraping GitHub trending...]
✅ Found 23 repos (4.2K stars)

[🧠 Clustering by keywords...]
✅ Identified 5 trend clusters
```

Then 5 trend cards appear in AI message.

**How to fake it for demo**:
- Pre-fetch trends once
- Simulate "live" logs with `setTimeout()` (200ms delays between lines)
- Animate trend cards appearing one by one

---

### WOW #2: Acontext Memory Reasoning (T+1:30)

**What happens**:
In the recommended idea card, show this box:

```
🧠 Acontext Reasoning:
"Prioritizing B2B because you rejected B2C ideas 
last time for high CAC. Healthcare has strong 
unit economics."
```

**How to fake it for demo**:
- Hardcode 2-3 memory items in sidebar
- Show reasoning box with pre-written text
- No need for real Acontext API (just visual)

---

### WOW #3: Browser Automation + Screenshots (T+3:30)

**What happens**:
After "Build MVP" completes:
1. Show test report with 4 screenshots
2. Each screenshot shows actual localhost screens
3. All tests have ✅ green checkmarks

**How to fake it for demo**:
- Pre-build a simple Next.js app
- Take 4 real screenshots manually
- Show them in test report
- Optional: Open localhost in new tab when user clicks "View Localhost"

---

## Minimal Backend Strategy

### What You MUST Implement

1. **Chat API** (`/api/chat`)
   - Receives user message
   - Returns AI response with embedded cards
   - Use OpenAI for text generation
   - Hardcode trend/idea data (no real Bright Data scraping)

2. **Mock Data** (`/lib/mock-data.ts`)
   - 5 pre-written trend cards
   - 5 pre-written idea cards
   - 1 pre-written proposal
   - 4 pre-taken screenshots

3. **Simple State** (React Context)
   - Current stage (input → trends → ideas → proposal → build → test)
   - Selected trend/idea
   - Messages array

### What You Can SKIP

- ❌ Real Bright Data scraping (use mock data)
- ❌ Real Acontext API (fake memory in frontend state)
- ❌ Real ActionBook automation (pre-taken screenshots)
- ❌ Real MVP generation (pre-built Next.js app)
- ❌ Database (all in-memory)
- ❌ Authentication
- ❌ GitHub publishing

### What Makes It Look Real

1. **Animated typing indicator** when AI is "thinking"
2. **Simulated delays** (500ms-2s) between stages
3. **Live-looking logs** with timestamps
4. **Real screenshots** (take them once, reuse)
5. **Polish the UI** (smooth animations, hover effects, loading states)

---

## File Structure (Minimal)

```
src/
├── app/
│   ├── page.tsx              # Main chat page (ONLY PAGE)
│   ├── layout.tsx
│   ├── globals.css
│   └── api/
│       └── chat/route.ts     # Main API (handles all stages)
│
├── components/
│   ├── MessageBubble.tsx     # User/AI/System messages
│   ├── TrendCard.tsx         # Trend card component
│   ├── IdeaCard.tsx          # Idea card component
│   ├── ProposalEmbed.tsx     # Proposal accordion
│   ├── BuildProgress.tsx     # Progress bar + logs
│   ├── TestReport.tsx        # Test results + screenshots
│   ├── ChatInput.tsx         # Bottom input field
│   └── Sidebar.tsx           # Optional: Acontext memory panel
│
├── lib/
│   ├── chat-context.tsx      # React Context for chat state
│   ├── mock-data.ts          # Hardcoded trends/ideas/proposal
│   └── utils.ts              # Helper functions
│
└── public/
    └── screenshots/          # Pre-taken test screenshots
        ├── step1.png
        ├── step2.png
        ├── step3.png
        └── step4.png
```

**That's it! ~10 files total.**

---

## Implementation Priority (One Day)

### Hour 1-2: Setup + Basic Chat
- ✅ Next.js project
- ✅ Tailwind CSS
- ✅ Basic layout (header + chat + input)
- ✅ Message bubbles (user/AI/system)

### Hour 3-4: Rich Components
- ✅ Trend card component
- ✅ Idea card component
- ✅ Proposal accordion
- ✅ Test report component

### Hour 5-6: Chat Logic + Mock Data
- ✅ React Context for state
- ✅ Mock data file (trends/ideas/proposal)
- ✅ API route that returns mock data based on stage
- ✅ Message flow (user input → trends → ideas → proposal → test)

### Hour 7-8: Polish + Demo Prep
- ✅ Animated typing indicator
- ✅ Simulated delays (setTimeout for "live" logs)
- ✅ Smooth animations (fade in, slide up)
- ✅ Take 4 real screenshots for test report
- ✅ Rehearse demo script

---

## Next Steps

1. **Set up Next.js + Tailwind**
2. **Copy-paste these components** into your project
3. **Create mock data file** with 5 trends, 5 ideas, 1 proposal
4. **Build chat flow** (user message → trigger next stage → show embedded card)
5. **Add animations** (typing indicator, live logs, fade-in cards)
6. **Take 4 screenshots** of a simple Next.js app
7. **Rehearse the 3 WOW moments**

**Focus**: 80% frontend polish, 20% backend logic. Judges see the UI, not the code!

Good luck! 🚀
