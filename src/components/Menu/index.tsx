import React, { CSSProperties, FC, Fragment, ReactNode } from 'react'
import { useLocation } from '~/hooks'
import { color, font } from '~/utils'
import { hrefIsActive } from '~/utils/hrefIsActive'
import { Button, ButtonProps } from '../Button'
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
      weight="600"
      style={{
        marginBottom: 12,
        ...style,
      }}
    >
      {children}
    </Text>
  )
}

export const MenuItem: FC<MenuItemProps> = ({
  children,
  style,
  href,
  isActive,
  isNested = false,
}) => {
  const textColor = isNested
    ? isActive
      ? 'GreylightContrast'
      : 'TextSecondary'
    : null

  return (
    <Text
      color={textColor}
      weight={isNested ? 500 : 600}
      wrap
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
          borderRadius: 4,
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

export const MenuButton: FC<ButtonProps> = ({ style, ...props }) => {
  return (
    <Button
      {...props}
      style={{
        padding: '4px 12px',
        margin: '-4px -12px',
        ...style,
      }}
    />
  )
}

export const Menu: FC<{
  data: object
  selected?: string
  prefix?: string
  style?: CSSProperties
  children?: ReactNode
}> = Object.assign(({ data = {}, selected, prefix = '', style, children }) => {
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
        ...style,
      }}
    >
      {Object.keys(data).map((key, i) => {
        let value = data[key]
        if (typeof value === 'object') {
          if (!Array.isArray(value)) {
            value = Object.keys(value).map((key) => ({
              label: key,
              href: value[key],
            }))
          }

          return (
            <Fragment key={key}>
              <MenuHeader style={{ marginTop: i && 40 }}>{key}</MenuHeader>
              {value.map(({ href, label }, index) => {
                href = prefix + href
                return (
                  <MenuItem
                    key={index}
                    href={href}
                    isActive={hrefIsActive(href, selected)}
                    isNested
                  >
                    {label}
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
      {children}
    </div>
  )
})
