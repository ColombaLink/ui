import React, { FC, ReactNode, CSSProperties } from 'react'
import { border, color, hrefIsActive, renderOrCreateElement } from '~/utils'
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
  const [location] = useLocation()

  if (!selected) {
    selected = location
  }

  return (
    <div
      style={{
        width: 48,
        minWidth: 48,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        borderRight: border(1),
        ...style,
      }}
    >
      {header}
      <div style={{ flexGrow: 1, padding: 8 }}>
        {data.map(({ label, href, icon }, i) => {
          if (href[0] !== '?') {
            href = prefix + href
          }

          return (
            <SidebarItem
              key={i}
              label={label}
              href={href}
              isActive={hrefIsActive(href, location)}
            >
              {renderOrCreateElement(icon, { size: 20 })}
            </SidebarItem>
          )
        })}
      </div>
      {children}
    </div>
  )
}
