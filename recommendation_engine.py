"""Explainable recommendation logic for TechZone Academy careers."""

from __future__ import annotations

import csv
import json
import re
from pathlib import Path
from typing import Any

from config import (
    CAREER_GOALS,
    CORE_SKILLS,
    LEARNING_LEVELS,
    RECOMMENDATION_WEIGHTS,
    SKILL_ALIASES,
)

BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"


def normalize_skill_name(value: str) -> str:
    if not value:
        return ""
    normalized = re.sub(r"[^a-z0-9]+", " ", value.lower()).strip()
    return SKILL_ALIASES.get(normalized, value.strip())


def safe_parse_list(value: Any, fallback: list[str] | None = None) -> list[str]:
    if value is None:
        return fallback or []
    if isinstance(value, list):
        return [str(item).strip() for item in value if str(item).strip()]
    if isinstance(value, str):
        text = value.strip()
        if not text:
            return fallback or []

        attempts = [text]
        if text.startswith("["):
            attempts.append(text.replace('\\"', '"'))
            try:
                attempts.append(text.encode("utf-8").decode("unicode_escape"))
            except Exception:
                pass

        for candidate in attempts:
            if candidate.startswith("["):
                try:
                    parsed = json.loads(candidate)
                    if isinstance(parsed, list):
                        return [str(item).strip() for item in parsed if str(item).strip()]
                except (TypeError, ValueError, json.JSONDecodeError):
                    pass

        if ";" in text:
            return [item.strip() for item in text.split(";") if item.strip()]
        if "," in text:
            return [item.strip() for item in text.split(",") if item.strip()]
        return [text]
    return fallback or []


def parse_learning_level(value: Any) -> str:
    text = str(value or "").strip()
    if not text:
        return "Beginner"
    lower = text.lower()
    if "advanced" in lower:
        return "Advanced"
    if "intermediate" in lower:
        return "Intermediate"
    return "Beginner"


def load_catalogue(path: Path) -> list[dict[str, Any]]:
    with path.open("r", encoding="utf-8", newline="") as handle:
        reader = csv.DictReader(handle)
        rows: list[dict[str, Any]] = []
        for row in reader:
            rows.append(row)
    return rows


def load_careers() -> list[dict[str, Any]]:
    rows = load_catalogue(DATA_DIR / "careers.csv")
    careers: list[dict[str, Any]] = []
    for row in rows:
        normalized = {
            "career_id": row.get("career_id", "").strip(),
            "career_name": row.get("career_name", "").strip(),
            "description": row.get("description", "").strip(),
            "required_skills": safe_parse_list(row.get("required_skills")),
            "preferred_skills": safe_parse_list(row.get("preferred_skills")),
            "interest_tags": safe_parse_list(row.get("interest_tags")),
            "learning_resources": safe_parse_list(row.get("learning_resources")),
            "related_courses": safe_parse_list(row.get("related_courses")),
            "entry_level_suitability": row.get("entry_level_suitability", "Beginner").strip(),
        }
        careers.append(normalized)
    return careers


def load_courses() -> list[dict[str, Any]]:
    rows = load_catalogue(DATA_DIR / "courses.csv")
    courses: list[dict[str, Any]] = []
    for row in rows:
        courses.append(
            {
                "course_id": row.get("course_id", "").strip(),
                "course_name": row.get("course_name", "").strip(),
                "description": row.get("description", "").strip(),
                "skills_taught": safe_parse_list(row.get("skills_taught")),
                "related_careers": safe_parse_list(row.get("related_careers")),
                "prerequisites": safe_parse_list(row.get("prerequisites")),
                "duration": row.get("duration", "").strip(),
                "syllabus_verified": str(row.get("syllabus_verified", "false")).strip().lower() == "true",
            }
        )
    return courses


def get_course_lookup() -> dict[str, dict[str, Any]]:
    return {course["course_id"]: course for course in load_courses()}


def normalize_student_profile(payload: dict[str, Any]) -> dict[str, Any]:
    skills_payload = payload.get("skills") if isinstance(payload.get("skills"), dict) else {}
    student_skills: dict[str, float] = {}
    for raw_name, value in skills_payload.items():
        key = normalize_skill_name(str(raw_name))
        if key in {"", "None"}:
            continue
        try:
            student_skills[key] = float(value)
        except (TypeError, ValueError):
            continue

    interest_list = payload.get("interests") or payload.get("interest_tags") or []
    if isinstance(interest_list, str):
        interest_list = [interest_list]

    goals = payload.get("career_goals") or payload.get("career_goal") or []
    if isinstance(goals, str):
        goals = [goals]

    topics = payload.get("learning_topics") or payload.get("preferred_topics") or []
    if isinstance(topics, str):
        topics = [topics]

    return {
        "name": str(payload.get("student_name") or payload.get("name") or "Student").strip(),
        "learning_level": parse_learning_level(payload.get("current_learning_level") or payload.get("learning_level")),
        "skills": student_skills,
        "interests": [str(item).strip() for item in interest_list if str(item).strip()],
        "career_goals": [str(item).strip() for item in goals if str(item).strip()],
        "learning_topics": [str(item).strip() for item in topics if str(item).strip()],
        "preferred_work_activities": safe_parse_list(payload.get("preferred_work_activities")),
    }


def map_skill_proficiency(skill_name: str, student_skills: dict[str, float]) -> float:
    name = normalize_skill_name(skill_name)
    return float(student_skills.get(name, 0.0) or 0.0)


def evaluate_interest_match(career: dict[str, Any], student: dict[str, Any]) -> float:
    interest_tags = [str(item).strip() for item in career.get("interest_tags", [])]
    if not interest_tags:
        return 0.0
    student_interests = {str(item).strip() for item in student.get("interests", [])}
    overlap = len(set(interest_tags) & student_interests)
    if overlap == 0:
        return 0.0
    return min(100.0, (overlap / len(interest_tags)) * 100.0)


def goal_tokens(value: str) -> set[str]:
    cleaned = value.lower().replace("&", " and ").replace("/", " ").replace("-", " ")
    cleaned = re.sub(r"[^a-z0-9 ]", " ", cleaned)
    return {part for part in cleaned.split() if part}


def evaluate_goal_alignment(career: dict[str, Any], student: dict[str, Any]) -> float:
    goals = [str(item).strip() for item in student.get("career_goals", [])]
    if not goals:
        return 50.0
    interest_tags = [str(item).strip() for item in career.get("interest_tags", [])]
    if not interest_tags:
        return 50.0

    goal_tokens_set = set()
    for goal in goals:
        goal_tokens_set |= goal_tokens(goal)

    for tag in interest_tags:
        if goal_tokens_set & goal_tokens(tag):
            return 100.0

    return 50.0


def evaluate_learning_level_fit(career: dict[str, Any], student_level: str) -> float:
    suitability = career.get("entry_level_suitability", "Beginner")
    mapping = {
        "Beginner": {"Beginner": 100.0, "Intermediate": 70.0, "Advanced": 55.0},
        "Intermediate": {"Beginner": 85.0, "Intermediate": 100.0, "Advanced": 75.0},
        "Advanced": {"Beginner": 60.0, "Intermediate": 85.0, "Advanced": 100.0},
    }
    return mapping.get(suitability, {"Beginner": 70.0, "Intermediate": 100.0, "Advanced": 70.0}).get(student_level, 70.0)


def score_career(career: dict[str, Any], student: dict[str, Any]) -> dict[str, Any]:
    required_skills = career.get("required_skills", [])
    preferred_skills = career.get("preferred_skills", [])

    required_total = 0.0
    required_possible = 0.0
    required_matches: list[str] = []
    missing_skills: list[str] = []
    for skill in required_skills:
        proficiency = map_skill_proficiency(skill, student["skills"])
        required_total += proficiency
        required_possible += 5.0
        if proficiency >= 3.0:
            required_matches.append(skill)
        else:
            missing_skills.append(skill)

    preferred_total = 0.0
    preferred_possible = 0.0
    preferred_matches: list[str] = []
    for skill in preferred_skills:
        proficiency = map_skill_proficiency(skill, student["skills"])
        preferred_total += proficiency
        preferred_possible += 5.0
        if proficiency >= 3.0:
            preferred_matches.append(skill)

    required_ratio = (required_total / required_possible * 100.0) if required_possible else 0.0
    preferred_ratio = (preferred_total / preferred_possible * 100.0) if preferred_possible else 0.0
    interest_score = evaluate_interest_match(career, student)
    goal_score = evaluate_goal_alignment(career, student)
    level_score = evaluate_learning_level_fit(career, student["learning_level"])

    weighted_score = (
        RECOMMENDATION_WEIGHTS["required_skill"] * required_ratio
        + RECOMMENDATION_WEIGHTS["preferred_skill"] * preferred_ratio
        + RECOMMENDATION_WEIGHTS["interest"] * interest_score
        + RECOMMENDATION_WEIGHTS["goal_alignment"] * goal_score
        + RECOMMENDATION_WEIGHTS["learning_level"] * level_score
    )
    final_score = max(0.0, min(100.0, weighted_score))

    course_lookup = get_course_lookup()
    recommended_courses = []
    for course_id in career.get("related_courses", [])[:3]:
        course = course_lookup.get(course_id)
        if course:
            recommended_courses.append(course)

    explanations = []
    if required_matches:
        explanations.append(
            f"Your current strengths align well with {', '.join(required_matches[:3])}."
        )
    if interest_score > 0:
        explanations.append(
            f"Your interests in {', '.join(student.get('interests', [])[:3]) or 'career exploration'} match this role's focus areas."
        )
    if missing_skills:
        explanations.append(
            f"The biggest gaps to close are {', '.join(missing_skills[:3])}."
        )
    if not explanations:
        explanations.append("This role is a good exploratory match and may suit a structured learning plan.")

    return {
        "career_id": career["career_id"],
        "career_name": career["career_name"],
        "description": career["description"],
        "match_score": round(final_score, 1),
        "skills_match": required_matches[:5] + preferred_matches[:3],
        "missing_skills": missing_skills[:5],
        "why_it_matches": explanations,
        "recommended_courses": [
            {
                "course_id": course["course_id"],
                "course_name": course["course_name"],
                "description": course["description"],
            }
            for course in recommended_courses
        ],
        "next_learning_steps": missing_skills[:3] or required_skills[:3],
        "required_skills": required_skills,
    }


def get_recommendations(student_payload: dict[str, Any]) -> dict[str, Any]:
    student = normalize_student_profile(student_payload)
    careers = load_careers()
    scored = [score_career(career, student) for career in careers]
    ranked = sorted(scored, key=lambda item: item["match_score"], reverse=True)[:5]

    skill_gaps = []
    for item in ranked[:3]:
        if item["missing_skills"]:
            skill_gaps.append(
                f"{item['career_name']}: strengthen {', '.join(item['missing_skills'][:3])}."
            )

    return {
        "student_name": student["name"],
        "learning_level": student["learning_level"],
        "recommendations": ranked,
        "skill_gap_summary": skill_gaps,
    }


def validate_catalogues() -> None:
    courses = load_courses()
    careers = load_careers()
    if not courses:
        raise ValueError("No course catalogue entries found in data/courses.csv.")
    if not careers:
        raise ValueError("No career catalogue entries found in data/careers.csv.")

    course_ids = {course["course_id"] for course in courses}
    career_ids = {career["career_id"] for career in careers}
    if len(course_ids) != len(courses):
        raise ValueError("Duplicate course IDs detected in data/courses.csv.")
    if len(career_ids) != len(careers):
        raise ValueError("Duplicate career IDs detected in data/careers.csv.")

    unknown_course_ids = []
    for career in careers:
        for course_id in career["related_courses"]:
            if course_id not in course_ids:
                unknown_course_ids.append(course_id)
    if unknown_course_ids:
        raise ValueError(f"Career catalogue references unknown course IDs: {sorted(set(unknown_course_ids))}")

    valid_levels = set(LEARNING_LEVELS)
    for career in careers:
        if career["entry_level_suitability"] not in valid_levels:
            raise ValueError(f"Invalid learning level for {career['career_name']}: {career['entry_level_suitability']}")

    for course in courses:
        for skill in course["skills_taught"]:
            if normalize_skill_name(skill) not in CORE_SKILLS and skill not in CORE_SKILLS:
                pass


if __name__ == "__main__":
    validate_catalogues()
    sample = {
        "student_name": "Aisha",
        "current_learning_level": "Beginner",
        "skills": {
            "Python": 4,
            "SQL": 3,
            "Data Analysis": 4,
            "Machine Learning": 2,
            "Communication": 4,
            "Problem Solving": 4,
        },
        "interests": ["AI/ML", "Data"],
        "career_goals": ["AI & ML"],
        "learning_topics": ["Generative AI"],
    }
    print(get_recommendations(sample))
