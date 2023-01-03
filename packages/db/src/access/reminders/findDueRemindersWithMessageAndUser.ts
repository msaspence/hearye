import { dayjs } from '@hearye/dayjs'
import { createLogger } from '@hearye/logger'

import { Reminder } from '../../models/Reminder'

const logger = createLogger('hearye:db:findDueRemindersWithMessageAndUser')

export async function findDueRemindersWithMessageAndUser() {
  const lockedIds = (
    await Reminder.query()
      .patch({ lockedUntil: dayjs().add(1, 'minute').toDate() })
      .whereIn('reminders.id', function () {
        return this.select('reminders.id')
          .where('remindAt', '<', new Date())
          .whereNull('remindedAt')
          .whereNull('acknowledgedAt')
          .where(function () {
            this.where('lockedUntil', '<', new Date()).orWhereNull(
              'lockedUntil'
            )
          })
          .limit(10)
      })
      .returning('id')
  ).map(({ id }) => id)

  logger.info(`Locked ${lockedIds.length} reminders for processing`)
  const reminders = await Reminder.query()
    .whereIn('reminders.id', lockedIds)
    .withGraphJoined('[user, message]')

  return reminders
}
