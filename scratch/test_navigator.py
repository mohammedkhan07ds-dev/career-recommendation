"""Test script for TechZone AI Career Navigator backend and frontend assets."""

import json
import urllib.request
import urllib.error

BASE_URL = "http://127.0.0.1:5000"

def test_health():
    url = f"{BASE_URL}/health"
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req) as resp:
        assert resp.status == 200
        data = json.loads(resp.read().decode("utf-8"))
        assert data.get("status") == "ok"
        assert data.get("catalogue") == "validated"
    print("PASS: /health")

def test_index_html():
    url = f"{BASE_URL}/"
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req) as resp:
        assert resp.status == 200
        html = resp.read().decode("utf-8")
        
        # Check required tags and strings
        assert "<title>TechZone AI Career Navigator" in html, "Missing Title"
        assert "YOUR SKILLS. YOUR INTERESTS. YOUR FUTURE." in html, "Missing eyebrow"
        assert "TechZone <span class=\"gradient-title-accent\">AI Career</span> Navigator" in html, "Missing H1"
        assert "Discover your career direction" in html, "Missing hero copy"
        assert "Start Career Assessment" in html, "Missing CTA"
        assert "Explore Courses" in html, "Missing Explore Courses"
        assert "Career Recommendations" in html, "Missing indicator 1"
        assert "Course Matching" in html, "Missing indicator 2"
        assert "Skill-Gap Analysis" in html, "Missing indicator 3"
        assert "Learning Roadmaps" in html, "Missing indicator 4"
        assert "neural-network-svg" in html, "Missing neural network visual"
        assert "stepper-nav" in html, "Missing stepper nav"
        assert "data-step=\"1\"" in html and "data-step=\"2\"" in html and "data-step=\"3\"" in html, "Missing steps"
        assert "Python" in html and "SQL" in html and "Data Analysis" in html, "Missing skill sliders"
        assert "Match score reflects compatibility with the configured assessment criteria, not a probability of employment." in html, "Missing disclaimer"
        assert "tzacademy.official@gmail.com" in html, "Missing email"
        assert "+91 63048 72757" in html, "Missing phone 1"
        assert "+91 92468 76444" in html, "Missing phone 2"
        assert "Lakdikapul" in html and "Himayat Nagar" in html, "Missing branches"
        assert "Back to top" in html, "Missing back to top"
    print("PASS: / (index.html contract & required content)")

def test_predict_success():
    url = f"{BASE_URL}/predict"
    payload = {
        "student_name": "Aisha Sharma",
        "current_learning_level": "Intermediate",
        "career_goals": ["AI & ML"],
        "skills": {
            "Python": 4,
            "SQL": 3,
            "Data Analysis": 4,
            "Machine Learning": 4,
            "Deep Learning": 3,
            "Cloud Platforms": 2,
            "DevOps": 1,
            "Cybersecurity": 0,
            "Full-Stack Development": 2,
            "Product Management": 2,
            "Digital Marketing": 0,
            "Communication": 4,
            "Problem Solving": 4,
            "Business Analysis": 2,
            "Generative AI": 4,
            "Data Engineering": 3
        },
        "interests": ["AI/ML", "Data"],
        "learning_topics": ["Generative AI", "Data Science"]
    }
    
    data_bytes = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=data_bytes, headers={"Content-Type": "application/json"}, method="POST")
    with urllib.request.urlopen(req) as resp:
        assert resp.status == 200
        data = json.loads(resp.read().decode("utf-8"))
        assert data.get("student_name") == "Aisha Sharma"
        assert data.get("learning_level") == "Intermediate"
        recs = data.get("recommendations")
        assert isinstance(recs, list) and len(recs) == 5, f"Expected 5 recommendations, got {len(recs)}"
        
        top = recs[0]
        assert "career_id" in top
        assert "career_name" in top
        assert "match_score" in top
        assert "skills_match" in top
        assert "missing_skills" in top
        assert "why_it_matches" in top
        assert "recommended_courses" in top
        assert "next_learning_steps" in top
        print(f"Top recommendation: {top['career_name']} (Match: {top['match_score']}%)")
        print(f"Why it matches: {top['why_it_matches']}")
        print(f"Courses: {[c['course_name'] for c in top['recommended_courses']]}")
    print("PASS: /predict (valid profile evaluation)")

def test_predict_empty_payload():
    url = f"{BASE_URL}/predict"
    req = urllib.request.Request(url, data=b"", headers={"Content-Type": "application/json"}, method="POST")
    try:
        with urllib.request.urlopen(req) as resp:
            assert False, "Expected 400 Bad Request"
    except urllib.error.HTTPError as exc:
        assert exc.code == 400
        body = json.loads(exc.read().decode("utf-8"))
        assert "error" in body
        print(f"PASS: /predict empty payload returned 400: {body}")

def test_static_files():
    for filename in ["style.css", "app.js"]:
        url = f"{BASE_URL}/static/{filename}"
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req) as resp:
            assert resp.status == 200
            content = resp.read().decode("utf-8")
            assert len(content) > 500
        print(f"PASS: /static/{filename} is served properly ({len(content)} bytes)")

if __name__ == "__main__":
    test_health()
    test_index_html()
    test_predict_success()
    test_predict_empty_payload()
    test_static_files()
    print("\nALL BACKEND & FRONTEND INTEGRATION TESTS PASSED!")
