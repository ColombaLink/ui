import React from 'react'
import { Topbar } from '~/components/Topbar'
import ComponentViewer from '../ComponentViewer'

export const Topbars = () => {
  return (
    <div>
      <ComponentViewer component={Topbar} />
      <Topbar data={{ Projects: '/', Settings: '/settings' }} />
      <br />
      <Topbar
        data={{ Projects: '/', Settings: '/settings' }}
        onFilter={(e) => {
          console.log(e.target.value)
        }}
        onProfile={() => {
          console.log('clicked')
        }}
      />
    </div>
  )
}
