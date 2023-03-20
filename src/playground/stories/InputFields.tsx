import React from 'react'
import { Input, CheckIcon } from '~'
import ComponentViewer from '../ComponentViewer'

export const InputFields = () => {
  return (
    <ComponentViewer
      propsDef={{
        name: 'Input',
        props: {
          value: {
            optional: true,
            // @ts-ignore
            type: ['string', 'number'],
          },
          placeholder: {
            optional: true,
            type: 'string',
          },
          type: {
            optional: false,
            // @ts-ignore
            type: [
              {
                value: 'text',
              },
              {
                value: 'number',
              },
            ],
          },
        },
        code: 'input type...',
        file: '/components/Input/index.tsx',
      }}
      component={Input}
      propsName="InputProps"
      examples={[
        {
          props: {
            pattern: '^([a-z0-9]{4,7})$',
            label: 'Custom regex label',
            description: 'Custom regex description',
            indent: true,
            icon: <CheckIcon />,
            iconRight: <CheckIcon />,
          },
        },
        {
          props: {
            label: 'Input label',
            description: 'this is description',
          },
        },
        {
          props: {
            label: 'Input label',
            description: 'this is description',
            icon: <CheckIcon />,
          },
        },
        {
          props: {
            digest: true,
            label: 'Digest input',
            description: 'Press icon to copy the SHA',
            indent: true,
          },
        },
        {
          props: {
            passwordInput: true,
            label: 'Password',
            description: 'Press eye to see the value',
            indent: true,
          },
        },
        {
          props: {
            markdownInput: true,
            label: 'Label for Markdown',
            description: 'Description for Markdown',
            descriptionBottom: 'this is bottom description',
            indent: true,
          },
        },
        {
          props: {
            label: 'Number or Float',
            descriptionBottom: 'this is description',
            indent: true,
            type: 'number',
          },
        },
        {
          props: {
            // make this work!
            label: 'Input label',
            maxChars: 200,
            descriptionBottom: 'Dit komt eronder',
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
            description: 'console logs value',
            multiline: true,
            onChange: (e) => console.info(e),
          },
        },
        {
          props: {
            label: 'Color',
            colorInput: true,
          },
        },
      ]}
    />
  )
}
