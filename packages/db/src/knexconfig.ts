import type { Knex } from 'knex'
import '@hearye/env'

const config: Knex.Config | { [key: string]: Knex.Config } = {
  client: 'postgresql',
  connection: process.env.DATABASE_URL,
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
