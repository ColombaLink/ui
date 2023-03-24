import React, { FC } from 'react'
import { ContentLeft } from './ContentLeft'
import { Style, styled } from 'inlines'
import { StateProvider } from '../../hooks/ContextState'
import { View } from './types'
import { ContentMain } from './ContentMain'

export const Content: FC<{
  style?: Style
  values?: { db: string; view: string }
  onChange?: (key: string, val: string | View) => void
}> = ({ style, values, onChange }) => {
  return (
    <styled.div
      style={{
        display: 'flex',
        flexGrow: 1,
        overflowX: 'hidden',
        overflowY: 'hidden',
        ...style,
      }}
    >
      <StateProvider values={values} onChange={onChange}>
        <ContentLeft />
        <ContentMain />
        {/* <ContentModal id={id} field={field} /> */}
      </StateProvider>
    </styled.div>
  )
}
