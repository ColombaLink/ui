import React from 'react'
import { Label } from '~/components/Label'
import { ErrorIcon } from '~'

import ComponentViewer from '../ComponentViewer'

export const Labels = () => {
  return (
    <ComponentViewer
      component={Label}
      propsName="LabelProps"
      examples={[
        {
          props: {
            label: 'Label',
            description: 'Description',
            children: 'Children',
          },
        },
        {
          props: {
            label: 'Label',
            labelColor: 'accent',
            description: 'Description',
            descriptionColor: 'green',
            icon: <ErrorIcon />,
            iconColor: 'red',
          },
        },
      ]}
    />
  )
}
