# BazaArts

> **Created by Nick Thomas & CoPi**
>
> A neon cyber-bazaar marketplace connecting creators with people looking for distinctive digital art, services, gigs, and commissions.

BazaArts is a TypeScript monorepo. The frontend will use Next.js, Tailwind CSS, and Radix UI; the backend will use Express, Prisma, PostgreSQL, and Socket.io.

## Repository layout

- `frontend/` — Next.js application
- `backend/` — Express API and Prisma services
- `.github/workflows/` — continuous integration

## Development status

The repository foundation is scaffolded. Backend API, database models, authentication, marketplace features, real-time messaging, uploads, tests, and deployment configuration will be added incrementally by milestone.

## Prerequisites

- Node.js 20+
- npm 10+
- PostgreSQL 15+ for backend development

## Install dependencies

```bash
npm install
npm install --workspace frontend
npm install --workspace backend
```

## Credit

**Created by Nick Thomas & CoPi**
