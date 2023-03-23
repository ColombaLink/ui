import { createRoot } from 'react-dom/client'
import React, { FC, useState } from 'react'
import {
  Provider,
  Button,
  Page,
  Text,
  Menu,
  Input,
  SearchIcon,
  LargeLogo,
  MenuData,
  DarkModeIcon,
  LightModeIcon,
  ExternalLinkIcon,
  AppFrame,
  color,
  useRoute,
  LayersIcon,
} from '../'
import { BasedClient } from '@based/client'
import * as components from './components'
import * as apps from './apps'
import * as hooks from './hooks'
import { useDarkMode } from '~/hooks/useDarkMode'
import useLocalStorage from '@based/use-local-storage'
import { icons } from './ComponentViewer/genRandomProps'

const stories = {
  ...components,
  ...apps,
  ...hooks,
}

export const client = new BasedClient({
  project: 'test',
  org: 'saulx',
  env: 'cli',
  discoveryUrls: ['http://localhost:40159'],
})

const Stories: FC = () => {
  const route = useRoute('[story]')
  const { story } = route.path
  if (story) {
    const name = String(story)
    const component = stories[name]
    if (!component) {
      return <div>empty</div>
    }
    return <>{route.nest(React.createElement(component))}</>
  }
  return <>Overview</>
}

const menuItems = {
  Apps: Object.keys(apps).map((v, i) => {
    return {
      value: v,
      icon: v === 'Schema' ? <LayersIcon /> : React.createElement(icons[i]),
      label: <Text weight={700}>{v}</Text>,
    }
  }),
  Components: Object.keys(components),
  Hooks: Object.keys(hooks),
}

const App = () => {
  const [fullscreen, setFullscreen] = useState(false)
  const [darkMode, setDarkMode] = useDarkMode()
  const [filteredObj, setFilteredObj] = useState<MenuData>(menuItems)
  const route = useRoute('[story]')

  if (fullscreen) {
    return <Stories />
  }

  const searchFilterHandler = (value: string) => {
    if (value === '') {
      setFilteredObj(menuItems)
      return
    }
    const filteredArr: { [key: string]: string[] } = {}
    for (const key in menuItems) {
      if (Array.isArray(menuItems[key])) {
        for (const subKey of menuItems[key]) {
          if (
            typeof subKey === 'object'
              ? subKey.value.toLowerCase().includes(value.toLowerCase())
              : subKey.toLowerCase().includes(value.toLowerCase())
          ) {
            if (!filteredArr[key]) {
              filteredArr[key] = []
            }
            filteredArr[key].push(subKey)
          }
        }
      }
    }
    setFilteredObj(filteredArr)
  }

  return (
    <AppFrame>
      <Menu
        active={route.path.story}
        onChange={(story) => route.setPath({ story })}
        collapse
        header={
          <>
            <LargeLogo
              onClick={() => {
                route.setPath({ story: null })
              }}
              style={{ marginBottom: 24 }}
            />
            <div
              style={{
                display: 'flex',
              }}
            >
              <Button
                color="text"
                space="12px"
                ghost
                style={{
                  marginLeft: -8,
                }}
                icon={darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                onClick={() => setDarkMode(!darkMode)}
              />
              <Button
                color="text"
                space="12px"
                ghost
                icon={ExternalLinkIcon}
                onClick={() => setFullscreen(!fullscreen)}
              />
            </div>
            <div style={{ marginLeft: -8, marginRight: -8, marginBottom: 20 }}>
              <Input
                type="text"
                icon={<SearchIcon />}
                placeholder="Search"
                space
                onChange={(e) => searchFilterHandler(e)}
                ghost
                style={{
                  backgroundColor: color('background2'),
                  boxShadow: '0px',
                  outline: 'none',
                  height: 40,
                  alignItems: 'center',
                  borderRadius: 8,
                  paddingTop: '8px',
                }}
              />
            </div>
          </>
        }
        data={filteredObj}
      />
      <Page>
        <Stories />
      </Page>
    </AppFrame>
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

const app = document.createElement('div')
document.body.appendChild(app)
const root = createRoot(app)
root.render(<Wrapper />)
