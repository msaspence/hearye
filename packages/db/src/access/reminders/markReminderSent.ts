import dayjs from 'dayjs'
import createDebug from 'debug'

const debug = createDebug('hearye:db:markReminderSent')

import { Reminder } from '../../models/Reminder'

export async function markReminderSent(
  { id, ...reminder }: Reminder,
  callback: () => Promise<void>
) {
  try {
    debug('Starting transaction')
    await Reminder.transaction(async (transaction) => {
      await Reminder.query(transaction)
        .findById(id)
        .patch({ remindedAt: new Date() })
      debug('Patched existing')

      const remindAt = dayjs()
        .add(reminder.iteration, 'minute')
        .add(10, 'seconds')
        .toDate()
      const newReminder = {
        ...reminder,
        remindAt,
        iteration: reminder.iteration + 1,
      }
      await Reminder.query(transaction).insert(newReminder)
      debug('Inserted next reminder')

      await callback()
      debug('Message sent')
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  }
}
