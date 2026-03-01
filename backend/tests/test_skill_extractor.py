"""
Unit tests for the skill extractor service.
Tests extract_skills() against known section text inputs.
"""
import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from app.services.nlp.skill_extractor import extract_skills


MOCK_SECTIONS = {
    "skills": "Python, SQL, Docker, Git, AWS, FastAPI, React, JavaScript",
    "experience": "Built REST APIs using Python and FastAPI. Deployed on AWS with Docker.",
    "projects": "Developed a React frontend integrated with a Node.js backend."
}


def test_extract_skills_returns_lists():
    result = extract_skills(MOCK_SECTIONS)
    assert isinstance(result, dict)


def test_extract_skills_finds_python():
    result = extract_skills(MOCK_SECTIONS)
    found = [s.lower() for s in result.keys()]
    assert "python" in found


def test_extract_skills_finds_docker():
    result = extract_skills(MOCK_SECTIONS)
    found = [s.lower() for s in result.keys()]
    assert "docker" in found


def test_extract_skills_finds_react():
    result = extract_skills(MOCK_SECTIONS)
    found = [s.lower() for s in result.keys()]
    assert "react" in found


def test_extract_skills_empty_sections():
    result = extract_skills({})
    assert isinstance(result, dict)
    assert len(result.keys()) == 0
