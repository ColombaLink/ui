import React from 'react'
import { Text as TextComponent } from '~'
import ComponentViewer from '../ComponentViewer'
import { LoremIpsum } from 'lorem-ipsum'

export const Text = () => {
  const loadClick = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1e3))
  }
  const errorClick = async () => {
    await loadClick()
    throw Error('error')
  }

  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4,
    },
    wordsPerSentence: {
      max: 16,
      min: 4,
    },
  })

  return (
    <ComponentViewer
      component={TextComponent}
      propsName="TextProps"
      examples={[
        {
          props: {
            children: 'The quick brown fox jumps over the lazy dog',
          },
        },
        {
          props: {
            children: 'The quick brown fox jumps over the lazy dog',
            size: '24',
          },
        },
        {
          props: {
            children: 'The quick brown fox jumps over the lazy dog',
            size: '14',
            italic: true,
            color: 'purple',
            weight: 600,
            variant: 'hover',
          },
        },
        {
          props: {
            selectable: true,
            weight: 400,
            wrap: true,
            children: lorem.generateParagraphs(~~(Math.random() * 3) + 1),
          },
        },
      ]}
    />
  )
}
