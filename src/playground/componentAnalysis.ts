import { join } from 'path'
import babelParser from '@babel/parser'

function getDeclaredComponentName(declaration) {
  for (const declarator of declaration.declarations) {
    if (
      declarator.id.type === 'Identifier' &&
      declarator.init &&
      declarator.init.type === 'ArrowFunctionExpression'
    ) {
      if (containsJsxElement(declarator.init.body)) {
        return declarator.id.name
      }
    }
  }
  return null
}

function containsJsxElement(node) {
  if (node.type === 'JSXElement') {
    return true
  }
  for (const child of Object.values(node)) {
    if (Array.isArray(child)) {
      for (const item of child) {
        if (item.constructor.name !== 'Node') {
          continue
        }
        if (containsJsxElement(child)) {
          return true
        }
      }
    } else if (child.constructor.name !== 'Node') {
      continue
    }
    if (containsJsxElement(child)) {
      return true
    }
  }
  return false
}

export default async (path: string, params: any) => {
  //   console.info(join(__dirname, path))
  try {
    const file = params.files[path].contents.toString()

    const ast = babelParser.parse(file, {
      sourceType: 'module',
      plugins: ['jsx'],
    })
    console.info(JSON.stringify(ast, null, 2))

    const detectedComponents = []
    for (const statement of ast.program.body) {
      if (statement.type === 'VariableDeclaration') {
        const componentName = getDeclaredComponentName(statement)
        if (componentName) {
          detectedComponents.push(componentName)
        }
      } else if (statement.type === 'ExportNamedDeclaration') {
        const componentName = getDeclaredComponentName(statement.declaration)
        if (componentName) {
          detectedComponents.push(componentName)
        }
      }
    }

    console.log(detectedComponents)

    return JSON.stringify({
      code: file,
    })
  } catch (err) {
    console.error(err)
  }
  return '{"code":""}'
}
