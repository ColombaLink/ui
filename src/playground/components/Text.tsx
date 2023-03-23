import React from 'react'
import { Text as TextComponent } from '~'
import ComponentViewer from '../ComponentViewer'
import { LoremIpsum } from 'lorem-ipsum'

export const Text = () => {
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
        {
          props: {
            typo: 'title1',
            children: 'title1',
          },
        },
        {
          props: {
            typo: 'title2',
            children: 'title2',
          },
        },
        {
          props: {
            typo: 'subtitle600',
            children: 'subtitle600',
          },
        },
        {
          props: {
            typo: 'subtitle500',
            children: 'subtitle500',
          },
        },
        {
          props: {
            typo: 'subtitle400',
            children: 'subtitle400',
          },
        },
        {
          props: {
            typo: 'subtext600',
            children: 'subtext600',
          },
        },
        {
          props: {
            typo: 'subtext500',
            children: 'subtext500',
          },
        },
        {
          props: {
            typo: 'subtext400',
            children: 'subtext400',
          },
        },
        {
          props: {
            typo: 'body600',
            children: 'body600',
          },
        },
        {
          props: {
            typo: 'body500',
            children: 'body500',
          },
        },
        {
          props: {
            typo: 'body400',
            children: 'body400',
          },
        },
        {
          props: {
            typo: 'caption600',
            children: 'caption600',
          },
        },
        {
          props: {
            typo: 'caption500',
            children: 'caption500',
          },
        },
        {
          props: {
            typo: 'caption400',
            children: 'caption400',
          },
        },
      ]}
    />
  )
}
