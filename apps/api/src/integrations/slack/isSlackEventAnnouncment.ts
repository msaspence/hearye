import { MessageEvent } from '@slack/bolt'

export async function isSlackEventAnnouncment(event: MessageEvent) {
  return event.payload.type === 'app_mention'
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
