import React, { useState } from 'react'
import { Button, CheckIcon } from '~'
import ComponentViewer from '../ComponentViewer'

export const Buttons = () => {
  const [loadingState, setLoadingState] = useState(true)

  return (
    <ComponentViewer
      component={Button}
      propsName="ButtonProps"
      examples={[
        {
          props: {
            loading: loadingState,
            children: 'Just a button',
            onClick: () => setLoadingState(false),
          },
        },
        {
          props: {
            children: 'Light button',
            light: true,
          },
        },
        {
          props: {
            children: 'Ghost button',
            ghost: true,
          },
        },
        {
          props: {
            children: 'Button with icon',
            outline: true,
            icon: <CheckIcon />,
            large: true,
          },
        },
        {
          props: {
            children: 'Light outline button',
            outline: true,
            light: true,
          },
        },
      ]}
    />
  )
}
