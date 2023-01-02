import React from 'react'
import { Button, CheckIcon } from '~'
import ComponentViewer from '../ComponentViewer'

export const Buttons = () => {
  return (
    <>
      <ComponentViewer
        component={Button}
        propsName="ButtonProps"
        examples={[
          {
            props: {
              children: 'Just a button',
              // eslint-disable-next-line
              onClick: () => console.log('clicked'),
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
              children: 'Ghost button',
              outline: true,
              ghost: true,
              color: 'lightaction',
            },
          },
          {
            props: {
              icon: CheckIcon,
              children: 'Button with icon',
            },
          },
          {
            props: {
              children: 'Light outline button',
              outline: true,
              light: true,
            },
          },
          {
            props: {
              children: 'Async button example',
              onClick: () => new Promise((resolve) => setTimeout(resolve, 1e3)),
            },
          },
        ]}
      />
    </>
  )
}
