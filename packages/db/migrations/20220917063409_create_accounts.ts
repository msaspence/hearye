import { Knex } from 'knex'

export function up(knex: Knex) {
  return knex.schema.createTable('accounts', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.string('displayName').notNullable()
    table.string('domain').notNullable()
    table.string('externalId').notNullable()
    table.string('source').notNullable()
  })
}

export function down(knex: Knex) {
  return knex.schema.dropTableIfExists('accounts')
}
