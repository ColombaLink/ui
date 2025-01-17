import { FC, useState, useMemo } from 'react'
import {
  Text,
  Container,
  RedoIcon,
  Code,
  Link,
  useSearchParam,
  Button,
  ModelIcon,
  useRoute,
  color,
} from '../../'
import * as ui from '../../'
import { Callout } from '~/components/Callout'
import { generateRandomComponentCode } from './objectToCode'
import useLocalStorage from '@based/use-local-storage'
import parseCode from './parseCode'
import { ErrorBoundary } from 'react-error-boundary'

export const CodeExample: FC<{
  p: any
  component: FC
  name: string
  exampleCode?: string
  exampleProps?: string
  index: number
}> = ({ index, component, name, exampleCode, exampleProps, p }) => {
  const showCode = useRoute().query.code
  const [cnt, update] = useState(0)
  const [code, setCode] = useLocalStorage('code-' + name + '-' + index)

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
    const c = useMemo(() => parseCode(exampleCode), [exampleCode])

    // eslint-disable-next-line
    const fn = new Function('ui', 'React', 'c', c)

    child = (
      <ErrorBoundary
        fallbackRender={({ error }) => {
          return <Callout color="red">{error.message}</Callout>
        }}
      >
        {fn(ui, component)}
      </ErrorBoundary>
    )
  } catch (err) {
    console.error(err) // hosw
    child = <Callout color="red">{err.message}</Callout>
  }

  console.log({ child })

  return (
    <div
      style={{
        maxWidth: 'calc(100vw - 290px)',
      }}
    >
      {showCode ? (
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
            borderColor:
              code !== exampleCode ? color('border') : color('accent'),
          }}
          onChange={(c) => setCode(c)}
          value={exampleCode}
        />
      ) : null}
      <Container
        style={{
          borderTopLeftRadius: showCode ? 0 : 5,
          borderTopRightRadius: showCode ? 0 : 5,
          borderTopWidth: showCode ? 0 : 1,
          maxWidth: '100%',
        }}
      >
        {child}
      </Container>
    </div>
  )
}

export const Explorer: FC<{
  p: any
  component: FC
  title?: string
  name: string
  examples?: { code?: string; props?: any; component?: FC }[]
}> = ({ component, p, name, examples = [{}], title }) => {
  const [fuzz, setFuzz] = useSearchParam('randomize')

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 24,
        }}
      >
        <Link href={`src${p.file}`}>
          <Text weight={700} size="18px">
            {title || p?.file?.slice(1).split('/').slice(1, -1) || name}
          </Text>
        </Link>
        <div style={{ display: 'flex' }}>
          <Button
            ghost={!fuzz}
            color={fuzz ? 'accent' : 'text2'}
            light
            icon={ModelIcon}
            onClick={() => setFuzz(fuzz ? null : true)}
          >
            <Text weight={700}>Randomize</Text>
          </Button>
        </div>
      </div>
      <div style={{ display: 'flex', marginTop: 24 }}>
        <div style={{ flexGrow: 1 }}>
          {examples.map((v, i) => {
            if (v.component) {
              return (
                <Container key={fuzz ? 'f ' + i : i}>
                  {React.createElement(v.component)}
                </Container>
              )
            }
            return (
              <CodeExample
                key={fuzz ? 'f ' + i : i}
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
