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
          },
        },
        {
          props: {
            label: 'Text inputfield with icon',
            description: 'default input field',
            placeholder: 'Placeholder text here',
            icon: <CheckIcon />,
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
            placeholder: 'Placeholder text here',
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
        //     pattern: '^([a-z0-9]{4,7})$',
        //     label: 'Custom regex label',
        //     description: 'Custom regex description',
        //     indent: true,
        //     icon: <CheckIcon />,
        //     iconRight: <CheckIcon />,
        //   },
        // },
        // {
        //   props: {
        //     label: 'Input label',
        //     description: 'this is description',
        //   },
        // },
        // {
        //   props: {
        //     label: 'Input label',
        //     description: 'this is description',
        //     icon: <CheckIcon />,
        //     type: 'number',
        //   },
        // },
        // {
        //   props: {
        //     type: 'digest',
        //     label: 'Digest input',
        //     description: 'Press icon to copy the SHA',
        //     indent: true,
        //   },
        // },
        // {
        //   props: {
        //     type: 'password',
        //     label: 'Password',
        //     description: 'Press eye to see the value',
        //     indent: true,
        //   },
        // },
        // {
        //   props: {
        //     type: 'markdown',
        //     label: 'Label for Markdown',
        //     description: 'Description for Markdown',
        //     descriptionBottom: 'this is bottom description',
        //     indent: true,
        //   },
        // },

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
