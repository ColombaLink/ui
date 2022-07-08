import React, { Component } from 'react'
import { Breadcrumbs } from '~/components/Breadcrumbs'
import ComponentViewer from '../ComponentViewer'

export const Breadcrumb = () => {
  return (
    <ComponentViewer
      examples={[
        {
          props: {
            data: {
              'Twister Media': '/breadcrumb',
              'Eurovision 2022': '/Snurky',
              'Based ui': '/BasedUI',
            },
          },
        },
        {
          props: {
            data: {
              'Twister Media': '/breadcrumb',
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
