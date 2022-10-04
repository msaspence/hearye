import dayjs from 'dayjs'

import { Reminder } from '../../models/Reminder'

export async function markReminderSent(
  { id, ...reminder }: Reminder,
  callback: () => Promise<void>
) {
  try {
    await Reminder.transaction(async (transaction) => {
      await Reminder.query(transaction)
        .findById(id)
        .patch({ remindedAt: new Date() })
      await callback()
      const remindAt = dayjs().add(1, 'day').toDate()
      await Reminder.query(transaction).insert({
        ...reminder,
        remindAt,
        iteration: reminder.iteration + 1,
      })
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  }
}
