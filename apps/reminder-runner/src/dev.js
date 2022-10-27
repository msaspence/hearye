/* eslint-disable @typescript-eslint/no-var-requires */
const { transformSync } = require('@swc/core')
const {
  SourcemapMap,
  installSourceMapSupport,
} = require('@swc-node/sourcemap-support')
const { addHook } = require('pirates')
const { createLogger } = require('@hearye/logger')
const logger = createLogger('hearye:runner:dev')

let runner
let revert = null
function register() {
  installSourceMapSupport()
  if (revert) revert()
  revert = addHook(
    (source, filename) => {
      const { code, map } = transformSync(source, {
        filename,
        swcrc: false,
        configFile: '../../dev.swcrc',
      })
      SourcemapMap.set(filename, map)
      return code
    },
    { exts: ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx'] }
  )
  require('./main') // Prime require.cache
}
register()

const chokidar = require('chokidar')

function clearCache() {
  Object.keys(require.cache).forEach(function (id) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    if (/[/\\]src[/\\]/.test(id)) delete require.cache[id]
  })
}

async function handleChange() {
  logger.info('Change detected reloading app')
  if (runner) runner.stop()
  clearCache()
  try {
    register()
    runner = require('./main')
    if (global.gc) {
      logger.info('Garbage collecting')
      global.gc()
    } else {
      logger.info('Garbage collection not exposed')
    }
    await runner.main()
    logger.info('App reloaded')
  } catch (error) {
    logger.info('Error while reloading')
    logger.info(error)
    logger.info('Waiting for changes...')
  }
}

function createWatch(dir, description = dir) {
  const watcher = chokidar.watch(dir, {
    awaitWriteFinish: {
      stabilityThreshold: 50,
      pollInterval: 100,
    },
    ignored: /(node_modules)|(\.git)/,
  })
  watcher.on('ready', () => {
    logger.info(`Monitoring ${description || dir} for changes`)
    watcher.on('all', handleChange)
  })
  return watcher
}

createWatch('./src')
createWatch('../../packages')
handleChange()
