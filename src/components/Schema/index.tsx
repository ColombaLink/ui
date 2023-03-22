import React, { FC } from 'react'
import { SchemaMain } from './SchemaMain'
import { SchemaLeft } from './SchemaLeft'
import { Style, styled } from 'inlines'
import { StateProvider } from '../ContextState'

export * from './useSchema'
export * from './templates'

export const Schema: FC<{
  style?: Style
  values?: { field: string[]; type: string; db: string }
  onChange?: (key: string, val: any) => void
}> = ({ style, values, onChange }) => {
  return (
    <styled.div
      style={{ display: 'flex', flexGrow: 1, overflow: 'hidden', ...style }}
    >
      <StateProvider values={values} onChange={onChange}>
        <SchemaLeft />
        <SchemaMain />
      </StateProvider>
    </styled.div>
  )
}
