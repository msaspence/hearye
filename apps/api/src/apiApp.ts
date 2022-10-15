import {
  FastifyBaseLogger,
  FastifyInstance,
  FastifyTypeProviderDefault,
  RawServerDefault,
} from 'fastify'
import { IncomingMessage, ServerResponse } from 'http'

import { connectionCheck } from '@hearye/db'

import { registerSlack } from './integrations/slack'

export async function apiApp(
  app: FastifyInstance<
    RawServerDefault,
    IncomingMessage,
    ServerResponse<IncomingMessage>,
    FastifyBaseLogger,
    FastifyTypeProviderDefault
  >
) {
  app.get('/', async () => {
    return { hello: 'world', dbConnection: await connectionCheck() }
  })
  app.register(registerSlack, { prefix: '/slack' })
}
