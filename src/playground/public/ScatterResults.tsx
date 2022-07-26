import React from 'react'
import { ScatterResult } from '~/components/ScatterResult'

export const ScatterResults = () => {
  const scatterData = []

  for (let i = 100; i > -1; i--) {
    const y = {
      time: Date.now() - i * 1e3,
      points: [],
    }

    for (let j = 0; j < 20; j++) {
      const prev = scatterData[scatterData.length - 1]?.points[j] || {
        x: Math.random() * 1000,
        y: Math.random() * 1000,
      }

      y.points.push({
        label: j,
        x: prev.x + 2 * Math.random() * Math.cos(j) * 10,
        y: prev.y + 2 * Math.random() * Math.sin(j) * 10,
        color: { color: 'background' },
        info: {
          snurk: Math.random() * 100000,
          flap: Math.random() * 1000000,
        },
      })
    }

    scatterData.push(y)
  }

  return (
    <div>
      ScrattaDu
      <ScatterResult
        header="Cheering scatter"
        yLabel="Mean cheer conversion"
        xLabel="Mean clapping performance per country"
        data={scatterData}
        info={{
          snurk: { format: 'number-bytes', label: 'Snurk' },
          flap: { format: 'number-dollar', label: 'Flap' },
        }}
        width={800}
        height={600}
      />
    </div>
  )
}
