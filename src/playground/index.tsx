import { render } from 'react-dom'
import React, { useState } from 'react'
import { Provider, Text, Page, Menu, Route, GridIcon, Switch } from '..'
import based from '@based/client'
import {
  Buttons,
  Checkboxes,
  Forms,
  InputFields,
  Selects,
} from './Stories/index'

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
            Checkboxes: '/checkboxes',
            Forms: '/forms',
            InputFields: '/inputfields',
            Selects: '/selects',
          },
        }}
      />
      <Page>
        <Switch>
          <Route path="/buttons" component={Buttons} />
          <Route path="/checkboxes" component={Checkboxes} />
          <Route path="/forms" component={Forms} />
          <Route path="/inputfields" component={InputFields} />
          <Route path="/selects" component={Selects} />
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
