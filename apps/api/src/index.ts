import Fastify from 'fastify'

import { apiApp } from './apiApp'
import { PORT } from '@hearye/env'

const fastify = Fastify({
  logger: true,
})

apiApp(fastify)
fastify.listen({ port: PORT })
