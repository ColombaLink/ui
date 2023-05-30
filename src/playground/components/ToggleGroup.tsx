import React from 'react'
import { ToggleGroup as ToggleGroupComponent } from '~/components/ToggleGroup'
import ComponentViewer from '../ComponentViewer'

export const ToggleGroup = () => {
  const codeExample = `import { ToggleGroup, AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from '@based/ui'

  <ToggleGroup
        style={{marginBottom:24}}
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
        component={ToggleGroupComponent}
        propsName="ToggleGroupProps"
        examples={[
          {
            props: {
              data: ['First', 'Second', 'Third', 'Fourth'],
              onChange: (value: number) => {
                console.log(value)
              },
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
