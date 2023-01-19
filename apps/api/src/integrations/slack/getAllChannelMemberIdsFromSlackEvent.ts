import { WebClient } from '@slack/web-api'

export async function getAllChannelMemberIdsFromSlackEvent(
  client: WebClient,
  channelId: string
) {
  const result = await client.conversations.members({
    channel: channelId,
    limit: 500,
  })

  return result.members
}
