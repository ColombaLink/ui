import { FC, ReactNode } from 'react'
import { color } from '~/utils'
import { Text } from '../Text'
import { styled, Style } from 'inlines'
import { Color } from '~/types'

type StepsProps = {
  active?: any
  style?: Style
  onChange?: (key: string) => void
  data?: {
    [key: string]: ReactNode
  }
  color?: Color
}

export const Step = styled('div', {
  cursor: 'pointer',
  alignItems: 'center',
  borderRadius: 8,
  display: 'flex',
  height: 48,
  marginBottom: 8,
  padding: '0 16px',
})

export const Steps: FC<StepsProps> = ({
  style,
  data = {},
  active,
  onChange,
  color: colorProp = 'accent',
  ...props
}) => {
  return (
    <styled.div style={style} {...props}>
      {Object.keys(data).map((key, index) => {
        const isActive = key === active
        return (
          <Step
            onClick={
              onChange
                ? () => {
                  onChange(key)
                }
                : null
            }
            key={index}
            style={{
              backgroundColor: isActive
                ? color(colorProp, 'active', true)
                : null,
            }}
          >
            <Text
              color={colorProp}
              style={{
                backgroundColor: color(colorProp, 'contrast'),
                borderRadius: 13,
                height: 26,
                lineHeight: '26px',
                marginRight: 16,
                textAlign: 'center',
                width: 26,
              }}
            >
              {index + 1}
            </Text>
            <Text>{data[key]}</Text>
          </Step>
        )
      })}
    </styled.div>
  )
}
