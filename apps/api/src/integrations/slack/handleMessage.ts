import { SlackEvent } from './events'
import { isSlackEventMessage } from './isSlackEventMessage'
import { acknowledgeMessageReciept } from './acknowledgeMessageReciept'
import { getAccountFromSlackEvent } from './getAccountFromSlackEvent'
import { getAudienceUsersFromSlackEvent } from './getAudienceUsersFromSlackEvent'
import { getMessageFromSlackEvent } from './getMessageFromSlackEvent'

import { scheduleReminder } from '@hearye/db'
import { createLogger } from '@hearye/logger'

const logger = createLogger('hearye:api:slack:handleMessage')

export async function handleMessage(event: SlackEvent<'app_mention'>) {
  logger.debug('Handling message', { event })

  if (await isSlackEventMessage(event)) {
    const logPayload = {
      channel: event.payload.channel,
      timestamp: event.payload.ts,
    }
    logger.debug('Is slack event', logPayload)
    logger.debug('Getting account for slack event', logPayload)
    const account = await getAccountFromSlackEvent(event)
    if (!account.id) throw new Error('Account with id required')

    logger.debug('Getting audience from slack event', logPayload)
    const users = await getAudienceUsersFromSlackEvent(account.id, event)
    const userIds = users
      .map(({ id }) => id)
      .filter((id) => id !== undefined) as string[]

    logger.debug('Getting message from slack event', logPayload)
    const message = await getMessageFromSlackEvent(account.id, event)
    if (!message.id) throw new Error('Message with id required')

    logger.debug('Scheduling reminder for slack event', logPayload)
    await scheduleReminder(account.id, message.id, userIds)

    logger.debug('Acknowledging reciept of slack event', logPayload)
    await acknowledgeMessageReciept(event)
  }
}
