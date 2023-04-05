import { WebClient } from '@slack/web-api'

import { isSlackError } from './type-guards/isSlackError'

export async function getAllGroupUserIds(client: WebClient, usergroup: string) {
  try {
    const result = await client.usergroups.users.list({
      usergroup,
      limit: 500,
    })
    return result.users
  } catch (error) {
    console.log("ERROR", error)
    if (isSlackError(error) && error.data.error === 'missing_scope') {
      return []
    }
    throw error
  }
}
