import * as Sentry from '@sentry/node'
import {
  findDueRemindersWithMessageAndUser,
  Reminder,
  scheduleRetryReminder,
} from '@hearye/db'
import { traced } from './sentry'

import { createLogger } from '@hearye/logger'

import { remindUser } from './integrations/slack/remindUser'

const logger = createLogger('hearye:db:findAndProcessDueReminders')

export async function findAndProcessDueReminders() {
  const reminders = await findDueRemindersWithMessageAndUser()
  logger.info(`${reminders.length} found to process`)
  await Promise.all(
    reminders.map(manageErrors(traced('remindUser', remindUser)))
  )
  return reminders.length
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function manageErrors(callback: (reminder: Reminder) => Promise<any>) {
  return async (reminder: Reminder) => {
    try {
      return callback(reminder)
    } catch (error: unknown) {
      try {
        logger.info('Reminder failed, rescheduling')
        Sentry.captureException(error)
        // eslint-disable-next-line no-console
        console.error(error)
        return scheduleRetryReminder(reminder)
      } catch (scheduleRetryError) {
        Sentry.captureException(scheduleRetryError)
        // eslint-disable-next-line no-console
        console.error(scheduleRetryError)
      }
    }
  }
}
