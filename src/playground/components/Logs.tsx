import React from 'react'
import { Log } from '~/components/Log'
import ComponentViewer from '../ComponentViewer'

export const Logs = () => {
  const example = [
    { time: 43455, label: 'helo', msg: 'message' },
    { time: 431455, label: 'heafalo', msg: 'mesfaefsage' },
  ]

  return (
    <ComponentViewer
      component={Log}
      propsName="LogProps"
      examples={[{ props: { data: example } }]}
    />
  )
}
