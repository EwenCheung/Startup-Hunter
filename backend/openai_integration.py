"""
OpenAI Integration Module

Handles all LLM-powered operations:
- Trend clustering and scoring
- Startup idea generation
- Proposal structuring
- Reasoning and context synthesis
"""

import os
import json
from typing import List, Dict, Any, Optional
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

class OpenAIClient:
    def __init__(self, api_key: str = None):
        self.api_key = api_key or os.getenv('OPENAI_API_KEY')
        self.client = OpenAI(api_key=self.api_key)
        self.model = "gpt-4o-mini"  # Fast and cost-effective
        self.model_advanced = "gpt-4o"  # For complex reasoning
    
    def cluster_trends(self, raw_data: List[Dict[str, Any]], domain: str = "") -> List[Dict[str, Any]]:
        """
        Cluster raw scraped data into structured trends with opportunity scores
        
        Args:
            raw_data: List of scraped items from Product Hunt, GitHub, Reddit, HN
            domain: Optional domain filter (e.g., "fintech", "healthcare")
        
        Returns:
            List of TrendData objects with scores
        """
        if not raw_data:
            return []
        
        # Prepare data summary for LLM
        data_summary = json.dumps(raw_data[:50], indent=2)  # Limit to 50 items
        
        prompt = f"""You are a trend analyst for startup ideas. Analyze this scraped data and identify 5 distinct trending opportunities.

Domain focus: {domain if domain else "Any domain"}

Raw Data from Product Hunt, GitHub, Reddit, Hacker News:
{data_summary}

For each trend, provide:
1. A clear title (e.g., "AI voice notes for healthcare workers")
2. Extracted pain points (specific quotes or patterns from the data)
3. Evidence (sources and snippets)
4. Scores (0-10 scale):
   - Momentum: upvote/star growth rate
   - Pain: severity of problem
   - Competition: number of existing solutions (0 = many, 10 = few)
   - Complexity: build difficulty (0 = hard, 10 = easy)

Calculate opportunity score: (Momentum × 2) + (Pain × 3) - Competition - Complexity

Return JSON array with this structure:
[
  {{
    "id": "trend-1",
    "title": "Clear trend title",
    "score": 85,
    "momentum": 9,
    "pain": 10,
    "competition": 6,
    "complexity": 4,
    "painPoints": ["quote 1", "quote 2", "quote 3"],
    "evidence": [
      {{"source": "Product Hunt", "url": "url", "snippet": "evidence"}},
      {{"source": "Reddit", "url": "url", "snippet": "evidence"}}
    ]
  }}
]

Return ONLY valid JSON, no markdown or explanations."""

        try:
            response = self.client.chat.completions.create(
                model=self.model_advanced,
                messages=[
                    {"role": "system", "content": "You are a startup trend analyst. Return only valid JSON."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                response_format={"type": "json_object"}
            )
            
            content = response.choices[0].message.content
            
            # Parse JSON response
            try:
                # Handle if response is wrapped in a root object
                parsed = json.loads(content)
                if isinstance(parsed, dict) and 'trends' in parsed:
                    return parsed['trends']
                elif isinstance(parsed, list):
                    return parsed
                else:
                    # Assume it's a dict with one key containing the array
                    first_value = next(iter(parsed.values()))
                    if isinstance(first_value, list):
                        return first_value
                    return []
            except json.JSONDecodeError as e:
                print(f"JSON decode error: {e}")
                print(f"Content: {content}")
                return []
        
        except Exception as e:
            print(f"Error clustering trends: {e}")
            print("⚠️  Using fallback clustered trends for testing")
            return self._get_fallback_trends(domain, raw_data)
    
    def generate_ideas(
        self, 
        selected_trend: Dict[str, Any],
        user_context: Optional[Dict[str, Any]] = None,
        acontext_memory: Optional[str] = None
    ) -> List[Dict[str, Any]]:
        """
        Generate startup ideas based on selected trend and user context
        
        Args:
            selected_trend: The trend user selected
            user_context: User preferences (domain, constraints, target market)
            acontext_memory: Memory from Acontext (rejected ideas, preferences)
        
        Returns:
            List of startup idea objects
        """
        trend_summary = json.dumps(selected_trend, indent=2)
        context_str = json.dumps(user_context or {}, indent=2)
        memory_str = acontext_memory or "No previous context"
        
        prompt = f"""You are a startup idea generator. Based on this trend and user context, generate 5 distinct startup ideas.

Selected Trend:
{trend_summary}

User Context:
{context_str}

Previous Memory (rejected ideas, preferences):
{memory_str}

Generate 5 startup ideas with:
1. Title (clear, memorable)
2. Tagline (10-15 words, value prop)
3. Reasoning (why this idea given the trend + context + memory, 3-4 sentences)
4. Market size estimate (TAM)
5. Unique wedge (unfair advantage)
6. MVP time estimate (realistic)
7. Recommended flag (true for best idea, false for others)

Return JSON:
[
  {{
    "id": "idea-1",
    "title": "Product Name",
    "tagline": "One-line value prop",
    "reasoning": "I noticed X from the trend. Combined with Y from your context. This solves Z. The wedge is W.",
    "market": "X users/companies, $Y price = $Z TAM",
    "wedge": "Start with niche segment (specifics)",
    "mvpTime": "N weeks",
    "recommended": true
  }}
]

Make reasoning personal by referencing Acontext memory. Return ONLY valid JSON."""

        try:
            response = self.client.chat.completions.create(
                model=self.model_advanced,
                messages=[
                    {"role": "system", "content": "You are a startup advisor. Return only valid JSON."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.8,
                response_format={"type": "json_object"}
            )
            
            content = response.choices[0].message.content
            parsed = json.loads(content)
            
            # Extract array from response
            if isinstance(parsed, dict) and 'ideas' in parsed:
                return parsed['ideas']
            elif isinstance(parsed, list):
                return parsed
            else:
                first_value = next(iter(parsed.values()))
                if isinstance(first_value, list):
                    return first_value
                return []
        
        except Exception as e:
            print(f"Error generating ideas: {e}")
            print("⚠️  Using fallback ideas for testing")
            return self._get_fallback_ideas(selected_trend)
    
    def generate_proposal(
        self,
        selected_idea: Dict[str, Any],
        trend_context: Dict[str, Any]
    ) -> List[Dict[str, str]]:
        """
        Generate a detailed 10-section startup proposal
        
        Args:
            selected_idea: The idea user selected
            trend_context: Original trend data for evidence
        
        Returns:
            List of proposal sections
        """
        idea_summary = json.dumps(selected_idea, indent=2)
        trend_summary = json.dumps(trend_context, indent=2)
        
        prompt = f"""You are a startup strategist writing a detailed proposal.

Selected Idea:
{idea_summary}

Original Trend Context:
{trend_summary}

Write a comprehensive 10-section proposal:

1. Problem Statement (pain, who, urgency, current state)
2. Target User Persona (2 personas with jobs-to-be-done)
3. Current Alternatives (3 competitors + weaknesses)
4. Unique Wedge (unfair advantage, why now)
5. MVP Scope (must-have features only, out-of-scope)
6. Key User Flows (core flow, edge cases)
7. Data & Model Plan (tech stack, APIs, storage, compliance)
8. Go-to-Market (first 50 users strategy, pricing)
9. Risks & Mitigations (3 risks with mitigation plans)
10. 2-Week Roadmap (daily milestones)

Each section should be 2-4 paragraphs, concrete and actionable.

Return JSON:
[
  {{
    "title": "Problem Statement",
    "content": "detailed markdown content here..."
  }},
  ...
]

Return ONLY valid JSON."""

        try:
            response = self.client.chat.completions.create(
                model=self.model_advanced,
                messages=[
                    {"role": "system", "content": "You are a startup strategist. Return only valid JSON."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                response_format={"type": "json_object"}
            )
            
            content = response.choices[0].message.content
            parsed = json.loads(content)
            
            # Extract array
            if isinstance(parsed, dict) and 'sections' in parsed:
                return parsed['sections']
            elif isinstance(parsed, list):
                return parsed
            else:
                first_value = next(iter(parsed.values()))
                if isinstance(first_value, list):
                    return first_value
                return []
        
        except Exception as e:
            print(f"Error generating proposal: {e}")
            print("⚠️  Using fallback proposal for testing")
            return self._get_fallback_proposal(selected_idea)
    
    def generate_mvp_plan(self, proposal: List[Dict[str, str]]) -> List[Dict[str, str]]:
        """
        Generate MVP build steps from proposal
        
        Returns:
            List of build log entries
        """
        proposal_summary = "\n\n".join([f"## {s['title']}\n{s['content']}" for s in proposal[:5]])
        
        prompt = f"""Based on this proposal, generate realistic MVP build steps.

Proposal Summary:
{proposal_summary}

Generate 10-15 build steps for a Next.js MVP with:
- Project initialization
- Page scaffolding (landing, dashboard, core feature pages)
- API routes
- Dependencies
- Sample data seeding

Return JSON:
[
  {{"step": "init", "message": "🎯 Initializing project: [name]"}},
  {{"step": "scaffold", "message": "📁 Creating Next.js 14 app structure..."}},
  ...
  {{"step": "complete", "message": "🚀 MVP ready! Run: cd [name] && npm run dev"}}
]

Return ONLY valid JSON."""

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a developer. Return only valid JSON."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.5,
                response_format={"type": "json_object"}
            )
            
            content = response.choices[0].message.content
            parsed = json.loads(content)
            
            # Extract array
            if isinstance(parsed, dict) and 'steps' in parsed:
                return parsed['steps']
            elif isinstance(parsed, list):
                return parsed
            else:
                first_value = next(iter(parsed.values()))
                if isinstance(first_value, list):
                    return first_value
                return []
        
        except Exception as e:
            print(f"Error generating MVP plan: {e}")
            print("⚠️  Using fallback MVP plan for testing")
            return self._get_fallback_mvp_plan()
    
    def _get_fallback_trends(self, domain: str, raw_data: List[Dict]) -> List[Dict[str, Any]]:
        """Fallback clustered trends when OpenAI is unavailable"""
        # Extract some real data from raw_data if available
        sample_titles = [item.get('title', '') for item in raw_data[:3]] if raw_data else []
        
        return [
            {
                "id": "trend-1",
                "title": f"AI-Powered {domain.capitalize()} Automation Platform",
                "score": 78,
                "momentum": 9,
                "pain": 9,
                "competition": 7,
                "complexity": 5,
                "painPoints": [
                    f"Manual {domain} processes waste 10+ hours per week",
                    "Existing tools too complex for non-technical users",
                    f"High cost of {domain} specialists"
                ],
                "evidence": [
                    {"source": "Product Hunt", "url": "#", "snippet": sample_titles[0] if sample_titles else "AI automation trending"},
                    {"source": "Reddit", "url": "#", "snippet": f"Users complaining about {domain} inefficiency"}
                ]
            },
            {
                "id": "trend-2",
                "title": f"Real-time Collaboration Tools for {domain.capitalize()}",
                "score": 72,
                "momentum": 8,
                "pain": 8,
                "competition": 6,
                "complexity": 6,
                "painPoints": [
                    f"Teams struggle with async {domain} communication",
                    "Video calls for simple status updates waste time",
                    "Context loss between meetings"
                ],
                "evidence": [
                    {"source": "GitHub", "url": "#", "snippet": sample_titles[1] if len(sample_titles) > 1 else "Collaboration tools trending"},
                    {"source": "Hacker News", "url": "#", "snippet": "Remote work challenges discussion"}
                ]
            },
            {
                "id": "trend-3",
                "title": f"Mobile-First {domain.capitalize()} Assistant",
                "score": 68,
                "momentum": 7,
                "pain": 7,
                "competition": 8,
                "complexity": 4,
                "painPoints": [
                    f"No good mobile solution for {domain}",
                    "Need to access desktop for simple tasks",
                    "Voice input would save time"
                ],
                "evidence": [
                    {"source": "Product Hunt", "url": "#", "snippet": sample_titles[2] if len(sample_titles) > 2 else "Mobile apps gaining traction"},
                    {"source": "Reddit", "url": "#", "snippet": f"Mobile {domain} requests"}
                ]
            },
            {
                "id": "trend-4",
                "title": f"Analytics Dashboard for {domain.capitalize()} Metrics",
                "score": 65,
                "momentum": 6,
                "pain": 8,
                "competition": 7,
                "complexity": 5,
                "painPoints": [
                    f"Hard to track {domain} KPIs",
                    "Data scattered across multiple tools",
                    "No actionable insights from raw data"
                ],
                "evidence": [
                    {"source": "GitHub", "url": "#", "snippet": "Analytics tools popular"},
                    {"source": "Hacker News", "url": "#", "snippet": "Data-driven decision making"}
                ]
            }
        ]
    
    def _get_fallback_ideas(self, trend: Dict[str, Any]) -> List[Dict[str, Any]]:
        trend_title = trend.get('title', 'Unknown Trend')
        
        return [
            {
                "id": "idea-1",
                "title": f"{trend_title} - MVP Version",
                "tagline": f"Solve {trend_title} pain points with AI automation",
                "reasoning": f"Based on the '{trend_title}' trend, this idea targets the core problem with minimal features. The wedge is focusing on a specific niche first.",
                "market": "1M potential users × $50/month = $600M TAM",
                "wedge": "Start with early adopters in tech-forward companies",
                "mvpTime": "4 weeks",
                "recommended": True
            },
            {
                "id": "idea-2",
                "title": f"Mobile-First {trend_title}",
                "tagline": "Access on-the-go with voice and mobile-first UX",
                "reasoning": "Mobile accessibility addresses a gap in existing solutions",
                "market": "500K users × $30/month = $180M TAM",
                "wedge": "Target remote workers and freelancers first",
                "mvpTime": "6 weeks",
                "recommended": False
            },
            {
                "id": "idea-3",
                "title": f"Open Source {trend_title} Alternative",
                "tagline": "Self-hosted, customizable, no vendor lock-in",
                "reasoning": "Open source appeals to privacy-conscious and cost-sensitive segments",
                "market": "100K companies × $100/year = $10M TAM",
                "wedge": "GitHub community and developer advocacy",
                "mvpTime": "8 weeks",
                "recommended": False
            },
            {
                "id": "idea-4",
                "title": f"{trend_title} Analytics Dashboard",
                "tagline": "Track metrics and ROI in real-time",
                "reasoning": "Analytics layer adds value on top of existing solutions",
                "market": "200K users × $20/month = $48M TAM",
                "wedge": "Partner with existing tools via integrations",
                "mvpTime": "5 weeks",
                "recommended": False
            },
            {
                "id": "idea-5",
                "title": f"AI Co-pilot for {trend_title}",
                "tagline": "ChatGPT-style assistant for domain-specific tasks",
                "reasoning": "AI assistant paradigm is proven and users are familiar",
                "market": "300K users × $40/month = $144M TAM",
                "wedge": "Fine-tuned model with domain knowledge",
                "mvpTime": "7 weeks",
                "recommended": False
            }
        ]
    
    def _get_fallback_proposal(self, idea: Dict[str, Any]) -> List[Dict[str, str]]:
        title = idea.get('title', 'MVP Startup')
        tagline = idea.get('tagline', 'Solving problems')
        
        return [
            {"title": "Problem Statement", "content": f"**{title}** addresses a critical gap in the market. Users currently face significant pain points that lead to wasted time, inefficiency, and frustration. The urgency is driven by increasing market demand and competitive pressure."},
            {"title": "Target User Persona", "content": "**Persona 1**: Tech-forward professionals aged 25-40 who value efficiency and are early adopters of new tools.\\n\\n**Persona 2**: Small business owners who need cost-effective solutions without sacrificing quality."},
            {"title": "Current Alternatives", "content": "**Competitor A**: Expensive enterprise solution with high complexity.\\n**Competitor B**: Basic free tool lacking advanced features.\\n**Competitor C**: Outdated UI and poor mobile experience."},
            {"title": "Unique Wedge", "content": f"Our unfair advantage is {idea.get('wedge', 'starting with a specific niche')}. We launch at the right time as the market is mature enough for adoption but underserved by current solutions."},
            {"title": "MVP Scope", "content": "**Must-have features**: Core workflow automation, user dashboard, basic analytics.\\n\\n**Out of scope**: Advanced integrations, white-label solutions, enterprise features."},
            {"title": "Key User Flows", "content": "**Flow 1**: Onboarding → Connect data source → View insights → Take action\\n**Flow 2**: Daily usage → Quick access → Complete task → View results"},
            {"title": "Data & Model Plan", "content": "**Tech stack**: Next.js, PostgreSQL, OpenAI API\\n**Storage**: Cloud-based with encryption\\n**Compliance**: GDPR-ready data handling"},
            {"title": "Go-to-Market", "content": f"**First 50 users**: {idea.get('wedge', 'Target early adopter communities')}\\n**Pricing**: $50/month with 14-day free trial\\n**Channels**: Product Hunt launch, relevant subreddits, direct outreach"},
            {"title": "Risks & Mitigations", "content": "**Risk 1**: Low adoption → Mitigation: Pre-launch waitlist and beta testing\\n**Risk 2**: Technical complexity → Mitigation: Start with proven tech stack\\n**Risk 3**: Competition → Mitigation: Focus on niche wedge first"},
            {"title": "2-Week Roadmap", "content": "**Week 1**:\\n- Day 1-2: Project setup\\n- Day 3-5: Core feature implementation\\n- Day 6-7: UI polish\\n\\n**Week 2**:\\n- Day 8-10: Testing and bug fixes\\n- Day 11-12: Deployment\\n- Day 13-14: Beta launch and feedback collection"}
        ]
    
    def _get_fallback_mvp_plan(self) -> List[Dict[str, str]]:
        return [
            {"step": "init", "message": "🎯 Initializing Next.js 14 project..."},
            {"step": "scaffold", "message": "📁 Creating project structure: pages, components, lib"},
            {"step": "deps", "message": "📦 Installing dependencies: React, Tailwind, shadcn/ui"},
            {"step": "api", "message": "🔌 Setting up API routes and data fetching"},
            {"step": "ui", "message": "🎨 Building landing page with hero section"},
            {"step": "dashboard", "message": "📊 Creating dashboard with sample data"},
            {"step": "feature", "message": "⚡ Implementing core feature workflow"},
            {"step": "auth", "message": "🔐 Adding simple auth (email/password)"},
            {"step": "db", "message": "🗄️  Setting up database schema (PostgreSQL)"},
            {"step": "seed", "message": "🌱 Seeding database with sample data"},
            {"step": "test", "message": "✅ Running build and checking for errors"},
            {"step": "complete", "message": "🚀 MVP ready! Run: npm run dev"}
        ]
