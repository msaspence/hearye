import Fastify from 'fastify'
import { env } from '@hearye/env'

import { apiApp } from './apiApp'

export function createApp() {
  const app = Fastify({
    logger: env.NODE_ENV === 'test' ? false : { level: 'info' },
  })

  apiApp(app)
  return app
}
