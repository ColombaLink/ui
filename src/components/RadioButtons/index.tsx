import React, { CSSProperties, FC, useState } from 'react'
import { styled } from 'inlines'
import { Text } from '../Text'
import { Label } from '../Label'
import { border, color } from '~/utils'
import { usePropState } from '~/hooks'
import { Space } from '~/types'
import { InputWrapper } from '../Input/InputWrapper'
import { Grid } from '../Grid'
import { Card } from '../Card'

type RadioButtonsProps = {
  value?: string | boolean | number
  data?: Array<{
    label?: string
    value: string | boolean | number
    description?: string
  }>
  label?: string
  description?: string
  direction?: 'horizontal' | 'vertical'
  indent?: boolean
  disabled?: boolean
  descriptionBottom?: string
  // error?: (value: string | boolean | number) => string
  onChange?: (value: string | number | boolean) => void
  space?: Space
  style?: CSSProperties
  cards?: boolean
}

export const RadioButtons: FC<RadioButtonsProps> = ({
  label,
  description,
  direction,
  data,
  value,
  onChange,
  indent,
  disabled,
  space,
  style,
  descriptionBottom,
  cards,
}) => {
  const selectedIndex = data?.findIndex((item) => item.value === value)
  const [checked, setChecked] = usePropState(selectedIndex)

  return (
    <InputWrapper
      indent={indent}
      space={space}
      style={style}
      descriptionBottom={descriptionBottom}
      disabled={disabled}
    >
      <Label label={label} description={description} />
      <div
        style={{
          display: 'flex',
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
          marginBottom: 8,
          marginTop: 8,
        }}
      >
        {data?.map((item, index) => {
          const onSelect = () => {
            setChecked(index)
            onChange?.(data[index].value)
          }
          return (
            <label
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 4,
                marginTop: 4,
                marginRight: 16,
                flexGrow: cards ? 1 : 0,
                cursor: 'pointer',
                border:
                  cards && index === checked
                    ? `1px solid ${color('lightaccent:border')}`
                    : cards
                    ? `1px solid ${color('border')}`
                    : 'none',
                padding: cards ? '12px 12px 20px 12px' : 0,
                borderRadius: 8,
                backgroundColor:
                  cards && index === checked
                    ? color('lightaccent')
                    : 'transparent',
              }}
            >
              <styled.input
                type="radio"
                value={data[checked]}
                checked={index === checked}
                onChange={onSelect}
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
              />
              <div>
                <Text weight={500}>{item.label ? item.label : item.value}</Text>
                {item.description && (
                  <Text weight={400} size={13} color="text2">
                    {item.description}
                  </Text>
                )}
              </div>
            </label>
          )
        })}
      </div>
    </InputWrapper>
  )
}
