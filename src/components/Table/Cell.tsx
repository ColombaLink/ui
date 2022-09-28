import React, { FC, ReactNode } from 'react'
import { Color } from '~/types'
import { color } from '~/utils'
import { styled } from 'inlines'
import { Text } from '../Text'
import { ITEM_HEIGHT, ITEM_WIDTH } from './constants'

export const Cell: FC<{
  color?: Color
  children: ReactNode
  longestString: ReactNode
  index: number
  height?: number
  onClick?: () => void
  icon?: ReactNode
}> = ({
  color: colorProp,
  children,
  longestString,
  index,
  height = ITEM_HEIGHT,
  onClick,
  icon,
}) => {
  const left = 8
  const right = 24

  // TODO youzi
  if (typeof children === 'object' && !children.$$typeof) {
    console.warn('TODO: fix this!!!')
    children = JSON.stringify(children)
  }

  if (typeof longestString === 'object') {
    longestString = JSON.stringify(longestString)
  }

  return (
    <styled.div
      onClick={onClick}
      style={{
        minWidth: ITEM_WIDTH,
        flexShrink: index,
        // flexShrink: 0,
        // outline: '1px solid red',
        height: height,
        position: 'relative',
        cursor: 'pointer',
        '&:hover': onClick
          ? {
              backgroundColor: color('background:hover'),
            }
          : null,
      }}
    >
      <Text
        style={{
          visibility: 'hidden',
          paddingRight: left + right,
        }}
      >
        {longestString}
      </Text>
      <Text
        color={colorProp}
        style={{
          lineHeight: `${height}px`,
          position: 'absolute',
          left: 8,
          right: 24,
          bottom: 0,
          top: 0,
        }}
      >
        {children}
      </Text>
      {icon}
    </styled.div>
  )
}
