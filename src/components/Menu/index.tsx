import React, { CSSProperties, FC, Fragment, ReactNode } from 'react'
import { useLocation } from '~/hooks'
import { color } from '~/utils'
import { hrefIsActive } from '~/utils/hrefIsActive'
import { Button, ButtonProps } from '../Button'
import { Link } from '../Link'
import { ScrollArea } from '../ScrollArea'
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
  return (
    <Text
      color={isNested ? 'text2' : 'text'}
      variant={isActive ? 'active' : null}
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
          backgroundColor: isActive ? color('lightaccent:active') : null,
          '&:hover': {
            backgroundColor: color('lightaccent:hover'),
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
  children?: ReactNode | ReactNode[]
  header?: ReactNode | ReactNode[]
}> = ({ data = {}, selected, prefix = '', style, children, header }) => {
  const [location] = useLocation()
  if (!selected) {
    selected = location
  }

  return (
    <ScrollArea
      style={{
        backgroundColor: color('background'),
        borderRight: `1px solid ${color('border')}`,
        padding: '64px 20px 20px 20px',
        width: 224,
        ...style,
      }}
    >
      {header ? (
        <div
          style={{
            marginBottom: 24,
          }}
        >
          {header}
        </div>
      ) : null}
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
                if (href[0] !== '?') {
                  href = prefix + href
                }
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
    </ScrollArea>
  )
}
