import React, { FC, ReactNode, CSSProperties, EventHandler } from 'react'
import { Text } from '../Text'
import { color } from '~/utils'
import { CheckIcon } from '~/icons'
import { useHover, usePropState } from '~/hooks'

export type CheckboxProps = {
  children?: ReactNode
  checked?: boolean
  style?: CSSProperties
  onChange?: (boolean) => void
  label?: ReactNode
}

export const Checkbox: FC<CheckboxProps> = ({
  children,
  checked: checkedProp,
  style,
  onChange,
  label,
}) => {
  const [checked, setChecked] = usePropState(checkedProp)
  const { listeners, hover } = useHover()

  const onClick = () => {
    const newChecked = !checked
    setChecked(newChecked)
    onChange?.(newChecked)
  }

  const checkbox = (
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
        marginRight: children ? 12 : null,
        width: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {checked ? <CheckIcon size={16} color="PrimaryMainContrast" /> : null}
    </div>
  )

  if (label && children) {
    return (
      <button
        style={{ display: 'flex', alignItems: 'center', ...style }}
        {...listeners}
        onClick={onClick}
      >
        <div>{checkbox}</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Text
            weight={600}
            style={{
              alignItems: 'center',
              display: 'flex',
            }}
          >
            {label}
          </Text>
          <Text wrap>{children}</Text>
        </div>
      </button>
    )
  }

  return (
    <button
      onClick={onClick}
      style={{
        alignItems: 'center',
        display: 'flex',
        ...style,
      }}
      {...listeners}
    >
      {checkbox}
      <Text>{label || children}</Text>
    </button>
  )
}
