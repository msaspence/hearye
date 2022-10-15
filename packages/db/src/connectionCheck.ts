import { User } from './models/User'

export async function connectionCheck() {
  const start = Date.now()
  const [{ count }] = await User.query().count('id')
  const end = Date.now()
  if (count > -1) return end - start
  return false
}
