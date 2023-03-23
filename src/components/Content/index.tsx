import React, { FC } from 'react'
import { ContentLeft } from './ContentLeft'
import { Style, styled } from 'inlines'
import { StateProvider } from '../ContextState'

export const Content: FC<{
  style?: Style
  values?: { db: string }
  onChange?: (key: string, val: any) => void
}> = ({ style, values, onChange }) => {
  return (
    <styled.div
      style={{
        display: 'flex',
        flexGrow: 1,
        ...style,
      }}
    >
      <StateProvider values={values} onChange={onChange}>
        <ContentLeft />
        {/* <ContentMain view={type} /> */}
        {/* <ContentModal id={id} field={field} /> */}
      </StateProvider>
    </styled.div>
  )
}
