import React, { FC, ReactNode, useState } from 'react'
import { useLocation } from '~/hooks'
import { SearchIcon } from '~/icons'
import { color, font } from '~/utils'
import { hrefIsActive } from '~/utils/hrefIsActive'
import { Avatar } from '../Avatar'
import { Input } from '../Input'
import { Link } from '../Link'
import { Text } from '../Text'
import { Logo } from '../Logo'
import { useData, useAuth } from '@based/react'

type TopbarTabProps = {
  href?: string
  children?: ReactNode
  isActive?: boolean
}

type TopbarProps = {
  data?: object
  selected?: string
  prefix?: string
  onFilter?: (params: any) => any
  onProfile?: () => void
  breadcrumbs?: ReactNode
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
            backgroundColor: color('lightaccent:hover'),
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
              isActive ? color('text') : 'transparent'
            }`,
            marginBottom: -3,
            ...(isActive
              ? font({ size: 15, weight: 600 })
              : font({ size: 15, color: 'text2' })),
          }}
        >
          {children}
        </div>
      </Link>
    </div>
  )
}

const TopbarSearchbar = ({ onFilter }: { onFilter?: (params: any) => any }) => {
  return (
    <>
      <Input
        placeholder="Search and discover"
        iconLeft={SearchIcon}
        onChange={(e) => console.log(e)}
        style={{ marginLeft: 12, marginRight: 12 }}
      />
    </>
  )
}

export const Topbar: FC<TopbarProps> = ({
  data = {},
  prefix = '',
  selected,
  onFilter,
  onProfile,
  breadcrumbs,
}) => {
  const user = useAuth()

  const {
    data: { email },
  } = useData(
    // @ts-ignore
    user
      ? {
          $id: user.id,
          email: true,
        }
      : null
  )

  const [location] = useLocation()

  if (!selected) {
    selected = location
  }

  const [activeProfile, setActiveProfile] = useState(false)

  return (
    <div
      style={{
        height: 66,
        minHeight: 66,
        display: 'flex',
        borderBottom: `1px solid ${color('border')}`,
        backgroundColor: color('background'),
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 30,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: 66,
          minHeight: 66,
        }}
      >
        <Logo
          height={32}
          width={32}
          style={{ marginLeft: 32, minHeight: 40, minWidth: 40 }}
        />

        {breadcrumbs}

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

      <div style={{ display: 'flex', alignItems: 'center' }}>
        {onFilter && <TopbarSearchbar />}
        <div>
          {onProfile && <Avatar onClick={onProfile} label={email} size={32} />}
        </div>
      </div>
    </div>
  )
}
