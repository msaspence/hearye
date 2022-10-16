import type { Knex } from 'knex'
import '@hearye/env'
import { xxx } from 'xxx'

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
console.log(xxx)
module.exports = config
