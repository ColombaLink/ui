import React from 'react'
import { Code as CodeBox } from '~/components/Code'
import ComponentViewer from '../ComponentViewer'

export const Code = () => {
  return (
    <ComponentViewer
      component={CodeBox}
      propsName="CodeProps"
      examples={[
        {
          props: {
            value: "console.log('hello world')",
          },
        },
      ]}
    />
  )
}
