import React from 'react'
import { Tooltip } from '~/components/Tooltip'
import { Button } from '~/components/Button'
import ComponentViewer from '../ComponentViewer'
import { Text } from '~'
import { useToolTip } from '~/hooks/useToolTip'

export const Tooltips = () => {
  return (
    <>
      <ComponentViewer
        component={Tooltip}
        examples={[
          {
            props: {
              label: 'Tooltip label',
              children: <Button>Hover me!</Button>,
            },
          },
          {
            props: {
              label: 'Tooltip label',
              position: 'top',
              children: <Button>Top Hover me!</Button>,
            },
          },
        ]}
      />
    </>
  )
}
