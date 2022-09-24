import { MessageEvent } from '@slack/bolt'

export async function isSlackEventAnnouncment(event: MessageEvent) {
  const mentions = getMentionedUsersFromSlackEvent(event)
  console.dir(event.payload.type, { depth: null })
  return true
  //     const appId = await event.client.users.info(mentions[0])
  // console.log(appId)
  // return !!event
}

function getMentionedUsersFromSlackEvent(event: MessageEvent) {
  return traverseBlocksForMentions(event.payload.blocks)
}

type BlockWithMentions = {
  type: string
  elements: BlockWithMentions[]
  user_id: string
}
function traverseBlocksForMentions(
  blocks: BlockWithMentions | BlockWithMentions[]
): string[] {
  if (Array.isArray(blocks)) {
    return blocks.flatMap(traverseBlocksForMentions)
  } else if (blocks.type === 'user') {
    return [blocks.user_id]
  } else if (blocks.elements) {
    return traverseBlocksForMentions(blocks.elements)
  }
  return []
}
