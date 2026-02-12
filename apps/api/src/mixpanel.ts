import Mixpanel from 'mixpanel'

import { env } from '@hearye/env'
import { createLogger } from '@hearye/logger'

type MixpanelPeople = {
  set: (id: string, properties: Record<string, unknown>) => void
}

export type MixpanelAnalyticsClient = {
  alias: (aliasId: string, distinctId?: string) => void
  isEnabled: boolean
  people: MixpanelPeople
  track: (eventName: string, properties?: Record<string, unknown>) => void
}

const logger = createLogger('hearye:analytics:mixpanel')

const token = env.MIXPANEL_TOKEN
const realClient = token ? Mixpanel.init(token) : null

if (!realClient) {
  logger.warn('MIXPANEL_TOKEN missing. Analytics disabled.')
}

const noop = () => undefined

const noopClient: MixpanelAnalyticsClient = {
  alias: noop,
  isEnabled: false,
  people: {
    set: noop,
  },
  track: noop,
}

export const mixpanel: MixpanelAnalyticsClient = realClient
  ? {
      alias: (aliasId: string, distinctId?: string) =>
        realClient.alias(aliasId, distinctId),
      isEnabled: true,
      people: {
        set: (id: string, properties: Record<string, unknown>) =>
          realClient.people.set(id, properties),
      },
      track: (eventName: string, properties?: Record<string, unknown>) =>
        realClient.track(eventName, properties),
    }
  : noopClient
