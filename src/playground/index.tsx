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
  CurlyBracesIcon,
  AppFrame,
  color,
  useRoute,
  LayersIcon,
  DeleteIcon,
  EmailIcon,
} from '../'
import * as components from './components'
import * as apps from './apps'
import * as hooks from './hooks'
import { useDarkMode } from '~/hooks/useDarkMode'
import useLocalStorage from '@based/use-local-storage'
import { icons } from './ComponentViewer/genRandomProps'
import { client, adminClient } from './based'

const stories = {
  ...components,
  ...apps,
  ...hooks,
}

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
  return <></>
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
  const [darkMode, setDarkMode] = useDarkMode()
  const [filteredObj, setFilteredObj] = useState<MenuData>(menuItems)
  const route = useRoute('[story]')

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
        onChange={(story) => {
          route.setQuery(null)
          route.setPath({ story })
        }}
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
                color={route.query.code ? 'accent' : 'text'}
                space="12px"
                ghost
                icon={<CurlyBracesIcon size={12} />}
                onClick={() =>
                  route.setQuery({ code: route.query.code ? null : true })
                }
              />
              <Button
                ghost
                space="12px"
                icon={<EmailIcon />}
                onClick={async () => {
                  // connect ot env admin hub as well
                  await adminClient.call('login', {
                    email: 'jim@saulx.com',
                    skipEmailForTesting: true,
                    code:
                      (~~(Math.random() * 1e6)).toString(16) +
                      ' ' +
                      ' ui-playground',
                  })
                  await client.setAuthState(
                    await adminClient.once('authstate-change')
                  )
                }}
              />
              <Button
                space="12px"
                ghost
                icon={<DeleteIcon />}
                onClick={() => {
                  return client.clearStorage()
                }}
              />
            </div>
            <div style={{ marginLeft: -8, marginRight: -8, marginBottom: 20 }}>
              <Input
                type="text"
                icon={<SearchIcon />}
                placeholder="Search"
                space
                onChange={(e) => {
                  console.log(e)
                  console.log(typeof e)
                  searchFilterHandler(e)
                  // if(typeof e ==="string"){
                  //   searchFilterHandler(e)
                  // }
                }}
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
document.body.style.overflow = 'hidden'
const root = createRoot(app)
root.render(<Wrapper />)
