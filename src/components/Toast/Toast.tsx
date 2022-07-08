import React, { FC, ReactNode, CSSProperties } from 'react'
import { Text } from '../Text'
import { color, renderOrCreateElement } from '~/utils'

type ToastProps = {
  title?: string
  icon?: FC | ReactNode
  topLeft?: ReactNode
  topRight?: ReactNode
  message?: string
  children?: ReactNode
  style?: CSSProperties
}

export const Toast: FC<ToastProps> = ({
  title,
  icon,
  topLeft,
  topRight,
  message,
  children,
  style,
}) => {
  return (
    <div
      style={{
        borderRadius: 4,
        backgroundColor: color('Background1dp'),
        boxShadow: 'rgb(0 0 0 / 12%) 0px 8px 20px',
        cursor: 'pointer',
        padding: '12px 16px',
        paddingBottom: title && !message && !children ? '8px' : '12px',
        marginBottom: 16,
        width: 400,
        ...style,
      }}
      onClick={() => {
        console.log('clicked')
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: topRight ? 'space-between' : 'flex-start',
          alignItems: 'center',
          marginBottom: 4,
        }}
      >
        {topLeft && !icon && <div style={{ marginRight: 12 }}>{topLeft}</div>}
        {icon && (
          <div style={{ marginRight: 12 }}>{renderOrCreateElement(icon)}</div>
        )}
        <Text weight={600}>{title}</Text>
        {topRight && <div style={{ marginLeft: 12 }}>{topRight}</div>}
      </div>
      {message && (
        <div>
          <Text weight={400}>{message}</Text>
        </div>
      )}
      {children && <div style={{ marginTop: 4 }}>{children}</div>}
    </div>
  )
}
