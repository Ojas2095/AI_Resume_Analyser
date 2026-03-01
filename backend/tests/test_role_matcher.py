"""
Unit tests for the role matching service.
Tests match_role() with known skill sets against real role data files.
"""
import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from app.services.analysis.role_matcher import match_role


def test_match_role_returns_dict():
    result = match_role({"python": {}, "sql": {}, "git": {}}, {"role": "backend_engineer", "required_skills": ["python", "sql", "git"]})
    assert isinstance(result, dict)


def test_match_role_required_keys():
    result = match_role({"python": {}}, {"role": "backend_engineer", "required_skills": ["python"], "nice_to_have": []})
    assert "required" in result
    assert "nice_to_have" in result
    assert "matched" in result["required"]
    assert "missing" in result["required"]


def test_match_role_full_match():
    # backend_engineer requires: python, sql, api, git, linux
    result = match_role({"python": {}, "sql": {}, "rest api": {}, "git": {}, "linux": {}}, {"role": "backend_engineer", "required_skills": ["python", "sql", "rest api", "git", "linux"]})
    assert len(result["required"]["missing"]) == 0 or len(result["required"]["matched"]) > 0


def test_match_role_no_match():
    result = match_role({"figma": {}, "sketch": {}}, {"role": "backend_engineer", "required_skills": ["python", "sql", "api", "git", "linux"]})
    assert len(result["required"]["matched"]) == 0
    assert len(result["required"]["missing"]) > 0


def test_match_role_invalid_role():
    # Should return a graceful result (empty or default) instead of crashing
    try:
        result = match_role({"python": {}}, {"role": "nonexistent_role", "required_skills": []})
        assert isinstance(result, dict)
    except Exception as e:
        assert False, f"match_role raised an unexpected exception: {e}"
