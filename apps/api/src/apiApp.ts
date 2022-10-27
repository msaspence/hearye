import {
  FastifyBaseLogger,
  FastifyInstance,
  FastifyTypeProviderDefault,
  RawServerDefault,
} from 'fastify'
import { IncomingMessage, ServerResponse } from 'http'

import { connectionCheck } from '@hearye/db'
import { RENDER_GIT_COMMIT } from '@hearye/env'

import { registerSlack } from './integrations/slack'

import { registerSentry } from './Sentry'

export async function apiApp(
  app: FastifyInstance<
    RawServerDefault,
    IncomingMessage,
    ServerResponse<IncomingMessage>,
    FastifyBaseLogger,
    FastifyTypeProviderDefault
  >
) {
  registerSentry(app)
  app.get('/', async () => {
    return {
      hello: 'world',
      dbConnection: await connectionCheck(),
      version: RENDER_GIT_COMMIT,
    }
  })
  app.get('/error', async () => {
    throw new CustomError('A message ')
  })
  app.register(registerSlack, { prefix: '/slack' })
}

class CustomError extends Error {}
