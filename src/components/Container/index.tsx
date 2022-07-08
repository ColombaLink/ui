import React, { CSSProperties, FC, ReactNode } from 'react'
import { Space } from '~/types'
import { color, spaceToPx, renderOrCreateElement } from '~/utils'
import { styled } from 'inlines'

type ContainerProps = {
  children: ReactNode
  space?: Space
  style?: CSSProperties
  topLeft?: FC | ReactNode
  topRight?: FC | ReactNode
  bottomLeft?: FC | ReactNode
  bottomRight?: FC | ReactNode
  wrap?: boolean
}

export const Container: FC<ContainerProps> = ({
  children,
  style,
  space,
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  wrap,
}) => {
  return (
    <styled.div
      style={{
        padding: 24,
        paddingBottom: bottomLeft || bottomRight ? 88 : 24,
        backgroundColor: color('Background2dp'),
        border: `1px solid ${color('BorderColor')}`,
        position: 'relative',
        borderRadius: 4,
        marginBottom: spaceToPx(space, 32),
        width: wrap ? 'fit-content' : '100%',
        ...style,
      }}
    >
      <div
        style={{
          // use shorthand so its easier to strip padding
          padding: `24px 24px ${bottomLeft || bottomRight ? 88 : 24}px 24px`,
          backgroundColor: color('Background2dp'),
          border: `1px solid ${color('BorderColor')}`,
          position: 'relative',
          borderRadius: 4,
          marginBottom: spaceToPx(space, 32),
          width: wrap ? 'fit-content' : '100%',
          maxWidth: '100%',
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
      {children}
      {(bottomLeft || bottomRight) && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minHeight: 68,
            borderTop: `1px solid ${color('BorderColor')}`,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            paddingLeft: 24,
            paddingRight: 24,
            backgroundColor: color('Background3dp'),
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
    </styled.div>
  )
}
