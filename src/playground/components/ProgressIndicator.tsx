import React from 'react'
// import { InfiniteList } from '~/components/InfiniteList'
import { ProgressIndicator as ProgressIndicatorComponent } from '~/components/ProgressIndicator'
import ComponentViewer from '../ComponentViewer'

export const ProgressIndicator = () => {
  return (
    <div>
      <ComponentViewer
        component={ProgressIndicatorComponent}
        propsName="ProgressIndicatorProps"
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
      {/* <InfiniteList  /> */}
    </div>
  )
}
