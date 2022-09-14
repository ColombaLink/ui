import React from 'react'
import { Input, CheckIcon, EditIcon, LockIcon, EmailIcon } from '~'
import ComponentViewer from '../ComponentViewer'

export const InputFields = () => {
  return (
    <ComponentViewer
      component={Input}
      propsName="InputProps"
      examples={[
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
              if (!value) {
                return 'Please enter a value'
              }
            },
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
            label: 'Multiline',
            description: 'console logs value',
            multiline: true,
            onChange: (e) => console.log(e),
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
