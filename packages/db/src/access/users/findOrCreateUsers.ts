import { User } from '../../models/User'
import { UniqueViolationError } from 'objection'

export async function findOrCreateUsers(
  source: string,
  accountId: string,
  externalIds: string[],
  loadAdditionalFields: (
    userIds: string[]
  ) => Promise<{ externalId: string; timezone: string }[]>
): Promise<User[]> {
  const existingUsers = await User.query()
    .where('accountId', accountId)
    .where('source', 'slack')
    .whereIn('externalId', externalIds)
    .select('id', 'externalId')
  const existingUserExternalIds = existingUsers.map(
    ({ externalId }) => externalId
  )
  const missingUserIds = externalIds.filter(
    (externalId) => !existingUserExternalIds.includes(externalId)
  )
  if (!missingUserIds.length) return existingUsers
  try {
    const additionalUserData = await loadAdditionalFields(missingUserIds)
    const mappedUsersForInserts = additionalUserData.map((user) => ({
      accountId,
      source,
      ...user,
    }))
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
