# Database Package

This package contains everything related to persistence:

- Knex configuration + migrations (see `migrations/`)
- Objection.js models in `src/models`
- Data access helpers in `src/access`
- Shared DB setup/reset utilities that power the Vitest test harness (`tests/setup`)

## Running Migrations

```bash
npm run migrate
```

The command uses `packages/db/knexconfig.ts`, so Postgres connection info comes from the shared `.env` file (`DATABASE_URL` when deploying or the local `hearye` database by default).

## Key Tables

| Table                                        | Purpose                                                                                                                                 |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `accounts`, `users`, `messages`, `reminders` | Core product data for Slack teams, announcements, and follow-ups.                                                                       |
| `onboarding_messages`                        | Tracks which in-product onboarding nudges have been sent.                                                                               |
| `slack_oauth_states`                         | Server-side cache of Slack OAuth `state` params used during installation (see migration `20260211000000_create_slack_oauth_states.ts`). |

## Adding Data Access Helpers

Data-access helpers live under `src/access`. Each helper returns typed models (`src/models/*`), so API and worker packages can safely compose complex workflows without duplicating SQL. When you add a new helper, export it from `src/index.ts`.

## Testing Strategy

The shared Vitest setup in `tests/setup` truncates every table between specs and keeps a set of template databases ready for parallel test workers. Use the provided fixtures (for example, `apps/api/tests/fixtures/accounts/`) to spin up Slack accounts or users quickly.
