"""
Unit tests for the section detector service.
Tests detect_sections() against a sample resume text string.
"""
import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from app.services.sectioning.section_detector import detect_sections

SAMPLE_RESUME = """
John Doe
Software Engineer | john@example.com

SUMMARY
Results-driven engineer with 5 years of experience.

EXPERIENCE
Software Engineer at ACME Corp (2020-2024)
- Built REST APIs using Python and FastAPI
- Led migration to microservices architecture

EDUCATION
BSc Computer Science, MIT (2016-2020)

SKILLS
Python, SQL, Docker, Git, AWS, FastAPI, Linux

PROJECTS
Resume Reviewer – AI-powered tool for resume analysis using OpenAI API.
"""


def test_detect_sections_returns_dict():
    result = detect_sections(SAMPLE_RESUME)
    assert isinstance(result, dict)


def test_detect_experience_section():
    result = detect_sections(SAMPLE_RESUME)
    assert "experience" in result
    assert len(result["experience"]) > 0


def test_detect_education_section():
    result = detect_sections(SAMPLE_RESUME)
    assert "education" in result
    assert len(result["education"]) > 0


def test_detect_skills_section():
    result = detect_sections(SAMPLE_RESUME)
    assert "skills" in result
    assert "python" in result["skills"].lower()


def test_detect_projects_section():
    result = detect_sections(SAMPLE_RESUME)
    assert "projects" in result
    assert len(result["projects"]) > 0


def test_detect_sections_empty_string():
    result = detect_sections("")
    assert isinstance(result, dict)
