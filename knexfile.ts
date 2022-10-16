import type { Knex } from 'knex'

const config: Knex.Config | { [key: string]: Knex.Config } = {
  client: 'postgresql',
  connection: process.env.DATABASE_URL,
  migrations: {
    tableName: 'knex_migrations',
  },
  pool: {
    min: 2,
    max: 10,
  },
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3',
    },
  },
}

module.exports = config
