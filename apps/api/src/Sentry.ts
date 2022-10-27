import {
  FastifyBaseLogger,
  FastifyInstance,
  FastifyTypeProviderDefault,
  RawServerDefault,
} from 'fastify'
import { IncomingMessage, ServerResponse } from 'http'
import fastifySentry from '@immobiliarelabs/fastify-sentry'
import { NODE_ENV, SENTRY_DSN, SENTRY_SAMPLE_RATE } from '@hearye/env'

export function registerSentry(
  app: FastifyInstance<
    RawServerDefault,
    IncomingMessage,
    ServerResponse<IncomingMessage>,
    FastifyBaseLogger,
    FastifyTypeProviderDefault
  >
) {
  app.register(fastifySentry, {
    dsn: SENTRY_DSN,
    environment: NODE_ENV,
    release: '1.0.0',
    tracesSampleRate: parseFloat(SENTRY_SAMPLE_RATE || 1),
  })
}
