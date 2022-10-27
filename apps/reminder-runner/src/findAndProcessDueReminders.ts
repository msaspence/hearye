import {
  findDueRemindersWithAnnouncementAndUser,
  Reminder,
  scheduleRetryReminder,
} from '@hearye/db'

import createDebug from 'debug'

import { remindUser } from './integrations/slack/remindUser'

const debug = createDebug('hearye:db:findAndProcessDueReminders')

export async function findAndProcessDueReminders() {
  const reminders = await findDueRemindersWithAnnouncementAndUser()
  debug(`${reminders.length} found to process`)
  await Promise.all(reminders.map(manageErrors(remindUser)))
  return reminders.length
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function manageErrors(callback: (reminder: Reminder) => Promise<any>) {
  return async (reminder: Reminder) => {
    try {
      return callback(reminder)
    } catch (error: unknown) {
      try {
        debug('Reminder failed, rescheduling')
        return scheduleRetryReminder(reminder)
      } catch (scheduleRetryError) {
        // Do nothing for now
        // eslint-disable-next-line no-console
        console.error(scheduleRetryError)
      }
    }
  }
}
