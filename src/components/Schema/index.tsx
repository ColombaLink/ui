import React, { FC } from 'react'
import { SchemaMain } from './SchemaMain'
import { SchemaLeft } from './SchemaLeft'
import { Style, styled } from 'inlines'
import { StateProvider } from '../ContextState'

export const Schema: FC<{
  db?: string
  style?: Style
  values?: { [key: string]: any }
  onChange?: (key: string, val: any) => void
}> = ({ db = 'default', style, values, onChange }) => {
  return (
    <styled.div
      style={{ display: 'flex', flexGrow: 1, overflow: 'hidden', ...style }}
    >
      <StateProvider values={values} onChange={onChange}>
        <SchemaLeft />
        <SchemaMain db={db} />
      </StateProvider>
    </styled.div>
  )
}
