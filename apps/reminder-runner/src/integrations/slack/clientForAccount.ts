import { WebClient } from '@slack/web-api'

import { findInstallationByAccountId } from '@hearye/db'

export async function clientForAccountId(accountId: string) {
  const token = await getTokenForAccountId(accountId)
  if (!token) return null
  return new WebClient(token)
}

async function getTokenForAccountId(accountId: string) {
  const installation = await findInstallationByAccountId(accountId)
  return installation?.bot?.token
}
