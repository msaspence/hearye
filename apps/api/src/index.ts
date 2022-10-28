import Fastify from 'fastify'

import { apiApp } from './apiApp'
import { PORT } from '@hearye/env'

const fastify = Fastify({
  logger: false,
})

apiApp(fastify)
fastify.listen({ host: '0.0.0.0', port: PORT })
