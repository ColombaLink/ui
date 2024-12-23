import {
  FC,
  useRef,
  ReactNode,
  useState,
  FunctionComponent,
  MouseEvent,
  isValidElement,
  useMemo,
  useEffect,
} from 'react'
import { border, boxShadow, color, renderOrCreateElement } from '~/utils'
import { useTooltip } from '~/hooks/useTooltip'
import { Text } from '../Text'
import { ChevronRightIcon } from '~/icons'
import { Icon } from '~/types'
import { Drawer } from '../Drawer'
import { styled, Style } from 'inlines'

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
  style?: Style
  active?: any
  onChange?: (value: any) => void
  children?: ReactNode | ReactNode[]
  header?: ReactNode | ReactNode[]
  onExpand?: (isExpanded: boolean) => void
  autoCollapse?: boolean
  closeBreakpoint?: number
  storageKey?: string
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
  autoCollapse,
  storageKey,
  closeBreakpoint,
}) => {
  const [expanded, setExpanded] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const resize = new ResizeObserver((entry) => {
      const width = entry[0].contentRect.width
      if (width > 200) {
        setExpanded(true)
      } else if (width < 200) {
        setExpanded(false)
      }
    })
    const element = ref.current
    resize.observe(element)
    return () => resize.disconnect()
  }, [])

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
    <div ref={ref}>
      <Drawer
        storageKey={storageKey}
        closeWidth={70}
        width={246}
        closeBreakpoint={closeBreakpoint}
        autoCollapse={autoCollapse}
        style={{
          paddingLeft: '15px',
          paddingRight: '10px',
          paddingTop: '15px',
          ...style,
        }}
      >
        {header}
        <div style={{}}>{elements}</div>
        {children}
      </Drawer>
    </div>
  )
}
