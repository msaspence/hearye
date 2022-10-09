import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('announcements', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.uuid('accountId').notNullable().references('id').inTable('accounts')
    table.string('externalId').notNullable()
    table.string('source').notNullable()
    table.string('channelExternalId').notNullable()
    table.string('timestamp').notNullable()

    table.index('accountId')
    table.index(
      ['channelExternalId', 'timestamp'],
      'announcements_index_for_acknowledgeAnnouncement'
    )
    table.unique(['accountId', 'source', 'channelExternalId', 'timestamp'])
    table.unique(['accountId', 'source', 'externalId'])
  })
}

export function down(knex: Knex) {
  return knex.schema.dropTableIfExists('announcements')
}
