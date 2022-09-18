import { Knex } from 'knex'

export function up(knex: Knex) {
  return knex.schema.createTable('users', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.string('externalID').notNullable()
    table.string('displayName').notNullable()
    table.string('realName')
    table.string('source').notNullable()
    table.string('userName')
  })
}

export function down(knex: Knex) {
  return knex.schema.dropTableIfExists('users')
}
