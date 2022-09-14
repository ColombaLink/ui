import React from 'react'
import { Boolean } from '~'
import ComponentViewer from '../ComponentViewer'

export const Booleans = () => {
  return (
    <div>
      <ComponentViewer
        component={Boolean}
        propsName="BooleanProps"
        examples={[
          {
            props: {
              label: 'Boolean Label',
              descriptionBottom: 'This is a description bottom',
              indent: true,
            },
          },
          {
            props: {
              label: 'Boolean Label with error',
              description: 'Error message on True',
              indent: true,
              error: (value) => {
                if (value === true) {
                  return 'This is an error'
                }
              },
              descriptionBottom: 'This is a description bottom',
            },
          },
        ]}
      />
    </div>
  )
}
