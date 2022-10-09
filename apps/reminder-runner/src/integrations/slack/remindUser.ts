import { Reminder, markReminderSent } from '@hearye/db'
import { WebClient } from '@slack/web-api'

import { clientForAccountId } from './clientForAccount'

export async function remindUser(reminder: Reminder) {
  if (!reminder.accountId) throw new Error('Must provide accountId')
  const client = await clientForAccountId(reminder.accountId)
  if (!client) throw new Error("Couldn't initialize client")
  await markReminderSent(reminder, async () => {
    const announcementPermalink = await generateAnnouncmentPermalink(
      client,
      reminder
    )
    if (!announcementPermalink) throw new Error("Couldn't generate permalink")
    await client.chat.postMessage({
      channel: reminder.user.externalId,
      blocks: await generateBlocksForReminder(
        announcementPermalink,
        reminder.announcement.channelExternalId
      ),
      text: await generateTextForReminder(
        announcementPermalink,
        reminder.announcement.channelExternalId
      ),
    })
  })
}

async function generateAnnouncmentPermalink(
  client: WebClient,
  reminder: { announcement: { channelExternalId: string; timestamp: string } }
) {
  const { permalink } = await client.chat.getPermalink({
    channel: reminder.announcement.channelExternalId,
    message_ts: reminder.announcement.timestamp,
  })
  return permalink
}

async function generateBlocksForReminder(
  permalink: string,
  channelExternalId: string
) {
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
        text: `You have an unacknowledged announcement in <#${channelExternalId}>`,
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `Please take the time read and acknowledge <${permalink}|this announcement> with a :+1:`,
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

async function generateTextForReminder(
  permalink: string,
  channelExternalId: string
) {
  return `:mega: Hear Ye! Hear Ye! You have an unacknowledged announcement in <#${channelExternalId}>.\n\n<${permalink}|Go To Announcment>\n\nPlease take the time read and acknowledge this announcement with a 👍🏻.`
}
