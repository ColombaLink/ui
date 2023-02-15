import React, { FC, CSSProperties } from 'react'
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
  label?: string
  space?: Space
  small?: boolean
  color?: Color
  onClick?: (e: any) => void
}

export const Checkbox: FC<CheckboxProps> = ({
  checked: checkedProp,
  indeterminate,
  description,
  style,
  onChange,
  onClick,
  label,
  space,
  small,
  color: colorProp = 'accent',
  ...props
}) => {
  const [checked, setChecked] = usePropState(checkedProp)
  const { listeners, hover } = useHover()

  const clickHandler = () => {
    const newChecked = !checked
    setChecked(newChecked)
    onChange?.(newChecked)
  }

  return (
    <button
      onClick={(e) => {
        clickHandler()
        if (onClick) {
          onClick(e)
        }
      }}
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
          border: hover
            ? 'rgba(44,60,234,0.2) solid 2px'
            : 'rgba(00,00,00,00) solid 2px',
          borderRadius: 6,
          height: small ? 14 : 24,
          width: small ? 14 : 24,
          marginRight: 10,
        }}
      >
        <div
          style={{
            backgroundColor: checked
              ? color(colorProp, hover ? 'hover' : null)
              : null,
            border: border(1, 'border', hover ? 'hover' : null),
            // outline: hover ? 'rgba(44,60,234,0.2) solid 2px' : null,
            borderRadius: 4,
            height: small ? 16 : 20,
            width: small ? 16 : 20,
            marginRight: 12,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          {...props}
        >
          {checked && indeterminate ? (
            <DashIcon size={small ? 10 : 14} color="accent:contrast" />
          ) : checked ? (
            <CheckIcon size={small ? 12 : 14} color="accent:contrast" />
          ) : null}
        </div>
      </div>

      <Label
        label={label}
        description={description}
        style={{ textAlign: 'left' }}
      />
    </button>
  )
}
