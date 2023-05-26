/* eslint-disable no-useless-escape */

import React from 'react'
import { Input as InputComponent, CheckIcon, EmailIcon, SearchIcon } from '~'
import ComponentViewer from '../ComponentViewer'

export const Input = () => {
  return (
    <ComponentViewer
      component={InputComponent}
      propsName="InputProps"
      examples={[
        {
          props: {
            bg: true,
            type: 'search',
            icon: SearchIcon,
          },
        },
        {
          props: {
            label: 'Date Time input',
            description: 'type is date',
            type: 'date',
            descriptionBottom: 'bottom ',
          },
        },
        {
          props: {
            label: 'Text inputfield',
            description: 'default input field',
            type: 'text',
          },
        },
        {
          props: {
            label: 'Text inputfield with icon',
            description: 'default input field',
            placeholder: 'Placeholder text here',
            icon: <CheckIcon />,
            type: 'text',
          },
        },
        {
          props: {
            label: 'Number or Float',
            descriptionBottom: 'type is number',
            indent: true,
            type: 'number',
          },
        },
        {
          props: {
            label: 'Input limited characters',
            maxChars: 60,
            type: 'text',
            descriptionBottom: `type 'yo' for an error`,
            indent: true,
            error: (value) => {
              if (value === 'yo') {
                return 'What up yo??'
              }
            },
          },
        },
        {
          props: {
            label: 'Multiline',
            description: 'type is multiline',
            type: 'multiline',
            onChange: (e) => console.info(e),
          },
        },
        {
          props: {
            label: 'Email inputfield',
            description: 'type = email',
            type: 'email',
            iconRight: <EmailIcon />,
          },
        },
        {
          props: {
            label: 'Markdown input',
            description: 'type is markdown',
            type: 'markdown',
          },
        },
        {
          props: {
            label: 'JSON input',
            description: 'type is json',
            type: 'json',
          },
        },
        {
          props: {
            pattern: '^([a-z0-9]{4,7})$',
            label: 'Custom regex',
            description:
              'add pattern prop for custom regex check example: ^([a-z0-9]{4,7})$',
            indent: true,
          },
        },
        {
          props: {
            label: 'Password input',
            description: 'type is password',
            type: 'password',
          },
        },
        {
          props: {
            type: 'digest',
            label: 'Digest input',
            description: 'type = digest , Press icon to copy the SHA',
            indent: true,
          },
        },
        {
          props: {
            label: 'Color',
            description: 'type is color',
            type: 'color',
          },
        },
      ]}
    />
  )
}
