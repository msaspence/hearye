import { findOrCreateUsers } from '@hearye/db'
import { WebClient } from '@slack/web-api'
import uniq from 'lodash/uniq'

import { getAllChannelMemberIdsFromSlackEvent } from '../getAllChannelMemberIdsFromSlackEvent'
import { getAllGroupUserIdsFromSlackEvent } from '../getAllGroupUserIdsFromSlackEvent'

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
type GroupBlock = {
  type: 'usergroup'
  usergroup_id: string
  elements: Block[]
}

type Event = {
  client: WebClient
  payload: { blocks: Block[]; channel: string }
}

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

function isGroupBlock(block: Block): block is GroupBlock {
  return block.type === 'usergroup'
}
function recurseForGroups(blocks: Block | Block[]): string[] {
  if (Array.isArray(blocks)) {
    return blocks.flatMap(recurseForGroups)
  }

  return uniq([
    ...(isGroupBlock(blocks) ? [blocks.usergroup_id] : []),
    ...(blocks.elements ? recurseForGroups(blocks.elements) : []),
  ])
}

function isString(value: unknown): value is string {
  return typeof value === 'string'
}
async function getGroupUsersFromSlackEvent(
  client: WebClient,
  message: Message
) {
  const groups = recurseForGroups(message.blocks)
  if (groups.length === 0) return []
  const userIds = (
    await Promise.all(
      groups.map((groupId) => {
        return getAllGroupUserIdsFromSlackEvent(client, groupId)
      })
    )
  ).flat()
  return uniq(userIds).filter(isString) || []
}

async function getUsersIdsFromSlackEvent(
  client: WebClient,
  botId: string,
  message: Message
) {
  const mentionIds = recurseForMentions(message.blocks)
  const broadcastUserIds = await getBroadcastUsersFromSlackEvent(
    client,
    message
  )
  const groupUserIds = await getGroupUsersFromSlackEvent(client, message)
  const uniqueUserIds = uniq([
    ...mentionIds,
    ...broadcastUserIds,
    ...groupUserIds,
  ])
  // Remove the hear ye bot from the list of users to be reminded
  return uniqueUserIds.filter((id) => id !== botId)
}
