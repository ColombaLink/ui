import React, { FC, ReactNode, useEffect, useState } from 'react'
import { styled } from 'inlines'
import { Text } from '../Text'
import { border, color } from '~/utils'

type RadioButtonProps = {
  value?: string
  data?: Array<string>
  defaultValue?: string
  label?: string
  description?: string
  direction?: 'horizontal' | 'vertical'
  // onChange?: (value: string, payload: OnRadioGroupChange) => void
}

export const RadioButton: FC<RadioButtonProps> = ({
  label,
  description,
  direction,
  data,
  defaultValue,
}) => {
  const blah = data.indexOf(defaultValue)

  const [checked, setChecked] = useState<number | undefined>(blah)

  return (
    <div>
      <Text>{label}</Text>
      <Text weight={400}>{description}</Text>
      <div
        style={{
          display: 'flex',
          flexDirection: direction == 'horizontal' ? 'row' : 'column',
          marginBottom: 8,
          marginTop: 8,
        }}
      >
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              width: 'fit-content',
              marginBottom: 4,
              marginTop: 4,
              marginRight: 12,
            }}
          >
            <styled.input
              type="radio"
              value={data[checked]}
              checked={index == checked}
              onChange={() => {
                setChecked(index)
              }}
              style={{
                position: 'relative',
                cursor: 'pointer',
                width: 20,
                height: 20,
                borderRadius: 20 / 2,
                marginRight: 12,
                border: border(1, 'border'),

                '&:checked': {
                  background: color('accent'),
                  borderColor: color('accent'),
                },
                '&:before': {
                  position: 'absolute',
                  top: `calc(50% - ${10 / 2}px)`,
                  left: `calc(50% - ${10 / 2}px)`,
                  width: '10px',
                  height: '10px',
                  borderRadius: '5px',
                  content: `''`,
                  display: 'block',
                  backgroundColor: '#FFF',
                },
              }}
            ></styled.input>
            <div
              onClick={() => {
                setChecked(index)
              }}
            >
              <Text weight={400}>{item}</Text>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
