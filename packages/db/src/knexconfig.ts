import type { Knex } from 'knex'
import '@hearye/env'

export const connection =
  process.env.DATABASE_URL ||
  `psql://localhost:5432/hearye${
    process.env.VITEST_POOL_ID
      ? `_test${process.env.VSCODE_TESTING === 'true' ? '_vscode' : ''}_${
          process.env.VITEST_POOL_ID
        }`
      : ''
  }`

const config: Knex.Config | { [key: string]: Knex.Config } = {
  client: 'postgresql',
  connection,
  migrations: {
    directory: '../migrations',
    tableName: 'knex_migrations',
  },
  pool: {
    min: 2,
    max: 10,
  },
}
module.exports = config
