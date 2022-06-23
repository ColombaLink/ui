import React, { FC } from 'react'
import { Text } from '../Text'
import { color } from '~/utils'
import { CheckIcon } from '~/icons'
import { useHover, usePropState } from '~/hooks'

export const Select: FC = ({
  children,
  checked: checkedProp,
  style,
  onChange,
  label,
}) => {
  const [checked, setChecked] = usePropState(checkedProp)
  const { listeners, hover } = useHover()

  listeners.onClick = () => {
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
        marginRight: children ? 8 : null,
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
      <button style={style} {...listeners}>
        <Text
          weight={600}
          style={{
            alignItems: 'center',
            display: 'flex',
          }}
        >
          {checkbox}
          {label}
        </Text>
        <Text
          wrap
          style={{
            marginLeft: 28,
          }}
        >
          {children}
        </Text>
      </button>
    )
  }

  return (
    <button
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
