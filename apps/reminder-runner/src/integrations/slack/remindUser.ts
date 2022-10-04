import { Reminder, markReminderSent } from '@hearye/db'

import { clientForAccountId } from './clientForAccount'

export async function remindUser(reminder: Reminder) {
  if (!reminder.accountId) throw new Error('Must provide accountId')
  const client = await clientForAccountId(reminder.accountId)
  if (!client) throw new Error("Couldn't initialize client")

  await markReminderSent(reminder, async () => {
    await client.chat.postMessage({
      channel: reminder.user.externalId,
      text: generateTextForReminder(reminder),
    })
  })
}

function generateTextForReminder(reminder: Reminder) {
  return `Hey <@${reminder.user.externalId}>, you have an unacknoledged announcement in <#${reminder.announcement.channelExternalId}>.\n\nPlease take the time read and acknowledge this announcment with a 👍🏻.\n\n`
}
