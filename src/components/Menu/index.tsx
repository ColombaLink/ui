import React, { CSSProperties, FC, Fragment, ReactNode } from 'react'
import { useLocation } from 'wouter'
import { color, font } from '~/utils'
import { hrefIsActive } from '~/utils/hrefIsActive'
import { Link } from '../Link'
import { Text } from '../Text'

type MenuHeaderProps = {
  children?: ReactNode
  style?: CSSProperties
}

type MenuItemProps = {
  children?: ReactNode
  style?: CSSProperties
  href?: string
  isActive?: boolean
  isNested?: boolean
}

const MenuHeader: FC<MenuHeaderProps> = ({ children, style }) => {
  return (
    <Text
      weight={600}
      style={{
        marginBottom: 12,
        ...style,
      }}
    >
      {children}
    </Text>
  )
}

const MenuItem: FC<MenuItemProps> = ({
  children,
  style,
  href,
  isActive,
  isNested = false,
}) => {
  const textColor = isNested
    ? isActive
      ? 'ActionLightContrast'
      : 'TextSecondary'
    : null

  return (
    <Text
      color={textColor}
      weight={isNested ? 500 : 600}
      style={{
        marginBottom: 8,
        ...style,
      }}
    >
      <Link
        href={href}
        style={{
          padding: '4px 12px',
          margin: '-4px -12px',
          backgroundColor: isActive ? color('PrimaryLightSelected') : null,
          '&:hover': {
            backgroundColor: color('PrimaryLightHover'),
          },
        }}
      >
        {children}
      </Link>
    </Text>
  )
}

export const Menu = ({
  data = {},
  selected,
  prefix = '',
}: {
  data: object
  selected?: string
  prefix?: string
}) => {
  const [location] = useLocation()
  if (!selected) {
    selected = location
  }

  return (
    <div
      style={{
        backgroundColor: color('Background1dp'),
        borderRight: `1px solid ${color('OtherDivider')}`,
        padding: '64px 20px 20px 20px',
        width: 224,
        ...font(),
      }}
    >
      {Object.keys(data).map((key, i) => {
        const value = data[key]
        if (typeof value === 'object') {
          return (
            <Fragment key={key}>
              <MenuHeader style={{ marginTop: i && 40 }}>{key}</MenuHeader>
              {Object.keys(value).map((key) => {
                const href = prefix + value[key]
                return (
                  <MenuItem
                    key={key}
                    href={href}
                    isActive={hrefIsActive(href, selected)}
                    isNested
                  >
                    {key}
                  </MenuItem>
                )
              })}
            </Fragment>
          )
        }
        const href = prefix + value
        return (
          <MenuItem
            key={key}
            href={href}
            isActive={hrefIsActive(href, selected)}
          >
            {key}
          </MenuItem>
        )
      })}
    </div>
  )
}
