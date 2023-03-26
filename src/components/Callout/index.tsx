import React, { FC, ReactNode, useState, FunctionComponent } from 'react'
import {
  Space,
  Color,
  Icon,
  Label,
  border,
  color,
  spaceToPx,
  CloseIcon,
  Style,
  styled,
} from '~'

type CalloutProps = {
  children?: ReactNode
  icon?: FunctionComponent<Icon> | ReactNode
  outline?: boolean
  color?: Color
  label?: string
  labelColor?: Color
  description?: string
  ghost?: boolean
  space?: Space
  style?: Style
  closeable?: boolean
  textAlign?: 'center' | 'right' | 'left'
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
    <styled.div
      style={{
        border: outline ? border(1, colorProp, 'border', true) : null,
        backgroundColor: ghost ? 'transparent' : color(colorProp, true),
        display: closed ? ' none' : 'flex',
        flexDirection: 'column',
        position: 'relative',
        padding: '12px 16px',
        borderRadius: 8,
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
        <styled.div
          style={{
            position: 'absolute',
            right: 12,
            top: 12,
            cursor: 'pointer',
          }}
        >
          <CloseIcon onClick={closeCalloutHandler} />
        </styled.div>
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
    </styled.div>
  )
}
