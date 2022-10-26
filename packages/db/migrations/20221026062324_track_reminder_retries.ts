import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('reminders', (table) => {
    table.integer('retries').defaultTo(0)
  })
}

export async function down(): Promise<void> {
  // not implemented
}
