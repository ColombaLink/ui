import React, { CSSProperties, FC, ReactNode } from 'react'
import { DragDropIcon } from '~/icons'
import { Space } from '~/types'
import { color, spaceToPx, renderOrCreateElement } from '~/utils'
import { Text } from '../Text'

type StackedListItemsWrapperProps = {
  children?: FC | ReactNode
  style?: CSSProperties
  topLeft?: FC | ReactNode
  topRight?: FC | ReactNode
  bottomLeft?: FC | ReactNode
  bottomRight?: FC | ReactNode
  footer?: FC | ReactNode
  space?: Space
}

type StackedListItemProps = {
  children?: FC | ReactNode
  childrenRight?: FC | ReactNode
  style?: CSSProperties
  space?: Space
}

export const StackedListItemsWrapper: FC<StackedListItemsWrapperProps> = ({
  children,
  style,
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  space,
}) => {
  return (
    <>
      {(topLeft || topRight) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            backgroundColor: color('ActionLight'),
            border: `1px solid ${color('OtherDivider')}`,
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
            marginBottom: -1,
            ...style,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {renderOrCreateElement(topLeft, {})}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {renderOrCreateElement(topRight, {})}
          </div>
        </div>
      )}

      <div>{children}</div>

      {(bottomLeft || bottomRight) && (
        <div
          style={{
            display: 'flex',
            padding: '12px 16px',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: color('Background2dp'),
            border: `1px solid ${color('OtherDivider')}`,
            borderBottomLeftRadius: 4,
            borderBottomRightRadius: 4,
            marginBottom: spaceToPx(space, 32),
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {renderOrCreateElement(bottomLeft, {})}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {renderOrCreateElement(bottomRight, {})}
          </div>
        </div>
      )}
    </>
  )
}

export const StackedListItems: FC<StackedListItemProps> = ({
  children,
  childrenRight,
  style,
  space,
}) => {
  return (
    <>
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
    </>
  )
}
