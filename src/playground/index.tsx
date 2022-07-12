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
import { DarkModeIcon, LightModeIcon } from '../'
import { toPascalCase } from './utils'
import { LargeLogo } from '../'
import { useDarkMode } from '~/hooks/useDarkMode'
import useLocalStorage from '@based/use-local-storage'

// @ts-ignore
export const client = based({
  org: 'saulx',
  project: 'demo',
  env: 'production',
})

const Stories = (params) => {
  if (params?.story) {
    const name = toPascalCase(params?.story)
    const component = stories[name]
    if (!component) {
      return <div>empty</div>
    }
    return React.createElement(component)
  }
  return 'Overview'
}

const App = () => {
  const [darkMode, setDarkMode] = useDarkMode()
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
                color="text"
                ghost
                style={{
                  marginLeft: -8,
                }}
                iconLeft={darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                onClick={() => setDarkMode(!darkMode)}
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
            Radiobuttons: '/Radiobuttons',
            Selects: '/selects',
            Togglers: '/togglers',
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
            Toasts: '/toasts',
            Tooltips: '/tooltips',
          },
          Code: {
            Code: '/code',
          },
          Layout: {
            Accordions: '/accordions',
            Container: '/Containers',
            Grids: '/grids',
            MasonryGrid: '/masonryGrid',
            Tables: '/tables',
            Tabs: '/tabsView',
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
          Insights: {
            LineGraph: '/lineGraph',
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

const Wrapper = () => {
  const [themes] = useLocalStorage('themes')
  return (
    <Provider fill client={client} themes={themes || {}}>
      <App />
    </Provider>
  )
}
render(<Wrapper />, document.body)
