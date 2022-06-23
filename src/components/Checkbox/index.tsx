import React, { FC } from 'react'
import { Text } from '../Text'
import { color } from '~/utils'
import { CheckIcon } from '~/icons'
import { useHover, usePropState } from '~/hooks'

export const Checkbox: FC = ({
  children,
  checked: checkedProp,
  style,
  onChange,
}) => {
  const [checked, setChecked] = usePropState(checkedProp)
  const { listeners, hover } = useHover()

  return (
    <Text
      onClick={() => {
        const newChecked = !checked
        setChecked(newChecked)
        onChange?.(newChecked)
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
          border: `1px solid ${color(
            hover ? 'OtherInputBorderHover' : 'OtherInputBorderDefault'
          )}`,
          borderRadius: 4,
          height: 20,
          marginRight: children ? 8 : null,
          width: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {checked ? <CheckIcon size={16} color="PrimaryMainContrast" /> : null}
      </div>
      {children}
    </Text>
  )
}
