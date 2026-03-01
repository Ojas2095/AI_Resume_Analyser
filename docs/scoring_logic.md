# Scoring Logic

The resume scoring system calculates an overall score out of 100 based on the following components:

## Breakdown
- **Skill Coverage (70%)**: Based on the percentage of required skills matched from the role data.
- **Section Completeness (20%)**: Checks if key sections (skills, experience, education) are present and populated.
- **Nice-to-Have Skills (10%)**: Bonus points for matching optional skills.

## Formula
```
Total Score = (Skill Coverage % * 0.7) + (Section Completeness % * 0.2) + (Nice-to-Have Coverage % * 0.1)
```

## Explanation
The score provides a quantitative measure of how well the resume matches the target job role, with explanations for each component.