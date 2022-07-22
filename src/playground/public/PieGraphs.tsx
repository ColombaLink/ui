import React from 'react'
import { PieGraph } from '~/components/PieGraph'
import { Container, Text } from '~'

export const PieGraphs = () => {
  const pieData = [
    {
      label: 'Yes sure if you like ugly shit',
      value: 1280,
    },
    {
      label: 'No sorry',
      value: 637,
    },
    {
      label: 'What logo?',
      value: 146,
    },
  ]

  return (
    <div>
      <Text space>PieGraphs:</Text>
      <div style={{ display: 'flex' }}>
        <PieGraph data={pieData} space="32px" size={240} />
      </div>
    </div>
  )
}
