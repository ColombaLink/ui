import React, { FC, ReactNode, useState } from 'react'
import { useLocation } from '~/hooks'
import { SearchIcon } from '~/icons'
import { color, font } from '~/utils'
import { hrefIsActive } from '~/utils/hrefIsActive'
import { Avatar } from '../Avatar'
import { Input } from '../Input'
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

const TopbarSearchbar = ({ onFilter }: { onFilter?: (params: any) => any }) => {
  return (
    <>
      <Input
        placeholder="Search and discover"
        iconLeft={SearchIcon}
        onChange={(e) => console.log(e)}
        style={{ marginLeft: 12 }}
      />
    </>
  )
}

export const Topbar = ({
  data = {},
  prefix = '',
  selected,
  onFilter,
  onProfile,
}: {
  data?: object
  selected?: string
  prefix?: string
  onFilter?: (params: any) => any
  onProfile?: () => void
}) => {
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
        borderBottom: `1px solid ${color('OtherDivider')}`,
        backgroundColor: color('Background1dp'),
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
        <Logo style={{ marginLeft: 32, minHeight: 40, minWidth: 40 }} />
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
        {onProfile && (
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: '50%',
              border: activeProfile
                ? `3px solid ${color('AccentDarkpurple')}`
                : 'none',
              display: 'flex',
              marginLeft: 24,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() => {
              setActiveProfile(!activeProfile)
              onProfile()
            }}
          >
            <Avatar
              size="32px"
              backgroundImg="https://robohash.org/BJF.png?set=set4&size=150x150"
            />
          </div>
        )}
      </div>
    </div>
  )
}
