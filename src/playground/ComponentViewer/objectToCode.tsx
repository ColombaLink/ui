import React from 'react'
import props from '../props.json'
import { genRandomProps } from './genRandomProps'

export const checkType = (str: string, type: any): boolean => {
  return type === str || (Array.isArray(type) && type.includes(str))
}

const isCustomComponent = (v: string): boolean => {
  return v[0] === v[0].toUpperCase()
}

export const fieldToCode = (val: any): string => {
  if (typeof val === 'string') {
    return `'${val}'`
  }

  if (
    typeof val === 'number' ||
    typeof val === 'boolean' ||
    typeof val === 'undefined'
  ) {
    return String(val)
  }

  if (typeof val === 'function') {
    return val.toString()
  }

  if (typeof val === 'object') {
    return '\n' + objectToCode(val)
  }
}

export const objectToCode = (obj: Object | any[]): string => {
  if (!obj) {
    return 'null'
  }

  if (Array.isArray(obj)) {
    let str = '[\n'
    for (const val of obj) {
      str += `${fieldToCode(val)},\n`
    }
    str = str.slice(0, -2)
    str += '\n]'
    return str
  }
  let str = '{\n'
  for (const key in obj) {
    let keyStr = key.includes(' ') ? `'${key}'` : key
    str += `  ${keyStr}: ${fieldToCode(obj[key])},\n`
  }
  str = str.slice(0, -2)
  str += '\n}'
  return str
}

export const toComponent = (
  componentName: string,
  exampleProps: any,
  propsHeader?: string[],
  indent: string = '  '
) => {
  const s = indent.slice(2) || ''
  const header = !propsHeader
    ? `${s}<${componentName}`
    : `${s}<${componentName} ${
        propsHeader.length > 2
          ? '\n' + indent + propsHeader.join('\n' + indent)
          : propsHeader.join(' ')
      }`

  if (exampleProps.children) {
    return `${header}${propsHeader.length > 2 ? `\n` : ''}>
  ${s}${exampleProps.children}
${s}</${componentName}>      
  `
  } else {
    return header + `${propsHeader.length > 2 ? `\n${s}` : ''}/>`
  }
}

export const propsToCode = (
  componentName: string,
  propDef?: any,
  exampleProps?: any
): { propsStr: string; propsHeader: string[]; components: string[] } => {
  const components = [componentName]

  if (!propDef) {
    propDef = props.props[componentName]
  }

  let propsHeader = []
  let propsStr = '{'
  for (const k in exampleProps) {
    const v = exampleProps[k]
    const type = propDef?.props?.[k]?.type

    if (typeof v === 'function') {
      if (type ? checkType('FC', type) : isCustomComponent(v.name)) {
        propsHeader.push(`${k}={${v.name}}`)
        if (!components.includes(v.name)) {
          components.push(v.name)
        }
        propsStr += `${k}:${v.name},`
      } else {
        propsHeader.push(`${k}={${v.toString()}}`)
        propsStr += `${k}:${v.toString()},`
      }
    } else if (k === 'children') {
      // if (typeof props.children === 'object') // do some more here {
      exampleProps.children = 'some children...'
      propsStr += `${k}:'${exampleProps.children}',`
    } else if (typeof v === 'string') {
      propsHeader.push(`${k}="${v}"`)
      propsStr += `${k}:\`${v}\`,`
    } else if (typeof v === 'boolean' && v === true) {
      propsHeader.push(`${k}`)
      propsStr += `${k}:${v},`
    } else if (typeof v === 'number') {
      propsHeader.push(`${k}={${v}}`)
      propsStr += `${k}:${v},`
    } else if (typeof v === 'object') {
      if (React.isValidElement(v)) {
        // @ts-ignore
        const name = v.type.name
        if (name) {
          const x = propsToCode(name, undefined, v.props)
          for (const c of x.components) {
            if (!components.includes(c)) {
              components.push(c)
            }
          }
          // @ts-ignore
          const oneLine = x.propsHeader.length < 2 && !v.props.children
          const zzz = toComponent(
            name,
            v.props,
            x.propsHeader,
            oneLine ? '' : '      '
          )
          if (zzz) {
            propsHeader.push(`${k}={${!oneLine ? '\n' : ''}${zzz}}`)
            propsStr += `${k}:React.createElement(c, ${x.propsStr}),`
          }
        }
      } else {
        propsHeader.push(`${k}={${objectToCode(v)}}`)
        propsStr += `${k}:${objectToCode(v)},`
      }
    }
  }
  propsStr += '}'
  return { components, propsStr, propsHeader }
}

export const generateRandomComponentCode = (
  name: string,
  exampleProps?: any,
  propDef?: any
) => {
  if (!exampleProps) {
    exampleProps = genRandomProps(propDef)
  }

  if (!propDef) {
    propDef = props.props[name]
  }

  const componentName = name.replace('Props', '')

  const { components, propsHeader, propsStr } = propsToCode(
    componentName,
    propDef,
    exampleProps
  )

  let runCode = `const { ${components.slice(1).join(', ')} } = ui\n\n`
  runCode += 'return React.createElement(c, ' + propsStr + ');'

  let exampleCode = `import { ${components.join(', ')} } from '@based/ui'\n\n`
  exampleCode += toComponent(componentName, exampleProps, propsHeader)

  return {
    runCode,
    exampleCode,
  }
}
