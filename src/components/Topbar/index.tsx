import React, { FC, ReactNode } from 'react'
import { useLocation } from 'wouter'
import { color, font } from '~/utils'
import { hrefIsActive } from '~/utils/hrefIsActive'
import { Link } from '../Link'
import { Text } from '../Text'
import { Logo } from './Logo'

type TopbarTabProps = {
  href?: string
  children?: ReactNode
  isActive?: boolean
}

const TopbarTab: FC<TopbarTabProps> = ({ href, children, isActive }) => {
  const marginTop = (66 - 32) / 2
  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
        marginLeft: 32,
      }}
    >
      {/* this is to create a consistent size between active/inactive */}
      <Text weight={600} style={{ visibility: 'hidden' }}>
        {children}
      </Text>
      <Link
        href={href}
        style={{
          padding: '0px 12px',
          height: 32,
          marginTop,
          marginLeft: -12,
          position: 'absolute',
          top: 0,
          borderRadius: 4,
          '&:hover': {
            backgroundColor: color('PrimaryLightHover'),
          },
        }}
      >
        <div
          style={{
            marginTop: -marginTop,
            height: 66,
            display: 'flex',
            alignItems: 'center',
            borderBottom: `3px solid ${
              isActive ? color('TextPrimary') : 'transparent'
            }`,
            marginBottom: -3,
            ...(isActive
              ? font(15, 'TextPrimary', 600)
              : font(15, 'TextSecondary')),
          }}
        >
          {children}
        </div>
      </Link>
    </div>
  )
}

export const Topbar = ({
  data = {},
  prefix = '',
  selected,
}: {
  data?: object
  selected?: string
  prefix?: string
}) => {
  const [location] = useLocation()

  if (!selected) {
    selected = location
  }

  return (
    <div
      style={{
        height: 66,
        minHeight: 66,
        display: 'flex',
        borderBottom: `1px solid ${color('OtherDivider')}`,
        backgroundColor: color('Background1dp'),
        alignItems: 'center',
      }}
    >
      <Logo style={{ marginLeft: 32 }} />
      {Object.keys(data).map((key) => {
        const href = prefix + data[key]
        return (
          <TopbarTab
            key={key}
            href={href}
            isActive={hrefIsActive(href, location, data)}
          >
            {key}
          </TopbarTab>
        )
      })}
    </div>
  )
}
