import { render } from 'react-dom'
import React, { FC, useEffect, useState } from 'react'
import {
  Provider,
  Button,
  Page,
  Menu,
  Route,
  setLocation,
  useSearchParam,
} from '../'
import based from '@based/client'
import * as stories from './public'

export const client = based({
  org: 'saulx',
  project: 'demo',
  env: 'production',
})

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
            Checkboxes: '/checkboxes',
            Forms: '/forms',
            InputFields: '/inputfields',
            Selects: '/selects',
          },
          Display: {
            Avatars: '/avatars',
            Badges: '/badges',
            Cards: '/cards',
            Thumbnails: '/thumbnails',
          },
          Feedback: {
            Callouts: '/callouts',
          },
          Overlays: {
            ContextMenus: '/contextmenus',
          },
          Screens: {
            ProfileSettings: '/profilesettings',
            ProjectSettings: '/projectsettings',
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
  <Provider fill theme="dark" client={client}>
    <App />
  </Provider>,
  document.body
)
