import React from 'react'

import { Provider } from '~'
import { Breadcrumbs } from '~/components/Breadcrumbs/Breadcrumbs'

export const BreadcrumbsOverview = () => {
  return (
    <Provider>
      <Breadcrumbs
        data={{
          'Twister Media': '/',
          'Eurovision 2022': '/Snurky',
          'Based ui': '/BasedUI',
        }}
      ></Breadcrumbs>
    </Provider>
  )
}
