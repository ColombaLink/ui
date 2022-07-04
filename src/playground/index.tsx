import { render } from 'react-dom'
import React, { useState } from 'react'
import { Provider, Text, Page, Menu, Route, GridIcon, Switch } from '..'
import based from '@based/client'
import {
  Avatars,
  Badges,
  Buttons,
  Cards,
  Callouts,
  Checkboxes,
  ContextMenus,
  Forms,
  InputFields,
  Selects,
  Thumbnails,
} from './Stories/index'

export const client = based({
  org: 'saulx',
  project: 'demo',
  env: 'production',
})

const PlaygroundMenu = () => {}

const App = () => {
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
          Display: {
            Avatars: '/avatars',
            Badges: '/badges',
            Cards: '/cards',
            Thumbnails: '/thumbnails',
          },
          Feedback: {
            Callouts: '/callouts',
          },
          Overlays: {
            ContextMenus: '/contextmenus',
          },
        }}
      />
      <Page>
        <Switch>
          <Route path="/buttons" component={Buttons} />
          <Route path="/checkboxes" component={Checkboxes} />
          <Route path="/cards" component={Cards} />
          <Route path="/callouts" component={Callouts} />
          <Route path="/contextmenus" component={ContextMenus} />
          <Route path="/forms" component={Forms} />
          <Route path="/inputfields" component={InputFields} />
          <Route path="/selects" component={Selects} />
          <Route path="/avatars" component={Avatars} />
          <Route path="/badges" component={Badges} />
          <Route path="/thumbnails" component={Thumbnails} />
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
