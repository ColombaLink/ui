import React from 'react'
import { Button, CheckIcon } from '~'
import ComponentViewer from '../ComponentViewer'

export const Buttons = () => {
  return (
    <ComponentViewer
      component={Button}
      propsName="ButtonProps"
      examples={[
        {
          props: {
            children: 'Async button',
            onClick: async () =>
              await new Promise((resolve) => setTimeout(resolve, 1e3)),
          },
        },
        {
          props: {
            children: 'Just a button',
            onClick: () => alert('Clicked!'),
          },
        },
        {
          props: {
            children: 'Async button',
            onClick: async () =>
              await new Promise((resolve) => setTimeout(resolve, 1e3)),
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
