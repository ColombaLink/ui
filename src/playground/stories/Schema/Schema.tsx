import React from 'react'
import { Page, color } from '~'
import { Schema as SchemaEditor } from '~/components/Schema'

export const Schema = () => {
  return (
    <div style={{ display: 'flex', flexGrow: 1 }}>
      <div
        style={{
          width: '100%',
          border: `1px solid ${color('border')}`,
          borderRadius: 4,
        }}
      >
        <SchemaEditor
          db="default"
          style={{
            height: 400,
          }}
        />
      </div>
    </div>
  )
}
