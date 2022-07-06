import { readFile } from 'fs/promises'
import { join } from 'path'
// import babelParser from '@babel/parser'

// const ast = babelParser.parse(code, {
//   sourceType: 'module',
//   plugins: ['jsx'],
// })

export default async (path: string) => {
  //   console.info(join(__dirname, path))
  try {
    console.info(join)
    console.info(join(process.cwd(), path))
  } catch (err) {
    console.error(err)
  }
  //   const file = (await readFile(join(__dirname, path))).toString()
  //   return JSON.stringify({ code: file })
  return '?>' + path
}
