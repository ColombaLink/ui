import React, { FC, useEffect, useState, useRef } from 'react'
import { Props } from './ComponentProps'
import {
  Text,
  Container,
  color,
  Code,
  Link,
  useSearchParam,
  setLocation,
  Button,
  ModelIcon,
} from '../../'
import * as ui from '../../'
import { genRandomProps } from './genRandomProps'
import { Callout } from '~/components/Callout'

const checkType = (str: string, type: any): boolean => {
  return type === str || (Array.isArray(type) && type.includes(str))
}

export const Explorer: FC<{
  p: any
  component: FC
  name: string
  exampleProps?: any
  runCode?: string
  exampleCode?: string
}> = ({ component, runCode, p, name, exampleProps, exampleCode }) => {
  const showType = useSearchParam('type')
  const fuzz = useSearchParam('randomize')

  if (!exampleProps) {
    exampleProps = genRandomProps(p)
  }

  if (!exampleCode) {
    const componentName = name.replace('Props', '')
    const components = [componentName]

    /*
        const code = exampleCode
      .replace(/import /g, 'const ')
      .replace("from '@based/ui'", '= ui').replace(`<${componentName}`, '')
    console.info(code)
    */

    let propsHeader = []
    let propsStr = '{'
    for (const k in exampleProps) {
      const v = exampleProps[k]
      const type = p.props[k].type
      if (typeof v === 'function') {
        if (checkType('FC', type)) {
          propsHeader.push(`${k}={${v.name}}`)
          components.push(v.name)
          propsStr += `${k}:${v.name},`
        } else {
          propsHeader.push(`${k}={${v.toString()}}`)
          propsStr += `${k}:${v.toString()},`
        }
      } else if (k === 'children') {
        // if (typeof props.children === 'object') {
        exampleProps.children = 'some children...'
        propsStr += `${k}:'${exampleProps.children}',`
      }
    }
    propsStr += '}'
    runCode = `const { ${components.slice(1).join(', ')} } = ui\n\n`
    exampleCode = `import { ${components.join(', ')} } from '@based/ui'\n\n`
    const header = !propsHeader
      ? `<${componentName}`
      : `<${componentName} ${
          propsHeader.length > 2
            ? '\n  ' + propsHeader.join('\n  ')
            : propsHeader.join(' ')
        }`

    runCode += `return React.createElement(c, ${propsStr});`

    if (exampleProps.children) {
      exampleCode += `${header}${propsHeader.length > 2 ? '\n' : ''}>
  ${exampleProps.children}
</${componentName}>      
`
    } else {
      exampleCode += header + '/>'
    }
  }

  let child
  try {
    const fn = new Function('ui', 'React', 'c', runCode)
    console.info(fn.toString())
    child = fn(ui, React, component)
  } catch (err) {
    console.error(err) // hosw
    child = <Callout>{err.message}</Callout>
  }

  return (
    <>
      <Link href={`src${p.file}`}>
        <Text weight={700} size={'18px'} style={{ marginBottom: 24 }}>
          {p.file.slice(1).split('/').slice(1, -1)}
        </Text>
      </Link>
      <div style={{ display: 'flex', marginTop: 24, width: '100%' }}>
        <div
          style={{
            minWidth: showType ? 550 : 400,
            marginRight: showType ? 24 : 0,
          }}
        >
          {showType ? <Code>{p.code}</Code> : <Props prop={p} />}
          <div style={{ marginTop: 48, display: 'flex' }}>
            <Button
              outline
              ghost
              style={{ marginRight: 24 }}
              iconLeft={ModelIcon}
              onClick={() =>
                setLocation({
                  merge: true,
                  params: { randomize: !fuzz },
                })
              }
            >
              {fuzz ? 'Hide Fuzz' : 'Fuzz'}
            </Button>
            <Button
              outline
              ghost
              iconLeft={ModelIcon}
              onClick={() =>
                setLocation({
                  merge: true,
                  params: { type: !showType },
                })
              }
            >
              {showType ? 'Props' : 'Type'}
            </Button>
          </div>
        </div>

        <div style={{ width: '100%' }}>
          <Code space>{exampleCode}</Code>
          <Container>{child}</Container>
        </div>
      </div>
    </>
  )
}
