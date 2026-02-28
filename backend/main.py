"""
Updated Main FastAPI Backend with Real Integrations

Replaces mock data with real Bright Data, OpenAI, Acontext, and ActionBook integrations
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import asyncio
import uuid

from workflow import StartupHunterWorkflow, WorkflowState
from acontext_integration import AcontextClient

app = FastAPI(title="Startup Hunter API", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

workflow = StartupHunterWorkflow()
acontext = AcontextClient()
sessions: Dict[str, WorkflowState] = {}

class ChatRequest(BaseModel):
    message: str
    stage: str
    session_id: Optional[str] = None

class ChatResponse(BaseModel):
    message: str
    stage: str
    session_id: Optional[str] = None
    embedType: Optional[str] = None
    embedData: Optional[Any] = None

@app.get("/")
async def root():
    return {"status": "ok", "service": "Startup Hunter API (Real Integrations)", "version": "2.0.0"}

@app.post("/api/chat")
async def chat(request: ChatRequest):
    """Main chat endpoint with real integrations"""
    
    stage = request.stage
    message = request.message.lower()
    session_id = request.session_id or str(uuid.uuid4())
    
    if session_id not in sessions:
        acontext_session = await acontext.create_session(
            user_id="demo-user",
            meta={"domain": message, "timestamp": str(asyncio.get_event_loop().time())}
        )
        sessions[session_id] = {
            "stage": "input",
            "domain": None,
            "raw_trends": [],
            "clustered_trends": [],
            "selected_trend": None,
            "ideas": [],
            "selected_idea": None,
            "proposal": [],
            "build_logs": [],
            "test_report": None,
            "user_context": {},
            "acontext_memory": None,
            "session_id": acontext_session,
            "error": None
        }
    
    state = sessions[session_id]
    
    if stage == "input":
        state["domain"] = request.message
        state["user_context"] = {"domain": request.message}
        
        await acontext.store_message(
            session_id=state["session_id"],
            role="user",
            content=f"I want to build something in {request.message}",
            meta={"stage": "input"}
        )
        
        result = await workflow.run_stage("collect_trends", state)
        sessions[session_id] = result
        
        if result.get("error"):
            raise HTTPException(status_code=500, detail=result["error"])
        
        result = await workflow.run_stage("cluster_trends", result)
        sessions[session_id] = result
        
        if result.get("error"):
            raise HTTPException(status_code=500, detail=result["error"])
        
        return ChatResponse(
            message=f"Found {len(result['clustered_trends'])} trending opportunities! Here are the top ideas based on momentum, pain severity, and competition:",
            stage="trends",
            session_id=session_id,
            embedType="trends",
            embedData=result['clustered_trends']
        )
    
    elif stage == "trends":
        trend_id = request.message
        trends = state.get("clustered_trends", [])
        selected = next((t for t in trends if t.get("id") == trend_id), None)
        
        if not selected:
            raise HTTPException(status_code=404, detail="Trend not found")
        
        state["selected_trend"] = selected
        
        await acontext.store_message(
            session_id=state["session_id"],
            role="user",
            content=f"Selected trend: {selected.get('title')}",
            meta={"stage": "trends", "trend_id": trend_id}
        )
        
        result = await workflow.run_stage("generate_ideas", state)
        sessions[session_id] = result
        
        if result.get("error"):
            raise HTTPException(status_code=500, detail=result["error"])
        
        return ChatResponse(
            message="I've generated 5 startup ideas. I'm recommending the first one based on your constraints:",
            stage="ideas",
            session_id=session_id,
            embedType="ideas",
            embedData=result['ideas']
        )
    
    elif stage == "ideas":
        idea_id = request.message
        ideas = state.get("ideas", [])
        selected = next((i for i in ideas if i.get("id") == idea_id), None)
        
        if not selected:
            raise HTTPException(status_code=404, detail="Idea not found")
        
        state["selected_idea"] = selected
        
        await acontext.store_message(
            session_id=state["session_id"],
            role="user",
            content=f"Selected idea: {selected.get('title')}",
            meta={"stage": "ideas", "idea_id": idea_id}
        )
        
        result = await workflow.run_stage("generate_proposal", state)
        sessions[session_id] = result
        
        if result.get("error"):
            raise HTTPException(status_code=500, detail=result["error"])
        
        return ChatResponse(
            message="Here's a detailed 10-section proposal for your startup:",
            stage="proposal",
            session_id=session_id,
            embedType="proposal",
            embedData=result['proposal']
        )
    
    elif stage == "proposal":
        result = await workflow.run_stage("build_mvp", state)
        sessions[session_id] = result
        
        if result.get("error"):
            raise HTTPException(status_code=500, detail=result["error"])
        
        return ChatResponse(
            message="Building your MVP...",
            stage="build",
            session_id=session_id,
            embedType="build",
            embedData=result['build_logs']
        )
    
    elif stage == "build":
        result = await workflow.run_stage("test_mvp", state)
        sessions[session_id] = result
        
        if result.get("error"):
            raise HTTPException(status_code=500, detail=result["error"])
        
        test_report = result.get('test_report', {})
        overall = test_report.get('overall', 'unknown')
        
        message = f"✅ All tests passed! Your MVP is ready." if overall == "passed" else f"⚠️ Some tests failed. Review the report."
        
        return ChatResponse(
            message=message,
            stage="complete",
            session_id=session_id,
            embedType="test",
            embedData=test_report
        )
    
    else:
        raise HTTPException(status_code=400, detail=f"Unknown stage: {stage}")

@app.post("/api/cleanup/{session_id}")
async def cleanup_server(session_id: str):
    """Cleanup MVP dev server for a session"""
    success = await workflow.cleanup_mvp_server(session_id)
    
    if success:
        return {"message": f"Server for session {session_id} cleaned up", "success": True}
    else:
        return {"message": f"No active server found for session {session_id}", "success": False}

@app.post("/api/cleanup/all")
async def cleanup_all_servers():
    """Cleanup all active MVP dev servers"""
    count = await workflow.cleanup_all_servers()
    return {"message": f"Cleaned up {count} active server(s)", "count": count}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
