import { acknowledgeMessage, findUserBySourceAndExternalId } from '@hearye/db'

import { trackAnalyticsEventFromSlackEvent } from '../actions/trackAnalyticsEventFromSlackEvent'
import { SlackEvent } from '../events'

const ACCEPTED_REACTIONS = ['+1', 'mega']

export async function handleReaction(event: {
  body: SlackEvent<'reaction_added'>
  payload: SlackEvent<'reaction_added'>
}) {
  const {
    payload: {
      reaction,
      item: { channel, ts: timestamp, type },
      item_user: userExternalId,
    },
  } = event
  trackAnalyticsEventFromSlackEvent('Message Acknowledged', event)
  const user = await findUserBySourceAndExternalId('slack', userExternalId)
  if (ACCEPTED_REACTIONS.includes(reaction) && type === 'message' && user) {
    await acknowledgeMessage(user.id, channel, timestamp)
  }
}
