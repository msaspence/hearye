import { WebClient } from '@slack/web-api'

export async function getAllChannelMemberIdsFromSlackEvent({
  client,
  payload: { channel },
}: {
  client: WebClient
  payload: { channel: string }
}) {
  const result = await client.conversations.members({
    channel: channel,
    limit: 500,
  })

  return result.members
}
