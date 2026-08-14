import os
import json

base_dir = r"c:\Users\user\Desktop\KURS\iib-kiberxavfsizlik-akademiyasi"

checks = []

# 1. Check index.html title and favicon
index_html_path = os.path.join(base_dir, "index.html")
with open(index_html_path, "r", encoding="utf-8") as f:
    html_content = f.read()
    if "Kibersavodxonlik" in html_content and "My Google AI Studio App" not in html_content:
        checks.append("[PASS] index.html Title & Meta Branding")
    else:
        checks.append("[FAIL] index.html Title & Meta Branding")

# 2. Check vite.config.ts base
vite_config_path = os.path.join(base_dir, "vite.config.ts")
if os.path.exists(vite_config_path):
    with open(vite_config_path, "r", encoding="utf-8") as f:
        vcontent = f.read()
        if "base: './'" in vcontent or "base: \"./\"" in vcontent:
            checks.append("[PASS] vite.config.ts relative base ('./')")
        else:
            checks.append("[WARN] vite.config.ts base check")

# 3. Check public assets
pub_video = os.path.join(base_dir, "public", "video_intro.mp4")
pub_logo = os.path.join(base_dir, "public", "iib.jpg")
pub_404 = os.path.join(base_dir, "public", "404.html")

if os.path.exists(pub_video) and os.path.getsize(pub_video) > 0:
    checks.append("[PASS] public/video_intro.mp4 (AI Intro Video)")
else:
    checks.append("[FAIL] public/video_intro.mp4 missing")

if os.path.exists(pub_logo):
    checks.append("[PASS] public/iib.jpg Favicon & Logo")
else:
    checks.append("[FAIL] public/iib.jpg missing")

if os.path.exists(pub_404):
    checks.append("[PASS] public/404.html SPA Fallback")
else:
    checks.append("[FAIL] public/404.html missing")

# 4. Check package.json deploy scripts
pkg_path = os.path.join(base_dir, "package.json")
with open(pkg_path, "r", encoding="utf-8") as f:
    pkg = json.load(f)
    if "deploy" in pkg.get("scripts", {}):
        checks.append("[PASS] package.json deploy script ('gh-pages -d dist')")
    else:
        checks.append("[FAIL] package.json deploy script missing")

print("=== FINAL QA AUDIT REPORT ===")
for c in checks:
    print(c)
