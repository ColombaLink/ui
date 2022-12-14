import React from 'react'
import { Text } from '~'
import ComponentViewer from '../ComponentViewer'

export const Typography = () => {
  return (
    <div>
      <ComponentViewer
        component={Text}
        propsName="TextProps"
        examples={[
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

      {/* <Text typo="title1">title1</Text>
      <Text typo="title2">title2</Text>
      <Text typo="subtext600">subtext600</Text>
      <Text typo="subtext500">subtext500</Text>
      <Text typo="subtext400">subtext400</Text>
      <Text typo="body600">body600</Text>
      <Text typo="body500">body500</Text>
      <Text typo="body400">body400</Text>
      <Text typo="caption600">caption600</Text>
      <Text typo="caption500">caption500</Text>
      <Text typo="caption400">caption400</Text> */}
    </div>
  )
}
