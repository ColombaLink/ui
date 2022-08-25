import { render } from 'react-dom'
import React, { FC } from 'react'
import { Provider, Button, Page, Menu, useLocation } from '../'
import based from '@based/client'
import * as stories from './stories'
import { DarkModeIcon, LightModeIcon } from '../'
import { toPascalCase } from './utils'
import { LargeLogo } from '../'
import { useDarkMode } from '~/hooks/useDarkMode'
import useLocalStorage from '@based/use-local-storage'
import basedConfig from './based.json'

export const client = based(basedConfig)

const Stories: FC = () => {
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
  return <>Overview</>
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
            Toggle: '?story=toggles',
            ToggleGroups: '?story=ToggleGroups',
          },
          Display: {
            Avatars: '?story=avatars',
            Badges: '?story=badges',
            Cards: '?story=cards',
            Icons: '?story=icons',
            Label: '?story=labels',
            Steps: '?story=step',
            Thumbnails: '?story=thumbnails',
            Separator: '?story=separators',
            Spacer: '?story=Spacers',
          },
          Feedback: {
            Callouts: '?story=callouts',
            Dialogs: '?story=dialogs',
            Toasts: '?story=toasts',
          },
          Code: {
            Code: '?story=code',
          },
          Layout: {
            Accordions: '?story=accordions',
            Container: '?story=Containers',
            Flow: '?story=FlowSequences',
            Grids: '?story=grids',
            ExpandableList: '?story=ExpandableLists',
            InfiniteList: '?story=InfiniteLists',
            Lists: '?story=lists',
            MasonryGrid: '?story=masonryGrid',
            Page: '?story=pages',
            Tables: '?story=tables',
            Tabs: '?story=tabsView',
          },
          Navigation: {
            Breadcrumbs: '?story=breadcrumb',
            SideMenu: '?story=SideMenu',
            Sidebar: '?story=SideBar',
            Topbar: '?story=topbars',
          },
          Overlays: {
            ContextMenus: '?story=context-menus',
          },
          Screens: {
            Inbox: '?story=inbox',
            ProfileSettings: '?story=profile-settings',
            ProjectSettings: '?story=project-settings',
            Auth: '?story=auth',
            Tally: '?story=tally-screens',
          },
          Themes: {
            Theming: '?story=theming',
          },
          Text: {
            Text: '?story=text',
          },
          Insights: {
            BarGraphs: '?story=BarGraphs',
            LineGraph: '?story=lineGraph',
            PieGraph: '?story=PieGraphs',
            ResultCards: '?story=ResultCards',
            // ScatterResults: '?story=ScatterResults',
          },
          Hooks: {
            Tooltips: '?story=tooltips',
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
