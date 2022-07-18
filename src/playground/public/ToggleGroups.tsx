import React from 'react'
import { ToggleGroup } from '~/components/ToggleGroup'
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
        propsName="ToggleGroupProps"
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
