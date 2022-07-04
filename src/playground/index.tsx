import { render } from 'react-dom'
import React, { FC, useEffect, useState } from 'react'
import {
  Provider,
  Text,
  Button,
  Page,
  Menu,
  Route,
  MenuButton,
  GridIcon,
  Switch,
  setLocation,
  useSearchParam,
} from '../'
import based from '@based/client'
import { Buttons } from './static/Buttons'

export const client = based({
  org: 'saulx',
  project: 'demo',
  env: 'production',
})

const stories: { [component: string]: FC } = {
  Buttons: Buttons,
}

type StoryProps = {
  component: FC
  name: string
}

const Story = ({ component, name }: StoryProps) => {
  const isCode = useSearchParam('mode') === 'code'
  const [code, setCode] = useState('')
  console.info(component)
  useEffect(() => {
    fetch(`/static/${name}.tsx`)
      .then((v) => v.text())
      .then((v) => setCode(v))
  }, [isCode])
  return <>{isCode ? code : React.createElement(component)}</>
}

const Stories = (params) => {
  // @ts-ignore
  if (params?.story) {
    // @ts-ignore
    const name = params.story[0].toUpperCase() + params.story.slice(1)
    const component = stories[name]
    if (!component) {
      return <div>empty</div>
    }
    return <Story component={component} name={name} />
  }
  return 'Overview'
}

const App = () => {
  const isCode = useSearchParam('mode') === 'code'

  return (
    <div style={{ flexGrow: 1, display: 'flex', height: '100%' }}>
      <Menu
        header={
          <div>
            <Button
              onClick={() => {
                setLocation({
                  merge: true,
                  params: { mode: isCode ? 'component' : 'code' },
                })
              }}
            >
              {isCode ? 'Components' : 'Show code'}
            </Button>
          </div>
        }
        data={{
          Input: {
            Buttons: '/buttons',
          },
        }}
      />
      <Page>
        <Route path="/:story">{Stories}</Route>
      </Page>
    </div>
  )
}

render(
  <Provider fill theme="light" client={client}>
    <App />
  </Provider>,
  document.body
)
