import React from 'react'
import { Label } from '~/components/Label'
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
            description: 'have a nice day',
            children: 'Woman and children first',
          },
        },
      ]}
    />
  )
}
