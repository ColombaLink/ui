import React, { FC, useState } from 'react'
import { Text } from '~'
import { styled } from 'inlines'
import { border, Color, color } from '~/utils'

type ToggleProps = {
  checked?: boolean
  label?: string
  description?: string
  text?: string
  baseColor?: Color
}

export const Toggle: FC<ToggleProps> = ({
  checked,
  label,
  description,
  text,
  baseColor = 'accent',
  ...props
}) => {
  const [checkedState, setCheckedState] = useState(checked)

  const activeColor = baseColor + ':active'

  return (
    <div {...props}>
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
            setCheckedState(!checkedState)
          }}
          type="checkbox"
          checked={checkedState}
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
            backgroundColor: checkedState
              ? color(baseColor)
              : color('lightbackdrop'),
            '&:hover': {
              backgroundColor: checkedState
                ? //@ts-ignore
                  color(activeColor)
                : color('lightbackdrop'),
            },
            '&:before': {
              content: '" "',
              width: '16px',
              height: '16px',
              backgroundColor: color('background'),
              borderRadius: '8px',
              display: 'block',
              position: 'absolute',
              left: !checkedState && '2px',
              right: checkedState && '2px',
            },
          }}
        ></styled.input>
        {text && <Text weight={400}>{text}</Text>}
      </div>
    </div>
  )
}
