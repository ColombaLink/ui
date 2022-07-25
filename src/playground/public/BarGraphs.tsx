import React from 'react'
import { BarGraph } from '~/components/BarGraph'
import { Container, Text } from '~'
import ComponentViewer from '../ComponentViewer'

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

  const legend = {
    nl: 'Netherlands',
    de: 'Germany',
    en: 'Uk',
  }

  const legendTwo = ['America', 'Cameroon', 'Netherlands']

  const barDataStacked = [
    {
      label: 'Some countries',
      value: { en: 675, de: 200, nl: 600 },
    },
    {
      label: 'More data',
      value: { en: 275, de: 2200, nl: 50 },
    },
    {
      label: 'What logo?',
      value: { en: 75, de: 201, nl: 30 },
    },
  ]

  return (
    <div>
      <ComponentViewer
        component={BarGraph}
        propsName="BarGraphProps"
        examples={[
          {
            props: {
              data: barData,
            },
          },
          {
            props: {
              data: barDataStacked,
              legend: legend,
            },
          },
        ]}
      />

      <Container space>
        <Text space weight={600}>
          Bar Graph 1
        </Text>
        <BarGraph data={barData} />
      </Container>

      <Container>
        <Text space weight={600}>
          Bar Graph 2
        </Text>
        <BarGraph data={barDataStacked} />
      </Container>
    </div>
  )
}
