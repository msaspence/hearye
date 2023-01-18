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

type Event = {
  client: WebClient
  payload: { blocks: Block[]; channel: string }
}

export async function getAudienceUsersFromSlackEvent(
  accountId: string,
  event: Event
) {
  const userIds = await getUsersIdsFromSlackEvent(event)
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

async function getBroadcastUsersFromSlackEvent(event: Event) {
  const broadcasts = recurseForBroadcasts(event.payload.blocks)
  if (broadcasts.length === 0) return []
  const userIds = await getAllChannelMemberIdsFromSlackEvent(event)

  return userIds || []
}

async function getUsersIdsFromSlackEvent(event: Event) {
  const mentionIds = recurseForMentions(event.payload.blocks)
  const broadcastUserIds = await getBroadcastUsersFromSlackEvent(event)
  const uniqueUserIds = uniq([...mentionIds, ...broadcastUserIds])
  return uniqueUserIds
}
