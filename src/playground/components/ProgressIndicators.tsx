import React from 'react'
import { InfiniteList } from '~/components/InfiniteList'
import { ProgressBar } from '~/components/ProgressBar'
import ComponentViewer from '../ComponentViewer'

export const ProgressIndicators = () => {
  return (
    <div>
      <ComponentViewer
        component={ProgressBar}
        propsName="ProgressBarProps"
        examples={[
          {
            props: {
              circle: true,
              progress: 0.5,
            },
          },
          {
            props: {
              circle: false,
              progress: 0.3,
            },
          },
          {
            props: {
              circle: true,
              progress: 0.7,
            },
          },
          {
            props: {
              circle: false,
              progress: 0.7,
            },
          },
        ]}
      />
      <InfiniteList />
    </div>
  )
}
