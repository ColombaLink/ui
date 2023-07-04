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
  expandable,
  onExpand,
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
              space={16}
              typography="caption600"
              color="text2"
              style={{
                textTransform: 'uppercase',
                marginTop: 16,
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
    <div
      style={{
        width: expanded ? 246 : 70,
        minWidth: expanded ? 246 : 70,
        paddingTop: 6,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'relative',
        borderRight: border(1),
        transition: 'all 0.24s ease-out',
        ...style,
      }}
    >
      {header}
      <div style={{}}>{elements}</div>
      {children}
      {expandable && (
        <styled.div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            height: '100%',
            width: 10,
            borderRight: '2px solid transparent',
            '@media (hover: hover)': {
              '&:hover': {
                borderRight: `2px solid ${color('accent')}`,
                cursor: 'pointer',
              },
            },
          }}
          onMouseOver={(e) => {
            setMenuHeight(e.currentTarget.offsetHeight)
            setHoverForExpansion(true)
          }}
          onMouseLeave={() => {
            setHoverForExpansion(false)
          }}
          onClick={() => {
            if (onExpand) {
              onExpand(!expanded)
            }
            setExpanded((prev) => !prev)
          }}
        >
          {hoverForExpansion ? (
            <styled.div
              style={{
                position: 'absolute',
                width: 28,
                height: 28,
                borderRadius: 16,
                backgroundColor: color('background'),
                border: `1px solid ${color('border')}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                right: -14,
                top: menuHeight / 2 - 14,
                cursor: 'pointer',
                boxShadow: boxShadow('small'),
                '@media (hover: hover)': {
                  '&:hover': {
                    backgroundColor: color('background2'),
                  },
                },
              }}
              onClick={(e) => {
                e.stopPropagation()
                if (onExpand) {
                  onExpand(!expanded)
                }
                setExpanded((prev) => !prev)
              }}
            >
              <ChevronRightIcon
                color="text"
                size={12}
                style={{
                  transform: expanded ? 'scaleX(-1)' : 'scaleX(1)',
                  marginRight: -1,
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  if (onExpand) {
                    onExpand(!expanded)
                  }
                  setExpanded((prev) => !prev)
                }}
              />
            </styled.div>
          ) : null}
        </styled.div>
      )}
    </div>
  )
}
