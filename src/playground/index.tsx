import { render } from 'react-dom'
import React, { useState } from 'react'
import {
  Provider,
  Text,
  Button,
  Page,
  Menu,
  Route,
  MenuButton,
  GridIcon,
  Switch,
  setLocation,
  useSearchParam,
} from '../'
import based from '@based/client'
import { Buttons } from './Stories/Buttons'

export const client = based({
  org: 'saulx',
  project: 'demo',
  env: 'production',
})

// const PlaygroundMenu = () => {}

const App = () => {
  const param = useSearchParam('mode')

  console.info(param)

  return (
    <div style={{ flexGrow: 1, display: 'flex' }}>
      <Menu
        header={
          <div>
            <Button
              onClick={() => {
                setLocation({
                  params: { mode: param === 'code' ? 'component' : 'code' },
                })
              }}
            >
              {param === 'code' ? 'Components' : 'Show code'}
            </Button>
          </div>
        }
        data={{
          Input: {
            Buttons: '/buttons',
          },
        }}
      >
        <MenuButton
          ghost
          // iconLeft={AddIcon}
          onClick={() => {
            // const n = rooms.length + 1
            // setRooms([
            //   ...rooms,
            //   {
            //     label: 'Room ' + n,
            //     href: '/room' + n,
            //   },
            // ])
          }}
        >
          New room
        </MenuButton>
      </Menu>
      <Page>
        <Switch>
          <Route path="/buttons" component={Buttons} />
          <Route path="/">Overview...</Route>
        </Switch>
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
