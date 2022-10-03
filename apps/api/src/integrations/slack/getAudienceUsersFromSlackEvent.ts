// import { getUsersDetailsFromSlackEvent } from './getUsersDetailsFromSlackEvent'
import { findOrCreateUsers } from '@hearye/db'

export async function getAudienceUsersFromSlackEvent(accountId: string, event) {
  //   console.dir(event.payload.blocks, { depth: null })
  const userIds = await getUsersDetailsFromSlackEvent(event)
  return findOrCreateUsers('slack', accountId, userIds)
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
