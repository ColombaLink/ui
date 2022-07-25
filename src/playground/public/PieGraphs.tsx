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

  const advancedPieData = [
    {
      label: 'Some countries',
      value: { en: 675, de: 200, nl: 600 },
    },
    {
      label: 'More data',
      value: { en: 275, de: 600, nl: 50 },
    },
    // {
    //   label: 'What logo?',
    //   value: { ax: 75, bc: 201, qr: 30 },
    // },
    // {
    //   label: 'more data',
    //   value: { en: 70, de: 201, nl: 130 },
    // },
  ]

  return (
    <div>
      <Text space>PieGraphs:</Text>
      <div
        style={{ display: 'flex', width: 700, justifyContent: 'space-between' }}
      >
        <PieGraph data={pieData} space="32px" size={240} />
        <PieGraph data={advancedPieData} space="32px" size={240} />
      </div>
    </div>
  )
}
