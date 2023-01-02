import React from 'react'
import { Breadcrumbs } from '~/components/Breadcrumbs'
import ComponentViewer from '../ComponentViewer'

export const Breadcrumb = () => {
  return (
    <ComponentViewer
      propsName="BreadcrumbsProps"
      examples={[
        {
          props: {
            data: {
              'Twister Media': '/',
              'Eurovision 2022': '/Snurky',
              'Based ui': '/BasedUI',
            },
          },
        },
      ]}
      component={Breadcrumbs}
    />
  )
}
