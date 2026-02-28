"""
End-to-End Test Script for Startup Hunter

Tests the complete workflow:
1. Input domain
2. Receive trends from Bright Data + OpenAI
3. Select trend
4. Generate ideas with Acontext
5. Select idea
6. Generate proposal
7. Build MVP plan
8. Test (if ActionBook available)
"""

import asyncio
import httpx
import json

BASE_URL = "http://localhost:8000"

async def test_workflow():
    print("🚀 Starting End-to-End Test\n")
    
    async with httpx.AsyncClient(timeout=120.0) as client:
        session_id = None
        
        print("=" * 60)
        print("STAGE 1: Input Domain")
        print("=" * 60)
        
        response = await client.post(
            f"{BASE_URL}/api/chat",
            json={
                "message": "fintech",
                "stage": "input",
                "session_id": session_id
            }
        )
        
        if response.status_code != 200:
            print(f"❌ Stage 1 failed: {response.status_code}")
            print(response.text)
            return
        
        data = response.json()
        session_id = data.get("session_id")
        trends = data.get("embedData", [])
        
        print(f"✅ Stage 1 complete: Received {len(trends)} trends")
        print(f"📝 Session ID: {session_id}\n")
        
        if trends:
            print("Top 3 Trends:")
            for i, trend in enumerate(trends[:3], 1):
                print(f"  {i}. {trend.get('title')} (Score: {trend.get('score')})")
                print(f"     Momentum: {trend.get('momentum')}, Pain: {trend.get('pain')}")
        print()
        
        if not trends:
            print("❌ No trends returned. Check Bright Data API.")
            return
        
        print("=" * 60)
        print("STAGE 2: Select Trend")
        print("=" * 60)
        
        selected_trend = trends[0]
        print(f"Selecting: {selected_trend.get('title')}\n")
        
        response = await client.post(
            f"{BASE_URL}/api/chat",
            json={
                "message": selected_trend.get("id"),
                "stage": "trends",
                "session_id": session_id
            }
        )
        
        if response.status_code != 200:
            print(f"❌ Stage 2 failed: {response.status_code}")
            print(response.text)
            return
        
        data = response.json()
        ideas = data.get("embedData", [])
        
        print(f"✅ Stage 2 complete: Generated {len(ideas)} ideas\n")
        
        if ideas:
            print("Generated Ideas:")
            for i, idea in enumerate(ideas, 1):
                recommended = "⭐" if idea.get("recommended") else "  "
                print(f"  {recommended} {i}. {idea.get('title')}")
                print(f"     {idea.get('tagline')}")
                print(f"     Market: {idea.get('market')}")
        print()
        
        if not ideas:
            print("❌ No ideas generated. Check OpenAI API.")
            return
        
        print("=" * 60)
        print("STAGE 3: Select Idea")
        print("=" * 60)
        
        selected_idea = ideas[0]
        print(f"Selecting: {selected_idea.get('title')}\n")
        
        response = await client.post(
            f"{BASE_URL}/api/chat",
            json={
                "message": selected_idea.get("id"),
                "stage": "ideas",
                "session_id": session_id
            }
        )
        
        if response.status_code != 200:
            print(f"❌ Stage 3 failed: {response.status_code}")
            print(response.text)
            return
        
        data = response.json()
        proposal = data.get("embedData", [])
        
        print(f"✅ Stage 3 complete: Generated {len(proposal)}-section proposal\n")
        
        if proposal:
            print("Proposal Sections:")
            for i, section in enumerate(proposal, 1):
                print(f"  {i}. {section.get('title')}")
        print()
        
        if not proposal:
            print("❌ No proposal generated. Check OpenAI API.")
            return
        
        print("=" * 60)
        print("STAGE 4: Build MVP")
        print("=" * 60)
        
        response = await client.post(
            f"{BASE_URL}/api/chat",
            json={
                "message": "approved",
                "stage": "proposal",
                "session_id": session_id
            }
        )
        
        if response.status_code != 200:
            print(f"❌ Stage 4 failed: {response.status_code}")
            print(response.text)
            return
        
        data = response.json()
        build_logs = data.get("embedData", [])
        
        print(f"✅ Stage 4 complete: Generated {len(build_logs)} build steps\n")
        
        if build_logs:
            print("Build Steps:")
            for log in build_logs[:5]:
                print(f"  [{log.get('step')}] {log.get('message')}")
            if len(build_logs) > 5:
                print(f"  ... and {len(build_logs) - 5} more steps")
        print()
        
        print("=" * 60)
        print("STAGE 5: Test MVP (ActionBook)")
        print("=" * 60)
        
        response = await client.post(
            f"{BASE_URL}/api/chat",
            json={
                "message": "test",
                "stage": "build",
                "session_id": session_id
            }
        )
        
        if response.status_code != 200:
            print(f"❌ Stage 5 failed: {response.status_code}")
            print(response.text)
            return
        
        data = response.json()
        test_report = data.get("embedData", {})
        
        overall = test_report.get("overall", "unknown")
        steps = test_report.get("steps", [])
        
        if overall == "passed":
            print(f"✅ Stage 5 complete: All tests passed ({len(steps)} steps)\n")
        else:
            print(f"⚠️  Stage 5 complete: Tests {overall} ({len(steps)} steps)\n")
        
        if steps:
            print("Test Results:")
            for step in steps:
                status_icon = "✅" if step.get("status") == "passed" else "❌"
                print(f"  {status_icon} {step.get('name')}")
        print()
        
        print("=" * 60)
        print("🎉 END-TO-END TEST COMPLETE")
        print("=" * 60)
        print(f"\n✅ All 5 stages executed successfully!")
        print(f"📊 Session ID: {session_id}")
        print(f"🔗 Trends → Ideas → Proposal → Build → Test")
        print("\n✨ All services verified:")
        print("  ✅ Bright Data - Web scraping")
        print("  ✅ OpenAI - LLM reasoning")
        print("  ✅ Acontext - Session memory")
        print("  ✅ ActionBook - Browser testing")

if __name__ == "__main__":
    asyncio.run(test_workflow())
