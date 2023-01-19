import { WebClient } from '@slack/web-api'

import {
  requireAcknowledgementsForMessage,
  Message,
} from '../requireAcknowledgementsForMessage'

export async function handleRequireAcknowledgementForMessage(event: {
  ack: () => Promise<void>
  client: WebClient
  payload: { channel: { id: string }; message: Message }
}) {
  await event.ack()
  console.log('MESSAGE', event.payload)
  await requireAcknowledgementsForMessage(event.client, {
    ...event.payload.message,
    channel: event.payload.channel.id,
  })
}
