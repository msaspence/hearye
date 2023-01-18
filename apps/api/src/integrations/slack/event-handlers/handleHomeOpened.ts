import { SlackEvent } from '../events'
import { getAccountFromSlackEvent } from '../to-local/getAccountFromSlackEvent'
import { getUserFromSlackEvent } from '../to-local/getUserFromSlackEvent'
import { createLogger } from '@hearye/logger'
import { shouldSendOnboardinMessage, onboardingMessageFailed } from '@hearye/db'

const logger = createLogger('hearye:api:slack:handleMessage')

export async function handleHomeOpened(event: SlackEvent<'app_home_opened'>) {
  logger.debug('Handling message', { event })
  if (event.payload.type === 'app_home_opened') {
    const account = await getAccountFromSlackEvent(event)
    if (!account.id) throw new Error('Account with id required')
    const user = await getUserFromSlackEvent(account.id, event)
    if (!user.id) throw new Error('User with id required')
    if (!(await shouldSendOnboardinMessage(account.id, user.id, 'welcome'))) {
      return
    }
    try {
      await event.client.chat.postMessage({
        channel: event.payload.channel,
        text: `Welcome to Hear Ye! 
        
  Slack can get pretty busy and it's not hard to miss those vital communications that really need to to be read. Hear Ye! allows message authors to require reactions to acknowledge these important messages.

  How to use Hear Ye!:

  1. Mention @Hear Ye - Indicate a message is critical and requires acknowledgement that it has been read by simply mentioning @Hear Ye in the message body.
  2. Other metioned users are reminded - Hear Ye! will remind anyone mentioned once a day sometime between 10am and 11am until the message is acknowledged.
  3. Acknowledge with 👍 - Messages can be acknowledged by reacting with a 👍. Once acknowledged no further reminders will be sent.`,
      })
    } catch (error) {
      await onboardingMessageFailed(account.id, user.id, 'welcome')
    }
  }
}
