import { Reminder, markReminderSent } from '@hearye/db'
import { WebClient } from '@slack/web-api'

import { clientForAccountId } from './clientForAccount'

export async function remindUser(reminder: Reminder) {
  if (!reminder.accountId) throw new Error('Must provide accountId')
  const client = await clientForAccountId(reminder.accountId)
  if (!client) throw new Error("Couldn't initialize client")

  await markReminderSent(reminder, async () => {
    await client.chat.postMessage({
      channel: reminder.user.externalId,
      text: await generateTextForReminder(client, reminder),
    })
  })
}

async function generateTextForReminder(client: WebClient, reminder: Reminder) {
  const { permalink } = await client.chat.getPermalink({
    channel: reminder.announcement.channelExternalId,
    message_ts: reminder.announcement.timestamp,
  })

  return `:mega: Hear Ye! Hear Ye! You have an unacknowledged announcement in <#${reminder.announcement.channelExternalId}>.\n\n<${permalink}|Go To Announcment>\n\nPlease take the time read and acknowledge this announcment with a 👍🏻.`
}
