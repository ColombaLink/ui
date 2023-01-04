import React, { FC, ReactNode, CSSProperties, FunctionComponent } from 'react'
import { color, renderOrCreateElement } from '~/utils'
import { CheckCircleIcon, CloseCircleIcon, WarningIcon } from '~/icons'
import { Text } from '~'
import { Icon } from '~/types'

type ToastProps = {
  label?: string
  icon?: FunctionComponent<Icon> | ReactNode
  // topLeft?: ReactNode
  // topRight?: ReactNode
  description?: string
  children?: ReactNode
  style?: CSSProperties
  type?: 'success' | 'error' | 'warning'
}

export const Toast: FC<ToastProps> = ({
  label,
  icon,
  // topLeft,
  // topRight,
  description,
  children,
  style,
  type,
  ...props
}) => {
  return (
    <div
      style={{
        borderRadius: 8,
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
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          // justifyContent: topRight ? 'space-between' : 'flex-start',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          marginBottom: 4,
        }}
      >
        {/* {topLeft && !icon && <div style={{ marginRight: 12 }}>{topLeft}</div>} */}

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {icon && renderOrCreateElement(icon)}
          {type === 'success' && <CheckCircleIcon color="accent" />}
          {type === 'error' && <CloseCircleIcon color="red" />}
          {type === 'warning' && <WarningIcon color="orange" />}

          {label && <Text typo="subtext500">{label}</Text>}
        </div>
        {description && (
          <Text color="text2" style={{ marginTop: 6 }}>
            {description}
          </Text>
        )}

        {children}
      </div>
    </div>
  )
}
