"""Inspect DOM layout, overflow, and element geometry via Chrome DevTools Protocol."""

import json
import subprocess
import time
import urllib.request
import urllib.error

# Launch Chrome with remote debugging
chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
user_data_dir = r"C:\Users\Moham\.gemini\antigravity-ide\brain\92e31b8b-91b3-4aa3-9fb5-f28bba0b040a\chrome_debug_profile"

proc = subprocess.Popen([
    chrome_path,
    "--headless=new",
    "--remote-debugging-port=9222",
    f"--user-data-dir={user_data_dir}",
    "--disable-gpu",
    "--window-size=375,900",
    "http://127.0.0.1:5000"
])

time.sleep(2)

try:
    # Query targets
    targets_url = "http://127.0.0.1:9222/json"
    with urllib.request.urlopen(targets_url) as resp:
        targets = json.loads(resp.read().decode("utf-8"))
    
    page_target = next((t for t in targets if t.get("type") == "page"), None)
    print("Page target:", page_target["title"], page_target["url"])

    ws_url = page_target["webSocketDebuggerUrl"]
    print("WebSocket URL:", ws_url)

    # Use websocket client (or simple polling via HTTP endpoints)
    # Python stdlib doesn't have websockets, but we can check if websockets package or simple socket exists
except Exception as e:
    print("Error:", e)
finally:
    proc.terminate()
