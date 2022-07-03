import { render } from 'react-dom'
import React from 'react'
import { Provider, Authorize, Topbar, LoadingIcon, Page } from '../../src'
import based from '@based/client'

export const client = based({
  org: 'saulx',
  project: 'demo',
  env: 'production',
})

const App = () => {
  return (
    <>
      <Topbar
        data={{ Projects: '/', Settings: '/settings' }}
        onProfile={() => {
          // add more here
          console.log('clicked')
        }}
      />
      <Page
        style={{
          border: '10px solid red',
        }}
      >
        {true ? <LoadingIcon /> : null}
      </Page>
    </>
  )
}

render(
  <Provider theme="light" client={client}>
    <Authorize logo app={App} />
  </Provider>,
  document.body
)
