import React, { FC, useState } from 'react'
import { Text } from '~'
import { styled } from 'inlines'
import { border, color } from '~/utils'

type TogglerProps = {
  checked?: boolean
  label?: string
  description?: string
  text?: string
}

export const Toggler: FC<TogglerProps> = ({
  checked,
  label,
  description,
  text,
}) => {
  const [checkedState, setCheckedState] = useState(checked)

  return (
    <div>
      <Text>{label}</Text>
      <Text weight={400}>{description}</Text>
      <div style={{ display: 'flex', marginTop: 8, alignItems: 'center' }}>
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
              ? color('accent')
              : color('lightgrey:active'),
            '&:hover': {
              backgroundColor: checkedState
                ? color('accent:active')
                : color('lightaccent'),
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
