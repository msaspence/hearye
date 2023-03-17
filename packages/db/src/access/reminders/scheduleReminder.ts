import { dayjs } from '@hearye/dayjs'
import { UniqueViolationError } from 'objection'

import { Reminder } from '../../models/Reminder'
import { User } from '../../models/User'
import { getRemindAt } from './getRemindAt'

export async function scheduleReminder(
  accountId: string,
  messageId: string,
  userIds: string[],
  iteration = 1
): Promise<void> {
  const existingReminders = await Reminder.query()
    .where('accountId', accountId)
    .where('messageId', messageId)
    .whereIn('userId', userIds)
    .where('iteration', iteration)
    .select('id', 'userId')
  const timezones = (await User.query().whereIn('id', userIds)).reduce(
    (result, { id, timezone }) => {
      if (id) result[id] = timezone || 'UTC'
      return result
    },
    {} as Record<string, string>
  )

  const existingReminderUserIds = existingReminders.map(({ userId }) => userId)
  const missingUsers = userIds.filter(
    (userId) => !existingReminderUserIds.includes(userId)
  )
  if (!missingUsers.length) return

  try {
    await Reminder.query().insert(
      missingUsers.map((userId) => {
        return {
          accountId,
          messageId,
          userId,
          iteration,
          remindAt: getRemindAt(iteration, timezones[userId]),
          lockedUntil: dayjs().add(1, 'minute').toDate(),
        }
      })
    )
    return
  } catch (error) {
    if (error instanceof UniqueViolationError) {
      return scheduleReminder(accountId, messageId, userIds)
    }
    throw error
  }
}
