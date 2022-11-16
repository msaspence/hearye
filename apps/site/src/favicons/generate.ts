import { promises as fs } from 'fs'
import { getFavIcons } from './getFavIcons'
;(async function generate() {
  const { files, images } = await getFavIcons()
  await Promise.all(
    files.map(({ name, contents }) => {
      return fs.writeFile(`public/${name}`, contents)
    })
  )
  await Promise.all(
    images.map(({ name, contents }) => {
      return fs.writeFile(`public/${name}`, contents)
    })
  )
})()
