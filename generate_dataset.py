"""Generate a transparent, synthetic TechZone assessment dataset for testing."""

from __future__ import annotations

import csv
import json
import random
from pathlib import Path

from recommendation_engine import load_careers

RANDOM_SEED = 42
SAMPLE_COUNT = 500


def generate_profile(rng: random.Random) -> dict[str, object]:
    career_profiles = load_careers()
    chosen = rng.choice(career_profiles)
    learning_levels = ["Beginner", "Intermediate", "Advanced"]
    interests = ["AI/ML", "Data", "Business", "Cloud", "Security", "Product", "Marketing", "Web Apps"]
    topics = ["Generative AI", "Data Science", "Cloud Architecture", "Product Strategy", "Cybersecurity", "Full-Stack Development"]

    skills = {
        "Python": rng.randint(0, 5),
        "SQL": rng.randint(0, 5),
        "Data Analysis": rng.randint(0, 5),
        "Machine Learning": rng.randint(0, 5),
        "Deep Learning": rng.randint(0, 5),
        "Cloud Platforms": rng.randint(0, 5),
        "Cybersecurity": rng.randint(0, 5),
        "Full-Stack Development": rng.randint(0, 5),
        "Product Management": rng.randint(0, 5),
        "Digital Marketing": rng.randint(0, 5),
        "Communication": rng.randint(0, 5),
        "Problem Solving": rng.randint(0, 5),
    }

    base_interest = chosen["interest_tags"]
    selected_interests = list(dict.fromkeys(base_interest + rng.sample(interests, rng.randint(0, 2))))
    selected_topics = list(dict.fromkeys(chosen["related_courses"][:2] + rng.sample(topics, rng.randint(1, 3))))

    for skill_name in chosen["required_skills"]:
        skills[skill_name] = max(skills.get(skill_name, 0), rng.randint(2, 5))

    return {
        "student_id": f"STU-{rng.randint(1000, 9999)}",
        "student_name": f"Student_{rng.randint(100, 999)}",
        "learning_level": rng.choice(learning_levels),
        "career_goal": chosen["career_name"],
        "interests": json.dumps(selected_interests),
        "skills": json.dumps(skills),
        "learning_topics": json.dumps(selected_topics),
        "synthetic_label": chosen["career_name"],
        "note": "Synthetic assessment example for local testing only. Not real student data.",
    }


def main() -> None:
    rng = random.Random(RANDOM_SEED)
    profiles = [generate_profile(rng) for _ in range(SAMPLE_COUNT)]

    base_dir = Path(__file__).resolve().parent
    data_dir = base_dir / "data"
    data_dir.mkdir(parents=True, exist_ok=True)
    out_path = data_dir / "techzone_synthetic_candidates.csv"

    fieldnames = [
        "student_id",
        "student_name",
        "learning_level",
        "career_goal",
        "interests",
        "skills",
        "learning_topics",
        "synthetic_label",
        "note",
    ]

    with out_path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(profiles)

    print(f"Generated {len(profiles)} synthetic assessment rows -> {out_path}")
    print("This dataset is explicitly synthetic and should not be treated as actual student data.")


if __name__ == "__main__":
    main()
