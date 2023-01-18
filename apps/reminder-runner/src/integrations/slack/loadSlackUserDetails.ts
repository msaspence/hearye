import { clientForAccountId } from './clientForAccount'
import { User } from '@hearye/db'

export async function loadSlackUserDetails({
  accountId,
  externalId,
  source,
}: User) {
  const client = await clientForAccountId(accountId)
  if (!client) throw new Error("Couldn't initialize client")
  if (source !== 'slack') throw new Error('Must be a slack user')
  const { user } = await client.users.info({ user: externalId })
  return { timezone: user?.tz || 'UTC' }
}
