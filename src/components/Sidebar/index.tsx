import React, { FC, ReactNode, CSSProperties, useEffect } from 'react'
import {
  border,
  color,
  hrefIsActive,
  renderOrCreateElement,
  setLocation,
} from '~/utils'
import { Link } from '../Link'
import { useLocation } from '~/hooks'
import { useTooltip } from '~/hooks/useTooltip'

type SidebarProps = {
  data: {
    icon: ReactNode
    label: string
    href: string
  }[]
  style?: CSSProperties
  selected?: string
  prefix?: string
  children?: ReactNode | ReactNode[]
  header?: ReactNode | ReactNode[]
}

type SidebarItemProps = {
  children?: ReactNode
  label?: string
  href?: string
  isActive?: boolean
}

const SidebarItem: FC<SidebarItemProps> = ({
  label,
  href,
  isActive,
  children,
}) => {
  const tooltip = useTooltip(label, 'right')

  return (
    <Link
      href={href}
      style={{
        width: 40,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 8,
        borderRadius: 4,
        color: color(isActive ? 'lightaccent:contrast' : 'text'),
        backgroundColor: isActive ? color('lightaccent:active') : null,
        '&:hover': isActive
          ? null
          : {
              backgroundColor: color('background:hover'),
            },
      }}
      {...tooltip}
    >
      {children}
    </Link>
  )
}

export const Sidebar: FC<SidebarProps> = ({
  data,
  style,
  selected,
  prefix = '',
  header,
  children,
}) => {
  const [location, setLocation] = useLocation()

  if (!selected) {
    selected = location
  }

  let hasActive
  const parsedData = data.map(({ label, href, icon }, i) => {
    if (href[0] !== '?') {
      href = prefix + href
    }

    const isActive = hrefIsActive(href, location, data)

    if (isActive) {
      hasActive = true
    }

    return { label, href, isActive, icon }
  })

  useEffect(() => {
    if (!hasActive) {
      setLocation(parsedData[0].href)
    }
  }, [hasActive])

  return (
    <div
      style={{
        width: 48,
        minWidth: 48,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        borderRight: border(1),
        ...style,
      }}
    >
      {header}
      <div style={{ flexGrow: 1, padding: 8 }}>
        {parsedData.map(({ label, href, isActive, icon }, i) => {
          return (
            <SidebarItem key={i} label={label} href={href} isActive={isActive}>
              {renderOrCreateElement(icon, { size: 20 })}
            </SidebarItem>
          )
        })}
      </div>
      {children}
    </div>
  )
}
