import {
  FastifyBaseLogger,
  FastifyInstance,
  FastifyTypeProviderDefault,
  RawServerDefault,
} from 'fastify'
import { IncomingMessage, ServerResponse } from 'http'
import { start, FastifyRestartableOptions } from '@fastify/restartable'
import chokidar from 'chokidar'
import ConvertAnsi from 'ansi-to-html'

import { PORT } from '@hearye/env'
import { isErrorWithStack } from './utils/errors'
import { createLogger } from '@hearye/logger'
const convert = new ConvertAnsi()

const logger = createLogger('hearye:api:dev')

async function devApiApp(
  app: FastifyInstance<
    RawServerDefault,
    IncomingMessage,
    ServerResponse<IncomingMessage>,
    FastifyBaseLogger,
    FastifyTypeProviderDefault
  >,
  _: FastifyRestartableOptions
) {
  logger.info('Loading app...')
  try {
    const { apiApp } = await require('./apiApp')
    await apiApp(app)
    app.get('/foo', async () => 'bar')
  } catch (error) {
    if (error instanceof Error) {
      logger.fatal('Error while loading')
      logger.fatal(error)
      app.all('*', (_, res) => {
        res.header('Content-Type', 'text/html')
        res.status(500)
        return `<!DOCTYPE html><html><body style="background: #111; font-size: 16px; color: white;"><pre>${
          isErrorWithStack(error) && convert.toHtml(error.stack.toString())
        }</pre></body></html>`
      })
      logger.info('Waiting for changes...')
    } else {
      throw error
    }
  }
}

;(async () => {
  const { restart, listen } = await start({
    protocol: 'http',
    hostname: '127.0.0.1',
    port: PORT,
    app: devApiApp,
    logger: false,
  })

  const { address, port } = await listen()

  logger.info(`Server listening on ${address}:${port}`)

  async function handleChange() {
    logger.info('=====================================================')
    logger.info('Change detected reloading app')
    clearImportCache()
    if (global.gc) {
      logger.info('Garbage collecting')
      global.gc()
    } else {
      logger.info('Garbage collection not exposed')
    }
    await restart()
    logger.info('App restarted')
  }

  function createWatch(dir: string) {
    const watcher = chokidar.watch(dir, {
      awaitWriteFinish: {
        stabilityThreshold: 50,
        pollInterval: 100,
      },
      ignored: /(node_modules)|(\.git)/,
    })
    watcher.on('ready', () => {
      logger.info(`Monitoring ${dir} for changes`)
      watcher.on('all', handleChange)
    })
    return watcher
  }

  createWatch('./src')
  createWatch('../../packages')
})()

function clearImportCache() {
  Object.keys(require.cache).forEach(function (id) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    if (/[/\\]src[/\\]/.test(id)) delete require.cache[id]
  })
}
