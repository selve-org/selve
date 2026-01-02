# SELVE Backend

FastAPI backend for adaptive questionnaire and personality profiling.

## Architecture

This backend handles:

- Adaptive question logic (demographic vs psychological)
- Personality analysis algorithms
- AI report generation (coming soon)

## Project Structure

```
backend/
├── app/
│   ├── main.py              # FastAPI app entry point
│   ├── database.py          # SQLAlchemy async connection
│   ├── models/
│   │   └── schemas.py       # Pydantic models
│   └── api/
│       └── routes/
│           └── questions.py # Question routing logic
├── requirements.txt
├── .env
├── Makefile
└── README.md
```

## Quick Start

### Prerequisites

- Python 3.11+
- Redis Server (required for progress tracking)

**Install Redis:**
```bash
# macOS
brew install redis && brew services start redis

# Ubuntu/Debian
sudo apt install -y redis-server && sudo systemctl start redis-server

# Or use Docker (see docker-compose.yml)
docker compose up redis -d
```

### Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Run

```bash
# Using Makefile
make install          # Install dependencies
make dev              # Start server on :8000

# Or directly
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## API Endpoints

### Health Check

```
GET /health
```

Returns database connection status.

### Next Question

```
GET /api/next-question?sessionId={id}
```

Returns the next question using adaptive logic:

- Demographic questions: Sequential order
- Psychological questions: Adaptive algorithm (Phase 2)

Response:

```json
{
  "id": "q1_name",
  "text": "What is your first name?",
  "type": "text",
  "questionType": "demographic",
  "placeholder": "Enter your first name",
  "required": true
}
```

## Request Flow

```
Next.js → GET /api/next-question
    ↓
FastAPI reads answers from database
    ↓
Determines question type (demographic/psychological)
    ↓
Returns next question
    ↓
Next.js renders question
```

## Adaptive Logic

**Demographic Questions:** Sequential, zero processing

- Name, DOB, email, etc.

**Psychological Questions:** Adaptive algorithm (Phase 2)

- Trait scoring
- Item Response Theory (IRT)
- Optimal next question selection

## Database

Shares Neon PostgreSQL with frontend:

- Connection pooling via SQLAlchemy
- Async operations
- Reads answers, returns questions

## Testing

```bash
curl http://localhost:8000/health
curl "http://localhost:8000/api/next-question?sessionId=test"
```

## Environment Variables

```env
DATABASE_URL=postgresql://...
FASTAPI_HOST=0.0.0.0
FASTAPI_PORT=8000
CORS_ORIGINS=http://localhost:3000
```
