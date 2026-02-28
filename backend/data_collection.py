import os
import json
import requests
from urllib.parse import quote_plus
from dotenv import load_dotenv

load_dotenv()
BRIGHTDATA_API_TOKEN = os.getenv("BRIGHTDATA_API_TOKEN")

HEADERS = {
    "Authorization": f"Bearer {BRIGHTDATA_API_TOKEN}",
    "Content-Type": "application/json"
}

GOOGLE_SEARCH_ZONE = "google"
SCRAPE_DATASET_ID = "gd_m8ebnr0q2qlklc02fz"


# ---------------------------------
# Step 1: Search Google
# ---------------------------------
def search_google(query):
    data = {
        "zone": GOOGLE_SEARCH_ZONE,
        "url": f"https://www.google.com/search?q={quote_plus(query)}",
        "format": "raw"
    }

    response = requests.post(
        "https://api.brightdata.com/request",
        json=data,
        headers=HEADERS
    )
    response.raise_for_status()
    return response.json()


def extract_links(search_results, max_links=5):
    """Extract top N links from Google search results."""
    organic = search_results.get("organic", [])
    return [
        {"url": item["link"], "title": item.get("title", ""), "description": item.get("description", "")}
        for item in organic[:max_links]
        if "link" in item
    ]


# ---------------------------------
# Step 2: Scrape extracted URLs
# ---------------------------------
def scrape_urls(urls):
    """Scrape multiple URLs using BrightData Web Scraper dataset."""
    payload = json.dumps({
        "input": [{"url": url} for url in urls]
    })

    response = requests.post(
        f"https://api.brightdata.com/datasets/v3/scrape?dataset_id={SCRAPE_DATASET_ID}&notify=false&include_errors=true",
        headers=HEADERS,
        data=payload
    )

    if not response.ok:
        print(f"  ❌ Scrape API Error: {response.status_code} - {response.text}")
        return []

    result = response.json()
    # API may return a single object or a list
    if isinstance(result, dict):
        return [result]
    return result


# ---------------------------------
# Step 3: Save results to JSON
# ---------------------------------
def save_results(data, filepath):
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"\n💾 Results saved to: {filepath}")


# ---------------------------------
# Pipeline: Search → Extract → Scrape → Save
# ---------------------------------
if __name__ == "__main__":
    query = "Latest and most relevant startup ideas based on current market trends"

    # Step 1: Search Google
    print(f"🔍 Searching Google for: '{query}'")
    search_results = search_google(query)

    # Step 2: Extract links
    links_info = extract_links(search_results, max_links=5)
    urls = [item["url"] for item in links_info]
    print(f"\n📎 Found {len(urls)} links:")
    for i, info in enumerate(links_info, 1):
        print(f"  {i}. {info['title']}")
        print(f"     {info['url']}")

    # Step 3: Scrape all links
    print(f"\n🌐 Scraping {len(urls)} URLs...")
    scraped_data = scrape_urls(urls)
    print(f"  ✅ Got {len(scraped_data)} results")

    # Step 4: Combine search metadata + scraped content
    output = {
        "query": query,
        "search_results": links_info,
    }

    # Step 5: Save to JSON
    # save_results(output, OUTPUT_FILE)

    # Preview
    print("\n=== PREVIEW ===")
    print(json.dumps(scraped_data[:2], indent=2, default=str)[:2000])