import React, { FC, useState, useMemo } from 'react'
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
import { generateRandomComponentCode } from './objectToCode'
import useLocalStorage from '@based/use-local-storage'
import parseCode from './parseCode'
import { color } from '../../'

export const CodeExample: FC<{
  p: any
  component: FC
  name: string
  exampleCode?: string
  exampleProps?: string
  fromComponent?: FC
  runCode?: string
  index: number
}> = ({ index, component, name, exampleCode, exampleProps, p }) => {
  const [cnt, update] = useState(0)
  let [code, setCode] = useLocalStorage('code-' + name + '-' + index)
  if (code) {
    exampleCode = code
  }
  exampleCode = useMemo(() => {
    if (!exampleCode) {
      exampleCode = generateRandomComponentCode(name, exampleProps, p)
    }
    return exampleCode
  }, [exampleCode])

  let child
  try {
    const fn = new Function(
      'ui',
      'React',
      'c',
      useMemo(() => parseCode(exampleCode), [exampleCode])
    )
    child = fn(ui, React, component)
  } catch (err) {
    console.error(err) // hosw
    child = <Callout color={'red'}>{err.message}</Callout>
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
              style={{
                cursor: 'pointer',
                color: code !== exampleCode ? color('text') : color('accent'),
              }}
            />
          </>
        }
        style={{
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          borderColor: code !== exampleCode ? color('border') : color('accent'),
        }}
        onChange={(c) => setCode(c)}
        value={exampleCode}
      />
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
  examples?: { code?: string; props?: any; component?: FC }[]
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
            light
            color="text"
            style={{ marginRight: 24 }}
            icon={ModelIcon}
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
            light
            color="text"
            icon={ModelIcon}
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
            minWidth: showType ? 550 : 350,
            marginRight: 24,
          }}
        >
          {showType ? <Code value={p.code} /> : <Props prop={p} />}
        </div>
        <div style={{ width: '100%', maxWidth: '100%' }}>
          {examples.map((v, i) => {
            if (v.component) {
              return (
                <Container key={i} space>
                  {React.createElement(v.component)}
                </Container>
              )
            }

            return (
              <CodeExample
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
