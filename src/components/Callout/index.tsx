import React, { CSSProperties, FC, ReactNode, useState } from 'react'
import { Space, Color } from '~/types'
import { Label } from '../Label'
import { border, color, spaceToPx } from '~/utils'
import { CloseIcon } from '~/icons'

type CalloutProps = {
  children?: ReactNode
  icon?: FC | ReactNode
  outline?: boolean
  color?: Color
  label?: string
  labelColor?: Color
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
  labelColor,
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
    setIsClosed(true)
  }

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

      <Label
        label={label}
        labelColor={labelColor || color(colorProp, 'contrast', true)}
        description={description}
        descriptionColor={color(colorProp, 'contrast', true)}
        icon={icon}
        iconColor={color(colorProp, 'contrast', true)}
      />
      {children}
    </div>
  )
}
