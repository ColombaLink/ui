import { createRoot } from 'react-dom/client'
import React, { FC, useState } from 'react'
import {
  Provider,
  Button,
  Page,
  Menu,
  Input,
  SearchIcon,
  LargeLogo,
  DarkModeIcon,
  LightModeIcon,
  ExternalLinkIcon,
  AppFrame,
  color,
  useRoute,
} from '../'
import { BasedClient } from '@based/client'
import * as stories from './stories'
import { toPascalCase } from './utils'
import { useDarkMode } from '~/hooks/useDarkMode'
import useLocalStorage from '@based/use-local-storage'

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
    const name = toPascalCase(story)
    const component = stories[name]
    if (!component) {
      return <div>empty</div>
    }
    return React.createElement(component)
  }
  return <>Overview</>
}

// ['Buttons'], ['Buttons', { icon, name, value, onClick }]

const menuItems = {
  Input: ['Buttons'],
}

const App = () => {
  const [fullscreen, setFullscreen] = useState(false)
  const [darkMode, setDarkMode] = useDarkMode()
  const [filteredObj, setFilteredObj] = useState<Object>(menuItems)

  if (fullscreen) {
    return <Stories />
  }

  const searchFilterHandler = (value: string) => {
    if (value === '') {
      setFilteredObj(menuItems)
      return
    }
    const filteredArr = []
    for (const key in menuItems) {
      for (const subKey in menuItems[key]) {
        if (subKey.toLowerCase().includes(value.toLowerCase())) {
          filteredArr.push([subKey, menuItems[key][subKey]])
        }
      }
    }
    const filteredObjTest = Object.fromEntries(filteredArr)
    setFilteredObj({ Results: filteredObjTest })
  }

  return (
    <AppFrame>
      <Menu
        collapse
        header={
          <>
            <LargeLogo style={{ marginBottom: 24 }} />
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
