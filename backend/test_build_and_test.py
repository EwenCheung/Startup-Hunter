"""
Unit test for build and test stages
Tests the _build_mvp and _test_mvp methods directly
"""

import asyncio
from workflow import StartupHunterWorkflow, WorkflowState

async def test_build_and_test():
    print("🚀 Testing Build and Test Stages\n")
    
    workflow = StartupHunterWorkflow()
    
    initial_state: WorkflowState = {
        "stage": "init",
        "domain": "pet care",
        "raw_trends": [],
        "clustered_trends": [],
        "selected_trend": None,
        "ideas": [],
        "selected_idea": {
            "title": "Pawsome Pet Boutique",
            "description": "Modern e-commerce for pet products",
            "opportunity_score": 8.5
        },
        "proposal": [
            {"section": "Problem", "content": "Pet owners struggle to find quality products"},
            {"section": "Solution", "content": "Curated online pet store with reviews"}
        ],
        "build_logs": [],
        "test_report": None,
        "user_context": {},
        "acontext_memory": None,
        "session_id": "test-session-123",
        "error": None,
        "mvp_server_pid": None,
        "mvp_url": None
    }
    
    print("=" * 60)
    print("STAGE 5: Build MVP")
    print("=" * 60)
    
    try:
        build_state = await workflow._build_mvp(initial_state)
        
        if build_state.get("error"):
            print(f"❌ Build failed: {build_state['error']}")
            return
        
        print("✅ Build stage complete")
        print(f"📝 Build logs ({len(build_state.get('build_logs', []))} steps):")
        for log in build_state.get("build_logs", []):
            print(f"   {log.get('message', '')}")
        
        print(f"\n🌐 MVP URL: {build_state.get('mvp_url')}")
        print(f"🔢 Server PID: {build_state.get('mvp_server_pid')}")
        print(f"🗄️  Active servers: {workflow.active_servers}")
        
        print("\n⏳ Waiting 3 seconds for server to stabilize...")
        await asyncio.sleep(3)
        
        print("\n" + "=" * 60)
        print("STAGE 6: Test MVP")
        print("=" * 60)
        
        test_state = await workflow._test_mvp(build_state)
        
        if test_state.get("error"):
            print(f"❌ Test failed: {test_state['error']}")
        else:
            print("✅ Test stage complete")
            test_report = test_state.get("test_report", {})
            print(f"📊 Test report: {test_report.get('overall', 'No report')}")
        
        print("\n" + "=" * 60)
        print("CLEANUP: Kill MVP Server")
        print("=" * 60)
        
        session_id = build_state.get("session_id")
        if session_id:
            cleanup_success = await workflow.cleanup_mvp_server(session_id)
            if cleanup_success:
                print(f"✅ Server cleaned up for session {session_id}")
            else:
                print(f"⚠️  Failed to cleanup server (may already be stopped)")
        
        print(f"\n🗄️  Active servers after cleanup: {workflow.active_servers}")
        
    except Exception as e:
        print(f"❌ Test failed with exception: {str(e)}")
        import traceback
        traceback.print_exc()
    
    print("\n🏁 Test complete")

if __name__ == "__main__":
    asyncio.run(test_build_and_test())
