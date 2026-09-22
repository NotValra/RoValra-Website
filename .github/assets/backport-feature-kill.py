import json
import os

FEATURE_KILL_FILE="global-settings/feature-kill.json"
FEATURE_KILL_BACKPORT_FILE="out/RoValra/Settings/config.json"

feature_kill_contents = {}
feature_kill_backport = {}

with open(FEATURE_KILL_FILE, 'r', encoding='utf-8') as f:
    feature_kill_contents = json.load(f)

for quickFeat in feature_kill_contents.get("quick", []):
    feature_kill_contents.get("features", []).append({
        "setting": quickFeat,
        "incompatibilities": [
                {
                    "versions": "*",
                }
        ]
    })


for feat in feature_kill_contents.get("features", []):
    if feat.get("incompatibilities") and len(feat["incompatibilities"]) > 0:
        feature_kill_backport[feat["setting"]] = ""


os.makedirs(os.path.dirname(FEATURE_KILL_BACKPORT_FILE), exist_ok=True)


with open(FEATURE_KILL_BACKPORT_FILE, 'w', encoding='utf-8') as f:
    json.dump(feature_kill_backport, f, indent=4)

with open(FEATURE_KILL_FILE, 'w', encoding='utf-8') as f:
    json.dump(feature_kill_contents, f, indent=4)
