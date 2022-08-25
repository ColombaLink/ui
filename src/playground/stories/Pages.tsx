import React from 'react'
import { Page } from '~/components/Page'
import ComponentViewer from '../ComponentViewer'

export const Pages = () => {
  return (
    <div>
      <ComponentViewer
        component={Page}
        propsName="PageProps"
        examples={[
          {
            props: {
              children: 'Hello',
            },
          },
        ]}
      />
    </div>
  )
}
