import React, { FC, useState } from 'react'
import { styled } from 'inlines'
import { Text } from '../Text'
import { Label } from '../Label'
import { border, color } from '~/utils'

type RadioButtonsProps = {
  value?: string
  data?: Array<{
    label?: string
    value: string | boolean | number
    description?: string
  }>
  defaultValue?: string | boolean | number
  label?: string
  description?: string
  direction?: 'horizontal' | 'vertical'
  onChange?: (value: string | number | boolean) => void
  // onChange?: (value: string, payload: OnRadioGroupChange) => void
}

export const RadioButtons: FC<RadioButtonsProps> = ({
  label,
  description,
  direction,
  data,
  defaultValue,
  onChange,
  ...props
}) => {
  const defaultVar = data?.find(({ value }) => value === defaultValue)
  const selectedIndex = data?.findIndex((obj) => obj === defaultVar)
  const [checked, setChecked] = useState<any>(selectedIndex)

  return (
    <div {...props}>
      {label || description ? (
        <Label label={label} description={description} />
      ) : null}

      <div
        style={{
          display: 'flex',
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
          marginBottom: 8,
          marginTop: 8,
        }}
      >
        {data?.map((item, index) => (
          <div
            onClick={() => {
              // console.log('clicked this', index)
              // console.log('----->', data[index].value)
              setChecked(index)
              onChange?.(data[index].value)
            }}
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              width: 'fit-content',
              marginBottom: 4,
              marginTop: 4,
              marginRight: 12,
              cursor: 'pointer',
            }}
          >
            <styled.input
              type="radio"
              value={data[checked]}
              checked={index == checked}
              onChange={() => {
                // TODO remove this?
                setChecked(index)
                onChange?.(data[index].value)
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
                  backgroundColor: color('background'),
                },
              }}
            ></styled.input>
            <div>
              <Text weight={500}>{item.label ? item.label : item.value}</Text>
              {item.description && (
                <Text weight={400} size={13} color="text2">
                  {item.description}
                </Text>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
