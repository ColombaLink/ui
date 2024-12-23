
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
            typography: 'title1',
            children: 'title1',
          },
        },
        {
          props: {
            typography: 'title2',
            children: 'title2',
          },
        },
        {
          props: {
            typography: 'subtitle600',
            children: 'subtitle600',
          },
        },
        {
          props: {
            typography: 'subtitle500',
            children: 'subtitle500',
          },
        },
        {
          props: {
            typography: 'subtitle400',
            children: 'subtitle400',
          },
        },
        {
          props: {
            typography: 'subtext600',
            children: 'subtext600',
          },
        },
        {
          props: {
            typography: 'subtext500',
            children: 'subtext500',
          },
        },
        {
          props: {
            typography: 'subtext400',
            children: 'subtext400',
          },
        },
        {
          props: {
            typography: 'body600',
            children: 'body600',
          },
        },
        {
          props: {
            typography: 'body500',
            children: 'body500',
          },
        },
        {
          props: {
            typography: 'body400',
            children: 'body400',
          },
        },
        {
          props: {
            typography: 'caption600',
            children: 'caption600',
          },
        },
        {
          props: {
            typography: 'caption500',
            children: 'caption500',
          },
        },
        {
          props: {
            typography: 'caption400',
            children: 'caption400',
          },
        },
      ]}
    />
  )
}
