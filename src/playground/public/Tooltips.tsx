import React, { useEffect, useRef, useState, FC } from 'react'
import ComponentViewer from '../ComponentViewer'

import { useToolTip } from '~/hooks/useToolTip'

export const Tooltips = () => {
  const ButtonRef = useRef()

  // Use like this
  useEffect(() => {
    useToolTip(ButtonRef, 'New tooltip', 'right')
  }, [])

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
        }}
        ref={ButtonRef}
      >
        Test
      </div>
      <br />
    </>
  )
}
