import React from 'react'
import { Text } from '~'
import ComponentViewer from '../ComponentViewer'

export const Typography = () => {
  return (
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
