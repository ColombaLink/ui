import React from 'react'
import { Page as PageComponent } from '~/components/Page'
import ComponentViewer from '../ComponentViewer'

export const Page = () => {
  return (
    <div>
      <ComponentViewer
        component={PageComponent}
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
