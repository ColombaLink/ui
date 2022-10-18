import React, { CSSProperties, FC, Fragment, ReactNode, useEffect } from 'react'
import { useLocation } from '~/hooks'
import { Weight } from '~/types'
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
  weight?: Weight
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
  weight = isNested ? 500 : 600,
}) => {
  return (
    <Text
      color={isActive ? 'lightaccent:contrast' : isNested ? 'text2' : 'text'}
      weight={isActive ? 600 : weight}
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
          '&:hover': !isActive
            ? {
                backgroundColor: color('background:hover'),
                color: `${color('text')} !important`,
              }
            : null,
        }}
      >
        {typeof children === 'function' ? children({ isActive }) : children}
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
  data: any
  selected?: string
  prefix?: string
  style?: CSSProperties
  children?: ReactNode | ReactNode[]
  header?: ReactNode | ReactNode[]
}> = ({ data = {}, selected, prefix = '', style, children, header }) => {
  const [location, setLocation] = useLocation()

  if (!selected) {
    selected = location
  }

  if (!Array.isArray(data)) {
    data = Object.keys(data).map((key) => {
      const href = data[key]
      return typeof href === 'object'
        ? {
            label: key,
            items: href,
          }
        : {
            label: key,
            href,
          }
    })
  }

  let firstHref
  let hasActive
  const items = data.map(({ label, href, items }, i) => {
    if (items) {
      if (!Array.isArray(items)) {
        items = Object.keys(items).map((key) => ({
          label: key,
          href: items[key],
        }))
      }

      return (
        <Fragment key={i}>
          <MenuHeader style={{ marginTop: i && 40 }}>{label}</MenuHeader>
          {items.map(({ href, label }, index) => {
            if (href[0] !== '?') {
              href = prefix + href
            }
            if (!firstHref) {
              firstHref = href
            }
            const isActive = hrefIsActive(href, selected, items)
            if (isActive) {
              hasActive = true
            }
            return (
              <MenuItem key={index} href={href} isActive={isActive} isNested>
                {label}
              </MenuItem>
            )
          })}
        </Fragment>
      )
    }

    if (href[0] !== '?') {
      href = prefix + href
    }

    if (!firstHref) {
      firstHref = href
    }

    const isActive = hrefIsActive(href, selected, data)
    if (isActive) {
      hasActive = true
    }

    return (
      <MenuItem key={i} href={href} isActive={isActive} weight={500}>
        {label}
      </MenuItem>
    )
  })

  useEffect(() => {
    if (!hasActive) {
      setLocation(firstHref)
    }
  }, [hasActive])

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
      {header}
      {items}
      {children}
    </ScrollArea>
  )
}