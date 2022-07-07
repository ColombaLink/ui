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
import { genRandomProps } from './genRandomProps'

const checkType = (str: string, type: any): boolean => {
  return type === str || (Array.isArray(type) && type.includes(str))
}

export const Explorer: FC<{
  p: any
  component: FC
  name: string
  exampleProps?: any
  exampleCode?: string
}> = ({ component, p, name, exampleProps, exampleCode }) => {
  const showType = useSearchParam('type')
  const fuzz = useSearchParam('randomize')

  if (!exampleProps) {
    exampleProps = genRandomProps(p)
  }

  if (!exampleCode) {
    const componentName = name.replace('Props', '')
    const components = [componentName]
    let propsHeader = []
    for (const k in exampleProps) {
      const v = exampleProps[k]
      const type = p.props[k].type
      if (typeof v === 'function') {
        if (checkType('FC', type)) {
          propsHeader.push(`${k}={${v.name}}`)
          components.push(v.name)
        } else {
          propsHeader.push(`${k}={${v.toString()}}`)
        }
      } else if (k === 'children') {
        // if (typeof props.children === 'object') {
        exampleProps.children = 'some children...'
      }
    }
    exampleCode = `import { ${components.join(', ')} } from '@based/ui'\n\n`
    const header = !propsHeader
      ? `<${componentName}`
      : `<${componentName} ${propsHeader.join(' ')}`

    if (exampleProps.children) {
      exampleCode += `${header}>
  ${exampleProps.children}
</${componentName}>      
`
    } else {
      exampleCode += header + '/>'
    }
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

        <Container
          style={{
            padding: 0,
            marginLeft: 24,
            width: '100%',
            flexGrow: 1,
            display: 'flex',
          }}
        >
          <Code
            style={{
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }}
          >
            {exampleCode}
          </Code>
          <div
            style={{
              borderLeft: '1px solid ' + color('OtherDivider'),
              minHeight: '100%',
              padding: 24,
              // minWidth: 250,
            }}
          >
            <Text weight={'600'}>Props</Text>
          </div>
        </Container>
      </div>
    </>
  )
}
