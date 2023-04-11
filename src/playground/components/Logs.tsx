import React, { useEffect, useRef, useState } from 'react'
import { Log } from '~/components/Log'
// import ComponentViewer from '../ComponentViewer'
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
    { time: Date.now().toString(), label: 'helo', msg: 'message' },
    { time: Date.now().toString(), label: 'heafalo', msg: 'mesfaefsage' },
    {
      time: Date.now().toString(),
      label: 'heafaloheafalo',
      msg: 'mesfaefsagemesfaefsage',
    },
    {
      time: Date.now().toString(),
      label: 'heafaloheafalo',
      msg: 'mesfaefsage mesfaefsag emesfaefsagemesfaefsage',
    },
  ])

  useEffect(() => {
    let c = 0
    const i = setInterval(() => {
      // console.log('🐸')
      for (let i = 0; i < 30; i++) {
        example.push({
          time: Date.now().toString(),
          label: `[label ${i}]:`,
          msg: lorem.generateParagraphs(~~Math.random() + 1),
        })
      }
      setCnt(++c)
    }, 4000)

    return () => clearInterval(i)
  }, [])

  return (
    <Log data={example} width={940} />
    // <ComponentViewer
    //   component={Log}
    //   propsName="LogProps"
    //   examples={[{ props: { data: example } }]}
    // />
  )
}
