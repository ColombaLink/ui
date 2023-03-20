import React, { CSSProperties, FC, Fragment, ReactNode } from 'react'
import { Weight } from '~/types'
import { color } from '~/utils'
import { Button, ButtonProps } from '../Button'
import { Link, useRoute } from 'kabouter'
import { ScrollArea } from '../ScrollArea'
import { Text } from '../Text'
import { ChevronDownIcon } from '~/icons'
import { Style, styled } from 'inlines'

const StyledLink = styled(Link, {
  padding: '4px 8px',
  margin: '-4px -4px -4px -2px',
  borderRadius: 4,
})

type MenuHeaderProps = {
  children?: ReactNode
  style?: CSSProperties
  onClick?: (e) => void
  id?: string
}

type MenuItemProps = {
  children?: ReactNode | FC
  style?: Style
  href?: string
  isActive?: boolean
  isNested?: boolean
  weight?: Weight
}

const MenuHeader: FC<MenuHeaderProps> = ({ children, style, onClick, id }) => {
  return (
    <styled.div
      id={id}
      style={{
        '&.closed': {
          marginBottom: '-12px',
        },
      }}
    >
      <Text
        weight="700"
        color={color('text2')}
        size={12}
        style={{
          marginBottom: 16,
          textTransform: 'uppercase',
          color: color('text2'),
          ...style,
        }}
        onClick={onClick}
      >
        {children}
      </Text>
    </styled.div>
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
      color={isActive ? 'lightaccent:contrast' : 'text'}
      weight={isActive ? 500 : weight}
      wrap
      style={{
        marginBottom: 8,
        ...style,
      }}
    >
      <StyledLink
        href={href}
        style={{
          backgroundColor: isActive ? color('lightaccent:active') : null,
          '@media (hover: hover)': {
            '&:hover': !isActive
              ? {
                  backgroundColor: color('background:hover'),
                  color: `${color('text')} !important`,
                }
              : null,
          },
        }}
      >
        {typeof children === 'function'
          ? children({
              isActive,
            })
          : children}
      </StyledLink>
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

const HideableStyledDiv = styled('div', {
  display: 'block',
  '&.hidden': {
    display: 'none',
  },
})

const StyledChevron = styled(ChevronDownIcon, {
  transition: 'transform 0.2s',
  '&.closed': {
    transform: 'rotate(180deg)',
  },
})

export const Menu: FC<{
  data: any
  selected?: string
  style?: CSSProperties
  children?: ReactNode | ReactNode[]
  header?: ReactNode | ReactNode[]
  collapse?: boolean
}> = ({ data = {}, selected, style, children, header, collapse }) => {
  const route = useRoute()

  const location = route.location

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
          <MenuHeader
            id={`${i}-menuheader`}
            style={{
              marginTop: i && 36,
              justifyContent: collapse ? 'space-between' : null,
              display: collapse ? 'flex' : null,
              alignItems: 'center',
              cursor: href ? 'pointer' : null,
              color: href // TODO: add is active
                ? color('accent')
                : color('text2'),
            }}
            onClick={(e) => {
              if (collapse) {
                e.currentTarget.parentNode.nextSibling.classList.toggle(
                  'hidden'
                )
                e.currentTarget.parentNode?.childNodes[0]?.childNodes[1]?.classList.toggle(
                  'closed'
                )
              } else if (href) {
                route.setLocation(href)
              }
            }}
          >
            {label}
            {collapse && <StyledChevron id={`${i}-menuchevron`} />}
          </MenuHeader>
          <HideableStyledDiv id={`${i}-menuitems`}>
            {items.map(({ href, label }, index) => {
              const isActive = false

              return (
                <MenuItem key={index} href={href} isActive={isActive} isNested>
                  {label}
                </MenuItem>
              )
            })}
          </HideableStyledDiv>
        </Fragment>
      )
    }



    const isActive = false

    return (
      <MenuItem key={i} href={href} isActive={isActive} weight={500}>
        {label}
      </MenuItem>
    )
  })

  return (
    <ScrollArea
      style={{
        flexGrow: 0,
        backgroundColor: color('background'),
        borderRight: `1px solid ${color('border')}`,
        padding: '24px 20px 20px 20px',
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
