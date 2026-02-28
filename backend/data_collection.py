# Data Collection from Tiktok, Insta, Linkedin & News Outlets
import requests
import time
API_TOKEN = "YOUR_API_KEY"
DATASET_ID = "YOUR_TIKTOK_KEYWORD_DATASET_ID"  # from the TikTok Discover by Keywords page

headers = {
    "Authorization": f"Bearer {API_TOKEN}",
    "Content-Type": "application/json",
}

# Input for Discover by Keywords
inputs = [{
    "search_keyword": "#smallbusiness",   # or any keyword/hashtag
    "num_of_posts": 50,                   # optional
    "posts_to_not_include": [],           # optional
    "what_to_collect": "post"             # optional, e.g. "post" or "reel"
}]

# Trigger collection
trigger_url = f"https://api.brightdata.com/datasets/v3/trigger?dataset_id={DATASET_ID}"

resp = requests.post(trigger_url, headers=headers, json=inputs)
resp.raise_for_status()
data = resp.json()
snapshot_id = data["snapshot_id"]
print("Triggered snapshot:", snapshot_id)
