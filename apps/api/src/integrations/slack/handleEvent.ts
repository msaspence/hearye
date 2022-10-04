import { App } from '@slack/bolt'

import { isSlackEventAnnouncment } from './isSlackEventAnnouncment'
import { acknowledgeAnnouncementReciept } from './acknowledgeAnnouncementReciept'
import { getAccountFromSlackEvent } from './getAccountFromSlackEvent'
import { getAudienceUsersFromSlackEvent } from './getAudienceUsersFromSlackEvent'
import { getAnnouncementFromSlackEvent } from './getAnnouncementFromSlackEvent'
import { scheduleReminder } from '@hearye/db'

export async function handleEvent(event) {
  if (await isSlackEventAnnouncment(event)) {
    const account = await getAccountFromSlackEvent(event)
    if (!account.id) throw new Error('Account with id required')

    const users = await getAudienceUsersFromSlackEvent(account.id, event)
    const userIds = users
      .map(({ id }) => id)
      .filter((id) => id !== undefined) as string[]

    const announcement = await getAnnouncementFromSlackEvent(account.id, event)
    if (!announcement.id) throw new Error('Announcement with id required')
    console.log(event.payload)
    await scheduleReminder(account.id, announcement.id, userIds)

    await acknowledgeAnnouncementReciept(event)
  }
}
