"""
Unit tests for the scoring service.
Tests calculate_score() with known inputs to verify output ranges and structure.
"""
import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from app.services.scoring.scorer import calculate_score


def test_score_returns_dict():
    result = calculate_score(
        role_match={
            "coverage": 50.0,
            "required": {"matched": ["python", "sql"], "missing": ["docker"]},
            "nice_to_have": {"matched": ["aws"], "missing": []}
        },
        sections={"experience": "5 years python", "education": "BSc CS", "skills": "python sql"}
    )
    assert isinstance(result, dict)


def test_score_keys_present():
    result = calculate_score(
        role_match={
            "coverage": 100.0,
            "required": {"matched": ["python"], "missing": []},
            "nice_to_have": {"matched": [], "missing": []}
        },
        sections={"experience": "text", "education": "text", "skills": "python"}
    )
    assert "total_score" in result
    assert "skill_coverage" in result["breakdown"]
    assert "section_completeness" in result["breakdown"]


def test_score_range():
    result = calculate_score(
        role_match={
            "coverage": 100.0,
            "required": {"matched": ["python", "sql", "docker", "git"], "missing": []},
            "nice_to_have": {"matched": ["aws", "kubernetes"], "missing": []}
        },
        sections={
            "experience": "5 years experience",
            "education": "BSc",
            "skills": "python sql docker git",
            "summary": "Senior engineer"
        }
    )
    assert 0 <= result["total_score"] <= 100


def test_score_empty_inputs():
    result = calculate_score(
        role_match={
            "coverage": 0.0,
            "required": {"matched": [], "missing": ["python", "sql"]},
            "nice_to_have": {"matched": [], "missing": []}
        },
        sections={}
    )
    assert result["total_score"] >= 0
    assert result["breakdown"]["skill_coverage"] == 0
