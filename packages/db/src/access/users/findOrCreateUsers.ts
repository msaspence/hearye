import { User } from '../../models/User'
import { UniqueViolationError } from 'objection'

export async function findOrCreateUsers(
  source: string,
  externalIds: string[]
): Promise<User[]> {
  const existingUsers = await User.query()
    .whereIn('externalId', externalIds)
    .where('source', 'slack')
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
        source,
        externalId,
      }))
    )
  } catch (error) {
    if (error instanceof UniqueViolationError) {
      // return []
      return findOrCreateUsers(source, externalIds)
    }
    throw error
  }
}
