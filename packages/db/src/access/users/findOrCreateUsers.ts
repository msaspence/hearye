import { User } from '../../models/User'
import { UniqueViolationError } from 'objection'

export async function findOrCreateUsers(
  source: string,
  accountId: string,
  externalIds: string[]
): Promise<User[]> {
  const existingUsers = await User.query()
    .where('accountId', accountId)
    .where('source', 'slack')
    .whereIn('externalId', externalIds)
    .select('id', 'externalId')
  const existingUserExternalIds = existingUsers.map(
    ({ externalId }) => externalId
  )
  const missingUsers = externalIds.filter(
    (externalId) => !existingUserExternalIds.includes(externalId)
  )
  if (!missingUsers.length) return existingUsers
  try {
    return await User.query().insert(
      missingUsers.map((externalId) => ({
        accountId,
        source,
        externalId,
      }))
    )
  } catch (error) {
    if (error instanceof UniqueViolationError) {
      // return []
      return findOrCreateUsers(source, accountId, externalIds)
    }
    throw error
  }
}
