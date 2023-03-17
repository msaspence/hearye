import { connection } from '@hearye/db'

import { Client } from 'pg'
import { cpus } from 'node:os'

export async function setup() {
  const client = new Client({
    connectionString: connection,
  })
  await client.connect()
  await client.query(`SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = 'hearye'
  AND pid <> pg_backend_pid();`)
  for (let i = 1; i <= Math.max(cpus().length - 1, 1); i++) {
    await recreateDb(client, `hearye_test_${i}`)
    await recreateDb(client, `hearye_test_vscode_${i}`)
  }
  await client.end()
}

async function recreateDb(client: Client, name: string) {
  await client.query(`SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = '${name}'
  AND pid <> pg_backend_pid();`)
  await client.query(`DROP DATABASE IF EXISTS ${name}`)
  await client.query(`CREATE DATABASE ${name} WITH TEMPLATE hearye`)
}
