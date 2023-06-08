import React, {
  FC,
  ReactNode,
  useState,
  FunctionComponent,
  MouseEvent,
  isValidElement,
  useMemo,
} from 'react'
import { border, boxShadow, color, renderOrCreateElement } from '~/utils'
import { useTooltip } from '~/hooks/useTooltip'
import { Text } from '../Text'
import { styled, Style } from 'inlines'
import { ChevronRightIcon } from '~/icons'
import { Icon } from '~/types'
import { Drawer } from '../Drawer'

type SideBarItem = {
  icon?: ReactNode | FunctionComponent<Icon>
  label?: ReactNode
  value?: any
  subTitle?: string
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
}

type SideBarData =
  | SideBarItem[]
  | {
      [key: string]: ReactNode | SideBarItem
    }

type SidebarProps = {
  data?: SideBarData
  isExpanded?: boolean
  style?: Style
  active?: any
  onChange?: (value: any) => void
  children?: ReactNode | ReactNode[]
  header?: ReactNode | ReactNode[]
  expandable?: boolean
  onExpand?: (isExpanded: boolean) => void
}

type SidebarItemProps = {
  children?: ReactNode
  label?: ReactNode
  href?: string
  isActive?: boolean
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
  expanded?: boolean
  icon?: FunctionComponent<Icon> | ReactNode
}

const StyledLink = styled('div', {
  height: 40,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: 8,
  borderRadius: 8,
  transition: 'width 0.24s ease-out',
  paddingLeft: 10,
})

const SidebarItem: FC<SidebarItemProps> = ({
  label,
  isActive,
  children,
  expanded,
  onClick,
}) => {
  const tooltip = expanded ? undefined : useTooltip(label, 'right')

  return (
    <StyledLink
      onClick={onClick}
      style={{
        width: expanded ? 216 : 40,
        color: color(isActive ? 'lightaccent:contrast' : 'text'),
        backgroundColor: isActive ? color('lightaccent:active') : null,
        '@media (hover: hover)': {
          '&:hover': isActive
            ? null
            : {
                backgroundColor: color('background:hover'),
              },
        },
        '& svg': {
          minWidth: '20px',
        },
      }}
      {...tooltip}
    >
      {children}
      <styled.div
        style={{
          overflowX: 'hidden',
        }}
      >
        <Text
          style={{
            marginLeft: 16,
          }}
          weight={isActive ? 600 : 500}
          color={isActive ? color('accent') : color('text')}
        >
          {label}
        </Text>
      </styled.div>
    </StyledLink>
  )
}

export const Sidebar: FC<SidebarProps> = ({
  data,
  style,
  active,
  onChange,
  header,
  children,
  isExpanded,
}) => {
  const [expanded, setExpanded] = useState(false)

  useMemo(() => {
    setExpanded(isExpanded)
  }, [isExpanded])

  const [hoverForExpansion, setHoverForExpansion] = useState(false)
  const [menuHeight, setMenuHeight] = useState(null)

  let parsedData: SideBarItem[] = []

  if (Array.isArray(data)) {
    parsedData = data
  } else if (typeof data === 'object') {
    for (const k in data) {
      const item = data[k]
      if (typeof item === 'object' && !isValidElement(item)) {
        parsedData.push({
          value: k,
          ...item,
        })
      } else {
        parsedData.push({
          icon: item,
          value: k,
          label: k,
        })
      }
    }
  }

  const elements = parsedData.map(
    ({ onClick, label, value, icon, subTitle }, i) => {
      if (subTitle) {
        return (
          <div
            key={i}
            onClick={onClick}
            style={{ position: 'relative', height: 52 }}
          >
            <Text
              wrap
              typography="caption600"
              color="text2"
              style={{
                textTransform: 'uppercase',
                marginTop: 16,
                marginBottom: 16,
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                transition: 'opacity 0.24s linear',
                overflowX: 'hidden',
                opacity: expanded ? 1 : 0,
              }}
            >
              {subTitle}
            </Text>
          </div>
        )
      }

      return (
        <SidebarItem
          key={i}
          onClick={(e) => {
            if (onChange) {
              onChange(value)
            }
            if (onClick) {
              onClick(e)
            }
          }}
          label={label}
          isActive={active === undefined ? false : active === value}
          expanded={expanded}
          icon={renderOrCreateElement(icon)}
        >
          {renderOrCreateElement(icon, { size: 20 })}
        </SidebarItem>
      )
    }
  )

  return (
    <Drawer width={246} autoCollapse={false} closeWidth={70} style={style}>
      {header}
      <div style={{}}>{elements}</div>
      {children}
    </Drawer>
  )
}
