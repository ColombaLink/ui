import React, { useEffect, useRef, useState } from 'react'
import { Log } from '~/components/Log'
// import ComponentViewer from '../ComponentViewer'
import { LoremIpsum } from 'lorem-ipsum'

export const Logs = () => {
  const typesArr = ['error', 'success', '']
  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 5,
      min: 1,
    },
    wordsPerSentence: {
      max: 12,
      min: 1,
    },
  })

  const [, setCnt] = useState(0)

  const { current: example } = useRef([
    {
      time: new Date().toUTCString(),
      label: 'helo',
      msg: 'message',
      type: 'error',
    },
    {
      time: new Date().toUTCString(),
      label: 'heafalo',
      msg: 'mesfaefsage',
      type: 'success',
    },
    {
      time: new Date().toUTCString(),
      label: 'heafaloheafalo',
      msg: 'mesfaefsagemesfaefsage',
    },
    {
      time: new Date().toUTCString(),
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
          time: new Date().toUTCString(),
          label: `[label ${i}]:`,
          msg: lorem.generateParagraphs(~~Math.random() + 1),
          type: typesArr[Math.floor(Math.random() * 3)],
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
