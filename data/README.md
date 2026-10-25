# TechZone Academy Data Catalogue

This folder stores the institute's verified, maintainable catalogue for the TechZone AI Career Navigator.

## Files

- `courses.csv`: course offerings and course-to-career mappings.
- `careers.csv`: career profiles, required/preferred skills, learning resources, and related courses.

## Data dictionary

### `courses.csv`

- `course_id`: stable internal identifier.
- `course_name`: human-facing course title.
- `description`: short summary written for students.
- `skills_taught`: JSON array of skill names covered by the course.
- `related_careers`: JSON array of career IDs associated with the course.
- `prerequisites`: JSON array of suggested prerequisite knowledge.
- `duration`: short text for suggested duration. This is intentionally non-authoritative and should be confirmed by TechZone Academy.
- `syllabus_verified`: boolean flag used to mark whether the course details have been formally confirmed.

### `careers.csv`

- `career_id`: stable internal identifier.
- `career_name`: role name.
- `description`: short role summary.
- `required_skills`: JSON array of foundational skills that strongly align with the role.
- `preferred_skills`: JSON array of useful but secondary skills.
- `interest_tags`: tags used to connect student interests with role fit.
- `learning_resources`: list of suggested learning formats or examples.
- `related_courses`: JSON array of course IDs that support this career path.
- `entry_level_suitability`: recommended readiness level for the role.

## Validation rules

- Every `course_id` and `career_id` must be unique.
- All course IDs referenced by a career must exist in `courses.csv`.
- Skills should be written consistently using canonical names from the application configuration.
- Do not treat the data as proof of employment outcomes or market demand.
- If a course description or duration is not confirmed, treat it as a provisional catalogue item and keep the `syllabus_verified` value as `false`.

## Updating the catalogue

1. Add or edit rows in the CSV files.
2. Keep skill names consistent across both files.
3. Update related course and career mappings after making changes.
4. Re-run the application to validate the recommendation engine still produces clear results.
