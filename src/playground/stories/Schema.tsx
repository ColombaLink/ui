import React from 'react'
import { Page } from '~'
import { SchemaEditor } from '~/components/Schema'

export const Schema = () => {
  return (
    <div style={{ display: 'flex', flexGrow: 1 }}>
      <Page>
        <SchemaEditor />
      </Page>
    </div>
  )
}
