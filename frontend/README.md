# SELVE Frontend

Next.js application for the SELVE psychological profiling platform.

## Quick Start

```bash
cd frontend
pnpm install
pnpm dev              # Start on :3000
```

## Commands

### Development
```bash
pnpm dev              # Development server (uses DATABASE_URL_DEV)
pnpm dev:prod         # Development server (uses DATABASE_URL_PROD)
```

### Build
```bash
pnpm build            # Production build
pnpm start            # Start production server
```

### Database
```bash
pnpm db:push:dev      # Push schema to development database
pnpm db:push:prod     # Push schema to production database
pnpm db:studio:dev    # Open Prisma Studio (development)
pnpm db:studio:prod   # Open Prisma Studio (production)
```

## Structure

```
frontend/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   ├── db/               # Prisma client
│   ├── hooks/            # Custom React hooks
│   └── types/            # TypeScript types
├── prisma/               # Database schema and migrations
├── public/               # Static assets
└── .env                  # Environment variables
```

## Tech Stack

Next.js 15, React 19, TypeScript, Tailwind CSS 4, Prisma, Clerk Auth

## Environment

Set `NODE_ENV` in `.env`:
- `development` → Uses DATABASE_URL_DEV
- `production` → Uses DATABASE_URL_PROD

## API Integration

Frontend calls FastAPI backend at `http://localhost:8000` for adaptive question logic.
