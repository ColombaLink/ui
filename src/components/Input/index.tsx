import React, { FC } from 'react'
import { Text } from '../Text'
import { color } from '~/utils'
import { CheckIcon } from '~/icons'
import { useHover, usePropState } from '~/hooks'

export const Input: FC = ({
  children,
  checked: checkedProp,
  style,
  onChange,
  label,
  value: valueProp,
  defaultValue,
}) => {
  const [value, setValue] = usePropState(valueProp)
  return (
    <div style={style}>
      <input
        value={value || ''}
        defaultValue={defaultValue}
        onChange={() => {}}
        style={{
          border: `1px solid ${color('OtherInputBorderDefault')}`,
          borderRadius: 4,
        }}
      />
    </div>
  )
}
