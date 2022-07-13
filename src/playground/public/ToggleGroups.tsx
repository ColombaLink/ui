import React from 'react'
import { ToggleGroup } from '~/components/ToggleGroup'
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from '~/icons'
import ComponentViewer from '../ComponentViewer'

export const ToggleGroups = () => {
  const codeExample = `import { ToggleGroup, AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from '@based/ui'


  <ToggleGroup
        space
        data={[
          <AlignLeftIcon />, 
          <AlignCenterIcon />, 
          <AlignRightIcon />
        ]}
   />
  `

  return (
    <div>
      <ComponentViewer
        component={ToggleGroup}
        examples={[
          {
            props: {
              data: ['First', 'Second', 'Third', 'Fourth'],
            },
          },
          {
            code: codeExample,
          },
        ]}
      />
    </div>
  )
}
