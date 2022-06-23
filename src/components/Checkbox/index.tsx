import React, { useEffect, useState, FC } from 'react'
import { Text } from '../Text'
import { color } from '~/utils'
import { CheckIcon } from '~/icons'
import { useHover, usePropState } from '~/hooks'

export const Checkbox: FC = ({ children, value, style, onChange }) => {
  const [checked, setChecked] = usePropState(value)
  const { listeners, hover } = useHover()

  if (typeof children === 'string') {
    children = <Text>{children}</Text>
  }

  return (
    <Text
      onClick={() => {
        const newValue = !checked
        setChecked(newValue)
        onChange?.(newValue)
      }}
      style={{
        alignItems: 'center',
        cursor: 'pointer',
        display: 'flex',
        ...style,
      }}
      {...listeners}
    >
      <div
        style={{
          backgroundColor: checked
            ? color(hover ? 'PrimaryMainHover' : 'PrimaryMain')
            : null,
          border: `1px solid ${color('OtherInputBorderDefault')}`,
          borderRadius: 4,
          height: 20,
          marginRight: children ? 8 : null,
          width: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&:hover': {
            border: `1px solid ${color('OtherInputBorderHover')}`,
          },
        }}
      >
        {checked ? <CheckIcon size={16} color="PrimaryMainContrast" /> : null}
      </div>
      {children}
    </Text>
  )
}
