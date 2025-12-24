import requests
import json
import os
from datetime import datetime, timezone


OUTPUT_FILE = "static/json/changelogs.json" 

def update_changelogs():
    url = f"https://api.github.com/repos/NotValra/RoValra/releases"
    print(f"Fetching releases from {url}...")
    
    response = requests.get(url)
    
    if response.status_code == 200:
        releases = response.json()
        
        processed_releases = []
        for release in releases:
            published_date = release.get("published_at")
            if published_date:
                try:
                    dt = datetime.strptime(published_date, "%Y-%m-%dT%H:%M:%SZ")
                    published_date = dt.strftime("%B %d, %Y")
                except ValueError:
                    pass

            processed_releases.append({
                "tag_name": release.get("tag_name"),
                "name": release.get("name"),
                "published_date": published_date,
                "body": release.get("body"),
                "url": release.get("html_url")
            })

        final_data = {
            "releases": processed_releases,
            "error_message": None,
            "last_updated": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")
        }
        
        os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
        
        with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
            json.dump(final_data, f, indent=4)
            
        print(f"Successfully updated {OUTPUT_FILE} with {len(processed_releases)} releases.")
    else:
        print(f"Failed to fetch releases. Status code: {response.status_code}")
        print(response.text)
        exit(1)

if __name__ == "__main__":
    update_changelogs()
