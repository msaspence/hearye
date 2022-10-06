import { User } from '../../models/User'

export async function findUser(
  source: string,
  externalId: string
): Promise<User | undefined> {
  return await User.query()
    .where('source', 'slack')
    .where('externalId', externalId)
    .first()
}
