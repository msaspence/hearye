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
      blocks: await generateBlocksForReminder(client, reminder),
    })
  })
}

async function generateBlocksForReminder(
  client: WebClient,
  reminder: Reminder
) {
  const { permalink } = await client.chat.getPermalink({
    channel: reminder.announcement.channelExternalId,
    message_ts: reminder.announcement.timestamp,
  })

  return [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: ':mega:  Hear Ye! Hear Ye!',
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `You have an unacknowledged announcement in <#${reminder.announcement.channelExternalId}>`,
      },
    },
    {
      type: 'section',
      text: {
        type: 'plain_text',
        text: 'Please take the time read and acknowledge this announcment with a :+1:',
        emoji: true,
      },
    },
    {
      type: 'actions',
      elements: [
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Go To Announcement',
            emoji: true,
          },
          url: permalink,
          action_id: 'button-action',
        },
      ],
    },
    {
      type: 'divider',
    },
  ]
}
