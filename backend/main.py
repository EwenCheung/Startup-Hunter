"""
Startup Hunter - Python FastAPI Backend

Provides API endpoints for:
- Trend scanning (Bright Data MCP)
- Idea generation (OpenAI + Acontext)
- Proposal building
- MVP scaffolding
- Browser testing (ActionBook)
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import time

app = FastAPI(title="Startup Hunter API", version="1.0.0")

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================================
# REQUEST/RESPONSE MODELS
# ============================================================================

class ChatRequest(BaseModel):
    message: str
    stage: str

class ChatResponse(BaseModel):
    message: str
    stage: str
    embedType: Optional[str] = None
    embedData: Optional[Any] = None

# ============================================================================
# MOCK DATA (Replace with real implementations)
# ============================================================================

MOCK_TRENDS = [
    {
        "id": "trend-1",
        "title": "AI voice notes for healthcare workers",
        "score": 87,
        "momentum": 9,
        "pain": 10,
        "competition": 6,
        "complexity": 4,
        "painPoints": [
            "Nurses spend 2-3 hours per shift on documentation",
            "Medical errors from rushed notes",
            "Burnout from administrative work"
        ],
        "evidence": [
            {"source": "Product Hunt", "url": "#", "snippet": "Voice-to-SOAP note app got 847 upvotes"},
            {"source": "Reddit r/nursing", "url": "#", "snippet": "Top post: 'I wish I could just talk my notes'"}
        ]
    },
    {
        "id": "trend-2",
        "title": "AI expense tracking for freelancers",
        "score": 82,
        "momentum": 8,
        "pain": 9,
        "competition": 7,
        "complexity": 3,
        "painPoints": [
            "Freelancers lose 15-20% potential deductions",
            "Manual receipt tracking is tedious",
            "Tax season panic"
        ],
        "evidence": [
            {"source": "GitHub", "url": "#", "snippet": "Receipt OCR lib trending: 2.3k stars this month"},
            {"source": "Hacker News", "url": "#", "snippet": "'Show HN: Expense tracker' - 340 points"}
        ]
    },
    {
        "id": "trend-3",
        "title": "Micro-SaaS for Notion power users",
        "score": 78,
        "momentum": 7,
        "pain": 8,
        "competition": 8,
        "complexity": 5,
        "painPoints": [
            "Notion lacks advanced automation",
            "No built-in analytics for workspaces",
            "API integration is manual"
        ],
        "evidence": [
            {"source": "Product Hunt", "url": "#", "snippet": "Notion plugin got 623 upvotes"},
            {"source": "Reddit r/notion", "url": "#", "snippet": "120k members, daily automation requests"}
        ]
    },
    {
        "id": "trend-4",
        "title": "AI meeting scheduler with personality",
        "score": 75,
        "momentum": 8,
        "pain": 7,
        "competition": 9,
        "complexity": 6,
        "painPoints": [
            "Calendly feels robotic and impersonal",
            "Back-and-forth email tennis",
            "Time zone confusion"
        ],
        "evidence": [
            {"source": "Twitter", "url": "#", "snippet": "Viral tweet: 'I hate scheduling meetings' - 12k likes"},
            {"source": "Product Hunt", "url": "#", "snippet": "6 scheduling tools launched this month"}
        ]
    },
    {
        "id": "trend-5",
        "title": "Dev tool for debugging production issues",
        "score": 91,
        "momentum": 10,
        "pain": 9,
        "competition": 5,
        "complexity": 8,
        "painPoints": [
            "Production bugs are invisible until users complain",
            "Log aggregation is expensive (DataDog = $$$)",
            "Debugging in prod is dangerous"
        ],
        "evidence": [
            {"source": "GitHub", "url": "#", "snippet": "Error tracking OSS project: 15k stars"},
            {"source": "Hacker News", "url": "#", "snippet": "'Ask HN: Better way to debug prod?' - 450 points"}
        ]
    }
]

MOCK_IDEAS = [
    {
        "id": "idea-1",
        "title": "VoiceSOAP - Voice-to-SOAP Notes for Nurses",
        "tagline": "Speak your patient notes, get instant SOAP documentation",
        "reasoning": "I noticed you're interested in healthcare + AI. This combines high pain (nurses spend 25% of shift on docs) with urgent need (burnout crisis) and clear wedge (voice is 5x faster than typing). Competition is low because most medical transcription tools target doctors, not nurses.",
        "market": "850k nurses in US alone, $50/mo = $500M TAM",
        "wedge": "Start with ER nurses (highest burnout, fastest-paced environment)",
        "mvpTime": "2 weeks",
        "recommended": True
    },
    {
        "id": "idea-2",
        "title": "TaxSnap - AI Receipt Scanner for Freelancers",
        "tagline": "Snap receipts, auto-categorize, maximize deductions",
        "reasoning": "Strong Product Hunt signal (847 upvotes) + proven pain (freelancers lose $3-5k/year in deductions). Low build complexity (OCR + categorization) means fast MVP. Monetization is clear: save $3k, pay $99/year.",
        "market": "59M freelancers in US, $99/year = $5.8B TAM",
        "wedge": "Target Upwork top-rated freelancers (already tax-conscious)",
        "mvpTime": "10 days",
        "recommended": False
    },
    {
        "id": "idea-3",
        "title": "NotionIQ - Analytics Dashboard for Notion",
        "tagline": "See how your team actually uses Notion",
        "reasoning": "Notion has 30M users but zero native analytics. Power users (120k in r/notion) constantly ask for usage insights, automation triggers, and bottleneck detection. API access makes this buildable.",
        "market": "5M Notion team users, $15/mo = $900M TAM",
        "wedge": "Start with remote teams (need visibility into async work)",
        "mvpTime": "3 weeks",
        "recommended": False
    },
    {
        "id": "idea-4",
        "title": "MeetWarm - Scheduling with Personality",
        "tagline": "Calendly but with warmth and context",
        "reasoning": "Viral Twitter signal (12k likes on 'I hate scheduling') but high competition (Calendly, Cal.com). However, nobody focuses on *warmth* - all tools are robotic. Wedge: make scheduling feel human with AI-generated personalized messages.",
        "market": "10M knowledge workers, $10/mo = $1.2B TAM",
        "wedge": "Target sales teams (scheduling = part of their brand)",
        "mvpTime": "2 weeks",
        "recommended": False
    },
    {
        "id": "idea-5",
        "title": "ProdSnap - Production Debugger for Indie Hackers",
        "tagline": "See what breaks in production, fix it fast",
        "reasoning": "DataDog costs $50k+/year, Sentry is overkill for small teams. Indie hackers need something between 'free tier' and 'enterprise'. Strong GitHub signal (15k stars on OSS error tracker). Technical complexity is higher but creates moat.",
        "market": "500k indie hackers, $29/mo = $174M TAM",
        "wedge": "Start with Next.js apps (huge community, easy integration)",
        "mvpTime": "4 weeks",
        "recommended": False
    }
]

MOCK_PROPOSAL = [
    {
        "title": "Problem Statement",
        "content": "Nurses spend 2-3 hours per 12-hour shift on documentation, contributing to burnout and medical errors. Current solutions (Dragon Medical, Epic templates) are designed for doctors, not bedside nurses who need speed and mobility."
    },
    {
        "title": "Target User Persona",
        "content": "**Primary**: ER and ICU nurses (ages 28-45) working 12-hour shifts in urban hospitals. Tech-comfortable, frustrated with documentation burden, willing to pay out-of-pocket for time-saving tools.\n\n**Secondary**: Travel nurses who work across multiple hospital systems with different EMR software."
    },
    {
        "title": "Current Alternatives",
        "content": "1. **Dragon Medical** ($300/year) - Desktop-only, doctor-focused, steep learning curve\n2. **Epic templates** - Rigid, doesn't capture nuance, still requires typing\n3. **Manual typing** - Slow, error-prone, done after shift ends"
    },
    {
        "title": "Unique Wedge",
        "content": "**Mobile-first voice capture** designed for bedside workflow. Unlike Dragon (desktop) or Epic (templates), we let nurses speak naturally while walking between patients, then auto-generate structured SOAP notes that copy-paste into any EMR."
    },
    {
        "title": "MVP Scope (Must-Have Features)",
        "content": "1. Voice recording with timestamps (iOS app)\n2. Speech-to-text with medical terminology\n3. AI-generated SOAP note structure (Subjective, Objective, Assessment, Plan)\n4. Copy-paste to clipboard (EMR-agnostic)\n5. Basic edit/correction interface\n\n**Out of scope for MVP**: EMR integration, team features, voice commands"
    },
    {
        "title": "Key User Flows",
        "content": "**Core Flow**: Start shift → Open app → Tap record after patient interaction → Speak observations naturally → Review generated SOAP → Copy to EMR → Done in 30 seconds instead of 10 minutes\n\n**Edge Cases**: Handle background noise (ER is loud), medical jargon, multi-patient sessions"
    },
    {
        "title": "Data & Model Plan",
        "content": "- **Speech-to-text**: Whisper API (OpenAI) - medical terminology friendly\n- **SOAP generation**: GPT-4 with prompt engineering for medical structure\n- **Storage**: Encrypted audio files + text (HIPAA-compliant S3)\n- **No PHI in prompts**: Strip patient names before sending to OpenAI"
    },
    {
        "title": "Go-to-Market (First 50 Users)",
        "content": "1. **Week 1-2**: Post in r/nursing (120k members) offering free beta\n2. **Week 3-4**: Reach out to 20 ER nurses via LinkedIn (offer $50 Amazon gift card for feedback)\n3. **Week 5-6**: Partner with 1 hospital's nursing union for pilot program\n4. **Pricing**: $19.99/month (saves 30 hours/month = $0.67/hour)"
    },
    {
        "title": "Risks & Mitigations",
        "content": "**Risk 1**: HIPAA compliance complexity\n*Mitigation*: Use HIPAA-compliant infrastructure (AWS + BAA), avoid storing PHI\n\n**Risk 2**: Hospitals ban personal devices\n*Mitigation*: Target travel nurses first (they use personal phones), then approach hospital IT\n\n**Risk 3**: Nurses don't trust AI accuracy\n*Mitigation*: Position as 'draft generator' not 'final notes', show edit interface"
    },
    {
        "title": "2-Week Roadmap",
        "content": "**Week 1**: Basic voice recording + Whisper transcription + SOAP prompt engineering (Days 1-3), iOS app shell with record button (Days 4-5), Copy-to-clipboard feature (Days 6-7)\n\n**Week 2**: Edit interface for corrections (Days 8-10), Beta testing with 5 nurse friends (Days 11-13), Polish + deploy to TestFlight (Day 14)"
    }
]

MOCK_BUILD_LOGS = [
    {"step": "init", "message": "🎯 Initializing project: VoiceSOAP-mvp"},
    {"step": "scaffold", "message": "📁 Creating Next.js 14 app structure..."},
    {"step": "scaffold", "message": "✅ Generated: app/page.tsx (landing page)"},
    {"step": "scaffold", "message": "✅ Generated: app/record/page.tsx (voice recorder)"},
    {"step": "scaffold", "message": "✅ Generated: app/dashboard/page.tsx (SOAP history)"},
    {"step": "api", "message": "🔧 Setting up API routes..."},
    {"step": "api", "message": "✅ Created: /api/transcribe (Whisper integration)"},
    {"step": "api", "message": "✅ Created: /api/generate-soap (GPT-4 prompt)"},
    {"step": "deps", "message": "📦 Installing dependencies..."},
    {"step": "deps", "message": "✅ Installed: openai, tailwindcss, react-hook-form"},
    {"step": "complete", "message": "🚀 MVP ready! Run: cd voicesoap-mvp && npm run dev"}
]

MOCK_TEST_REPORT = {
    "overall": "passed",
    "timestamp": "2025-02-28 12:34:56",
    "steps": [
        {
            "name": "Homepage renders correctly",
            "status": "passed",
            "duration": "1.2s",
            "screenshot": "/screenshots/step1.svg",
            "details": "Verified: Title 'VoiceSOAP', tagline, CTA button present"
        },
        {
            "name": "Voice recorder page loads",
            "status": "passed",
            "duration": "0.8s",
            "screenshot": "/screenshots/step2.svg",
            "details": "Verified: Record button, waveform placeholder, stop button"
        },
        {
            "name": "Sample audio generates SOAP note",
            "status": "passed",
            "duration": "3.5s",
            "screenshot": "/screenshots/step3.svg",
            "details": "Verified: SOAP structure (S/O/A/P sections), edit button, copy button"
        },
        {
            "name": "Dashboard displays saved notes",
            "status": "passed",
            "duration": "1.1s",
            "screenshot": "/screenshots/step4.svg",
            "details": "Verified: List view, timestamps, search functionality"
        }
    ]
}

# ============================================================================
# API ENDPOINTS
# ============================================================================

@app.get("/")
async def root():
    """Health check endpoint"""
    return {"status": "ok", "service": "Startup Hunter API", "version": "1.0.0"}

@app.post("/api/chat")
async def chat(request: ChatRequest):
    """
    Main chat endpoint - handles all conversation stages
    
    TODO: Replace mock data with real implementations
    - Stage 'trends': Integrate Bright Data MCP scraping
    - Stage 'ideas': Integrate OpenAI + Acontext memory
    - Stage 'proposal': Integrate OpenAI structured output
    - Stage 'build': Integrate code generation
    - Stage 'test': Integrate ActionBook browser automation
    """
    
    stage = request.stage
    message = request.message.lower()
    
    # Stage 1: Collect user input
    if stage == "input":
        return ChatResponse(
            message=f"Got it! I'll scan trends in the {request.message} space. This will take about 30 seconds...",
            stage="trends",
            embedType="status",
            embedData={"message": "Starting trend scan..."}
        )
    
    # Stage 2: Show trends (mock - should call Bright Data)
    elif stage == "trends":
        # TODO: Call mcp_client.scan_trends(domain=message)
        time.sleep(0.5)  # Simulate processing
        return ChatResponse(
            message="Found 5 trending opportunities! Here are the top ideas based on momentum, pain severity, and competition:",
            stage="trends",
            embedType="trends",
            embedData=MOCK_TRENDS
        )
    
    # Stage 3: Generate ideas (mock - should call OpenAI + Acontext)
    elif stage == "ideas":
        # TODO: Call ai_agent.generate_ideas(trend_id=message)
        time.sleep(0.5)
        return ChatResponse(
            message="I've generated 5 startup ideas. I'm recommending the first one based on your constraints:",
            stage="ideas",
            embedType="ideas",
            embedData=MOCK_IDEAS
        )
    
    # Stage 4: Generate proposal (mock - should call OpenAI)
    elif stage == "proposal":
        # TODO: Call ai_agent.generate_proposal(idea_id=message)
        time.sleep(0.5)
        return ChatResponse(
            message="Here's a detailed 10-section proposal for your startup:",
            stage="proposal",
            embedType="proposal",
            embedData=MOCK_PROPOSAL
        )
    
    # Stage 5: Build MVP (mock - should generate code)
    elif stage == "build":
        # TODO: Call mvp_scaffolder.create_project(proposal)
        return ChatResponse(
            message="Building your MVP...",
            stage="build",
            embedType="build",
            embedData=MOCK_BUILD_LOGS
        )
    
    # Stage 6: Test with ActionBook (mock - should run browser tests)
    elif stage == "test":
        # TODO: Call actionbook_client.run_tests(project_path)
        time.sleep(0.5)
        return ChatResponse(
            message="✅ All tests passed! Your MVP is ready.",
            stage="complete",
            embedType="test",
            embedData=MOCK_TEST_REPORT
        )
    
    else:
        raise HTTPException(status_code=400, detail=f"Unknown stage: {stage}")

# ============================================================================
# BRIGHT DATA MCP INTEGRATION (TODO)
# ============================================================================

@app.post("/api/trends/scan")
async def scan_trends(domain: str):
    """
    Scan trends using Bright Data MCP
    
    TODO: Implement real scraping:
    1. Import mcp_client
    2. Call mcp_client.scrape_product_hunt()
    3. Call mcp_client.scrape_github_trending()
    4. Call mcp_client.scrape_reddit()
    5. Call mcp_client.scrape_hackernews()
    6. Cluster results and calculate opportunity scores
    """
    return {"status": "not_implemented", "message": "TODO: Integrate Bright Data MCP"}

# ============================================================================
# ACONTEXT INTEGRATION (TODO)
# ============================================================================

@app.post("/api/memory/save")
async def save_memory(session_id: str, data: Dict[str, Any]):
    """
    Save conversation state to Acontext
    
    TODO: Implement Acontext integration:
    1. Import acontext_client
    2. Call acontext_client.save_to_space(session_id, data)
    3. Update task status
    """
    return {"status": "not_implemented", "message": "TODO: Integrate Acontext"}

@app.get("/api/memory/retrieve")
async def retrieve_memory(session_id: str):
    """
    Retrieve conversation state from Acontext
    
    TODO: Implement Acontext integration:
    1. Import acontext_client
    2. Call acontext_client.get_from_space(session_id)
    3. Return structured data
    """
    return {"status": "not_implemented", "message": "TODO: Integrate Acontext"}

# ============================================================================
# ACTIONBOOK INTEGRATION (TODO)
# ============================================================================

@app.post("/api/test/run")
async def run_tests(project_path: str):
    """
    Run browser tests using ActionBook
    
    TODO: Implement ActionBook integration:
    1. Import actionbook_client
    2. Call actionbook_client.open_browser(project_url)
    3. Execute test flows (signup, core actions, validation)
    4. Capture screenshots
    5. Generate test report
    """
    return {"status": "not_implemented", "message": "TODO: Integrate ActionBook"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
