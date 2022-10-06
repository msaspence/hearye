import { Reminder } from '../../models/Reminder'

export async function findDueRemindersWithAnnouncementAndUser() {
  const reminders = await Reminder.query()
    .where('remindAt', '<', new Date())
    .whereNull('remindedAt')
    .whereNull('acknowledgedAt')
    .limit(10)
    .withGraphJoined('[user, announcement]')
  return reminders
}
