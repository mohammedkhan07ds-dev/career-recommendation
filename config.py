"""Configuration for TechZone AI Career Navigator."""

from __future__ import annotations

LEARNING_LEVELS = ["Beginner", "Intermediate", "Advanced"]

CORE_SKILLS = [
    "Python",
    "SQL",
    "Data Analysis",
    "Machine Learning",
    "Deep Learning",
    "Cloud Platforms",
    "DevOps",
    "Cybersecurity",
    "Full-Stack Development",
    "Product Management",
    "Digital Marketing",
    "Communication",
    "Problem Solving",
    "Business Analysis",
    "Generative AI",
    "Data Engineering",
]

INTEREST_TAGS = [
    "AI/ML",
    "Data",
    "Business",
    "Cloud",
    "Security",
    "Product",
    "Marketing",
    "Web Apps",
]

CAREER_GOALS = [
    "AI & ML",
    "Data & Analytics",
    "Cloud & DevOps",
    "Product & Strategy",
    "Cybersecurity",
    "Web & Full-Stack",
    "Marketing & Growth",
]

RECOMMENDATION_WEIGHTS = {
    "required_skill": 0.5,
    "preferred_skill": 0.2,
    "interest": 0.15,
    "goal_alignment": 0.1,
    "learning_level": 0.05,
}

SKILL_ALIASES = {
    "python": "Python",
    "sql": "SQL",
    "data analysis": "Data Analysis",
    "data analytics": "Data Analysis",
    "machine learning": "Machine Learning",
    "ml": "Machine Learning",
    "deep learning": "Deep Learning",
    "cloud": "Cloud Platforms",
    "cloud platforms": "Cloud Platforms",
    "devops": "DevOps",
    "cybersecurity": "Cybersecurity",
    "security": "Cybersecurity",
    "full stack": "Full-Stack Development",
    "full-stack": "Full-Stack Development",
    "backend": "Python",
    "product management": "Product Management",
    "digital marketing": "Digital Marketing",
    "communication": "Communication",
    "problem solving": "Problem Solving",
    "business analysis": "Business Analysis",
    "generative ai": "Generative AI",
    "gen ai": "Generative AI",
    "ai": "Generative AI",
    "data engineering": "Data Engineering",
}
