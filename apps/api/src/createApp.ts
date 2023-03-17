import Fastify from 'fastify'

import { apiApp } from './apiApp'

export function createApp() {
  const app = Fastify({
    logger: false,
  })

  apiApp(app)
  return app
}
