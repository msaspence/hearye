import * as Sentry from '@sentry/node'
import { PromisePool } from '@supercharge/promise-pool'
import {
  findDueRemindersWithMessageAndUser,
  Reminder,
  scheduleRetryReminder,
} from '@hearye/db'
import { traced } from './sentry'

import { createLogger } from '@hearye/logger'
import { env } from '@hearye/env'

import { remindUser } from './integrations/slack/remindUser'

const logger = createLogger('hearye:db:findAndProcessDueReminders')
const CONCURRENCY = env.REMINDER_CONCURRENCY

export async function findAndProcessDueReminders() {
  const reminders = await findDueRemindersWithMessageAndUser()
  logger.info(`${reminders.length} found to process`)
  await PromisePool.withConcurrency(CONCURRENCY)
    .for(reminders)
    .process(manageErrors(traced('remindUser', remindUser)))
  return reminders.length
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function manageErrors(callback: (reminder: Reminder) => Promise<any>) {
  return async (reminder: Reminder) => {
    try {
      return await callback(reminder)
    } catch (error: unknown) {
      try {
        logger.info('Reminder failed, rescheduling')
        Sentry.captureException(error)
        // eslint-disable-next-line no-console
        console.error(error)
        return await scheduleRetryReminder(reminder)
      } catch (scheduleRetryError) {
        Sentry.captureException(scheduleRetryError)
        // eslint-disable-next-line no-console
        console.error(scheduleRetryError)
      }
    }
  }
}
