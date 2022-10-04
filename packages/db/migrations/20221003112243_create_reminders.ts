import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('reminders', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.uuid('accountId').notNullable().references('id').inTable('accounts')
    table
      .uuid('announcementId')
      .notNullable()
      .references('id')
      .inTable('announcements')
    table.uuid('userId').notNullable().references('id').inTable('users')
    table.datetime('remindAt').notNullable()
    table.datetime('remindedAt')
    table.datetime('acknoledgedAt')
    table.integer('iteration').defaultTo(1)

    table.index(['accountId', 'userId', 'remindedAt'])
    table.index(['remindAt', 'remindedAt', 'acknoledgedAt'])
    table.unique(['accountId', 'announcementId', 'userId', 'iteration'])
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('reminders')
}
