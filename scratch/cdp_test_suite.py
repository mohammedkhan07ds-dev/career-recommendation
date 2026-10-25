"""Comprehensive browser verification suite using Chrome DevTools Protocol."""

import base64
import json
import os
import subprocess
import time
import urllib.request
import websocket

ARTIFACTS_DIR = r"C:\Users\Moham\.gemini\antigravity-ide\brain\92e31b8b-91b3-4aa3-9fb5-f28bba0b040a"
CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
USER_DATA_DIR = os.path.join(ARTIFACTS_DIR, "cdp_chrome_profile")

class ChromeController:
    def __init__(self, port=9222):
        self.port = port
        self.proc = None
        self.ws = None
        self.msg_id = 0

    def start(self):
        self.proc = subprocess.Popen([
            CHROME_PATH,
            "--headless=new",
            f"--remote-debugging-port={self.port}",
            "--remote-allow-origins=*",
            f"--user-data-dir={USER_DATA_DIR}",
            "--disable-gpu",
            "--no-first-run",
            "--no-default-browser-check",
            "about:blank"
        ])
        time.sleep(2)

        # Connect to websocket
        url = f"http://127.0.0.1:{self.port}/json"
        with urllib.request.urlopen(url) as resp:
            targets = json.loads(resp.read().decode("utf-8"))
        page_target = next(t for t in targets if t.get("type") == "page")
        ws_url = page_target["webSocketDebuggerUrl"]
        self.ws = websocket.create_connection(ws_url)

        # Enable runtime & log
        self.send("Runtime.enable")
        self.send("Log.enable")
        self.send("Page.enable")
        self.send("DOM.enable")

    def stop(self):
        if self.ws:
            self.ws.close()
        if self.proc:
            self.proc.terminate()

    def send(self, method, params=None):
        self.msg_id += 1
        msg = {"id": self.msg_id, "method": method, "params": params or {}}
        self.ws.send(json.dumps(msg))
        while True:
            raw = self.ws.recv()
            data = json.loads(raw)
            if data.get("id") == self.msg_id:
                return data.get("result", {})

    def evaluate(self, expr):
        res = self.send("Runtime.evaluate", {"expression": expr, "returnByValue": True})
        return res.get("result", {}).get("value")

    def set_viewport(self, width, height, device_scale_factor=1, is_mobile=False):
        self.send("Emulation.setDeviceMetricsOverride", {
            "width": width,
            "height": height,
            "deviceScaleFactor": device_scale_factor,
            "mobile": is_mobile
        })

    def screenshot(self, filename, clip=None):
        params = {"format": "png"}
        if clip:
            params["clip"] = clip
        res = self.send("Page.captureScreenshot", params)
        data = base64.b64decode(res["data"])
        out_path = os.path.join(ARTIFACTS_DIR, filename)
        with open(out_path, "wb") as f:
            f.write(data)
        print(f"Captured screenshot: {filename} ({len(data)} bytes)")
        return out_path

def run_suite():
    ctrl = ChromeController()
    ctrl.start()
    try:
        print("1. Navigating to http://127.0.0.1:5000...")
        ctrl.send("Page.navigate", {"url": "http://127.0.0.1:5000"})
        time.sleep(2)

        # Title check
        title = ctrl.evaluate("document.title")
        print(f"Page title: {title}")
        assert "TechZone AI Career Navigator" in title

        # Check for JS errors in console
        logs = ctrl.evaluate("window.__console_errors || []")
        print(f"Console errors check: {logs}")

        # Set 1440px desktop
        ctrl.set_viewport(1440, 900)
        time.sleep(1)
        ctrl.screenshot("desktop_hero_1440.png")

        # Step 1: fill student name and verify level
        ctrl.evaluate("document.getElementById('student_name').value = 'Aisha Sharma'")
        name_val = ctrl.evaluate("document.getElementById('student_name').value")
        print(f"Set student_name: {name_val}")

        # Click Next Step to Step 2
        ctrl.evaluate("document.getElementById('wizard-next-btn').click()")
        time.sleep(0.5)
        step2_active = ctrl.evaluate("document.getElementById('step-pane-2').classList.contains('active')")
        print(f"Step 2 active: {step2_active}")

        # Click preset "AI & ML Focus"
        ctrl.evaluate("document.querySelector(\".preset-btn[data-preset='ai']\").click()")
        python_val = ctrl.evaluate("document.querySelector(\".range-input[data-skill='Python']\").value")
        ml_val = ctrl.evaluate("document.querySelector(\".range-input[data-skill='Machine Learning']\").value")
        # Scroll into view of step 2
        ctrl.evaluate("document.getElementById('assessment-section').scrollIntoView()")
        time.sleep(1)
        ctrl.screenshot("desktop_step2_skills.png")

        # Click Next Step to Step 3
        ctrl.evaluate("document.getElementById('wizard-next-btn').click()")
        time.sleep(0.5)
        step3_active = ctrl.evaluate("document.getElementById('step-pane-3').classList.contains('active')")
        submit_btn_visible = ctrl.evaluate("document.getElementById('wizard-submit-btn').style.display !== 'none'")
        print(f"Step 3 active: {step3_active}, Submit button visible: {submit_btn_visible}")
        ctrl.screenshot("desktop_step3_interests.png")

        # Submit Assessment
        print("Submitting assessment form...")
        ctrl.evaluate("document.getElementById('career-form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))")
        time.sleep(2)

        # Verify results section is visible
        results_hidden = ctrl.evaluate("document.getElementById('results-section').classList.contains('hidden')")
        print(f"Results section hidden: {results_hidden}")
        assert not results_hidden, "Results section should be visible after submit!"

        top_role = ctrl.evaluate("document.querySelector('.career-card-primary .career-heading')?.textContent")
        top_score = ctrl.evaluate("document.querySelector('.career-card-primary .circle-text')?.textContent")
        sec_cards_count = ctrl.evaluate("document.querySelectorAll('.career-card-secondary').length")
        roadmap_steps_count = ctrl.evaluate("document.querySelectorAll('.roadmap-step-item').length")
        print(f"RESULTS RENDERED: Top Role='{top_role}', Score='{top_score}', Secondary Cards={sec_cards_count}, Roadmap Steps={roadmap_steps_count}")
        assert top_role, "Primary career card heading missing!"
        assert sec_cards_count == 4, f"Expected 4 secondary cards, got {sec_cards_count}"
        assert roadmap_steps_count >= 1, "Roadmap steps missing!"

        # Scroll to results and screenshot
        ctrl.evaluate("document.getElementById('results-section').scrollIntoView()")
        time.sleep(1)
        ctrl.screenshot("desktop_results_view.png")

        # Scroll to roadmap card and screenshot
        ctrl.evaluate("document.getElementById('roadmap-card').scrollIntoView()")
        time.sleep(1)
        ctrl.screenshot("desktop_roadmap_view.png")

        # Scroll to courses showcase
        courses_count = ctrl.evaluate("document.querySelectorAll('.course-card-item').length")
        print(f"Total courses rendered in showcase: {courses_count}")
        assert courses_count == 13, f"Expected 13 courses, got {courses_count}"

        # Test category filter
        ctrl.evaluate("document.querySelector(\".course-cat-btn[data-course-cat='cloud']\").click()")
        time.sleep(0.5)
        filtered_count = ctrl.evaluate("document.querySelectorAll('.course-card-item').length")
        print(f"Cloud category filtered courses: {filtered_count}")

        # Reset category filter to all
        ctrl.evaluate("document.querySelector(\".course-cat-btn[data-course-cat='all']\").click()")
        time.sleep(0.5)

        ctrl.evaluate("document.getElementById('courses-showcase').scrollIntoView()")
        time.sleep(1)
        ctrl.screenshot("desktop_courses_view.png")

        # Test Tablet View (768px)
        print("Testing 768px Tablet viewport...")
        ctrl.set_viewport(768, 1024)
        ctrl.evaluate("window.scrollTo(0, 0)")
        time.sleep(1)
        tablet_overflow = ctrl.evaluate("document.documentElement.scrollWidth > 768")
        print(f"Tablet 768px horizontal overflow: {tablet_overflow}")
        assert not tablet_overflow, "Horizontal overflow detected at 768px!"
        ctrl.screenshot("tablet_view_768.png")

        # Test Mobile View (375px)
        print("Testing 375px Mobile viewport...")
        ctrl.set_viewport(375, 812, is_mobile=True)
        ctrl.evaluate("window.scrollTo(0, 0)")
        time.sleep(1)
        mobile_overflow = ctrl.evaluate("document.documentElement.scrollWidth > 375")
        print(f"Mobile 375px horizontal overflow: {mobile_overflow}")
        assert not mobile_overflow, "Horizontal overflow detected at 375px!"
        ctrl.screenshot("mobile_view_375.png")

        # Test Mobile Menu Drawer
        print("Testing mobile hamburger drawer...")
        ctrl.evaluate("document.getElementById('menu-toggle').click()")
        time.sleep(0.5)
        drawer_open = ctrl.evaluate("document.getElementById('mobile-drawer').classList.contains('open')")
        print(f"Mobile drawer open: {drawer_open}")
        assert drawer_open, "Mobile drawer should open when menu-toggle is clicked!"
        ctrl.screenshot("mobile_drawer_open.png")

        # Test Escape to close
        ctrl.evaluate("document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))")
        time.sleep(0.5)
        drawer_closed = not ctrl.evaluate("document.getElementById('mobile-drawer').classList.contains('open')")
        print(f"Mobile drawer closed via Escape: {drawer_closed}")
        assert drawer_closed, "Mobile drawer should close on Escape!"

        # Test Footer and Back to Top
        print("Testing Footer and Back to Top...")
        ctrl.set_viewport(1440, 900)
        ctrl.evaluate("document.getElementById('site-footer').scrollIntoView()")
        time.sleep(1)
        ctrl.screenshot("desktop_footer_view.png")

        ctrl.evaluate("document.getElementById('back-to-top').click()")
        time.sleep(1)
        scroll_y = ctrl.evaluate("window.scrollY")
        print(f"Scroll Y position after back-to-top: {scroll_y}")

        print("\nALL CDP BROWSER VERIFICATION TESTS COMPLETED SUCCESSFULLY!")

    finally:
        ctrl.stop()

if __name__ == "__main__":
    run_suite()
