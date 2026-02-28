import os
from typing import Dict, Any, Optional
from acontext import AcontextClient as AcontextSDK

class AcontextClient:
    def __init__(self, api_key: str = None):
        self.api_key = api_key or os.getenv('ACONTEXT_API_KEY')
        
        if self.api_key:
            try:
                self.client = AcontextSDK(api_key=self.api_key)
                self.client.ping()
                print("✅ Acontext SDK initialized successfully")
            except Exception as e:
                print(f"⚠️  Acontext SDK initialization failed: {e}")
                print("    Falling back to local-only mode")
                self.client = None
        else:
            print("⚠️  Acontext API key not configured, using local-only mode")
            self.client = None
    
    async def create_session(self, user_id: str, meta: Dict[str, Any] = None) -> Optional[str]:
        if not self.client:
            import uuid
            return f"local-{uuid.uuid4()}"
        
        try:
            session = self.client.sessions.create(user=user_id, configs=meta or {})
            print(f"✅ Created Acontext session: {session.id}")
            return session.id
        except Exception as e:
            print(f"⚠️  Failed to create Acontext session: {e}")
            import uuid
            return f"local-{uuid.uuid4()}"
    
    async def store_message(self, session_id: str, role: str, content: str, meta: Dict[str, Any] = None):
        if not self.client or not session_id or session_id.startswith("local-"):
            return
        
        try:
            self.client.sessions.store_message(
                session_id=session_id,
                blob={'role': role, 'content': content},
                meta=meta or {}
            )
        except Exception as e:
            print(f"⚠️  Failed to store message: {e}")
    
    async def get_messages(self, session_id: str, limit: int = 50) -> list:
        if not self.client or not session_id or session_id.startswith("local-"):
            return []
        
        try:
            result = self.client.sessions.get_messages(session_id=session_id, limit=limit)
            return result.items if hasattr(result, 'items') else []
        except Exception as e:
            print(f"⚠️  Failed to get messages: {e}")
            return []
    
    async def save_artifact(self, disk_id: str, path: str, content: str):
        if not self.client or not disk_id:
            return
        
        try:
            self.client.disks.upsert_artifact(
                disk_id=disk_id,
                path=path,
                content=content
            )
        except Exception as e:
            print(f"⚠️  Failed to save artifact: {e}")
    
    async def get_artifact(self, disk_id: str, path: str) -> Optional[str]:
        if not self.client or not disk_id:
            return None
        
        try:
            artifact = self.client.disks.get_artifact(
                disk_id=disk_id,
                path=path,
                include_content=True
            )
            return artifact.content if hasattr(artifact, 'content') else None
        except Exception as e:
            print(f"⚠️  Failed to get artifact: {e}")
            return None
    
    async def flush_session(self, session_id: str):
        if not self.client or not session_id or session_id.startswith("local-"):
            return
        
        try:
            self.client.sessions.flush(session_id=session_id)
        except Exception as e:
            print(f"⚠️  Failed to flush session: {e}")
