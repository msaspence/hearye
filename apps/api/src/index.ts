import { env } from '@hearye/env'

import { createApp } from './createApp'

const app = createApp()

async function start() {
  try {
    await app.listen({ host: '0.0.0.0', port: env.PORT })
    app.log.info({ port: env.PORT }, 'API listening')
  } catch (error) {
    app.log.error(error)
    process.exit(1)
  }
}

void start()
