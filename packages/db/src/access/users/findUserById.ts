import { User } from '../../models/User'

export async function findUserById(id: string): Promise<User | undefined> {
  return await User.query().findById(id)
}
