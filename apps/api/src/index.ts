import Fastify from 'fastify'

import { apiApp } from './apiApp'
import { env } from '@hearye/env'

const { PORT } = env
const fastify = Fastify({
  logger: false,
})

apiApp(fastify)
fastify.listen({ host: '0.0.0.0', port: parseInt(PORT || '3000') })
