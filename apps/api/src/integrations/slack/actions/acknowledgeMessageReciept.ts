import { WebClient } from '@slack/web-api'

export async function acknowledgeMessageReciept(event: {
  client: WebClient
  payload: { ts: string; channel: string }
}) {
  return event.client.reactions.add({
    name: 'mega',
    timestamp: event.payload.ts,
    channel: event.payload.channel,
  })
}
