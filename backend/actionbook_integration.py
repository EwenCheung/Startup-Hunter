"""
ActionBook Integration

Handles browser automation for testing MVPs
"""

import asyncio
import subprocess
from typing import List, Dict, Any, Optional
from pathlib import Path

class ActionBookClient:
    def __init__(self):
        self.browser_opened = False
    
    async def setup_browser(self):
        """Initialize ActionBook browser in isolated mode"""
        if self.browser_opened:
            return
        
        try:
            process = await asyncio.create_subprocess_exec(
                'actionbook', 'browser', 'open', 'about:blank',
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE
            )
            await process.wait()
            self.browser_opened = True
        except Exception as e:
            print(f"Failed to open ActionBook browser: {e}")
    
    async def run_command(self, *args) -> tuple[bool, str]:
        """Execute an ActionBook browser command"""
        try:
            process = await asyncio.create_subprocess_exec(
                'actionbook', 'browser', *args,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE
            )
            stdout, stderr = await process.communicate()
            success = process.returncode == 0
            output = stdout.decode() if success else stderr.decode()
            return success, output
        except Exception as e:
            return False, str(e)
    
    async def navigate(self, url: str) -> bool:
        """Navigate to a URL"""
        await self.setup_browser()
        success, _ = await self.run_command('goto', url)
        return success
    
    async def click(self, selector: str) -> bool:
        """Click an element"""
        success, _ = await self.run_command('click', selector)
        return success
    
    async def fill(self, selector: str, text: str) -> bool:
        """Fill an input field"""
        success, _ = await self.run_command('fill', selector, text)
        return success
    
    async def screenshot(self, output_path: str) -> bool:
        """Take a screenshot"""
        success, _ = await self.run_command('screenshot', output_path)
        return success
    
    async def get_text(self, selector: str = None) -> str:
        """Get text content from page or element"""
        success, output = await self.run_command('text')
        return output if success else ""
    
    async def close_browser(self):
        """Close the browser"""
        if self.browser_opened:
            await self.run_command('close')
            self.browser_opened = False
    
    async def test_mvp(self, project_url: str, test_flows: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Run automated tests on an MVP
        
        Returns test report with pass/fail status and screenshots
        """
        await self.setup_browser()
        await self.navigate(project_url)
        
        test_results = []
        screenshots_dir = Path('public/screenshots')
        screenshots_dir.mkdir(parents=True, exist_ok=True)
        
        for i, flow in enumerate(test_flows, 1):
            step_name = flow.get('name', f'Step {i}')
            actions = flow.get('actions', [])
            
            success = True
            error_msg = None
            
            try:
                for action in actions:
                    action_type = action.get('type')
                    
                    if action_type == 'navigate':
                        success = await self.navigate(action['url'])
                    elif action_type == 'click':
                        success = await self.click(action['selector'])
                    elif action_type == 'fill':
                        success = await self.fill(action['selector'], action['value'])
                    elif action_type == 'wait':
                        await asyncio.sleep(action.get('duration', 1))
                    
                    if not success:
                        break
                
                screenshot_path = str(screenshots_dir / f'step{i}.png')
                await self.screenshot(screenshot_path)
                
            except Exception as e:
                success = False
                error_msg = str(e)
            
            test_results.append({
                'name': step_name,
                'status': 'passed' if success else 'failed',
                'screenshot': f'/screenshots/step{i}.png',
                'error': error_msg
            })
        
        await self.close_browser()
        
        all_passed = all(r['status'] == 'passed' for r in test_results)
        
        return {
            'overall': 'passed' if all_passed else 'failed',
            'steps': test_results
        }
