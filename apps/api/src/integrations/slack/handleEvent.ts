import { App } from '@slack/bolt'

import { isSlackEventAnnouncment } from './isSlackEventAnnouncment'
import { acknowledgeAnnouncementReciept } from './acknowledgeAnnouncementReciept'

export async function handleEvent(event) {
  if (await isSlackEventAnnouncment(event)) {
    // const account = getAccountFromSlackEvent(event)
    // const dbAccount = await upsertAccount(account)

    // const audience = getAudienceFromSlackEvent(event)
    // await Promise.all(audience.map((user) => upsertUser(dbAccount, user)))

    // const announcement = getAnnouncementFromSlackEvent(event)
    // await upsertAnnouncement(dbAccount, announcement)

    await acknowledgeAnnouncementReciept(event)
  }
}
