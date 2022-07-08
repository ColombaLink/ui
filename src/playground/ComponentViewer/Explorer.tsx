import React, { FC, useEffect, useState, useRef } from 'react'
import { Props } from './ComponentProps'
import {
  Text,
  Container,
  RedoIcon,
  Code,
  Link,
  useSearchParam,
  setLocation,
  Button,
  ModelIcon,
} from '../../'
import * as ui from '../../'
import { Callout } from '~/components/Callout'
import { transformSync } from '@babel/core'
import preset from '@babel/preset-react'
import { generateRandomComponentCode } from './objectToCode'
import useLocalStorage from '@based/use-local-storage'

export const CodeExample: FC<{
  p: any
  component: FC
  name: string
  exampleCode?: string
  exampleProps?: string
  isModule?: boolean
  runCode?: string
  index: number
  isLast: boolean
}> = ({
  index,
  component,
  isLast,
  name,
  exampleCode,
  isModule,
  exampleProps,
  p,
}) => {
  let runCode = ''
  const [cnt, update] = useState(0)
  let [code, setCode] = useLocalStorage('code-' + name + '-' + index)

  if (code) {
    exampleCode = code
  }

  if (!exampleCode) {
    exampleCode = generateRandomComponentCode(name, exampleProps, p)
  }

  let child
  try {
    if (!runCode) {
      const input = exampleCode
        .replace('import ', 'const ')
        .replace("from '@based/ui'", ' = ui;')
      const x = transformSync(input, {
        presets: [preset],
      })
      runCode = x.code.replace(
        'React.createElement',
        'return React.createElement'
      )
    }
    const fn = new Function('ui', 'React', 'c', runCode)
    child = fn(ui, React, component)
  } catch (err) {
    console.error(err) // hosw
    child = <Callout color={'Red'}>{err.message}</Callout>
  }
  return (
    <>
      <Code
        topRight={
          <>
            <RedoIcon
              onClick={() => {
                setCode('')
                update(cnt + 1)
              }}
            />
          </>
        }
        style={{
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
        onChange={(c) => setCode(c)}
      >
        {exampleCode}
      </Code>
      <Container
        style={{
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderTopWidth: 0,
        }}
        space
      >
        {child}
      </Container>
    </>
  )
}

export const Explorer: FC<{
  p: any
  component: FC
  name: string
  examples?: { code?: string; props?: any; isModule?: boolean }[]
}> = ({ component, p, name, examples = [{}] }) => {
  const showType = useSearchParam('type')
  const fuzz = useSearchParam('randomize')

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          marginBottom: 24,
        }}
      >
        <Link href={`src${p.file}`}>
          <Text weight={700} size={'18px'}>
            {p.file.slice(1).split('/').slice(1, -1)}
          </Text>
        </Link>
        <div style={{ display: 'flex' }}>
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
            {fuzz ? 'Examples' : 'Randomize'}
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
      <div style={{ display: 'flex', marginTop: 24, width: '100%' }}>
        <div
          style={{
            minWidth: showType ? 550 : 400,
            marginRight: 24,
          }}
        >
          {showType ? <Code>{p.code}</Code> : <Props prop={p} />}
        </div>
        <div style={{ width: '100%' }}>
          {examples.map((v, i) => {
            return (
              <CodeExample
                isModule={v.isModule}
                isLast={i === examples.length - 1}
                key={i}
                index={i}
                name={name}
                component={component}
                p={p}
                exampleCode={v.code}
                exampleProps={v.props}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}
