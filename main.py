import requests
import json
import os
import re
import subprocess
from datetime import datetime, timezone


OUTPUT_FILE = "out/static/json/changelogs.json"
FEATURES_FILE = "out/static/js/features.js"
CHROME_RELEASE_DATA = ".github/assets/chrome-release-data.json"

def report_feature_failure(reason, details=None):
    message = f"FEATURES FAILED: {reason}"
    if details:
        message += f" — {details}"
    print(message)


def update_features_config(tag_name):
    url = f"https://raw.githubusercontent.com/NotValra/RoValra/{tag_name}/src/content/core/settings/settingConfig.js"
    print(f"Fetching settings config from {url}...")

    try:
        response = requests.get(url, timeout=30)
    except requests.RequestException as error:
        report_feature_failure("could not fetch settings config", repr(error))
        return False

    if response.status_code != 200:
        report_feature_failure(
            "could not fetch settings config",
            f"HTTP {response.status_code}: {response.text[:300]!r}",
        )
        return False

    content = response.text
    if response.status_code == 200:

        import_pattern = r'import\s+\{([\s\S]*?)\}\s+from\s+[\'"].*?[\'"];?'
        imports = re.findall(import_pattern, content)
        mocks = []
        for imp in imports:
            vars_to_mock = [v.strip().split(' as ')[-1] for v in imp.split(',')]
            mocks.extend([v for v in vars_to_mock if v])

        clean_content = re.sub(import_pattern, '', content)
        export_marker = "export const SETTINGS_CONFIG ="
        if export_marker not in clean_content:
            report_feature_failure(
                "settings config has an unexpected format",
                f"missing {export_marker!r}; found {len(imports)} imports",
            )
            return False

        new_content = clean_content.replace(export_marker, "var featuresData =", 1)


        mock_definitions = "\n".join(
            f"var {m} = function () {{ return null; }};"
            if m == "getTranslationProgress"
            else f"var {m} = null;"
            for m in sorted(set(mocks))
        )
        mock_definitions += "\nvar chrome = { runtime: { getManifest: function () { return { version: 'website' }; } } };"
        new_content = f"// Automatically mocked imports and extension APIs for website compatibility\n{mock_definitions}\n\n{new_content}"

        try:
            validation = subprocess.run(
                ["node", "--check"], input=new_content, text=True,
                capture_output=True, check=False,
            )
        except OSError as error:
            print(f"FEATURES WARNING: skipped JavaScript syntax validation — {error}")
        else:
            if validation.returncode != 0:
                report_feature_failure(
                    "generated features.js contains invalid JavaScript",
                    validation.stderr.strip() or validation.stdout.strip(),
                )
                return False

        if os.path.exists(FEATURES_FILE):
            try:
                with open(FEATURES_FILE, 'r', encoding='utf-8') as f:
                    current_content = f.read()
                if current_content == new_content:
                    print(f"Features config is already up to date with tag {tag_name}.")
                    return
            except OSError as error:
                report_feature_failure("could not read existing features.js", repr(error))
                return False

        os.makedirs(os.path.dirname(FEATURES_FILE), exist_ok=True)

        try:
            with open(FEATURES_FILE, 'w', encoding='utf-8') as f:
                f.write(new_content)
        except OSError as error:
            report_feature_failure(f"could not write {FEATURES_FILE}", repr(error))
            return False

        print(f"Successfully updated {FEATURES_FILE} based on tag {tag_name}.")
        return True

def update_changelogs():
    current_version = None
    existing_chrome_dates = {}

    if os.path.exists(CHROME_RELEASE_DATA):
        try:
            with open(CHROME_RELEASE_DATA, 'r', encoding='utf-8') as f:
                data = json.load(f)
                if data.get("chrome_release_data") and len(data["chrome_release_data"]) > 0:
                    current_version = data["chrome_release_data"][0].get("tag_name")

                for r in data.get("chrome_release_data", []):
                    if r.get("tag_name") and r.get("chrome_release_date"):
                        existing_chrome_dates[r["tag_name"]] = r["chrome_release_date"]
        except Exception:
            pass

    url = f"https://api.github.com/repos/NotValra/RoValra/releases"
    headers = {"Authorization": f"Bearer {os.getenv('GH_TOKEN')}"}
    print(f"Fetching releases from {url}...")

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        releases = response.json()

        if releases:
            latest_release = releases[0]
            latest_tag = latest_release.get("tag_name")

            if latest_tag:
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
        processed_chrome_releases = []
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

            processed_chrome_releases.append({
                "tag_name": tag_name,
                "chrome_release_date": c_date
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

        final_chrome_release_data = {
            "chrome_release_data": processed_chrome_releases
        }

        os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)

        with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
            json.dump(final_data, f, indent=4)

        with open(CHROME_RELEASE_DATA, 'w', encoding='utf-8') as f:
            json.dump(final_chrome_release_data, f, indent=4)

        print(f"Successfully updated {OUTPUT_FILE} with {len(processed_releases)} releases.")
    else:
        print(f"Failed to fetch releases. Status code: {response.status_code}")
        print(response.text)
        exit(1)

if __name__ == "__main__":
    update_changelogs()
