import React from 'react'
import { MultiLineGraph as MLG } from '~'

export const MultiLineGraph = () => {
  const smallData = []
  for (let i = 0; i < 50; i++) {
    smallData.push({
      x: i,
      y: ~~(Math.random() * 10000000) + i * 100,
    })
  }
  return (
    <div
      style={{
        width: '100%',
        height: 300,
        marginBottom: 32,
      }}
    >
      <MLG
        data={smallData}
        spread={false}
        color={'teal'}
        label="Single line 50"
      />
    </div>
  )
}
