// import { getUsersDetailsFromSlackEvent } from './getUsersDetailsFromSlackEvent'
import { findOrCreateUsers } from '@hearye/db'
import { WebClient } from '@slack/web-api'
import { PromisePool } from '@supercharge/promise-pool'

export async function getAudienceUsersFromSlackEvent(accountId: string, event) {
  //   console.dir(event.payload.blocks, { depth: null })
  const userIds = await getUsersDetailsFromSlackEvent(event)
  return findOrCreateUsers(
    'slack',
    accountId,
    userIds,
    loadSlackUserData(event)
  )
}

type PossibleMentionBlock = {
  type: string
  user_id: string
  elements: PossibleMentionBlock[]
}

function recurseForMentions(
  blocks: PossibleMentionBlock | PossibleMentionBlock[]
): string[] {
  if (Array.isArray(blocks)) {
    return blocks.flatMap(recurseForMentions)
  }
  return [
    ...(blocks.type === 'user' ? [blocks.user_id] : []),
    ...(blocks.elements ? recurseForMentions(blocks.elements) : []),
  ]
}

function getUsersDetailsFromSlackEvent(event) {
  const mentions = recurseForMentions(event.payload.blocks)
  const uniqueMentions = mentions.filter(
    (id, index, self) => self.indexOf(id) === index
  )
  return uniqueMentions
}

export function loadSlackUserData({ client }: { client: WebClient }) {
  return async (userIds: string[]) => {
    const { results } = await PromisePool.for(userIds).process(
      async (externalId) => {
        try {
          const { user } = await client.users.info({ user: externalId })
          return { externalId, timezone: user?.tz || 'UTC' }
        } catch (error) {
          console.error(error)
        }
      }
    )
    console.log('RESULTS', results)
    return results
  }
}
