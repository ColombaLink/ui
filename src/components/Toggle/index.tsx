import React, { CSSProperties, FC } from 'react'
import { Text, usePropState } from '~'
import { styled } from 'inlines'
import { border, Color, color } from '~/utils'

type ToggleProps = {
  value?: boolean
  label?: string
  description?: string
  text?: string
  baseColor?: Color
  style: CSSProperties
  onChange?: (value: boolean) => void
}

export const Toggle: FC<ToggleProps> = ({
  value = false,
  label,
  description,
  text,
  baseColor = 'accent',
  style,
  onChange,
  ...props
}) => {
  const [checked, setChecked] = usePropState(value)

  return (
    <div {...props} style={{ ...style }}>
      <Text>{label}</Text>
      <Text weight={400}>{description}</Text>
      <div
        style={{
          display: 'flex',
          marginTop: label || description ? 8 : 0,
          alignItems: 'center',
        }}
      >
        <styled.input
          onChange={() => {
            const newChecked = !checked
            setChecked(newChecked)
            onChange?.(newChecked)
          }}
          type="checkbox"
          checked={checked}
          style={{
            display: 'flex',
            width: 32,
            height: 20,
            borderRadius: 10,
            alignItems: 'center',
            marginRight: 12,
            position: 'relative',
            cursor: 'pointer',
            border: border('1px', 'border'),
            backgroundColor: color(checked ? baseColor : 'lightbackdrop'),
            '&:hover': {
              backgroundColor: checked ? color(baseColor, 'active') : null,
            },
            '&:before': {
              content: '" "',
              width: '16px',
              height: '16px',
              backgroundColor: color('background'),
              borderRadius: '8px',
              display: 'block',
              position: 'absolute',
              left: !checked && '2px',
              right: checked && '2px',
            },
          }}
        />
        {text && <Text weight={400}>{text}</Text>}
      </div>
    </div>
  )
}
