import { App } from '@slack/bolt'

import { isSlackEventAnnouncment } from './isSlackEventAnnouncment'
import { acknowledgeAnnouncementReciept } from './acknowledgeAnnouncementReciept'
import { getAccountFromSlackEvent } from './getAccountFromSlackEvent'
import { getAudienceUsersFromSlackEvent } from './getAudienceUsersFromSlackEvent'

export async function handleEvent(event) {
  if (await isSlackEventAnnouncment(event)) {
    const account = await getAccountFromSlackEvent(event)

    const users = await getAudienceUsersFromSlackEvent(account, event)

    // const announcement = getAnnouncementFromSlackEvent(account, event)
    // await scheduleReminders(account, announcement, users)

    await acknowledgeAnnouncementReciept(event)
  }
}
