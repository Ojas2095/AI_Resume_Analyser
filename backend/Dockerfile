# ── Build stage ──────────────────────────────────────────────────────────────
FROM python:3.12-slim AS builder

WORKDIR /app

# Install build deps
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

# Download spacy model into the install prefix so it's available at runtime
RUN PYTHONPATH=/install/lib/python3.12/site-packages python -m spacy download en_core_web_sm --target /install/lib/python3.12/site-packages

# ── Runtime stage ─────────────────────────────────────────────────────────────
FROM python:3.12-slim

WORKDIR /app

# Copy installed packages from builder (includes spacy + model)
COPY --from=builder /install /usr/local

# Copy application source
COPY app/ ./app/

# Expose FastAPI port
EXPOSE 8000

# Railway injects $PORT dynamically; fall back to 8000 for local use
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"]
