import React from 'react'
import { Drawer } from '~/components/Drawer'
import { Card } from '~/components/Card'
import { ChevronDownIcon } from '~/icons'

export const CollapseableDrawer = () => {
  return (
    <Drawer width={240} autoCollapse closeWidth={0} closeBreakpoint={500}>
      {/* <Card /> */}
    </Drawer>
  )
}
