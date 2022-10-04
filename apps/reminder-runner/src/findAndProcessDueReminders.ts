import { findDueRemindersWithAnnouncements } from '@hearye/db'
import { remindUser } from './integrations/slack/remindUser'

export async function findAndProcessDueReminders() {
  const reminders = await findDueRemindersWithAnnouncements()
  reminders.forEach(remindUser)
}
