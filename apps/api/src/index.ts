import Fastify from 'fastify'

import { apiApp } from './apiApp'
import { config } from './config'

const fastify = Fastify({
  logger: true,
})

apiApp(fastify)
fastify.listen({ port: config.port })
