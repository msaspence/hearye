import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('slack_oauth_states', (table) => {
    table.string('state').primary()
    table.jsonb('installOptions').notNullable()
    table.timestamp('expiresAt', { useTz: false }).notNullable()
    table.timestamp('createdAt', { useTz: false })
    table.timestamp('updatedAt', { useTz: false })
    table.index('expiresAt', 'slack_oauth_states_expires_at_idx')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('slack_oauth_states')
}
