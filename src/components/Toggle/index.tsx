import React, { CSSProperties, FC } from 'react'
import { Text, usePropState, Label } from '~'
import { styled } from 'inlines'
import { border, Color, color } from '~/utils'
import { Space } from '~/types'
import { InputWrapper } from '../Input/InputWrapper'

type ToggleProps = {
  value?: boolean
  label?: string
  description?: string
  descriptionBottom?: string
  text?: string
  disabled?: boolean
  indent?: boolean
  style?: CSSProperties
  space?: Space
  color?: Color
  onChange?: (value: boolean) => void
}

export const Toggle: FC<ToggleProps> = ({
  value = false,
  indent,
  label,
  disabled,
  description,
  descriptionBottom,
  text,
  space,
  color: colorProp = 'accent',
  style,
  onChange,
  ...props
}) => {
  const [checked, setChecked] = usePropState(value)

  return (
    <InputWrapper
      indent={indent}
      space={space}
      style={style}
      descriptionBottom={descriptionBottom}
      disabled={disabled}
      color={colorProp}
    >
      <Label label={label} description={description} />

      <div {...props} style={{ ...style }}>
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
              backgroundColor: color(checked ? colorProp : 'lightbackdrop'),
              '&:hover': {
                backgroundColor: checked ? color(colorProp, 'active') : null,
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
    </InputWrapper>
  )
}
