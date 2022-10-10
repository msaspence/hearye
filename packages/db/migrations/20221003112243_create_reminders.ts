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
    table.datetime('acknowledgedAt')
    table.integer('iteration').defaultTo(1)
    table.datetime('lockedUntil').defaultTo(null)
    table.datetime('createdAt', { useTz: false })
    table.datetime('updatedAt', { useTz: false })

    table.index(['accountId', 'userId', 'remindedAt'])
    table.index(
      ['announcementId', 'userId', 'acknowledgedAt'],
      'reminders_index_for_acknowledgeAnnouncement'
    )
    table.index(
      ['remindAt', 'remindedAt', 'acknowledgedAt', 'lockedUntil'],
      'reminders_index_for_findDueRemindersWithAnnouncementAndUser'
    )
    table.unique(['accountId', 'announcementId', 'userId', 'iteration'])
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('reminders')
}
