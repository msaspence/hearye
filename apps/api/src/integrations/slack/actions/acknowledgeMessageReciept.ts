import { WebClient } from '@slack/web-api'

import { isSlackError } from '../type-guards/isSlackError'

export async function acknowledgeMessageReciept(
  client: WebClient,
  channel: string,
  ts: string
) {
  try {
    await client.reactions.add({
      channel: channel,
      name: 'mega',
      timestamp: ts,
    })
    return true
  } catch (error) {
    // If the message has already been acknowledged, we can ignore the error
    if (isSlackError(error) && error.data.error === 'already_reacted') {
      return true
    }
    throw error
  }
}
