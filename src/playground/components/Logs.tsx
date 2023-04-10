import React, { useEffect, useRef, useState } from 'react'
import { Log } from '~/components/Log'
import ComponentViewer from '../ComponentViewer'
import { LoremIpsum } from 'lorem-ipsum'

export const Logs = () => {
  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 3,
      min: 1,
    },
    wordsPerSentence: {
      max: 12,
      min: 1,
    },
  })

  const [, setCnt] = useState(0)

  const { current: example } = useRef([
    { time: Date.now(), label: 'helo', msg: 'message' },
    { time: Date.now(), label: 'heafalo', msg: 'mesfaefsage' },
    {
      time: Date.now(),
      label: 'heafaloheafalo',
      msg: 'mesfaefsagemesfaefsage',
    },
    {
      time: Date.now(),
      label: 'heafaloheafalo',
      msg: 'mesfaefsage mesfaefsag emesfaefsagemesfaefsage',
    },
  ])

  useEffect(() => {
    let c = 0
    const i = setInterval(() => {
      console.log('🐸')
      for (let i = 0; i < 10; i++) {
        example.push({
          time: Date.now(),
          label: `[label ${i}]:`,
          msg: lorem.generateParagraphs(~~Math.random() + 1),
        })
      }
      setCnt(++c)
    }, 5000)

    return () => clearInterval(i)
  }, [])

  return (
    <Log data={example} />
    // <ComponentViewer
    //   component={Log}
    //   propsName="LogProps"
    //   examples={[{ props: { data: example } }]}
    // />
  )
}
