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
  const [cnt, update] = useState(0)
  let [code, setCode] = useLocalStorage('code-' + name)

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
      <Link href={`src${p.file}`}>
        <Text weight={700} size={'18px'} style={{ marginBottom: 24 }}>
          {p.file.slice(1).split('/').slice(1, -1)}
        </Text>
      </Link>
      <div style={{ display: 'flex', marginTop: 24, width: '100%' }}>
        <div
          style={{
            minWidth: showType ? 550 : 400,
            marginRight: 24,
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
            onChange={(c) => setCode(c)}
            space
          >
            {exampleCode}
          </Code>
          <Container>{child}</Container>
        </div>
      </div>
    </>
  )
}
