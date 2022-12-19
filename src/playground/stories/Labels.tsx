import React from 'react'
import { Label } from '~/components/Label'

import ComponentViewer from '../ComponentViewer'

export const Labels = () => {
  const labelExampleOne = `import { Label } from '@based/ui'

  <Label label="Labeltje" description="make it">
    Child 
  </Label>      
  `

  const labelExampleTwo = `import { Label, ErrorIcon } from '@based/ui'

  <Label 
    label="Bonjour"
    labelColor="red"
    description="have a nice day"
    descriptionColor="accent"
    icon={<ErrorIcon />}
    iconColor="green"
  >
   Children
  </Label>`

  return (
    <ComponentViewer
      component={Label}
      propsName="LabelProps"
      examples={[
        {
          code: labelExampleOne,
        },
        {
          code: labelExampleTwo,
        },
      ]}
    />
  )
}
