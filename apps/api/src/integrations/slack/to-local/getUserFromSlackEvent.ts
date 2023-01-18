import { WebClient } from '@slack/web-api'

import { findOrCreateUsers } from '@hearye/db'
import { loadSlackUserData } from './getAudienceUsersFromSlackEvent'

export async function getUserFromSlackEvent(
  accountId: string,
  event: { client: WebClient; payload: { user: string } }
) {
  return (
    await findOrCreateUsers(
      'slack',
      accountId,
      [event.payload.user],
      loadSlackUserData(event)
    )
  )[0]
}
