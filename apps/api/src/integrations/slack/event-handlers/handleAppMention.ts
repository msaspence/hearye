import { SlackEvent } from '../events'

import { requireAcknowledgementsForMessage } from '../requireAcknowledgementsForMessage'

export async function handleAppMention(event: SlackEvent<'app_mention'>) {
  await requireAcknowledgementsForMessage(event.client, event.payload)
}
