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
      {
        x: 10,
        y: 20,
      },
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
      <ComponentViewer
        component={LG}
        propsName="LineGraphProps"
        examples={[
          {
            props: {
              data: someData,
              legend: someLegend,
              width: 500,
              height: 180,
            },
          },
        ]}
      />

      <LG legend={someLegend} data={someData} width={900} height={256} />
      <br />
      <LG data={fraction} valueFormat="number-ratio" />
      <br />
      <LG valueFormat="number-bytes" data={bytes} />
      <br />
      <LG data={[{ x: 10, y: 10 }]} />
      <br />
      <LG data={datax} format="date" />
      <br />
      <LG data={datax.en} format="date" spread />
      <br />
      <LG data={datax} format="date-time-human" spread />
      <br />
      <LG data={smallData} spread={false} />
      <br />
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
    </>
  )
}
