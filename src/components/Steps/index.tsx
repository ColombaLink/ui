import React, { CSSProperties, FC } from 'react'
import { color } from '~/utils'
import { useRoute } from 'kabouter'
import { Text } from '../Text'
import { Color } from '~/types'

type StepsProps = {
  style?: CSSProperties
  data?: {
    [key: string]: string
  }
  color?: Color
}

export const Steps: FC<StepsProps> = ({
  style,
  data = {},
  color: colorProp = 'accent',
  ...props
}) => {
  const route = useRoute('[step]')
  const { step } = route.path

  return (
    <div style={style} {...props}>
      {Object.keys(data).map((key, index) => {
        const isActive =
          step === '' || step === undefined ? index === 0 : step === data[key]
        return (
          <div
            onClick={() => {
              route.setPath({ step: data[key] })
            }}
            key={index}
            style={{
              alignItems: 'center',
              backgroundColor: isActive
                ? color(colorProp, 'active', true)
                : null,
              borderRadius: 8,
              display: 'flex',
              height: 48,
              marginBottom: 8,
              padding: '0 16px',
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
            <Text>{key}</Text>
          </div>
        )
      })}
    </div>
  )
}
