"""
GET /api/v1/roles — returns all available role slugs and display names.
Dynamically scans the data/roles/ directory so new role files are
automatically picked up without code changes.
"""
import os
import json
from fastapi import APIRouter, HTTPException

router = APIRouter()

ROLES_DIR = os.path.join(os.path.dirname(__file__), "../../data/roles")


@router.get("/roles")
def list_roles():
    """Return all available role slugs and their display names."""
    try:
        roles = []
        roles_path = os.path.abspath(ROLES_DIR)
        for filename in sorted(os.listdir(roles_path)):
            if filename.endswith(".json"):
                slug = filename.replace(".json", "")
                filepath = os.path.join(roles_path, filename)
                with open(filepath, "r", encoding="utf-8") as f:
                    data = json.load(f)
                roles.append({
                    "slug": slug,
                    "name": data.get("role", slug.replace("_", " ").title())
                })
        return {"roles": roles}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to load roles: {str(e)}")
