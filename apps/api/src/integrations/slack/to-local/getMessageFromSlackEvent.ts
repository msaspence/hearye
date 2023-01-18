import { findOrCreateMessage } from '@hearye/db'

type Event = {
  payload: {
    channel: string
    client_msg_id: string
    team: string
    ts: string
  }
}
export async function getMessageFromSlackEvent(
  accountId: string,
  event: Event
) {
  const messageDetails = getMessageDetailsFromSlackEvent(accountId, event)
  return findOrCreateMessage(messageDetails)
}

function getMessageDetailsFromSlackEvent(accountId: string, event: Event) {
  return {
    accountId,
    externalId: event.payload.client_msg_id,
    channelExternalId: event.payload.channel,
    source: 'slack',
    timestamp: event.payload.ts,
  }
}
