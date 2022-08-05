import React from 'react'
import { LineGraph as LG } from '~'

import ComponentViewer from '../ComponentViewer'

export const LineGraph = () => {
  // some data
  const datax = { de: [], en: [], nl: [] }

  for (let i = 0; i < 1000; i++) {
    const x = Date.now() - i * 1000000
    datax.de.push({
      y: i * i + Math.random() * i * 1e3,
      x,
    })
    datax.en.push({
      y: i * i + Math.random() * i * 1e3,
      x,
    })
    datax.nl.push({
      y: i * i + Math.random() * i * 1e3 * 0.1,
      x,
    })
  }

  const fraction = []
  for (let i = 0; i < 200; i++) {
    fraction.push({
      x: i,
      y: Math.random(),
    })
  }

  const bytes = []
  for (let i = 0; i < 200; i++) {
    bytes.push({
      x: i,
      y: Math.round(Math.random() * 2e9),
    })
  }

  const smallData = []
  for (let i = 0; i < 50000; i++) {
    smallData.push({
      x: i,
      y: ~~(Math.random() * 10000000) + i * 100,
    })
  }

  const someData = {
    en: [
      { x: 10, y: 10 },
      { x: 20, y: 30 },
      { x: 30, y: 40 },
    ],
    nl: [
      { x: 10, y: 10 },
      { x: 20, y: 30 },
      { x: 30, y: 40 },
    ],
    de: [
      { x: 10, y: 20 },
      { x: 20, y: 40 },
      { x: 30, y: 43 },
    ],
  }

  const someLegend = {
    nl: 'Netherlands',
    de: 'Germany',
    en: 'Uk',
  }

  return (
    <>
      <div
        style={{
          width: '100%',
          height: 360,
          marginBottom: 32,
        }}
      >
        <LG legend={someLegend} data={someData} />
      </div>
      <div
        style={{
          width: '100%',
          height: 300,
          marginBottom: 32,
        }}
      >
        <LG data={fraction} valueFormat="number-ratio" color="green" />
      </div>
      <div
        style={{
          width: '100%',
          height: 280,
          marginBottom: 32,
        }}
      >
        <LG valueFormat="number-bytes" data={bytes} />
      </div>
      <div
        style={{
          width: '100%',
          height: 200,
          marginBottom: 32,
        }}
      >
        <LG data={[{ x: 10, y: 10 }]} />
      </div>
      <div
        style={{
          width: '100%',
          height: 300,
          marginBottom: 32,
        }}
      >
        <LG data={datax} format="date" />
      </div>
      <div
        style={{
          width: '100%',
          height: 300,
          marginBottom: 32,
        }}
      >
        <LG data={datax.en} format="date" spread />
      </div>
      <div
        style={{
          width: '100%',
          height: 300,
          marginBottom: 32,
        }}
      >
        <LG data={datax} format="date-time-human" spread />
      </div>
      <div
        style={{
          width: '100%',
          height: 300,
          marginBottom: 32,
        }}
      >
        <LG data={smallData} spread={false} />
      </div>
      <div
        style={{
          width: '100%',
          height: 360,
          marginBottom: 32,
        }}
      >
        <LG
          label="Cool party"
          data={[
            { x: 0, y: 10 },
            { x: 1, y: 10 },
            { x: 2, y: 20 },
            { x: 3, y: 30 },
            { x: 4, y: 20 },
            { x: 5, y: 25 },
          ]}
          spread={false}
        />
      </div>
    </>
  )
}
