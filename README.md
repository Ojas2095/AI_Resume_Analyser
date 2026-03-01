# AI Resume Reviewer

An AI-powered resume analysis tool built with **FastAPI** (backend) and **React** (frontend).

Upload your resume, select a target role, and get instant feedback: skill gap analysis, ATS scoring, bullet point optimizer, cover letter generator, and interview coaching.

---

## Features

- **Resume Analysis** — PDF & DOCX parsing, section detection, skill extraction
- **Role Matching** — 8 roles: Frontend, Backend, Fullstack, DevOps, ML Engineer, Data Scientist, Product Manager, UX Designer
- **Skill Gap Chart** — Visual required vs. nice-to-have skill coverage
- **AI Suggestions** — GPT-powered improvement tips
- **Bullet Optimizer** — Rewrites bullets using the XYZ formula
- **Cover Letter Generator** — Tailored to your resume + job description
- **Interview Coach** — STAR method evaluation with scoring
- **PDF Export** — Download a formatted resume PDF

---

## Quick Start (Local Dev)

### Prerequisites
- Python 3.10+
- Node.js 18+
- An [OpenAI API key](https://platform.openai.com/api-keys)

### 1. Clone & configure
```bash
git clone <repo-url>
cd AI_Powered_Resume_Reviewer

# Create your .env file (backend reads this)
cp .env.example .env
# Edit .env and set OPENAI_API_KEY=sk-...
```

### 2. Start the backend
```bash
cd backend
python -m venv .venv          # or use the root .venv
.venv\Scripts\activate        # Windows
pip install -r requirements.txt
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
API docs available at: http://localhost:8000/docs

### 3. Start the frontend
```bash
cd frontend
npm install
npm start
```
App available at: http://localhost:3000

---

## Docker Deploy

### Prerequisites
- Docker + Docker Compose

### Build & run
```bash
# From the project root
cp .env.example .env         # Add your OPENAI_API_KEY
docker-compose up --build
```

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8000 |
| API Docs | http://localhost:8000/docs |

### Stop
```bash
docker-compose down
```

---

## Running Tests

```bash
cd backend
pip install -r requirements-dev.txt
pytest tests/ -v
```

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes | Your OpenAI API key for AI features |
| `DEBUG` | No | Set to `false` in production (default: `true`) |

> **Note:** All AI features (suggestions, bullet optimizer, cover letter, interview coach) require a valid API key. The app runs without one but AI responses will return placeholder text.

---

## Project Structure

```
AI_Powered_Resume_Reviewer/
├── backend/
│   ├── app/
│   │   ├── api/v1/          # FastAPI route handlers
│   │   ├── core/            # Config & logger
│   │   ├── data/
│   │   │   ├── roles/       # Role JSON files (8 roles)
│   │   │   └── skills/      # Skills database
│   │   └── services/        # NLP, LLM, scoring, parsing, export
│   ├── tests/               # pytest test suite
│   ├── Dockerfile
│   ├── requirements.txt
│   └── requirements-dev.txt
├── frontend/
│   ├── src/
│   │   ├── components/      # React UI components
│   │   ├── pages/           # Page-level components
│   │   └── services/        # axios API client
│   ├── Dockerfile
│   └── nginx.conf
├── docker-compose.yml
├── .env.example
└── README.md
```
