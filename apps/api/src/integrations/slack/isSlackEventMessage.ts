// import { SlackEventMiddlewareArgs } from '@slack/bolt'

export async function isSlackEventMessage(event: {
  payload: { type: string }
}) {
  return event.payload.type === 'app_mention'
}

// function getMentionedUsersFromSlackEvent(
//   event: SlackEventMiddlewareArgs<'app_mention'>
// ) {
//   const { blocks } = event.payload
//   return traverseBlocksForMentions(blocks || [])
// }

// type BlockWithMentions = {
//   type: string
//   elements?: BlockWithMentions[]
//   user_id?: string
// }
// function traverseBlocksForMentions(
//   blocks: BlockWithMentions | BlockWithMentions[]
// ): string[] {
//   if (Array.isArray(blocks)) {
//     return blocks.flatMap(traverseBlocksForMentions)
//   } else if (blocks.type === 'user' && blocks.user_id) {
//     return [blocks.user_id]
//   } else if (blocks.elements) {
//     return traverseBlocksForMentions(blocks.elements)
//   }
//   return []
// }
