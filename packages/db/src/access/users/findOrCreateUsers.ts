import { User } from '../../models/User'
import { UniqueViolationError } from 'objection'

import { createLogger } from '@hearye/logger'

const logger = createLogger('hearye:db:findOrCreateUsers')

export async function findOrCreateUsers(
  source: string,
  accountId: string,
  externalIds: string[],
  loadAdditionalFields: (
    userIds: string[]
  ) => Promise<{ externalId: string; timezone: string }[]>
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
    const additionalUserData = await loadAdditionalFields(missingUserIds)
    const mappedUsersForInserts = additionalUserData.map((user) => ({
      accountId,
      source,
      ...user,
    }))
    logger.debug('Inserting missing users', { users: mappedUsersForInserts })
    return await User.query().insert(mappedUsersForInserts)
  } catch (error) {
    if (error instanceof UniqueViolationError) {
      // return []
      return findOrCreateUsers(
        source,
        accountId,
        externalIds,
        loadAdditionalFields
      )
    }
    throw error
  }
}
