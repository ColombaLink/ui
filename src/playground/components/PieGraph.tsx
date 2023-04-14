import React from 'react'
import { PieGraph as PieGraphComponent } from '~/components/PieGraph'
import { Container, Text } from '~'
import ComponentViewer from '../ComponentViewer'

export const PieGraph = () => {
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
    {
      label: 'Mmm ?',
      value: 126,
    },
  ]

  const advancedPieData = [
    {
      label: 'Some countries',
      value: { en: 675, de: 200, nl: 600 },
      color: '#BADA55',
    },
    {
      label: 'More data',
      value: { en: 275, de: 600, nl: 50 },
    },
    {
      label: 'What logo?',
      value: { ax: 75, bc: 201, qr: 30 },
      color: '#0000ff',
    },
    {
      label: 'more data',
      value: { en: 70, de: 201, nl: 130 },
      color: '#ff8a00',
    },
  ]

  return (
    <div>
      <ComponentViewer
        component={PieGraphComponent}
        propsName="PieGraphProps"
        examples={[
          {
            props: {
              data: pieData,
              space: '24px',
              color: 'green',
            },
          },
          {
            props: {
              data: advancedPieData,
              space: '24px',
            },
          },
        ]}
      />
    </div>
  )
}
