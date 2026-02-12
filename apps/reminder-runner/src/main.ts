import * as Sentry from '@sentry/node'
import { createLogger } from '@hearye/logger'
import { env } from '@hearye/env'
import { initSentry, trace } from './sentry'

import { findAndProcessDueReminders } from './findAndProcessDueReminders'

const logger = createLogger('hearye:runner:main')

let loop: ReturnType<typeof setTimeout>
const LOOP_INTERVAL_MS = env.LOOP_LENGTH * 1000

initSentry()

export async function main() {
  let processed
  try {
    await trace('findAndProcessDueReminders', async () => {
      logger.info('Running runner loop')
      processed = await findAndProcessDueReminders()
    })
  } catch (error) {
    processed = 0
    logger.error(error)
    Sentry.captureException(error)
  } finally {
    loop = setTimeout(main, processed === 0 ? LOOP_INTERVAL_MS : 0)
  }
}

export function stop() {
  logger.info('Stopping loop')
  if (loop) clearTimeout(loop)
}
