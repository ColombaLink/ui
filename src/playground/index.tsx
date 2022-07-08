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
  CurlyBracesIcon,
  useSearchParam,
} from '../'
import based from '@based/client'
import * as stories from './public'
import { themes } from '~/themes'
import { DarkModeIcon, LightModeIcon } from '../'
import { toPascalCase } from './utils'
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
        try {
          setCode(JSON.parse(v.split('<script>')[0]).code)
        } catch (err) {}
      })
  }, [isCode, name])

  return <>{isCode ? <Code>{code}</Code> : React.createElement(component)}</>
}

const Stories = (params) => {
  if (params?.story) {
    const name = toPascalCase(params?.story)
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
          paddingLeft: 32,
          // minWidth: 300,
          paddingRight: 32,
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
            ColorPicker: '/color-picker',
            Forms: '/forms',
            InputFields: '/input-fields',
            Selects: '/selects',
          },
          Display: {
            Avatars: '/avatars',
            Badges: '/badges',
            Cards: '/cards',
            Icons: '/icons',
            Steps: '/step',
            Thumbnails: '/thumbnails',
          },
          Feedback: {
            Callouts: '/callouts',
            Notifications: '/notifications',
          },
          Code: {
            Code: '/code',
          },
          Layout: {
            Accordions: '/accordions',
            Container: '/Containers',
            Grids: '/grids',
            Tabs: '/TabsView',
          },
          Navigation: {
            Breadcrumbs: '/breadcrumb',
            Topbar: '/topbars',
          },
          Overlays: {
            ContextMenus: '/context-menus',
          },
          Screens: {
            ProfileSettings: '/profile-settings',
            ProjectSettings: '/project-settings',
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
