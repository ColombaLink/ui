import React, { FC, ReactNode, CSSProperties } from 'react'
import { color, hrefIsActive } from '~/utils'
import { Logo } from '~/components/Logo'
import { Avatar } from '~/components/Avatar'
import { styled } from 'inlines'
import { Link } from '../Link'
import { useLocation } from '~/hooks'
import { useTooltip } from '~/hooks/useTooltip'

type SidebarProps = {
  data: {
    icon: ReactNode
    label: string
    href: string
    isActive?: boolean
  }[]
  logo?: ReactNode
  avatar?: ReactNode
  style?: CSSProperties
}

export const Sidebar: FC<SidebarProps> = ({
  data,
  logo,
  avatar,
  style,
  ...props
}) => {
  const [location] = useLocation()
  // console.log('locatie', location)
  // @ts-ignore
  if (!data.isActive) {
    // @ts-ignore
    data.isActive = location
  }

  return (
    <div
      style={{
        width: 48,
        minWidth: 48,
        height: '100%',
        display: 'flex',
        minHeight: 600,
        alignItems: 'center',
        flexDirection: 'column',
        borderRight: `1px solid ${color('border')}`,
        backgroundColor: color('background2'),
        ...style,
      }}
      {...props}
    >
      <div style={{ padding: 8, paddingBottom: 40 }}>
        {logo ? logo : <Logo />}
      </div>

      <div style={{ flexGrow: 1, padding: 8 }}>
        {data.map((item, idx) => {
          const toolTip = useTooltip(item.label, 'right')
          return (
            <Link
              key={idx}
              href={item.href}
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
                backgroundColor: hrefIsActive(item.href, location)
                  ? color('border')
                  : null,
                '&:hover': {
                  backgroundColor: color('border'),
                },
              }}
              {...toolTip}
            >
              {item.icon}
            </Link>
          )
        })}
      </div>

      <styled.div
        style={{
          flexGrow: 0,
          marginBottom: 8,
          width: '100%',
          padding: '8px ',
          alignItems: 'center',
          '&:hover': {
            backgroundColor: color('border'),
          },
        }}
      >
        {avatar ? avatar : <Avatar size="24px" label="YB" />}
      </styled.div>
    </div>
  )
}
