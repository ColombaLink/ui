import React, { FC, ReactNode, CSSProperties } from 'react'
import { Text } from '../Text'
import { Label } from '../Label'
import { color, renderOrCreateElement } from '~/utils'
import { CheckCircleIcon, CloseCircleIcon } from '~/icons'

type ToastProps = {
  label?: string
  icon?: FC | ReactNode
  topLeft?: ReactNode
  topRight?: ReactNode
  description?: string
  children?: ReactNode
  style?: CSSProperties
  type?: 'success' | 'error'
}

export const Toast: FC<ToastProps> = ({
  label,
  icon,
  topLeft,
  topRight,
  description,
  children,
  style,
  type,
  ...props
}) => {
  return (
    <div
      style={{
        borderRadius: 4,
        backgroundColor: color('background'),
        boxShadow: 'rgb(0 0 0 / 12%) 0px 8px 20px',
        cursor: 'pointer',
        padding: '12px 16px',
        paddingBottom: label && !description && !children ? '8px' : '12px',
        marginBottom: 16,
        width: 400,
        ...style,
      }}
      {...props}
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

        {label || description || children || icon ? (
          <Label
            label={label}
            description={description}
            icon={
              icon && !type
                ? icon
                : type === 'success'
                ? CheckCircleIcon
                : CloseCircleIcon
            }
            iconColor={type === 'success' ? 'accent' : 'red'}
            children={children}
            //  style={{ marginBottom: 12 }}
          />
        ) : null}
      </div>
    </div>
  )
}
