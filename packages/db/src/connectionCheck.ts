import { User } from './models/User'

export async function connectionCheck() {
  try {
    const start = Date.now()
    const count = await User.query().resultSize()
    const end = Date.now()
    if (count > -1) return end - start
  } catch (error) {
    // noop
  }
  return false
}
