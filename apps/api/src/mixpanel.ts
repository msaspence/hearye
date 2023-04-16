import Mixpanel from 'mixpanel'
import { env } from '@hearye/env'

export const mixpanel = Mixpanel.init(env.MIXPANEL_TOKEN)
