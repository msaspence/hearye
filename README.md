# Hear Ye!

Hear Ye! is a full-stack Slack application that helps teams send high-signal announcements, request acknowledgements, and follow up with automated reminders when messages get ignored. This repository is a monorepo that contains everything from the Fastify + Slack Bolt API to a Vite-powered marketing site, reminder runners, shared packages, and database migrations.

## Architecture at a Glance

| Package                | Description                                                                  |
| ---------------------- | ---------------------------------------------------------------------------- |
| `apps/api`             | Fastify server, Slack Bolt app, telemetry plumbing, and REST endpoints.      |
| `apps/site`            | Public marketing site powered by `vite-plugin-ssr`, MUI, and custom theming. |
| `apps/reminder-runner` | Headless worker that finds due reminders and nudges users in Slack.          |
| `packages/db`          | Objection.js models, Knex migrations, and data-access helpers.               |
| `packages/env`         | Typed environment loader shared across every workspace.                      |
| `packages/logger`      | Winston transport that fans out to Logtail and local debug logs.             |
| `packages/dayjs`       | Lightweight date helpers shared between the API and the site.                |

Support tooling lives in `tests/` (Vitest setup + DB reset helpers), `assets/` (static files), and `loophole/` (local tunneling utility).

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Copy env vars**
   ```bash
   cp .env.example .env
   ```
   Populate Slack + Mixpanel keys (see `packages/env/src/index.ts` for the complete schema).
3. **Run the database**
   ```bash
   createdb hearye
   npm run migrate
   ```
4. **Start the stack**
   ```bash
   npm run dev:api
   npm run dev:site
   npm run dev:reminder-runner
   ```
   The marketing site boots on http://localhost:4000 by default and the API listens on http://localhost:3000.

## Quality Bar

- `npm run lint` runs ESLint + Prettier across the monorepo.
- `npm run test` executes the Vitest suite (API routes, Slack helpers, reminder runner, etc.).
- `npm run typecheck --workspaces` ensures every package builds under strict TypeScript settings.
- GitHub Actions (`.github/workflows/ci.yml`) gates every pull request with lint, build, and unit-test jobs across workspaces.

## Observability & Reliability

- Application logs go through `@hearye/logger`, which mirrors structured logs to both stdout and Logtail (when enabled via env vars).
- Sentry is wired into the API and the reminder runner.
- The Fastify app exposes a lightweight `/` health endpoint that includes the Render release SHA and DB round-trip timing.
- Slack OAuth state and installation metadata are stored in Postgres for horizontal scalability.
- Background reminder processing is throttled and retried with backoff to stay within Slack rate limits.

## Database Notes

See [packages/db/README.md](packages/db/README.md) for migration details, key models, and seeding tips. Migrations live in `packages/db/migrations`, and the shared Vitest setup in `tests/setup` automatically resets the database between specs.

## Deploying

Render yaml manifests live at the repo root. A production deploy typically looks like:

```bash
npm run build:api
npm run build:site
npm run build:reminder-runner
npm run migrate
```

Artifacts for each workspace land in their `dist/` directories.

---

Questions? Ping [@msaspence](https://github.com/msaspence). Contributions are welcome—open an issue with context and proposed changes.
