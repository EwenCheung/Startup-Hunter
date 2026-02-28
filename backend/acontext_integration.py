"""
Acontext Integration

Handles persistent memory and session management across the startup workflow
"""

import os
from typing import Dict, Any, Optional
import httpx

class AcontextClient:
    def __init__(self, api_key: str = None, base_url: str = None):
        self.api_key = api_key or os.getenv('ACONTEXT_API_KEY')
        self.base_url = base_url or os.getenv('ACONTEXT_BASE_URL', 'https://api.acontext.io')
        self.project_id = os.getenv('ACONTEXT_PROJECT_ID')
        
        self.headers = {
            'Authorization': f'Bearer {self.api_key}',
            'Content-Type': 'application/json'
        }
    
    async def create_session(self, user_id: str, meta: Dict[str, Any] = None) -> Optional[str]:
        """Create a new Acontext session"""
        if not self.api_key:
            return None
        
        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(
                    f'{self.base_url}/v1/projects/{self.project_id}/sessions',
                    headers=self.headers,
                    json={'user': user_id, 'configs': meta or {}}
                )
                response.raise_for_status()
                data = response.json()
                return data.get('id')
            except Exception as e:
                print(f"Failed to create Acontext session: {e}")
                return None
    
    async def store_message(self, session_id: str, role: str, content: str, meta: Dict[str, Any] = None):
        """Store a message in the session"""
        if not self.api_key or not session_id:
            return
        
        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(
                    f'{self.base_url}/v1/sessions/{session_id}/messages',
                    headers=self.headers,
                    json={
                        'blob': {'role': role, 'content': content},
                        'format': 'openai',
                        'meta': meta or {}
                    }
                )
                response.raise_for_status()
            except Exception as e:
                print(f"Failed to store message: {e}")
    
    async def get_messages(self, session_id: str, limit: int = 50) -> list:
        """Retrieve messages from session"""
        if not self.api_key or not session_id:
            return []
        
        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(
                    f'{self.base_url}/v1/sessions/{session_id}/messages',
                    headers=self.headers,
                    params={'limit': limit, 'format': 'openai'}
                )
                response.raise_for_status()
                data = response.json()
                return data.get('messages', [])
            except Exception as e:
                print(f"Failed to get messages: {e}")
                return []
    
    async def save_artifact(self, disk_id: str, path: str, content: str):
        """Save an artifact (file) to disk"""
        if not self.api_key or not disk_id:
            return
        
        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(
                    f'{self.base_url}/v1/disks/{disk_id}/artifacts',
                    headers=self.headers,
                    json={'path': path, 'content': content}
                )
                response.raise_for_status()
            except Exception as e:
                print(f"Failed to save artifact: {e}")
    
    async def get_artifact(self, disk_id: str, path: str) -> Optional[str]:
        """Retrieve an artifact from disk"""
        if not self.api_key or not disk_id:
            return None
        
        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(
                    f'{self.base_url}/v1/disks/{disk_id}/artifacts',
                    headers=self.headers,
                    params={'path': path, 'include_content': True}
                )
                response.raise_for_status()
                data = response.json()
                return data.get('content')
            except Exception as e:
                print(f"Failed to get artifact: {e}")
                return None
    
    async def flush_session(self, session_id: str):
        """Flush session buffer to extract tasks"""
        if not self.api_key or not session_id:
            return
        
        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(
                    f'{self.base_url}/v1/sessions/{session_id}/flush',
                    headers=self.headers
                )
                response.raise_for_status()
            except Exception as e:
                print(f"Failed to flush session: {e}")
