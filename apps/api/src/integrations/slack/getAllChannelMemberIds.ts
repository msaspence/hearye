import { WebClient } from '@slack/web-api'

import { isSlackError } from './type-guards/isSlackError'

export async function getAllChannelMemberIds(
  client: WebClient,
  channel: string
) {
  try {
    const result = await client.conversations.members({
      channel: channel,
      limit: 500,
    })
    return result.members
  } catch (error) {
    console.log("ERROR", error)
    if (isSlackError(error) && error.data.error === 'missing_scope') {
      return []
    }
    throw error
  }
}
