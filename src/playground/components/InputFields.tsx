import React from 'react'
import { Input, CheckIcon } from '~'
import ComponentViewer from '../ComponentViewer'

export const InputFields = () => {
  return (
    <ComponentViewer
      // propsDef={{
      //   name: 'Input',
      //   props: {
      //     value: {
      //       optional: true,
      //       // @ts-ignore
      //       type: ['string', 'number'],
      //     },
      //     placeholder: {
      //       optional: true,
      //       type: 'string',
      //     },
      //     type: {
      //       optional: false,
      //       // @ts-ignore
      //       type: [
      //         {
      //           value: 'text',
      //         },
      //         {
      //           value: 'number',
      //         },
      //       ],
      //     },
      //   },
      //   code: 'input type...',
      //   file: '/components/Input/index.tsx',
      // }}
      component={Input}
      propsName="InputProps"
      examples={[
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
        // {
        //   props: {
        //     label: 'Password input',
        //     description: 'type is password',
        //     type: 'password',
        //   },
        // },

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
