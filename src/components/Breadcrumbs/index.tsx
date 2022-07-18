import React, { FC, CSSProperties } from 'react'
import { hrefIsActive } from '~/utils/hrefIsActive'
import { Link } from '../Link'
import { Text } from '../Text'
import { useLocation } from '~/hooks'
import { ChevronRightIcon } from '~/icons'

type BreadcrumbsProps = {
  style?: CSSProperties
  data?: {
    [key: string]: string
  }
  prefix?: string
  selected?: string
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({
  data,
  style,
  prefix = '',
  selected,
  ...props
}) => {
  const [location] = useLocation()
  if (!selected) {
    selected = location
  }

  if (!data) {
    return null
  }

  return (
    <div style={{ display: 'flex', ...style }} {...props}>
      {Object.keys(data).map((key, index) => {
        const href = prefix + data[key]
        const isActive = hrefIsActive(href, selected)

        return (
          <Link
            href={href}
            key={index}
            style={{
              alignItems: 'center',
              borderRadius: 4,
              display: 'flex',
              height: 32,
            }}
          >
            <Text
              style={{ marginLeft: 16 }}
              color={isActive ? 'text' : 'text2'}
            >
              {key}
            </Text>
            {Object.keys(data).length - 1 !== index && (
              <ChevronRightIcon
                style={{ marginLeft: 16 }}
                color={isActive ? 'text' : 'text2'}
              />
            )}
          </Link>
        )
      })}
    </div>
  )
}
