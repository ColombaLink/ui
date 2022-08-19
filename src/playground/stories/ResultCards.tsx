import React from 'react'
import { ResultCard } from '~/components/ResultCard'
import ComponentViewer from '../ComponentViewer'

export const ResultCards = () => {
  return (
    <div>
      <ComponentViewer
        component={ResultCard}
        propsName="ResultCardProps"
        examples={[
          {
            props: {
              label: 'Awnsers',
              value: 1e3,
            },
          },
          {
            props: {
              label: 'Xyz',
              value: 100,
            },
          },
          {
            props: {
              label: 'Cpu',
              value: '20%',
            },
          },
          {
            props: {
              label: 'Xwnsers',
              value: 10.241214,
            },
          },
          {
            props: {
              label: 'Ratio',
              value: {
                value: 0.0242221112341231,
                format: 'number-ratio',
              },
            },
          },
          {
            props: {
              label: 'Ratio',
              value: {
                value: 0.2312133123312,
                format: 'number-ratio',
              },
            },
          },
          {
            props: {
              label: 'Giga Bytes',
              value: {
                value: 1100000000,
                format: 'number-bytes',
              },
            },
          },
          {
            props: {
              label: 'Mega Bytes',
              value: {
                value: 110000000,
                format: 'number-bytes',
              },
            },
          },
          {
            props: {
              label: '1 Mega Byte',
              value: {
                value: 1100000,
                format: 'number-bytes',
              },
            },
          },
          {
            props: {
              label: 'Kilo Bytes',
              value: {
                value: 110000,
                format: 'number-bytes',
              },
            },
          },
          {
            props: {
              label: 'Bytes',
              value: {
                value: 110,
                format: 'number-bytes',
              },
            },
          },
          {
            props: {
              label: 'Euros',
              value: {
                value: 110.1221,
                format: 'number-euro',
              },
            },
          },
          {
            props: {
              label: 'Dollars',
              value: {
                value: 110.1221,
                format: 'number-dollar',
              },
            },
          },
          {
            props: {
              label: 'Pounds',
              value: {
                value: 110.1221,
                format: 'number-pound',
              },
            },
          },
          {
            props: {
              label: 'Euros',
              value: {
                value: 1121.1221,
                format: 'number-euro',
              },
            },
          },
          {
            props: {
              label: 'Dollars',
              value: {
                value: 11231210.1221,
                format: 'number-dollar',
              },
            },
          },
        ]}
      />
    </div>
  )
}
