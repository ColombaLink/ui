import React from 'react'
import { Provider, DotIcon, CloseIcon, CheckCircleIcon } from '~'
import { Badge } from '~/components/Badge'
import ComponentViewer from '../ComponentViewer'

export const Badges = () => {
  return (
    <Provider>
      <ComponentViewer component={Badge} />
    </Provider>
  )
}
