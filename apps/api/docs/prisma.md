# Prisma 7

This API uses Prisma ORM 7 with PostgreSQL. The Prisma schema is
[`src/prisma/schema.prisma`](src/prisma/schema.prisma), and the CLI settings are
in [`prisma.config.ts`](prisma.config.ts).

Set `DATABASE_URL` in `apps/api/.env` before running database commands. Copy
`.env.example` as a starting point.

## Commands

Run these from the repository root:

```bash
pnpm --filter @gestao-equipes/api prisma:generate
pnpm --filter @gestao-equipes/api prisma:dev
pnpm --filter @gestao-equipes/api prisma:deploy
```

`prisma:generate` generates the typed client in `node_modules/@prisma/client`.
`prisma:dev` creates and applies a development migration, while
`prisma:deploy` applies migrations in deployment environments.

## PostgreSQL adapter

`src/prisma/prisma.module.ts` registers and exports the injectable
`PrismaService`, which extends `PrismaClient` and manages its connection through
NestJS lifecycle hooks. The service uses `@prisma/adapter-pg`; `pg` is installed
transitively as an adapter dependency and is not a direct API dependency.
