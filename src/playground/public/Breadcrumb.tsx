import React, { Component } from 'react'
import { Breadcrumbs } from '~/components/Breadcrumbs'
import ComponentViewer from '../ComponentViewer'

export const Breadcrumb = () => {
  return (
    <div>
      <ComponentViewer component={Breadcrumbs} />
      <Breadcrumbs
        data={{
          'Twister Media': '/breadcrumb',
          'Eurovision 2022': '/Snurky',
          'Based ui': '/BasedUI',
        }}
      ></Breadcrumbs>
    </div>
  )
}
