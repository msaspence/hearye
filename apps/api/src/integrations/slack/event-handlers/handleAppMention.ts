import { SlackEvent } from '../events'

import { trackAnalyticsEventFromSlackEvent } from '../actions/trackAnalyticsEventFromSlackEvent'
import { requireAcknowledgementsForMessage } from '../requireAcknowledgementsForMessage'

export async function handleAppMention(event: SlackEvent<'app_mention'>) {
  trackAnalyticsEventFromSlackEvent('Require Acknowledgement', event, {
    from_mention: true,
  })
  await requireAcknowledgementsForMessage(event.client, event.payload)
}
