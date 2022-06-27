import { promises } from 'fs'
import { join } from 'path'
const { readdir, readFile, writeFile } = promises

const walk = async (path, replace) => {
  const files = await readdir(path)
  for (const file of files) {
    transform(join(path, file), replace)
  }
}

const transform = async (path, replace) => {
  try {
    const content = (await readFile(path)).toString()
    if (/ from '~\//.test(content)) {
      const transformed = content.replace(/ from '~\//g, ` from '${replace}/`)
      await writeFile(path, transformed)
    }
  } catch (e) {
    if (e.code === 'EISDIR') {
      walk(path, replace === '.' ? '..' : `../${replace}`)
    } else {
      console.error(e)
    }
  }
}

walk('dist', '.')
