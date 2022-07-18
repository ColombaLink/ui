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
            label: 'Input label',
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
      ]}
    />
  )
}
