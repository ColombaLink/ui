import React from 'react'
import { BarGraph } from '~/components/BarGraph'
import { Container, Text } from '~'

export const BarGraphs = () => {
  const barData = [
    {
      label: 'Yes sure if you like ugly shit',
      value: 675,
    },
    {
      label: 'No sorry',
      value: 1000,
    },
    {
      label: 'What logo?',
      value: 146,
    },
  ]

  const barDataStacked = [
    {
      label: 'Yes sure if you like ugly shit',
      value: { en: 675, de: 200, nl: 600 },
    },
    {
      label: 'No sorry',
      value: { en: 275, de: 2200, nl: 50 },
    },
    {
      label: 'What logo?',
      value: { en: 75, de: 201, nl: 30 },
    },
  ]

  return (
    <div>
      <Container>
        <Text space weight={600}>
          Bar Graph 1
        </Text>
        <BarGraph data={barData} />
      </Container>
    </div>
  )
}
