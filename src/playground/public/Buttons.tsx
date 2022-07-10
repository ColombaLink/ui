import React from 'react'
import { AddIcon, LightModeIcon, DarkModeIcon, Button } from '~'
import { CheckIcon } from '~/icons'
import wait from '~/utils/wait'
import ComponentViewer from '../ComponentViewer'

export const Buttons = () => {
  return (
    <ComponentViewer
      component={Button}
      examples={[
        {
          props: {
            children: 'Button',
          },
        },
        {
          props: {
            children: 'Button',
            light: true,
          },
        },

        {
          props: {
            children: 'Button',
            ghost: true,
          },
        },
        {
          props: {
            children: 'Button',
            outline: true,
          },
        },
        {
          props: {
            children: 'Button',
            outline: true,
            light: true,
          },
        },
      ]}
    />
  )
}
