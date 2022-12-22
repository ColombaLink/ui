import React, { FC, ReactNode, CSSProperties } from 'react'
import { Label } from '../Label'
import { border, color, spaceToPx } from '~/utils'
import { CheckIcon, DashIcon } from '~/icons'
import { useHover, usePropState } from '~/hooks'
import { Color, Space } from '~/types'

export type CheckboxProps = {
  checked?: boolean
  indeterminate?: boolean
  description?: string
  style?: CSSProperties
  onChange?: (value: boolean) => void
  label?: ReactNode | string
  space?: Space
  size?: 'sm' | 'md'
  color?: Color
}

export const Checkbox: FC<CheckboxProps> = ({
  checked: checkedProp,
  indeterminate,
  description,
  style,
  onChange,
  label,
  space,
  size = 'md',
  color: colorProp = 'accent',
  ...props
}) => {
  const [checked, setChecked] = usePropState(checkedProp)
  const { listeners, hover } = useHover()

  const onClick = () => {
    const newChecked = !checked
    setChecked(newChecked)
    onChange?.(newChecked)
  }

  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: !description ? 'center' : '',
        marginBottom: space ? spaceToPx(space) : null,
        ...style,
      }}
      {...listeners}
    >
      <div
        style={{
          backgroundColor: checked
            ? color(colorProp, hover ? 'hover' : null)
            : null,
          border: border(1, 'border', hover ? 'hover' : null),
          outline: hover ? 'rgba(44,60,234,0.2) solid 2px' : null,
          borderRadius: 4,
          height: size === 'sm' ? 16 : 20,
          width: size === 'sm' ? 16 : 20,
          marginRight: 12,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        {...props}
      >
        {checked && indeterminate ? (
          <DashIcon size={size === 'sm' ? 10 : 14} color="accent:contrast" />
        ) : checked ? (
          <CheckIcon size={size === 'sm' ? 12 : 14} color="accent:contrast" />
        ) : null}
      </div>

      <Label
        label={label}
        description={description}
        style={{ textAlign: 'left' }}
      />
    </button>
  )
}
