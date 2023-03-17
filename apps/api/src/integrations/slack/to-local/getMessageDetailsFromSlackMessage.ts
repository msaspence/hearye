import { findOrCreateMessage } from '@hearye/db'

type Message = {
  channel: string
  client_msg_id: string
  team: string
  ts: string
}
export async function getMessageFromSlackMessage(
  accountId: string,
  message: Message
) {
  const messageDetails = getMessageDetailsFromSlackMessage(accountId, message)
  const foundMessage = await findOrCreateMessage(messageDetails)

  return foundMessage
}

function getMessageDetailsFromSlackMessage(
  accountId: string,
  message: Message
) {
  return {
    accountId,
    externalId: message.client_msg_id,
    channelExternalId: message.channel,
    source: 'slack',
    timestamp: message.ts,
  }
}
