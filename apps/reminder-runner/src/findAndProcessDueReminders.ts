import { findDueRemindersWithAnnouncementAndUser } from '@hearye/db'
import createDebug from 'debug'

import { remindUser } from './integrations/slack/remindUser'

const debug = createDebug('hearye:db:findAndProcessDueReminders')

export async function findAndProcessDueReminders() {
  const reminders = await findDueRemindersWithAnnouncementAndUser()
  debug(
    `${reminders.length} found to process`,
    findDueRemindersWithAnnouncementAndUser
  )
  await Promise.all(reminders.map(remindUser))
  return reminders.length
}
