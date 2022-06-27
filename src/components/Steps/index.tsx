import React, { CSSProperties, FC, Fragment, ReactNode } from 'react'
import { useLocation } from '~/hooks'
import { color, font } from '~/utils'
import { hrefIsActive } from '~/utils/hrefIsActive'
import { Link } from '../Link'
import { Text } from '../Text'

export const Steps: FC<{
  style?: CSSProperties
  selected?: string
  prefix?: string
  data: {
    [key: string]: string
  }
}> = ({ style, data, prefix = '', selected }) => {
  const [location] = useLocation()
  if (!selected) {
    selected = location
  }
  return (
    <div style={style}>
      {Object.keys(data).map((key, index) => {
        const href = prefix + data[key]
        const isActive = hrefIsActive(href, selected)
        return (
          <Link
            href={href}
            key={index}
            style={{
              alignItems: 'center',
              backgroundColor: isActive ? color('PrimaryLightSelected') : null,
              borderRadius: 4,
              display: 'flex',
              height: 48,
              marginBottom: 8,
              padding: '0 16px',
            }}
          >
            <Text
              color="PrimaryMain"
              style={{
                backgroundColor: color('OtherForeground'),
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
          </Link>
        )
      })}
    </div>
  )
}
