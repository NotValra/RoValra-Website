import requests
import json
import os
import re
from datetime import datetime, timezone


OUTPUT_FILE = "static/json/changelogs.json" 
FEATURES_FILE = "static/js/features.js"

def update_features_config(tag_name):
    url = f"https://raw.githubusercontent.com/NotValra/RoValra/{tag_name}/src/content/core/settings/settingConfig.js"
    print(f"Fetching settings config from {url}...")
    
    response = requests.get(url)
    
    if response.status_code == 200:
        content = response.text
        new_content = content.replace("export const SETTINGS_CONFIG =", "var featuresData =")
        
        if os.path.exists(FEATURES_FILE):
            try:
                with open(FEATURES_FILE, 'r', encoding='utf-8') as f:
                    current_content = f.read()
                if current_content == new_content:
                    print(f"Features config is already up to date with tag {tag_name}.")
                    return
            except Exception:
                pass

        os.makedirs(os.path.dirname(FEATURES_FILE), exist_ok=True)
        
        with open(FEATURES_FILE, 'w', encoding='utf-8') as f:
            f.write(new_content)
            
        print(f"Successfully updated {FEATURES_FILE} based on tag {tag_name}.")
    else:
        print(f"Failed to fetch settings config. Status code: {response.status_code}")

def update_changelogs():
    current_version = None
    existing_chrome_dates = {}

    if os.path.exists(OUTPUT_FILE):
        try:
            with open(OUTPUT_FILE, 'r', encoding='utf-8') as f:
                data = json.load(f)
                if data.get("releases") and len(data["releases"]) > 0:
                    current_version = data["releases"][0].get("tag_name")
                
                for r in data.get("releases", []):
                    if r.get("tag_name") and r.get("chrome_release_date"):
                        existing_chrome_dates[r["tag_name"]] = r["chrome_release_date"]
        except Exception:
            pass

    url = f"https://api.github.com/repos/NotValra/RoValra/releases"
    print(f"Fetching releases from {url}...")
    
    response = requests.get(url)
    
    if response.status_code == 200:
        releases = response.json()
        
        if releases:
            latest_release = releases[0]
            latest_tag = latest_release.get("tag_name")
            
            if latest_tag:
                if latest_tag != current_version:
                    print(f"New release detected: {latest_tag} (Old: {current_version}).")
                update_features_config(latest_tag)

        chrome_url = "https://chromewebstore.google.com/detail/rovalra-roblox-improved/njcickgebhnpgmoodjdgohkclfplejli"
        chrome_version = None
        chrome_updated_date = None
        is_chrome_latest = False
        
        print(f"Fetching Chrome Web Store version...")
        try:
            c_response = requests.get(chrome_url)
            if c_response.status_code == 200:
                match = re.search(r'<div class="nBZElf">([^<]+)</div>', c_response.text)
                if match:
                    chrome_version = match.group(1).strip()
                    print(f"Chrome Web Store version: {chrome_version}")
                
                date_match = re.search(r'>Updated</div>\s*<div[^>]*>([^<]+)</div>', c_response.text)
                if date_match:
                    chrome_updated_date = date_match.group(1).strip()
        except Exception as e:
            print(f"Error fetching Chrome version: {e}")

        if releases and chrome_version:
            latest_tag_check = releases[0].get("tag_name", "").lstrip('v')
            if latest_tag_check == chrome_version:
                is_chrome_latest = True

        processed_releases = []
        for release in releases:
            published_date = release.get("published_at")
            if published_date:
                try:
                    dt = datetime.strptime(published_date, "%Y-%m-%dT%H:%M:%SZ")
                    published_date = dt.strftime("%B %d, %Y")
                except ValueError:
                    pass

            # Determine Chrome Release Date
            tag_name = release.get("tag_name")
            c_date = existing_chrome_dates.get(tag_name)
            
            if chrome_version and chrome_updated_date and tag_name:
                if tag_name.lstrip('v') == chrome_version:
                    c_date = chrome_updated_date

            processed_releases.append({
                "tag_name": tag_name,
                "name": release.get("name"),
                "published_date": published_date,
                "body": release.get("body"),
                "url": release.get("html_url"),
                "chrome_release_date": c_date,
                "chrome_url": chrome_url
            })

        final_data = {
            "releases": processed_releases,
            "chrome_extension": {
                "url": chrome_url,
                "version": chrome_version,
                "is_latest": is_chrome_latest
            },
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
