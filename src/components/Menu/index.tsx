import React, {
  CSSProperties,
  FC,
  Fragment,
  ReactNode,
  MouseEvent,
} from 'react'
import { Weight } from '~/types'
import { color } from '~/utils'
import { Button, ButtonProps } from '../Button'
import { ScrollArea } from '../ScrollArea'
import { Text } from '../Text'
import { ChevronDownIcon } from '~/icons'
import { Style, styled } from 'inlines'

const Click = styled('div', {
  padding: '4px 8px',
  margin: '-4px -4px -4px -2px',
  borderRadius: 4,
})

type MenuHeaderProps = {
  children?: ReactNode
  style?: CSSProperties
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
  id?: string
}

type MenuItemProps = {
  children?: ReactNode | FC
  style?: Style
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
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
  onClick = () => {},
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
      <Click
        onClick={(e) => onClick(e)}
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
      </Click>
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

type MenuDataItemObject =
  | {
      value: string | number
      icon?: ReactNode
      onClick?: (e: MouseEvent) => void
      label?: ReactNode
      items?: MenuDataItemObject[]
    }
  | {
      value: any
      icon?: ReactNode
      onClick?: (e: MouseEvent) => void
      label: ReactNode
      items?: MenuDataItemObject[]
    }

type MenuDataItem = MenuDataItemObject | ReactNode

type MenuDataObjectItem = {
  [key: string]: ReactNode | MenuDataItem[]
}

type MenuDataObject = {
  [key: string]: ReactNode | MenuDataItem[] | MenuDataObjectItem
}

export type MenuData = MenuDataItem[] | MenuDataObject

const isMenuDataObject = (data: MenuData): data is MenuDataObject => {
  return !Array.isArray(data) && !React.isValidElement(data)
}

const isMenuDataObjectItem = (
  data: MenuDataObjectItem | ReactNode | MenuDataItem[]
): data is MenuDataObjectItem => {
  return !Array.isArray(data) && !React.isValidElement(data)
}

const toMenuItemObject = (
  item: MenuDataItem | MenuDataItem[],
  key?: string
): MenuDataItemObject => {
  if (Array.isArray(item)) {
    return {
      label: key,
      value: key,
      items: item.map((i) => toMenuItemObject(i)),
    }
  } else if (typeof item === 'string' || typeof item === 'number') {
    return {
      label: item,
      value: item,
    }
  } else if (React.isValidElement(item)) {
    return {
      label: item,
      value: key,
    }
  } else {
    // @ts-ignore
    return item
  }
}

export const Menu: FC<{
  data?: MenuData
  active?: any
  onChange?: (value: any, header?: any) => void
  style?: Style
  children?: ReactNode | ReactNode[]
  header?: ReactNode | ReactNode[]
  collapse?: boolean
}> = ({ data = {}, onChange, active, style, children, header, collapse }) => {
  const menuDataItems: MenuDataItemObject[] = []

  if (isMenuDataObject(data)) {
    for (const key in data) {
      const item = data[key]
      if (isMenuDataObjectItem(item)) {
        const items: MenuDataItemObject[] = []
        for (const itemKey in item) {
          items.push(toMenuItemObject(item[itemKey], itemKey))
        }
        menuDataItems.push({
          label: key,
          value: key,
          items,
        })
      } else {
        menuDataItems.push(toMenuItemObject(item, key))
      }
    }
  } else {
    for (const item of data) {
      menuDataItems.push(toMenuItemObject(item))
    }
  }

  const items = menuDataItems.map(
    ({ label, value, icon, items, onClick }, i) => {
      if (items) {
        const topValue = value
        return (
          <Fragment key={i}>
            <MenuHeader
              id={`${i}-menuheader`}
              style={{
                marginTop: i && 36,
                justifyContent: collapse ? 'space-between' : null,
                display: collapse ? 'flex' : null,
                alignItems: 'center',
              }}
              onClick={(e) => {
                if (onChange) {
                  onChange(value)
                }
                if (onClick) {
                  onClick(e)
                }
                if (collapse) {
                  // @ts-ignore FIX THIS
                  e.currentTarget.parentNode.nextSibling.classList.toggle(
                    'hidden'
                  )
                  // @ts-ignore FIX THIS
                  e.currentTarget.parentNode?.childNodes[0]?.childNodes[1]?.classList.toggle(
                    'closed'
                  )
                }
              }}
            >
              {label}
              {collapse && <StyledChevron id={`${i}-menuchevron`} />}
            </MenuHeader>
            <HideableStyledDiv id={`${i}-menuitems`}>
              {items.map(({ value, label, onClick }, index: number) => {
                return (
                  <MenuItem
                    key={index}
                    onClick={(e) => {
                      if (onChange) {
                        onChange(value, topValue)
                      }
                      if (onClick) {
                        onClick(e)
                      }
                    }}
                    isActive={active === value}
                    isNested
                  >
                    {label}
                  </MenuItem>
                )
              })}
            </HideableStyledDiv>
          </Fragment>
        )
      }

      return (
        <MenuItem
          key={i}
          isActive={active === value}
          weight={500}
          onClick={(e) => {
            if (onChange) {
              onChange(value)
            }
            if (onClick) {
              onClick(e)
            }
          }}
        >
          {label}
        </MenuItem>
      )
    }
  )

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
