import { findOrCreateUsers } from '@hearye/db'
import { WebClient } from '@slack/web-api'
import uniq from 'lodash/uniq'

import { getAllChannelMemberIdsFromSlackEvent } from '../getAllChannelMemberIdsFromSlackEvent'

type Block = {
  type: string
  user_id?: string
  range?: BroadcastRange
  elements: Block[]
}

type MentionBlock = {
  type: 'user'
  user_id: string
  elements: Block[]
}

type BroadcastRange = 'channel' | 'everyone' | 'here'
type BroadcastBlock = {
  type: 'broadcast'
  range: BroadcastRange
  elements: Block[]
}

type Message = { blocks: Block[]; channel: string; user: string }

export async function getAudienceUsersFromSlackMessage(
  client: WebClient,
  accountId: string,
  botId: string,
  message: Message
) {
  const userIds = await getUsersIdsFromSlackEvent(client, botId, message)

  return findOrCreateUsers('slack', accountId, userIds)
}

function isMentionBlock(block: Block): block is MentionBlock {
  return block.type === 'user'
}
function recurseForMentions(blocks: Block | Block[]): string[] {
  if (Array.isArray(blocks)) {
    return blocks.flatMap(recurseForMentions)
  }
  return [
    ...(isMentionBlock(blocks) ? [blocks.user_id] : []),
    ...(blocks.elements ? recurseForMentions(blocks.elements) : []),
  ]
}

function isBroadcastBlock(block: Block): block is BroadcastBlock {
  return block.type === 'broadcast'
}
function recurseForBroadcasts(blocks: Block | Block[]): string[] {
  if (Array.isArray(blocks)) {
    return blocks.flatMap(recurseForBroadcasts)
  }

  return uniq([
    ...(isBroadcastBlock(blocks) ? [blocks.range] : []),
    ...(blocks.elements ? recurseForBroadcasts(blocks.elements) : []),
  ])
}

async function getBroadcastUsersFromSlackEvent(
  client: WebClient,
  message: Message
) {
  const broadcasts = recurseForBroadcasts(message.blocks)
  if (broadcasts.length === 0) return []
  const userIds = await getAllChannelMemberIdsFromSlackEvent(
    client,
    message.channel
  )

  return userIds || []
}

async function getUsersIdsFromSlackEvent(
  client: WebClient,
  botId: string,
  message: Message
) {
  // Get all the users mentioned in the message directly eg @user
  const mentionIds = recurseForMentions(message.blocks)
  // Get all the users mentioned in the message via broadcast ie @channel, @here, @everyone
  const broadcastUserIds = await getBroadcastUsersFromSlackEvent(
    client,
    message
  )
  // Remove the user who sent the message from the list of users to be reminded
  // from "broadcast" mentions ie @channel, @here, @everyone
  const indirectMentionIds = [...broadcastUserIds].filter(
    (id) => id !== message.user
  )
  const uniqueUserIds = uniq([...mentionIds, ...indirectMentionIds])

  // Remove the hear ye bot from the list of users to be reminded
  return uniqueUserIds.filter((id) => id !== botId)
}
