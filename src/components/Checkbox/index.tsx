import React, { FC, ReactNode, CSSProperties } from 'react'
import { Text } from '../Text'
import { border, color, spaceToPx } from '~/utils'
import { CheckIcon } from '~/icons'
import { useHover, usePropState } from '~/hooks'
import { Space } from '~/types'

export type CheckboxProps = {
  children?: ReactNode
  checked?: boolean
  description?: string
  style?: CSSProperties
  onChange?: (boolean) => void
  label?: ReactNode
  space?: Space
}

export const Checkbox: FC<CheckboxProps> = ({
  children,
  checked: checkedProp,
  description,
  style,
  onChange,
  label,
  space,
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
          height: 20,
          marginRight: 12,
          minWidth: 20,
          minHeight: 20,
          width: 20,
          marginTop: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        {...props}
      >
        {checked ? <CheckIcon size={16} color="accent:contrast" /> : null}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'baseline',
        }}
      >
        <Text wrap style={{ textAlign: 'left' }} weight={600}>
          {label}
        </Text>
        {description && (
          <Text wrap style={{ textAlign: 'left' }} weight={400}>
            {description}
          </Text>
        )}
        <div>{children}</div>
      </div>
    </button>
  )
}
