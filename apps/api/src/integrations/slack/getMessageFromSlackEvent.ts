import { findOrCreateMessage } from '@hearye/db'

export async function getMessageFromSlackEvent(accountId: string, event) {
  const messageDetails = getMessageDetailsFromSlackEvent(accountId, event)
  return findOrCreateMessage(messageDetails)
}

function getMessageDetailsFromSlackEvent(
  accountId: string,
  event: {
    payload: {
      channel: string
      client_msg_id: string
      team: string
      ts: string
    }
  }
) {
  return {
    accountId,
    externalId: event.payload.client_msg_id,
    channelExternalId: event.payload.channel,
    source: 'slack',
    timestamp: event.payload.ts,
  }
}
