import React, { CSSProperties, FC, ReactNode } from 'react'
import { Space } from '~/types'
import { color, spaceToPx, renderOrCreateElement } from '~/utils'

type ContainerProps = {
  children: FC | ReactNode
  space?: Space
  style?: CSSProperties
  topLeft?: FC | ReactNode
  topRight?: FC | ReactNode
}

export const Container: FC<ContainerProps> = ({
  children,
  style,
  space,
  topLeft,
  topRight,
}) => {
  return (
    <div
      style={{
        padding: 24,
        backgroundColor: color('Background2dp'),
        border: `1px solid ${color('OtherDivider')}`,
        borderRadius: 4,
        marginBottom: spaceToPx(space, 32),
        ...style,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: topLeft || topRight ? 24 : 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {renderOrCreateElement(topLeft, {})}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {renderOrCreateElement(topRight, {})}
        </div>
      </div>

      {children}
    </div>
  )
}
