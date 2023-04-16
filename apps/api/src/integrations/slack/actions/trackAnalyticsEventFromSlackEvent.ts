import { getAccountTeamId, getAccountTeamName } from '@hearye/db'

import { createLogger } from '@hearye/logger'

import { mixpanel } from '../../../mixpanel'
import { getAccountFromSlackEvent } from '../to-local/getAccountFromSlackEvent'
import { error } from 'winston'

const logger = createLogger('hearye:api:trackAnalyticsEventFromSlackEvent')

export async function trackAnalyticsEventFromSlackEvent(
  eventName: string,
  event: {
    body: {
      team_id: string,
      user?: { id: string } 
    },
    payload: {
      user?: string | { id: string },
    }
  },
  properties: Record<string, unknown> = {},
) {
  try {
    const account = await getAccountFromSlackEvent(event)
    const teamId = await getAccountTeamId(account)
    const teamName = await getAccountTeamName(account)
    const payload = {
      distinct_id: typeof event.payload.user === 'string' ? event.payload.user : event.payload.user?.id || event.body.user?.id,
      source: 'slack',
      team_id: teamId,
      team_name: teamName,
      ...properties
    }
    logger.debug("Tracking event", { eventName, payload })
    mixpanel.track(eventName, payload)
  } catch (e) {
    logger.error(error)
  }
}