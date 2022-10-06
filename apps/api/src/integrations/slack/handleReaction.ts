import { ReactionAddedEvent } from '@slack/bolt'
import { acknowledgeAnnouncement, findUser } from '@hearye/db'

const ACCEPTED_REACTIONS = ['+1', 'mega']

export async function handleReaction({
  payload: {
    reaction,
    item: { channel, ts: timestamp, type },
    item_user: userExternalId,
  },
}: {
  payload: ReactionAddedEvent
}) {
  const user = await findUser('slack', userExternalId)
  if (ACCEPTED_REACTIONS.includes(reaction) && type === 'message' && user) {
    await acknowledgeAnnouncement(user.id, channel, timestamp)
  }
}
