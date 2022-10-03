import { App } from '@slack/bolt'

import { isSlackEventAnnouncment } from './isSlackEventAnnouncment'
import { acknowledgeAnnouncementReciept } from './acknowledgeAnnouncementReciept'
import { getAccountFromSlackEvent } from './getAccountFromSlackEvent'
import { getAudienceUsersFromSlackEvent } from './getAudienceUsersFromSlackEvent'
import { getAnnouncementFromSlackEvent } from './getAnnouncementFromSlackEvent'

export async function handleEvent(event) {
  if (await isSlackEventAnnouncment(event)) {
    const account = await getAccountFromSlackEvent(event)
    if (!account.id) throw new Error('Account with id required')
    const users = await getAudienceUsersFromSlackEvent(account.id, event)

    const announcement = getAnnouncementFromSlackEvent(account.id, event)
    // await scheduleReminders(account, announcement, users)

    await acknowledgeAnnouncementReciept(event)
  }
}
