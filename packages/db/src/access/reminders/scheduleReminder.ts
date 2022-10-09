import dayjs from 'dayjs'
import { UniqueViolationError } from 'objection'

import { Reminder } from '../../models/Reminder'

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
  const existingReminderUserIds = existingReminders.map(({ userId }) => userId)
  const missingUsers = userIds.filter(
    (userId) => !existingReminderUserIds.includes(userId)
  )
  if (!missingUsers.length) return
  const remindAt = dayjs()
    .add(iteration - 1, 'minute')
    .add(10, 'seconds')
    .toDate()
  try {
    await Reminder.query().insert(
      missingUsers.map((userId) => ({
        accountId,
        announcementId,
        userId,
        iteration,
        remindAt,
        lockedUntil: dayjs().add(1, 'minute').toDate(),
      }))
    )
    return
  } catch (error) {
    if (error instanceof UniqueViolationError) {
      return scheduleReminder(accountId, announcementId, userIds)
    }
    throw error
  }
}
