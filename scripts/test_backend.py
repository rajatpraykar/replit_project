import subprocess
import time
import urllib.request
import json
import os
import sys

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

API_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "artifacts", "api-server"))
print(f"Testing API server in {API_DIR}...")

# Build backend
subprocess.run("node ./build.mjs", cwd=API_DIR, shell=True, check=True)

# Start backend process
env = os.environ.copy()
env["PORT"] = "3000"
env["NODE_ENV"] = "development"
proc = subprocess.Popen("node ./dist/index.mjs", cwd=API_DIR, shell=True, env=env)

time.sleep(2)

def post_json(url, data):
    req = urllib.request.Request(
        url,
        data=json.dumps(data).encode("utf-8"),
        headers={"Content-Type": "application/json", "User-Agent": "TestClient"}
    )
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode("utf-8"))

def get_json(url):
    req = urllib.request.Request(url, headers={"User-Agent": "TestClient"})
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode("utf-8"))

results = {}
try:
    # 1. Health
    res = get_json("http://localhost:3000/api/healthz")
    print("✓ Healthz:", res)
    results["healthz"] = True

    # 2. Enhance image
    res = post_json("http://localhost:3000/api/enhance-image", {
        "imageBase64": "ZGVtby1pbWFnZQ==",
        "craftType": "textile",
        "testMode": True
    })
    print("✓ Enhance Image:", res.get("enhanced"), res.get("provider"))
    results["enhance-image"] = True

    # 3. Catalog generate
    res = post_json("http://localhost:3000/api/catalog/generate", {
        "productName": "Banarasi Silk Dupatta",
        "craftType": "Handloom",
        "materials": "Pure Silk",
        "materialCost": 350,
        "makingHours": 6,
        "testMode": True
    })
    print("✓ Catalog Generate:", res.get("englishTitle"), res.get("pricing"))
    results["catalog-generate"] = True

    # 4. Transcribe
    res = post_json("http://localhost:3000/api/transcribe", {
        "audioBase64": "ZGVtby1hdWRpbw==",
        "language": "hi",
        "testMode": True
    })
    print("✓ Transcribe:", res.get("languageName"), res.get("text")[:40])
    results["transcribe"] = True

    # 5. Products
    res = get_json("http://localhost:3000/api/products")
    print(f"✓ Products: Loaded {len(res)} items")
    results["products"] = True

    # 6. Analytics
    res = get_json("http://localhost:3000/api/analytics")
    print("✓ Analytics:", res.get("metrics", {}).get("totalProducts"))
    results["analytics"] = True

    # 7. ONDC Status
    res = get_json("http://localhost:3000/api/ondc/status")
    print("✓ ONDC Status:", res.get("status"), res.get("becknVersion"))
    results["ondc-status"] = True

    print("\n🎉 ALL 7 BACKEND API ENDPOINTS PASSED VERIFICATION WITH ZERO FAILURES!")

finally:
    if sys.platform.startswith("win"):
        subprocess.run(f"taskkill /F /T /PID {proc.pid}", shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    else:
        proc.terminate()
