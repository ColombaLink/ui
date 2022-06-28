import React, { CSSProperties, FC, ReactNode } from 'react'
import { DragDropIcon } from '~/icons'
import { Space } from '~/types'
import { color, spaceToPx } from '~/utils'
import { Text } from '../Text'

type StackedListItemProps = {
  children?: FC | ReactNode
  childrenRight?: FC | ReactNode
  style?: CSSProperties
  space?: Space
  header?: FC | ReactNode
  footer?: FC | ReactNode
}

export const StackedListItems: FC<StackedListItemProps> = ({
  children,
  childrenRight,
  style,
  header,
  footer,
  space,
}) => {
  return (
    <>
      {header && (
        <div
          style={{
            display: 'flex',
            padding: '12px 16px',
            backgroundColor: color('ActionLight'),
            border: `1px solid ${color('OtherDivider')}`,
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            marginBottom: -1,
          }}
        >
          {header}
        </div>
      )}
      <div
        style={{
          display: 'flex',
          backgroundColor: color('Background2dp'),
          justifyContent: 'space-between',
          alignItems: 'center',
          border: `1px solid ${color('OtherDivider')}`,
          padding: '12px 20px',
          marginBottom: -1,
          ...style,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          {children}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {childrenRight}
        </div>
      </div>
      {footer && (
        <div
          style={{
            display: 'flex',
            padding: '12px 16px',
            backgroundColor: color('Background2dp'),
            border: `1px solid ${color('OtherDivider')}`,
            borderBottomLeftRadius: 4,
            borderBottomRightRadius: 4,
            marginBottom: spaceToPx(space, 32),
          }}
        >
          {footer}
        </div>
      )}
    </>
  )
}
