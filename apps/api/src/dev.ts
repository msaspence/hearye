import {
  FastifyBaseLogger,
  FastifyInstance,
  FastifyTypeProviderDefault,
  RawServerDefault,
} from 'fastify'
import { IncomingMessage, ServerResponse } from 'http'
import { start, FastifyRestartableOptions } from '@fastify/restartable'
import Debug from 'debug'
import chokidar from 'chokidar'
import ConvertAnsi from 'ansi-to-html'

import { PORT } from '@hearye/env'
import { isErrorWithStack } from './utils/errors'
const convert = new ConvertAnsi()

const debug = Debug('hearye:api:dev')

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
  debug('Loading app...')
  try {
    const { apiApp } = await require('./apiApp')
    app.register(apiApp)
  } catch (error) {
    if (error instanceof Error) {
      debug('Error while loading')
      debug(error)
      app.all('*', (_, res) => {
        res.header('Content-Type', 'text/html')
        res.status(500)
        return `<!DOCTYPE html><html><body style="background: #111; font-size: 16px; color: white;"><pre>${
          isErrorWithStack(error) && convert.toHtml(error.stack.toString())
        }</pre></body></html>`
      })
      debug('Waiting for changes...')
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
  })

  const { address, port } = await listen()

  debug(`Server listening on ${address}:${port}`)

  async function handleChange() {
    debug('=====================================================')
    debug('Change detected reloading app')
    clearImportCache()
    if (global.gc) {
      debug('Garbage collecting')
      global.gc()
    } else {
      debug('Garbage collection not exposed')
    }
    await restart()
    debug('App restarted')
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
      debug(`Monitoring ${dir} for changes`)
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
