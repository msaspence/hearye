import * as Sentry from '@sentry/node'
import '@sentry/tracing'

import { env } from '@hearye/env'

const { NODE_ENV, SENTRY_DSN, SENTRY_SAMPLE_RATE, RENDER_GIT_COMMIT } = env
export function initSentry() {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: NODE_ENV,
    tracesSampleRate: parseFloat(SENTRY_SAMPLE_RATE ?? '1'),
    release: RENDER_GIT_COMMIT,
  })
}

export async function trace(name: string, callback: () => Promise<void>) {
  const transaction = Sentry.startTransaction({
    name,
  })
  try {
    await callback()
    transaction.finish()
  } catch (error) {
    transaction.finish()
    throw error
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function traced(name: string, callback: any) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...args: any[]) => {
    return trace(name, () => callback(...args))
  }
}
