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

const App = () => {
  // make "page"
  return (
    <>
      <Sidebar
        data={{
          Buttons: ['/', GridIcon],
        }}
      />
    </>
  )
}

render(
  <Provider fill theme="light" client={client}>
    <App />
  </Provider>,
  document.body
)
