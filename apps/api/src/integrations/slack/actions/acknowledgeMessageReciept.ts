import { WebClient } from '@slack/web-api'

export async function acknowledgeMessageReciept(
  client: WebClient,
  channel: string,
  ts: string
) {
  return client.reactions.add({
    channel: channel,
    name: 'mega',
    timestamp: ts,
  })
}
