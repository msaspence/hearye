import createDebug from 'debug'

const debug = createDebug('hearye:db:markReminderSent')

import { Reminder } from '../../models/Reminder'
import { getRemindAt } from './getRemindAt'

export async function markReminderSent(
  { id, ...reminder }: Reminder,
  timezone: string,
  callback: () => Promise<void>
) {
  debug('Starting transaction')
  await Reminder.transaction(async (transaction) => {
    await Reminder.query(transaction)
      .findById(id)
      .patch({ remindedAt: new Date() })
    debug('Patched existing')
    const iteration = reminder.iteration + 1
    const remindAt = getRemindAt(iteration, timezone)
    const newReminder = {
      ...reminder,
      remindAt,
      iteration,
      lockedUntil: null,
    }
    await Reminder.query(transaction).insert(newReminder)
    debug('Inserted next reminder')

    await callback()
    debug('Message sent')
  })
}
