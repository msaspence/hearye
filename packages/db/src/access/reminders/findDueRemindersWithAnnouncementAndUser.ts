import dayjs from 'dayjs'
import createDebug from 'debug'

import { Reminder } from '../../models/Reminder'

const debug = createDebug('hearye:db:findDueRemindersWithAnnouncementAndUser')

export async function findDueRemindersWithAnnouncementAndUser() {
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

  debug(`Locked ${lockedIds.length} reminders for processing`)

  const reminders = await Reminder.query()
    .whereIn('reminders.id', lockedIds)
    .withGraphJoined('[user, announcement]')

  return reminders
}
