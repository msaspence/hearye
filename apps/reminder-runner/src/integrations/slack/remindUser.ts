import { findUserWithDetailsById, Reminder, markReminderSent } from '@hearye/db'
import { WebClient } from '@slack/web-api'

import { mixpanel } from '@hearye/api/mixpanel'

import { loadSlackUserDetails } from './loadSlackUserDetails'
import { clientForAccountId } from './clientForAccount'

export async function remindUser(reminder: Reminder) {
  if (!reminder.accountId) throw new Error('Must provide accountId')
  const client = await clientForAccountId(reminder.accountId)
  if (!client) throw new Error("Couldn't initialize client")
  const user = await findUserWithDetailsById(
    reminder.userId,
    loadSlackUserDetails
  )
  if (!user) throw new Error("User doesn't exist")
  await markReminderSent(reminder, user.timezone || 'UTC', async () => {
    const messagePermalink = await generateMessagePermalink(client, reminder)
    if (!messagePermalink) throw new Error("Couldn't generate permalink")
    if (reminder.account.installation) {
      const installation = JSON.parse(reminder.account.installation)
      mixpanel.track('Reminder Sent', {
        distinct_id: reminder.user.externalId,
        team_id: installation?.team?.id || installation?.enterprise?.id,
        team_name: installation?.team?.name || installation?.enterprise?.name,
      })
    }
    await client.chat.postMessage({
      channel: reminder.user.externalId,
      blocks: await generateBlocksForReminder(
        messagePermalink,
        reminder.message.channelExternalId
      ),
      text: await generateTextForReminder(
        messagePermalink,
        reminder.message.channelExternalId
      ),
    })
  })
}

async function generateMessagePermalink(
  client: WebClient,
  reminder: { message: { channelExternalId: string; timestamp: string } }
) {
  const { permalink } = await client.chat.getPermalink({
    channel: reminder.message.channelExternalId,
    message_ts: reminder.message.timestamp,
  })
  return permalink
}

async function generateBlocksForReminder(
  permalink: string,
  channelExternalId: string
) {
  return [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `You have an unacknowledged message in <#${channelExternalId}>`,
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `Please take the time to read and acknowledge <${permalink}|this message> with a :+1:`,
      },
    },
    {
      type: 'actions',
      elements: [
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Go To Message',
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
  return `You have an unacknowledged message in <#${channelExternalId}>.\n\nPlease take the time to read and acknowledge this message with a 👍🏻.`
}
