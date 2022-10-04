import { findDueRemindersWithAnnouncementAndUser } from '@hearye/db'
import { remindUser } from './integrations/slack/remindUser'

export async function findAndProcessDueReminders() {
  const reminders = await findDueRemindersWithAnnouncementAndUser()
  reminders.forEach(remindUser)
}
