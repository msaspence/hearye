import { User } from '../../models/User'

export async function updateUserWithDetails(
  id: string,
  details: { timezone: string }
) {
  const [user] = await User.query()
    .where('id', id)
    .patch(details)
    .returning('*')

  return user
}
