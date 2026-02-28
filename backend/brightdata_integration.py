"""
Bright Data Integration

Handles web scraping for trend collection from:
- Product Hunt
- GitHub Trending
- Reddit
- Hacker News
"""

import os
import requests
from typing import List, Dict, Any
from dataclasses import dataclass
from dotenv import load_dotenv

load_dotenv()

@dataclass
class TrendData:
    id: str
    title: str
    score: int
    momentum: int
    pain: int
    competition: int
    complexity: int
    pain_points: List[str]
    evidence: List[Dict[str, str]]

class BrightDataCollector:
    def __init__(self, api_token: str = None):
        self.api_token = api_token or os.getenv('BRIGHTDATA_API_TOKEN')
        self.headers = {
            "Authorization": f"Bearer {self.api_token}",
            "Content-Type": "application/json"
        }
        self.base_url = "https://api.brightdata.com/request"
    
    async def scan_product_hunt(self, query: str = "AI") -> List[Dict[str, Any]]:
        """Scrape Product Hunt for trending products using Google search"""
        if not self.api_token:
            return []
        
        try:
            from urllib.parse import quote_plus
            search_query = f"site:producthunt.com {query} trending"
            data = {
                "zone": "serp_api1",
                "url": f"https://www.google.com/search?q={quote_plus(search_query)}",
                "format": "raw"
            }
            
            response = requests.post(
                self.base_url,
                json=data,
                headers=self.headers,
                timeout=30
            )
            response.raise_for_status()
            results = response.json()
            
            organic = results.get("organic", [])
            return [
                {
                    "title": item.get("title", ""),
                    "url": item.get("link", ""),
                    "snippet": item.get("snippet", ""),
                    "source": "Product Hunt"
                }
                for item in organic[:10]
            ]
        except Exception as e:
            print(f"Product Hunt scraping failed: {e}")
            return []
    
    async def scan_github_trending(self, language: str = "") -> List[Dict[str, Any]]:
        """Scrape GitHub trending repositories using Google search"""
        if not self.api_token:
            return []
        
        try:
            from urllib.parse import quote_plus
            search_query = f"site:github.com trending repositories stars"
            data = {
                "zone": "serp_api1",
                "url": f"https://www.google.com/search?q={quote_plus(search_query)}",
                "format": "raw"
            }
            
            response = requests.post(
                self.base_url,
                json=data,
                headers=self.headers,
                timeout=30
            )
            response.raise_for_status()
            results = response.json()
            
            organic = results.get("organic", [])
            return [
                {
                    "title": item.get("title", ""),
                    "url": item.get("link", ""),
                    "snippet": item.get("snippet", ""),
                    "source": "GitHub"
                }
                for item in organic[:10]
            ]
        except Exception as e:
            print(f"GitHub trending scraping failed: {e}")
            return []
    
    async def scan_reddit(self, subreddit: str = "startups") -> List[Dict[str, Any]]:
        """Scrape Reddit for trending posts using Google search"""
        if not self.api_token:
            return []
        
        try:
            from urllib.parse import quote_plus
            search_query = f"site:reddit.com/r/{subreddit} top upvoted"
            data = {
                "zone": "serp_api1",
                "url": f"https://www.google.com/search?q={quote_plus(search_query)}",
                "format": "raw"
            }
            
            response = requests.post(
                self.base_url,
                json=data,
                headers=self.headers,
                timeout=30
            )
            response.raise_for_status()
            results = response.json()
            
            organic = results.get("organic", [])
            return [
                {
                    "title": item.get("title", ""),
                    "url": item.get("link", ""),
                    "snippet": item.get("snippet", ""),
                    "source": f"Reddit r/{subreddit}"
                }
                for item in organic[:10]
            ]
        except Exception as e:
            print(f"Reddit scraping failed: {e}")
            return []
    
    async def scan_hacker_news(self) -> List[Dict[str, Any]]:
        """Scrape Hacker News for trending stories using Google search"""
        if not self.api_token:
            return []
        
        try:
            from urllib.parse import quote_plus
            search_query = "site:news.ycombinator.com points comments"
            data = {
                "zone": "serp_api1",
                "url": f"https://www.google.com/search?q={quote_plus(search_query)}",
                "format": "raw"
            }
            
            response = requests.post(
                self.base_url,
                json=data,
                headers=self.headers,
                timeout=30
            )
            response.raise_for_status()
            results = response.json()
            
            organic = results.get("organic", [])
            return [
                {
                    "title": item.get("title", ""),
                    "url": item.get("link", ""),
                    "snippet": item.get("snippet", ""),
                    "source": "Hacker News"
                }
                for item in organic[:10]
            ]
        except Exception as e:
            print(f"Hacker News scraping failed: {e}")
            return []
    
    async def collect_all_trends(self, domain: str = "") -> List[Dict[str, Any]]:
        """
        Collect trends from all sources in parallel
        
        Returns raw data list for OpenAI clustering
        """
        import asyncio
        
        search_domain = domain if domain else "startup trends"
        
        tasks = [
            self.scan_product_hunt(search_domain),
            self.scan_github_trending(),
            self.scan_reddit("startups"),
            self.scan_hacker_news()
        ]
        
        results = await asyncio.gather(*tasks, return_exceptions=True)
        
        all_data = []
        for result in results:
            if isinstance(result, list):
                all_data.extend(result)
            elif isinstance(result, Exception):
                print(f"Error in scraping: {result}")
        
        if not all_data:
            print("⚠️  No data from Bright Data, using fallback sample data for testing")
            all_data = self._get_fallback_data(domain)
        
        return all_data
    
    def _get_fallback_data(self, domain: str) -> List[Dict[str, Any]]:
        """Fallback data when Bright Data is unavailable"""
        return [
            {
                "title": f"AI-powered tools for {domain} professionals gaining traction",
                "url": "https://producthunt.com/sample",
                "snippet": "New AI tool for automating workflows in the industry, 500+ upvotes",
                "source": "Product Hunt"
            },
            {
                "title": f"Open source {domain} platform reaches 10k stars",
                "url": "https://github.com/trending",
                "snippet": "Community-driven platform for solving common problems",
                "source": "GitHub"
            },
            {
                "title": f"r/{domain}: Top post about major pain point",
                "url": f"https://reddit.com/r/{domain}",
                "snippet": "Users discussing frustrations with current solutions, 2k upvotes",
                "source": "Reddit"
            },
            {
                "title": f"Show HN: New approach to {domain} challenges",
                "url": "https://news.ycombinator.com",
                "snippet": "Innovative solution addressing industry gaps, 300 points",
                "source": "Hacker News"
            },
            {
                "title": f"AI meeting assistant for {domain} teams trending",
                "url": "https://producthunt.com/sample2",
                "snippet": "Voice-to-text solution saving 10 hours per week, 800 upvotes",
                "source": "Product Hunt"
            }
        ]
