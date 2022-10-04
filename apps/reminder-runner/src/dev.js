/* eslint-disable @typescript-eslint/no-var-requires */
const { transformSync } = require('@swc/core')
const {
  SourcemapMap,
  installSourceMapSupport,
} = require('@swc-node/sourcemap-support')
const { addHook } = require('pirates')

const debug = require('debug')('hearye:runner:dev')

let runner
let revert = null
function register() {
  installSourceMapSupport()
  if (revert) revert()
  revert = addHook(
    (source, filename) => {
      const { code, map } = transformSync(source, {
        filename,
        configFile: 'dev.swcrc',
      })
      SourcemapMap.set(filename, map)

      return code
        .replace('@hearye/db', '@hearye/db/src')
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
  debug('Change detected reloading app')
  if (runner) runner.stop()
  clearCache()
  try {
    register()
    runner = require('./main')
    await runner.main()
    debug('App reloaded')
  } catch (error) {
    debug('Error while reloading')
    debug(error)
    debug('Waiting for changes...')
  }
}

function createWatch(dir, description = dir) {
  const watcher = chokidar.watch(dir, {
    awaitWriteFinish: {
      stabilityThreshold: 50,
      pollInterval: 100,
    },
  })
  watcher.on('ready', () => {
    debug(`Monitoring ${description || dir} for changes`)
    watcher.on('all', handleChange)
  })
  return watcher
}

createWatch('./src')
createWatch('../../packages/db', '@hearye/db')
handleChange()
