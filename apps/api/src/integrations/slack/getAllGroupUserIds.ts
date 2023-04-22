import { WebClient } from '@slack/web-api'
import { createLogger } from '@hearye/logger'

import { isSlackError } from './type-guards/isSlackError'

const logger = createLogger('hearye:api:slack:getAllGroupUserIds')

export async function getAllGroupUserIds(client: WebClient, usergroup: string) {
  try {
    const result = await client.usergroups.users.list({
      usergroup,
      limit: 500,
    })
    return result.users
  } catch (error) {
    if (isSlackError(error) && error.data.error === 'missing_scope') {
      logger.warn('Missing scope to get user group users', error)
      return []
    }
    throw error
  }
}
