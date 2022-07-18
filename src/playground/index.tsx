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
  useRoute,
  useLocation,
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

const Stories = () => {
  useLocation()
  const story = new URLSearchParams(location.search).get('story')
  if (story) {
    const name = toPascalCase(story)
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
                icon={darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                onClick={() => setDarkMode(!darkMode)}
              />
            </div>
          </>
        }
        data={{
          Input: {
            Buttons: '?story=buttons',
            Checkboxes: '?story=checkboxes',
            ColorPicker: '?story=color-picker',
            Forms: '?story=forms',
            InputFields: '?story=input-fields',
            Radiobuttons: '?story=radiobuttons',
            Selects: '?story=selects',
            Sliders: '?story=sliders',
            Toggler: '?story=togglers',
            ToggleGroups: '?story=ToggleGroups',
          },
          Display: {
            Avatars: '?story=avatars',
            Badges: '?story=badges',
            Cards: '?story=cards',
            Icons: '?story=icons',
            Steps: '?story=step',
            Thumbnails: '?story=thumbnails',
          },
          Feedback: {
            Callouts: '?story=callouts',
            Toasts: '?story=toasts',
            Tooltips: '?story=tooltips',
          },
          Code: {
            Code: '?story=code',
          },
          Layout: {
            Accordions: '?story=accordions',
            Container: '?story=Containers',
            Grids: '?story=grids',
            Lists: '?story=lists',
            MasonryGrid: '?story=masonryGrid',
            Tables: '?story=tables',
            Tabs: '?story=tabsView',
          },
          Navigation: {
            Breadcrumbs: '?story=breadcrumb',
            SideMenu: '?story=SideMenu',
            Topbar: '?story=topbars',
          },
          Overlays: {
            ContextMenus: '?story=context-menus',
          },
          Screens: {
            Inbox: '?story=inbox',
            ProfileSettings: '?story=profile-settings',
            ProjectSettings: '?story=project-settings',
            SyncSession: '?story=sync-session',
          },
          Themes: {
            Theming: '?story=theming',
          },
          Text: {
            Text: '?story=text',
          },
          Insights: {
            LineGraph: '?story=lineGraph',
          },
          Handbook: {
            Props: '?story=props',
          },
        }}
      />
      <Page style={{ padding: 32 }}>
        <Stories />
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
