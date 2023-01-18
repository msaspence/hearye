import { acknowledgeMessage, findUserBySourceAndExternalId } from '@hearye/db'

import { SlackEvent } from '../events'

const ACCEPTED_REACTIONS = ['+1', 'mega']

export async function handleReaction({
  payload: {
    reaction,
    item: { channel, ts: timestamp, type },
    item_user: userExternalId,
  },
}: {
  payload: SlackEvent<'reaction_added'>
}) {
  const user = await findUserBySourceAndExternalId('slack', userExternalId)
  if (ACCEPTED_REACTIONS.includes(reaction) && type === 'message' && user) {
    await acknowledgeMessage(user.id, channel, timestamp)
  }
}
