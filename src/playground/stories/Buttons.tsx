import React from 'react'
import { Button, CheckIcon, EmailIcon } from '~'
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
              onClick: () => console.info('clicked'),
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
              icon: <CheckIcon />,
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
          {
            props: {
              children: 'Large button',
              large: true,
              icon: <EmailIcon />,
              keyboardShortcut: 'Enter',
              displayShortcut: true,
              onClick: () => console.info('clicked'),
            },
          },
        ]}
      />
    </>
  )
}
