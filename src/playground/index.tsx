import { render } from 'react-dom'
import React, { useState } from 'react'
import { Provider, Text, Page, Menu, Route, GridIcon, Switch } from '..'
import based from '@based/client'
import { Buttons } from './Stories/Buttons'

export const client = based({
  org: 'saulx',
  project: 'demo',
  env: 'production',
})

const PlaygroundMenu = () => {}

const App = () => {
  // make "page"
  return (
    <>
      <Menu
        data={{
          Input: {
            Buttons: '/buttons',
          },
        }}
      />
      <Page>
        <Switch>
          <Route path="/buttons" component={Buttons} />
          <Route path="/">Overview...</Route>
        </Switch>
      </Page>
    </>
  )
}

render(
  <Provider fill theme="light" client={client}>
    <App />
  </Provider>,
  document.body
)
