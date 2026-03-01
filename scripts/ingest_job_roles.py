import json
import os
from pathlib import Path

# Define some sample roles for ingestion
SAMPLE_ROLES = {
    "backend_engineer": {
        "role": "Backend Engineer",
        "required_skills": ["python", "sql", "api", "git", "linux"],
        "nice_to_have": ["docker", "kubernetes", "aws", "fastapi", "postgresql"]
    },
    "data_scientist": {
        "role": "Data Scientist",
        "required_skills": ["python", "machine learning", "statistics", "pandas", "numpy"],
        "nice_to_have": ["tensorflow", "scikit-learn", "sql", "jupyter", "aws"]
    },
    "product_manager": {
        "role": "Product Manager",
        "required_skills": ["product strategy", "agile", "user research", "analytics", "communication"],
        "nice_to_have": ["sql", "jira", "figma", "market analysis", "roadmapping"]
    }
}

def ingest_roles():
    roles_dir = Path(__file__).parent.parent / "backend" / "app" / "data" / "roles"
    roles_dir.mkdir(parents=True, exist_ok=True)

    for role_key, role_data in SAMPLE_ROLES.items():
        file_path = roles_dir / f"{role_key}.json"
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(role_data, f, indent=2)
        print(f"Created role: {file_path}")

if __name__ == "__main__":
    ingest_roles()