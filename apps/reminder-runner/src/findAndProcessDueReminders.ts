import { findDueReminders } from '@hearye/db'
import { remindUser } from './integrations/slack/remindUser'

export async function findAndProcessDueReminders() {
  const reminders = await findDueReminders()
  reminders.forEach(remindUser)
}
