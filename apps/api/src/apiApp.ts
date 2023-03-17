import {
  FastifyBaseLogger,
  FastifyInstance,
  FastifyTypeProviderDefault,
  RawServerDefault,
} from 'fastify'
import { IncomingMessage, ServerResponse } from 'http'

import { connectionCheck } from '@hearye/db'
import { env } from '@hearye/env'
import { registerSlack } from './integrations/slack'

import { sentry } from './sentry'
import { logging } from './logging'
import middleware from '@fastify/express'
const { RENDER_GIT_COMMIT } = env
export async function apiApp(
  app: FastifyInstance<
    RawServerDefault,
    IncomingMessage,
    ServerResponse<IncomingMessage>,
    FastifyBaseLogger,
    FastifyTypeProviderDefault
  >
) {
  app.register(sentry)
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

  app.register(logging)
}

class CustomError extends Error {}
