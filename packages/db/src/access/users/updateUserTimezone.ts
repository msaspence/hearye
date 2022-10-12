import { User } from '../../models/User'

export async function updateUserTimezone(externalId: string, timezone: string) {
  return User.query()
    .where('source', 'slack')
    .where('externalId', externalId)
    .patch({ timezone })
}
