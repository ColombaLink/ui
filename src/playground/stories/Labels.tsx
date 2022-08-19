import React from 'react'
import { Label } from '~/components/Label'
import { ErrorIcon } from '~/icons'
import ComponentViewer from '../ComponentViewer'

export const Labels = () => {
  return (
    <ComponentViewer
      component={Label}
      propsName="LabelProps"
      examples={[
        {
          props: {
            label: 'Labeltje',
            description: 'maken toch',
            children: 'Ach kind',
          },
        },
        {
          props: {
            label: 'Bonjour',
            labelColor: 'red',
            description: 'have a nice day',
            descriptionColor: 'accent',
            icon: <ErrorIcon />,
            iconColor: 'green',
            children: 'Woman and children first',
          },
        },
      ]}
    />
  )
}
