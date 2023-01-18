import { WebClient } from '@slack/web-api'

export async function getAllGroupUserIdsFromSlackEvent(
  client: WebClient,
  usergroup: string
) {
  const result = await client.usergroups.users.list({
    usergroup,
    limit: 500,
  })
  return result.users
}
