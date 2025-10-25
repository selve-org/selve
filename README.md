# SELVE

Selve is an AI-driven psychological profiling platform.

## Project Structure

```
selve/
├── frontend/          # Next.js application
├── backend/           # FastAPI application
└── README.md
```

## Quick Start

### Backend

```bash
cd backend
make install          # Install dependencies
make dev              # Start server on :8000
```

### Frontend

```bash
cd frontend
pnpm install
pnpm dev              # Start on :3000
```

## Architecture

Frontend (Next.js) handles UI, authentication, and data storage.
Backend (FastAPI) handles adaptive question logic and psychology algorithms.
Both share a Neon PostgreSQL database.

```
Next.js ←→ FastAPI ←→ Neon PostgreSQL
```

## Tech Stack

**Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, Prisma, Clerk
**Backend:** FastAPI, Python 3.12, SQLAlchemy, Pydantic
**Database:** Neon PostgreSQL

## Documentation

- Frontend: `/frontend/README.md`
- Backend: `/backend/README.md`


## Environment Configuration

Set `NODE_ENV` in `.env`:

```bash
NODE_ENV=development    # Uses DATABASE_URL_DEV
NODE_ENV=production     # Uses DATABASE_URL_PROD
````

Database URLs:

- Development: Neon branch `development`
- Production: Neon branch `production`

## Tech Stack

- Next.js 15.3.4
- React 19
- TypeScript
- Tailwind CSS 4
- Prisma ORM
- Neon PostgreSQL
- Clerk Auth
- Sentry
- PostHog
