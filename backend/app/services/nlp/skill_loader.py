import json
from pathlib import Path

SKILL_PATH = Path(__file__).resolve().parents[2] / "data" / "skills" / "software.json"

def load_skills()->dict:
    with open(SKILL_PATH, "r", encoding="utf-8") as f:
        return json.load(f)
