import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('onboarding_messages', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.uuid('accountId').notNullable().references('id').inTable('accounts')
    table.uuid('userId').notNullable().references('id').inTable('users')
    table.string('messageKey').notNullable()
    table.datetime('createdAt', { useTz: false })
    table.datetime('updatedAt', { useTz: false })

    table.unique(
      ['accountId', 'userId', 'messageKey'],
      'onboarding_messages_unique'
    )
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('onboarding_messages')
}
