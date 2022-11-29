import React, { FC, ReactNode, CSSProperties } from 'react'
import { Label } from '../Label'
import { border, color, spaceToPx } from '~/utils'
import { CheckIcon } from '~/icons'
import { useHover, usePropState } from '~/hooks'
import { Space } from '~/types'

export type CheckboxProps = {
  checked?: boolean
  description?: string
  style?: CSSProperties
  onChange?: (value: boolean) => void
  label?: ReactNode | string
  space?: Space
  size?: number
}

export const Checkbox: FC<CheckboxProps> = ({
  checked: checkedProp,
  description,
  style,
  onChange,
  label,
  space,
  size = 20,
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
        marginBottom: space ? spaceToPx(space) : null,
        ...style,
      }}
      {...listeners}
    >
      <div
        style={{
          backgroundColor: checked
            ? color('accent', hover ? 'hover' : null)
            : null,
          border: border(1, 'border', hover ? 'hover' : null),
          borderRadius: 4,
          height: size,
          marginRight: 12,
          flexShrink: 0,
          width: size,
          // marginTop: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        {...props}
      >
        {checked ? <CheckIcon size={16} color="accent:contrast" /> : null}
      </div>

      <Label
        label={label}
        description={description}
        style={{ textAlign: 'left' }}
      />
    </button>
  )
}
