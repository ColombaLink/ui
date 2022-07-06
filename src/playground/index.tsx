import { render } from 'react-dom'
import React, { FC, useEffect, useState } from 'react'
import {
  Provider,
  Button,
  Page,
  Menu,
  Route,
  Text,
  setLocation,
  Code,
  CurlyBracesIcon,
  useSearchParam,
} from '../'
import based from '@based/client'
import * as stories from './public'
import { themes } from '~/themes'
import { DarkModeIcon, LightModeIcon } from '../'
import { LargeLogo } from '../'

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
    fetch(
      `/public/${name}.json?rando=${(~~(Math.random() * 999999)).toString(16)}`
    )
      .then((v) => v.text())
      .then((v) => {
        console.info(v)
        try {
          setCode(JSON.parse(v.split('<script>')[0]).code)
        } catch (err) {}
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
      <Menu
        style={{
          minWidth: 300,
        }}
        header={
          <>
            <LargeLogo style={{ marginBottom: 24, marginTop: -12 }} />
            <div
              style={{
                display: 'flex',
              }}
            >
              <Button
                ghost
                style={{
                  marginLeft: -8,
                }}
                iconLeft={lightDark ? <DarkModeIcon /> : <LightModeIcon />}
                onClick={() => {
                  setLightDark(!lightDark)
                  themes(lightDark ? 'dark' : 'light')
                }}
              />
              <Button
                ghost
                iconLeft={<CurlyBracesIcon />}
                onClick={() => {
                  setLocation({
                    merge: true,
                    params: { mode: isCode ? 'normal' : 'code' },
                  })
                }}
              />
            </div>
          </>
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
            Icons: '/icons',
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
          Handbook: {
            Props: '/props',
          },
        }}
      />
      <Page style={{ padding: 32 }}>
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
