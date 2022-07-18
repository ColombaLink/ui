import React, { CSSProperties, FC, ReactNode, useState } from 'react'
import { Space, Color } from '~/types'
import { Text } from '../Text'
import { border, color, renderOrCreateElement, spaceToPx } from '~/utils'
import { CloseIcon } from '~/icons'

type CalloutProps = {
  children?: ReactNode
  icon?: FC | ReactNode
  outline?: boolean
  color?: Color
  label?: string
  description?: string
  ghost?: boolean
  space?: Space
  style?: CSSProperties
  closeable?: boolean
  textAlign?: 'center' | 'right'
}

export const Callout: FC<CalloutProps> = ({
  children,
  description,
  label,
  icon,
  closeable,
  outline,
  color: colorProp = 'accent',
  ghost,
  space,
  style,
  textAlign,
  ...props
}) => {
  const [closed, setIsClosed] = useState(false)

  const closeCalloutHandler = () => {
    console.log('closed')
    setIsClosed(true)
  }

  console.log(props)

  return (
    <div
      style={{
        border: outline ? border(1, colorProp, 'border', true) : null,
        backgroundColor: ghost ? 'transparent' : color(colorProp, true),
        display: closed ? ' none' : 'flex',
        flexDirection: 'column',
        position: 'relative',
        padding: '12px 16px',
        borderRadius: 4,
        marginBottom: spaceToPx(space),
        justifyContent:
          textAlign === 'center'
            ? 'center'
            : textAlign === 'right'
            ? 'flex-end'
            : 'flex-start',
        ...style,
      }}
      {...props}
    >
      {closeable && (
        <div
          style={{
            position: 'absolute',
            right: 12,
            top: 12,
            cursor: 'pointer',
          }}
        >
          <CloseIcon onClick={closeCalloutHandler} />
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {icon && (
          <div style={{ marginRight: 12, flexShrink: 0, paddingTop: 4 }}>
            {renderOrCreateElement(icon, {
              color: color(colorProp),
            })}
          </div>
        )}
        <div>
          <Text wrap color={color(colorProp, 'contrast', true)}>
            {label}
          </Text>
        </div>
      </div>

      {description && (
        <div>
          <Text
            wrap
            weight={400}
            color={color(colorProp, 'contrast', true)}
            space={children ? '8px' : '0px'}
          >
            {description}
          </Text>
        </div>
      )}

      {children && <div>{children}</div>}
    </div>
  )
}
