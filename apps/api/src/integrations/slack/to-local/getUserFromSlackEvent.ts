import { WebClient } from '@slack/web-api'

import { findOrCreateUsers } from '@hearye/db'

export async function getUserFromSlackEvent(
  accountId: string,
  event: { client: WebClient; payload: { user: string } }
) {
  return (await findOrCreateUsers('slack', accountId, [event.payload.user]))[0]
}
