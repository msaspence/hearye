import { SlackEventMiddlewareArgs } from '@slack/bolt'

import { isSlackEventMessage } from './isSlackEventMessage'
import { acknowledgeMessageReciept } from './acknowledgeMessageReciept'
import { getAccountFromSlackEvent } from './getAccountFromSlackEvent'
import { getAudienceUsersFromSlackEvent } from './getAudienceUsersFromSlackEvent'
import { getMessageFromSlackEvent } from './getMessageFromSlackEvent'
import { scheduleReminder } from '@hearye/db'

export async function handleMessage(
  event: SlackEventMiddlewareArgs<'app_mention'>
) {
  if (await isSlackEventMessage(event)) {
    const account = await getAccountFromSlackEvent(event)
    if (!account.id) throw new Error('Account with id required')

    const users = await getAudienceUsersFromSlackEvent(account.id, event)
    const userIds = users
      .map(({ id }) => id)
      .filter((id) => id !== undefined) as string[]

    const message = await getMessageFromSlackEvent(account.id, event)
    if (!message.id) throw new Error('Message with id required')
    await scheduleReminder(account.id, message.id, userIds)

    await acknowledgeMessageReciept(event)
  }
}
