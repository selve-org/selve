# SELVE - Personality Assessment System

**Live:** [selve.me](https://selve.me)  
**Status:** Production (Deployed Dec 19, 2024)

SELVE is a personality assessment platform measuring 8 scientifically-validated dimensions. Built on 2M+ psychological test responses with an average reliability of α = 0.861 (Excellent).

## What's Inside

- **Frontend** (Next.js 16): Assessment UI, results dashboard, authentication
- **Backend** (FastAPI): Assessment engine, scoring algorithm, PostgreSQL database
- **Notebooks** (Jupyter): Data validation, psychometric analysis, dimension extraction
- **Data** (2M+ responses): Big Five, HEXACO, 16PF datasets from [Open Psychometrics](https://openpsychometrics.org/_rawdata/)

## The 8 Dimensions

| Dimension | Measures | Reliability |
|-----------|----------|-------------|
| **LUMEN** ✨ | Social Energy | α = 0.897 |
| **AETHER** 🌫️ | Emotional Stability | α = 0.872 |
| **ORPHEUS** 🎵 | Empathy | α = 0.837 |
| **ORIN** 🧭 | Organization | α = 0.821 |
| **LYRA** 🦋 | Openness | α = 0.804 |
| **VARA** ⚖️ | Honesty | α = 0.900 |
| **CHRONOS** ⏳ | Patience | α = 0.937 ⭐ |
| **KAEL** 🔥 | Assertiveness | α = 0.821 |

**Average:** α = 0.861 (Excellent by psychology standards)

## Quick Start

### Prerequisites

- **Redis** is required for backend progress tracking. [See Redis Setup Guide](../REDIS_SETUP.md)

### Frontend
```bash
cd frontend
pnpm install
pnpm dev  # http://localhost:3000
```

### Backend
```bash
# Start Redis first
docker compose up redis -d  # or: brew services start redis

cd backend
source .venv/bin/activate
uvicorn main:app --reload  # http://localhost:8000
# or: make dev
```

### Notebooks
```bash
cd notebooks
jupyter lab
# Open: 01_big5_validation.ipynb (start here)
```

## Tech Stack

**Frontend:** Next.js 16, TailwindCSS, Clerk Auth  
**Backend:** FastAPI, Prisma ORM, Neon PostgreSQL  
**Deployment:** Vercel (frontend), AWS EC2 (backend)  
**Data Science:** Python, pandas, numpy, Cronbach's alpha analysis

## Key Features

- ✅ 8-dimension personality assessment
- ✅ Clerk authentication (Google, LinkedIn OAuth)
- ✅ Personalized results dashboard
- ✅ Anonymous assessments (no login required)
- ✅ Mobile-responsive UI
- ✅ Friend/family assessment invitations
- 🚧 Adaptive testing (temporarily disabled)

## Validation

All 8 dimensions validated across 2,086,821 responses:
- **Big Five IPIP:** 1,015,341 responses (5 dimensions)
- **HEXACO-60:** 22,786 responses (VARA, CHRONOS)
- **16PF:** 49,159 responses (KAEL)

Methodology documented in `/notebooks/README.md`.

## Deployment

**Frontend:** Auto-deploy via Vercel (push to `master` branch)  
**Backend:** AWS EC2 instance with FastAPI + Uvicorn  
**Database:** Neon PostgreSQL (serverless)

## Environment Setup

### Backend

```bash
cd backend

# Install dependencies
make install

# Start server
make dev  # http://localhost:8000

# Run tests
make test
```

### Frontend

```bash
cd frontend
pnpm install
pnpm dev  # http://localhost:3000
```