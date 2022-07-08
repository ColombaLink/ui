import React, { FC, ReactNode, CSSProperties } from 'react'
import { Text } from '../Text'
import { color, spaceToPx } from '~/utils'
import { CheckIcon } from '~/icons'
import { useHover, usePropState } from '~/hooks'
import { Space } from '~/types'

export type CheckboxProps = {
  children?: ReactNode
  checked?: boolean
  style?: CSSProperties
  onChange?: (boolean) => void
  label?: ReactNode
  space?: Space
}

export const Checkbox: FC<CheckboxProps> = ({
  children,
  checked: checkedProp,
  style,
  onChange,
  label,
  space,
}) => {
  const [checked, setChecked] = usePropState(checkedProp)
  const { listeners, hover } = useHover()

  const onClick = () => {
    const newChecked = !checked
    setChecked(newChecked)
    onChange?.(newChecked)
  }

  const checkbox = (
    <>
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
          marginRight: 12,
          minWidth: 20,
          minHeight: 20,
          width: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {checked ? <CheckIcon size={16} color="PrimaryMainContrast" /> : null}
      </div>
    </>
  )

  if (label && children) {
    return (
      <>
        <div>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              // marginBottom: spaceToPx(space),
              maxWidth: '100%',
              ...style,
            }}
            {...listeners}
            onClick={onClick}
          >
            <div>{checkbox}</div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'baseline',
              }}
            >
              <Text
                weight={600}
                style={{
                  textAlign: 'left',
                  display: 'flex',
                }}
                wrap
              >
                {label}
              </Text>
              <Text wrap style={{ textAlign: 'left' }}>
                {children}
              </Text>
            </div>
          </button>
        </div>
        <div style={{ height: spaceToPx(space) }}></div>
      </>
    )
  }

  return (
    <>
      <div>
        <button
          onClick={onClick}
          style={{
            alignItems: 'center',
            display: 'flex',
            //    marginBottom: space ? spaceToPx(space) : null,
            ...style,
          }}
          {...listeners}
        >
          {checkbox}
          <Text wrap style={{ textAlign: 'left' }}>
            {label || children}
          </Text>
        </button>
      </div>
      <div style={{ height: spaceToPx(space) }}></div>
    </>
  )
}
