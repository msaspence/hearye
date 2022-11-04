import fs from 'fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const toAbsolute = (relativePath) => path.resolve(__dirname, relativePath)

const template = fs.readFileSync(toAbsolute('dist/static/index.html'), 'utf-8')
const { render } = await import('./dist/server/entry-server.js')

async function getFiles(dir) {
  const filesAndDirectories = await fs.promises.readdir(dir, {
    withFileTypes: true,
  })
  const deep = await Promise.all(
    filesAndDirectories.map(async (fileOrDirectory) => {
      if (fileOrDirectory.isDirectory()) {
        return await Promise.all(
          await getFiles(`${dir}/${fileOrDirectory.name}`)
        )
      } else {
        return `${dir}/${fileOrDirectory.name
          .replace(/\.(t|j)sx?$/, '')
          .toLowerCase()}`
      }
    })
  )
  // console.log('deep', deep.flat())
  return deep.flat()
}

;(async () => {
  const pages = (await getFiles('src/pages')).map((x) =>
    x.replace(/^src\/pages\//, '/')
  )
  pages.forEach(async (url) => {
    const context = {}
    const appHtml = await render(url, context)

    const html = template.replace(`<!--app-html-->`, appHtml)

    const filePath = `dist/static${url === '/' ? '/index' : url}.html`
    ensureDirectoryExistence(filePath)
    fs.writeFileSync(toAbsolute(filePath), html)
    // eslint-disable-next-line no-console
    console.log('Pre-rendered:', filePath)
  })
})()

function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath)
  if (fs.existsSync(dirname)) {
    return true
  }
  ensureDirectoryExistence(dirname)
  fs.mkdirSync(dirname)
}
