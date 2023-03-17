import { User } from '../../models/User'
import { UniqueViolationError } from 'objection'

import { createLogger } from '@hearye/logger'

const logger = createLogger('hearye:db:findOrCreateUsers')

export async function findOrCreateUsers(
  source: string,
  accountId: string,
  externalIds: string[]
): Promise<User[]> {
  logger.debug('Getting existing users')

  const existingUsers = await User.query()
    .where('accountId', accountId)
    .where('source', 'slack')
    .whereIn('externalId', externalIds)
    .select('id', 'externalId')
  const existingUserExternalIds = existingUsers.map(
    ({ externalId }) => externalId
  )
  logger.debug('Existing users', { existingUserExternalIds })
  const missingUserIds = externalIds.filter(
    (externalId) => !existingUserExternalIds.includes(externalId)
  )
  logger.debug('Missing users', { missingUserIds })
  if (!missingUserIds.length) return existingUsers
  try {
    const mappedUsersForInserts = missingUserIds.map((id) => ({
      accountId,
      source,
      externalId: id,
    }))
    logger.debug('Inserting missing users', { users: mappedUsersForInserts })
    return await User.query().insert(mappedUsersForInserts)
  } catch (error) {
    if (error instanceof UniqueViolationError) {
      return findOrCreateUsers(source, accountId, externalIds)
    }
    throw error
  }
}
