import React, { CSSProperties, FC } from 'react'
import { useLocation } from '~/hooks'
import { color } from '~/utils'
import { hrefIsActive } from '~/utils/hrefIsActive'
import { Link } from '../Link'
import { Text } from '../Text'

type StepsProps = {
  style?: CSSProperties
  selected?: string
  prefix?: string
  data?: {
    [key: string]: string
  }
}

export const Steps: FC<StepsProps> = ({
  style,
  data = {},
  prefix = '',
  selected,
  ...props
}) => {
  const [location] = useLocation()
  if (selected) {
    selected = prefix + selected
  } else {
    selected = location
  }

  return (
    <div style={style} {...props}>
      {Object.keys(data).map((key, index) => {
        const href = prefix + data[key]
        const isActive = hrefIsActive(href, selected)
        return (
          <Link
            href={href}
            key={index}
            style={{
              alignItems: 'center',
              backgroundColor: isActive ? color('lightaccent:active') : null,
              borderRadius: 4,
              display: 'flex',
              height: 48,
              marginBottom: 8,
              padding: '0 16px',
            }}
          >
            <Text
              color="accent"
              style={{
                backgroundColor: color('accent:contrast'),
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
