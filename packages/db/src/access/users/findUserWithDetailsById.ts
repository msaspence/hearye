import { findUserById } from './findUserById'
import { updateUserWithDetails } from './updateUserWithDetails'
import { User } from '../../models/User'

export async function findUserWithDetailsById(
  id: string,
  loadDetails?: (user: User) => Promise<{ timezone: string }>
) {
  const user = await findUserById(id)
  if (!user) return
  if (user.timezone) return user
  if (!loadDetails) return user
  const details = await loadDetails(user)
  const userWithDetails = await updateUserWithDetails(user.id, details)
  return userWithDetails
}
