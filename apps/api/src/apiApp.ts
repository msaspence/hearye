import { Account } from '@hearye/db'

import {
  FastifyBaseLogger,
  FastifyInstance,
  FastifyTypeProviderDefault,
  RawServerDefault,
} from 'fastify'
import { IncomingMessage, ServerResponse } from 'http'

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
    return (await Account.query().limit(1))[0].id
    return { hello: 'world' }
  })
  app.register(registerSlack, { prefix: '/slack' })
}
