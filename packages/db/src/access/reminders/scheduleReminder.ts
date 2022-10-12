import dayjs from 'dayjs'
import { UniqueViolationError } from 'objection'

import { Reminder } from '../../models/Reminder'
import { User } from '../../models/User'

export async function scheduleReminder(
  accountId: string,
  announcementId: string,
  userIds: string[],
  iteration = 1
): Promise<void> {
  const existingReminders = await Reminder.query()
    .where('accountId', accountId)
    .where('announcementId', announcementId)
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
        const remindAt = dayjs()
          .tz(timezones[userId])
          .businessDaysAdd(1)
          .hour(10)
          .minute(Math.round(Math.random() * 59))
          .second(0)
          .millisecond(0)
          .toDate()
        return {
          accountId,
          announcementId,
          userId,
          iteration,
          remindAt,
          lockedUntil: dayjs().add(1, 'minute').toDate(),
        }
      })
    )
    return
  } catch (error) {
    if (error instanceof UniqueViolationError) {
      return scheduleReminder(accountId, announcementId, userIds)
    }
    throw error
  }
}
