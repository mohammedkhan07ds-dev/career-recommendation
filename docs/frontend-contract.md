# Frontend Contract: TechZone AI Career Navigator

This document establishes the exact data and interface contract between the Flask backend and the frontend for TechZone Academy's AI Career Navigator.

---

## 1. Routes & HTTP Methods

| Endpoint | Method | Input Format | Output Format | Description |
| :--- | :--- | :--- | :--- | :--- |
| `/` | `GET` | N/A | `text/html` | Renders `templates/index.html`. No Jinja context variables are passed by `app.py`. |
| `/predict` | `POST` | `application/json` | `application/json` | Calculates career recommendations and skill-gap analysis based on student profile. |
| `/health` | `GET` | N/A | `application/json` | Validates catalogue integrity across `data/courses.csv` and `data/careers.csv`. Returns `{"status": "ok", "catalogue": "validated"}`. |

---

## 2. Form Fields, Types, and Valid Ranges

The assessment accepts student inputs mapping directly to `normalize_student_profile()` in `recommendation_engine.py`:

| Field Name | Type | Allowed / Valid Values | Default | Purpose in Engine |
| :--- | :--- | :--- | :--- | :--- |
| `student_name` (alias: `name`) | `string` | Any string (trimmed) | `"Student"` | Displayed in recommendation summary |
| `current_learning_level` (alias: `learning_level`) | `select` | `"Beginner"`, `"Intermediate"`, `"Advanced"` | `"Beginner"` | Used in `evaluate_learning_level_fit()` (5% weight) |
| `career_goals` (alias: `career_goal`) | `array<string>` | `"AI & ML"`, `"Data & Analytics"`, `"Cloud & DevOps"`, `"Product & Strategy"`, `"Cybersecurity"`, `"Web & Full-Stack"`, `"Marketing & Growth"` | `[]` | Used in `evaluate_goal_alignment()` (10% weight) |
| `skills` | `object<string, number>` | Keys: Core skills; Values: `0` to `5` (slider) | `0` for unrated | Required skills (50% weight) and preferred skills (20% weight). Proficiencies >= 3.0 count as matched/strengths; < 3.0 count as gaps. |
| `interests` (alias: `interest_tags`) | `array<string>` | `"AI/ML"`, `"Data"`, `"Business"`, `"Cloud"`, `"Security"`, `"Product"`, `"Marketing"`, `"Web Apps"` | `[]` | Evaluates tag overlap with career `interest_tags` (15% weight) |
| `learning_topics` (alias: `preferred_topics`) | `array<string>` | Configured exploratory tags (e.g., `"Generative AI"`, `"Data Science"`, `"Cloud Architecture"`, `"Product Strategy"`, `"Cybersecurity"`, `"Full-Stack Development"`) | `[]` | Included in student profile context |

### Core Skills Recognized by the Backend:
- `Python`
- `SQL`
- `Data Analysis`
- `Machine Learning`
- `Deep Learning`
- `Cloud Platforms`
- `DevOps`
- `Cybersecurity`
- `Full-Stack Development`
- `Product Management`
- `Digital Marketing`
- `Communication`
- `Problem Solving`
- `Business Analysis`
- `Generative AI`
- `Data Engineering`

---

## 3. Exact Request Payload (`POST /predict`)

```json
{
  "student_name": "Aisha Sharma",
  "current_learning_level": "Intermediate",
  "career_goals": ["AI & ML"],
  "skills": {
    "Python": 4,
    "SQL": 3,
    "Data Analysis": 4,
    "Machine Learning": 2,
    "Deep Learning": 1,
    "Cloud Platforms": 2,
    "DevOps": 1,
    "Cybersecurity": 0,
    "Full-Stack Development": 2,
    "Product Management": 1,
    "Digital Marketing": 0,
    "Communication": 4,
    "Problem Solving": 4,
    "Business Analysis": 2,
    "Generative AI": 3,
    "Data Engineering": 2
  },
  "interests": ["AI/ML", "Data"],
  "learning_topics": ["Generative AI", "Data Science"]
}
```

---

## 4. Exact Response Structure (`POST /predict`)

### Success Response (`200 OK`):
```json
{
  "student_name": "Aisha Sharma",
  "learning_level": "Intermediate",
  "recommendations": [
    {
      "career_id": "CA-05",
      "career_name": "AI Engineer",
      "description": "Design AI-powered product features using LLMs, data pipelines, and reliable system integration.",
      "match_score": 78.5,
      "skills_match": [
        "Python",
        "Problem Solving",
        "Generative AI"
      ],
      "missing_skills": [
        "Machine Learning"
      ],
      "why_it_matches": [
        "Your current strengths align well with Python, Problem Solving, Generative AI.",
        "Your interests in AI/ML, Data match this role's focus areas.",
        "The biggest gaps to close are Machine Learning."
      ],
      "recommended_courses": [
        {
          "course_id": "COURSE-04",
          "course_name": "Gen AI Engineering",
          "description": "Prototype, optimize, and productize generative AI applications with prompts, RAG, and evaluation loops."
        },
        {
          "course_id": "COURSE-03",
          "course_name": "AIML Engineering with Gen AI",
          "description": "Design, train, and deploy AI systems using ML workflows, evaluation, and iterative model improvement."
        },
        {
          "course_id": "COURSE-11",
          "course_name": "AI Essentials",
          "description": "Get a practical introduction to AI concepts, workflows, and responsible use across business and technical roles."
        }
      ],
      "next_learning_steps": [
        "Machine Learning"
      ],
      "required_skills": [
        "Python",
        "Generative AI",
        "Machine Learning",
        "Problem Solving"
      ]
    }
  ],
  "skill_gap_summary": [
    "AI Engineer: strengthen Machine Learning."
  ]
}
```

### Error Response (`400 Bad Request`):
```json
{
  "error": "No JSON payload provided"
}
```
Or when an unhandled error/validation fails:
```json
{
  "error": "Unable to generate recommendations: <message>"
}
```

---

## 5. Catalogue Exposure

- **Backend behavior**: `app.py` serves `templates/index.html` using Flask's `render_template("index.html")` without injecting any context variables into the template. The backend does not provide a public `/api/courses` or `/api/careers` endpoint.
- **Frontend architecture**:
  1. All 13 courses from `data/courses.csv` are embedded as a strict client-side catalogue constant in the frontend codebase. Every title, description, skills taught, prerequisites, and related careers corresponds 1-to-1 with `data/courses.csv`.
  2. All 15 careers from `data/careers.csv` correspond directly to the backend recommendation output IDs (`CA-01` to `CA-15`).
  3. No artificial or fabricated metrics (such as fake ratings, placement counts, or syllabus claims) are introduced.
