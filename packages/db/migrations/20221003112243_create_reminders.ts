import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('reminders', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.uuid('accountId').notNullable().references('id').inTable('accounts')
    table.uuid('messageId').notNullable().references('id').inTable('messages')
    table.uuid('userId').notNullable().references('id').inTable('users')
    table.datetime('remindAt', { useTz: false }).notNullable()
    table.datetime('remindedAt', { useTz: false })
    table.datetime('acknowledgedAt', { useTz: false })
    table.integer('iteration').defaultTo(1)
    table.datetime('lockedUntil', { useTz: false }).defaultTo(null)
    table.datetime('createdAt', { useTz: false })
    table.datetime('updatedAt', { useTz: false })

    table.index(['accountId', 'userId', 'remindedAt'])
    table.index(
      ['messageId', 'userId', 'acknowledgedAt'],
      'reminders_index_for_acknowledgeMessage'
    )
    table.index(
      ['remindAt', 'remindedAt', 'acknowledgedAt', 'lockedUntil'],
      'reminders_index_for_findDueRemindersWithMessageAndUser'
    )
    table.unique(['accountId', 'messageId', 'userId', 'iteration'])
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('reminders')
}
