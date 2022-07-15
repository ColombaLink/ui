import React from 'react'
import ComponentViewer from '../ComponentViewer'
import { useToolTips } from '~/hooks/useToolTips'

export const Tooltips = () => {
  const tooltipListeners = useToolTips("I'm a tooltip", 'top')
  const tooltipListenersSec = useToolTips("I'm another tooltip", 'bottom')

  return (
    <>
      {/* <ComponentViewer
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
      /> */}

      <div
        style={{
          backgroundColor: 'lightblue',
          width: 100,
          height: 50,
          margin: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        {...tooltipListeners}
      >
        Tooltip Test
      </div>

      <div
        style={{
          backgroundColor: 'lightpink',
          width: 100,
          height: 50,
          margin: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        {...tooltipListenersSec}
      >
        Tooltip Test
      </div>
      <br />
    </>
  )
}
