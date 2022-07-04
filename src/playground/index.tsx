import { render } from 'react-dom'
import React, { useState } from 'react'
import { Provider, Text, Page, Sidebar, GridIcon } from '..'
import based from '@based/client'

export const client = based({
  org: 'saulx',
  project: 'demo',
  env: 'production',
})

const PlaygroundMenu = () => {}

const App = ({ user }) => {
  // make "page"
  return (
    <div style={{ display: 'flex', flexGrow: 1 }}>
      <Sidebar
        data={{
          Buttons: ['/', GridIcon],
        }}
      />
    </div>
  )
}

render(
  <Provider theme="light" client={client}>
    hello
  </Provider>,
  document.body
)
