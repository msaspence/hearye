export async function acknowledgeMessageReciept(event) {
  return event.client.reactions.add({
    name: 'mega',
    timestamp: event.payload.ts,
    channel: event.payload.channel,
  })
}
