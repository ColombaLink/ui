import { render } from 'react-dom'
import React, { FC, useEffect, useState } from 'react'
import {
  Provider,
  Button,
  Page,
  Menu,
  Route,
  setLocation,
  Code,
  useSearchParam,
} from '../'
import based from '@based/client'
import * as stories from './public'
import { themes } from '~/themes'
import { DarkModeIcon, LightModeIcon } from '../'
import props from './props.json'

// @ts-ignore
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
  useEffect(() => {
    fetch(`/public/${name}.json`)
      .then((v) => v.json())
      .then((v) => {
        console.info(v)
        setCode(v.code)
      })
  }, [isCode, name])
  return <>{isCode ? <Code>{code}</Code> : React.createElement(component)}</>
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
  const [lightDark, setLightDark] = useState(true)

  return (
    <div style={{ flexGrow: 1, display: 'flex', height: '100%' }}>
      <Button
        style={{
          position: 'absolute',
          top: 0,
          right: 12,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          paddingBottom: 8,
        }}
        color="Greylight"
        iconLeft={lightDark ? <DarkModeIcon /> : <LightModeIcon />}
        onClick={() => {
          setLightDark(!lightDark)
          themes(lightDark ? 'dark' : 'light')
        }}
      ></Button>
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
          Code: {
            Code: '/code',
          },
          Layout: {
            Grids: '/grids',
          },
          Overlays: {
            ContextMenus: '/contextmenus',
          },
          Screens: {
            ProfileSettings: '/profilesettings',
            ProjectSettings: '/projectsettings',
          },
          Themes: {
            Theming: '/theming',
          },
          Text: {
            Text: '/text',
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
