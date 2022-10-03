import { Knex } from 'knex'

export function up(knex: Knex) {
  return knex.schema.createTable('users', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.string('source').notNullable()
    table.string('externalId').notNullable()
    table.uuid('accountId').notNullable().references('id').inTable('accounts')

    table.index('accountId')
    table.unique(['source', 'externalId'])
  })
}

export function down(knex: Knex) {
  return knex.schema.dropTableIfExists('users')
}
