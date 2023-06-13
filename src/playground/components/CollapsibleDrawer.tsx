import React from 'react'
import { Drawer } from '~/components/Drawer'
import { Card } from '~/components/Card'
import { ChevronDownIcon } from '~/icons'
import ComponentViewer from '../ComponentViewer'

export const CollapseableDrawer = () => {
  return (
    <ComponentViewer
      component={Drawer}
      propsName="DrawerProps"
      examples={[
        {
          props: {
            right: 'false',
            width: '900',
            closeWidth: '70',
          },
        },
      ]}
    />
  )
}
