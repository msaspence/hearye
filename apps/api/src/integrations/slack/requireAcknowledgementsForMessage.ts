import { WebClient } from '@slack/web-api'
import { acknowledgeMessageReciept } from './actions/acknowledgeMessageReciept'
import { getAccountFromSlackMessage } from './to-local/getAccountFromSlackMessage'
import { getAudienceUsersFromSlackMessage } from './to-local/getAudienceUsersFromSlackMessage'
import { getMessageFromSlackMessage } from './to-local/getMessageDetailsFromSlackMessage'

import { findOrCreateUsers, scheduleReminder } from '@hearye/db'
import { createLogger } from '@hearye/logger'

const logger = createLogger(
  'hearye:api:slack:requireAcknowledgementsForMessage'
)

function isString(value: unknown): value is string {
  return typeof value === 'string'
}

type BroadcastRange = 'channel' | 'everyone' | 'here'

type Block = {
  type: string
  user_id?: string
  range?: BroadcastRange
  elements: Block[]
}

export type Message = {
  team: string
  channel: string
  ts: string
  blocks: Block[]
  user: string
  client_msg_id: string
}

export async function requireAcknowledgementsForMessage(
  client: WebClient,
  slackMessage: Message,
  {
    includeMentioned = true,
    otherUsers: otherUserIds = [],
  }: { includeMentioned: boolean; otherUsers: string[] } = {
    includeMentioned: true,
    otherUsers: [],
  }
) {
  const logPayload = {
    channel: slackMessage.channel,
    timestamp: slackMessage.ts,
  }
  logger.debug('Is slack event', logPayload)
  logger.debug('Getting account for slack event', logPayload)
  const account = await getAccountFromSlackMessage(slackMessage)
  if (!account.id) throw new Error('Account with id required')

  logger.debug('Getting audience from slack event', logPayload)
  const {
    bot: { userId: botUserId },
  } = JSON.parse(account.installation as string)

  const mentionedUsers = includeMentioned
    ? await getAudienceUsersFromSlackMessage(
        client,
        account.id,
        botUserId,
        slackMessage
      )
    : []
  const otherUsers = await findOrCreateUsers('slack', account.id, otherUserIds)

  const userIds = [...mentionedUsers, ...otherUsers]
    .map(({ id }) => id)
    .filter(isString)

  logger.debug('Getting message from slack event', logPayload)

  const localMessage = await getMessageFromSlackMessage(
    account.id,
    slackMessage
  )
  if (!localMessage.id) throw new Error('Message with id required')

  logger.debug('Scheduling reminder for slack event', logPayload)
  await scheduleReminder(account.id, localMessage.id, userIds)
  logger.debug('Acknowledging reciept of slack event', logPayload)
  await acknowledgeMessageReciept(client, slackMessage.channel, slackMessage.ts)
}
