import { transformFromAst, parse } from '@babel/core'
import preset from '@babel/preset-react'

const makeVar = (name: string): any => {
  return {
    type: 'ObjectProperty',
    key: {
      type: 'Identifier',
      name,
    },
    computed: false,
    method: false,
    shorthand: true,
    value: {
      type: 'Identifier',
      name,
    },
    extra: {
      shorthand: true,
    },
  }
}

const genImport = (node) => {
  return {
    type: 'VariableDeclaration',
    declarations: [
      {
        type: 'VariableDeclarator',
        start: 6,
        end: 20,
        id: {
          type: 'ObjectPattern',
          properties: node.specifiers.map((v) => {
            return makeVar(v.imported.name)
          }),
        },
        init: {
          type: 'Identifier',
          name: 'ui',
        },
      },
    ],
    kind: 'const',
  }
}

export default (code: string): string => {
  const ast = parse(code, {
    presets: [preset],
  })

  const body = ast.program.body

  body[0] = genImport(body[0])

  const last = body[body.length - 1]

  body[body.length - 1] = {
    type: 'ReturnStatement',
    argument: last,
  }

  const x = transformFromAst(ast, code, {
    presets: [preset],
  })

  return x.code
}
