import React, { CSSProperties, FC, ReactNode, useState } from 'react'
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
import { stringToIcon } from '~/utils/stringToIcon'

type TopbarTabProps = {
  href?: string
  children?: ReactNode
  isActive?: boolean
  icon?: ReactNode | string[]
}

type TopbarProps = {
  data?: object
  selected?: string
  prefix?: string
  onFilter?: (params: any) => any
  onProfile?: () => void
  breadcrumbs?: ReactNode
  logo?: FC | ReactNode
  children?: ReactNode
  noLogo?: boolean
  style?: CSSProperties
  icons?: ReactNode | string
}

const TopbarTab: FC<TopbarTabProps> = ({ href, children, isActive, icon }) => {
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
          // marginTop,
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
            gap: 12,
            width: 'max-content',
            borderBottom: `3px solid ${
              isActive ? color('accent') : 'transparent'
            }`,
            marginBottom: -3,
            ...(isActive
              ? font({ size: 15, weight: 600 })
              : font({ size: 15, color: 'text2' })),
          }}
        >
          {icon && stringToIcon(icon)} {children}
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
        icon={SearchIcon}
        onChange={(e) => console.log(e)}
        style={{ marginLeft: 12, marginRight: 12 }}
      />
    </>
  )
}

export const Topbar: FC<TopbarProps> = ({
  data = {},
  icons,
  prefix = '',
  selected,
  onFilter,
  onProfile,
  breadcrumbs,
  children,
  logo,
  noLogo = false,
  style,
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
        paddingRight: 24,
        ...style,
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {noLogo ? (
            <></>
          ) : logo ? (
            <>{logo}</>
          ) : (
            <Logo
              height={32}
              width={32}
              style={{ marginLeft: 32, minHeight: 40, minWidth: 40 }}
            />
          )}

          {breadcrumbs}

          <div
            style={{
              display: 'flex',
              gap: icons ? 12 : 0,
            }}
          >
            {Object.keys(data).map((key, i) => {
              const href = prefix + data[key]
              return (
                <TopbarTab
                  key={key}
                  href={href}
                  isActive={hrefIsActive(href, location, data)}
                  icon={icons ? icons[i] : null}
                >
                  {key}
                </TopbarTab>
              )
            })}

            {children ? (
              <div style={{ marginLeft: icons ? 42 : 24 }}>{children}</div>
            ) : null}
          </div>
        </div>
      </div>

      {onFilter || onProfile ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {onFilter && <TopbarSearchbar />}
          <div>
            {onProfile && (
              <Avatar onClick={onProfile} label={email} size={32} />
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}
