import { Reminder } from '../../models/Reminder'

export async function findDueReminders() {
  const reminders = await Reminder.query()
    .where('remindAt', '<', new Date())
    .whereNull('remindedAt')
    .limit(10)
  return reminders
}
