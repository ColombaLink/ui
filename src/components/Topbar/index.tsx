import React, { CSSProperties, FC, ReactNode, useEffect } from 'react'
import { parseHref, useLocation } from '~/hooks'
import { SearchIcon } from '~/icons'
import { color, font } from '~/utils'
import { hrefIsActive } from '~/utils/hrefIsActive'
import { Avatar } from '../Avatar'
import { Input } from '../Input'
import { Link } from '../Link'
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
  avatar?: ReactNode
  onClick?: () => void
}

const TopbarTab: FC<TopbarTabProps> = ({ href, children, isActive, icon }) => {
  return (
    <Link
      href={href}
      style={{
        display: 'flex',
        marginLeft: 32,
        alignItems: 'center',
        height: 66,
        gap: 12,
        borderTop: '3px solid transparent',
        borderBottom: `3px solid ${isActive ? color('accent') : 'transparent'}`,
        ...(isActive
          ? font({ size: 15, weight: 600 })
          : font({ size: 15, color: 'text2' })),
      }}
    >
      {icon && stringToIcon(icon)} {children}
    </Link>
  )
}

const TopbarSearchbar = ({ onFilter }: { onFilter?: (params: any) => any }) => {
  return (
    <>
      <Input
        placeholder="Search and discover"
        icon={SearchIcon}
        onChange={onFilter}
        style={{ marginLeft: 12, marginRight: 12 }}
      />
    </>
  )
}

const Profile = ({ onProfile }) => {
  const user = useAuth()
  const {
    data: { email },
  } = useData(
    // @ts-ignore
    user
      ? {
          // @ts-ignore
          $id: user.id,
          email: true,
        }
      : null
  )

  return <Avatar onClick={onProfile} label={email} size={32} />
}

export const Topbar: FC<TopbarProps> = ({
  data = {},
  icons,
  prefix = '',
  selected,
  onFilter,
  onProfile,
  avatar,
  breadcrumbs,
  children,
  logo,
  noLogo = false,
  style,
  onClick,
}) => {
  const [location] = useLocation()

  if (!selected) {
    selected = location
  }

  if (!logo && !noLogo) {
    logo = (
      <Logo
        height={32}
        width={32}
        style={{ marginLeft: 32, minHeight: 40, minWidth: 40 }}
        onClick={onClick}
      />
    )
  }

  let hasActive, firstHref
  const items = Object.keys(data).map((label) => {
    const href = prefix + data[label]
    if (!firstHref) {
      firstHref = href
    }
    return {
      label,
      href,
    }
  })

  const elements = items.map(({ label, href }, i) => {
    const isActive = hrefIsActive(href, location, items)
    if (isActive) {
      hasActive = true
    }
    return (
      <TopbarTab
        key={href}
        href={href}
        isActive={isActive}
        icon={icons ? icons[i] : null}
      >
        {label}
      </TopbarTab>
    )
  })

  useEffect(() => {
    if (!hasActive && firstHref) {
      window.history.replaceState({}, '', parseHref(firstHref))
    }
  }, [hasActive])

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
          {logo}
          {breadcrumbs}
          <div
            style={{
              display: 'flex',
              gap: icons ? 12 : 0,
            }}
          >
            {elements}

            {children ? (
              <div style={{ marginLeft: icons ? 42 : 24 }}>{children}</div>
            ) : null}
          </div>
        </div>
      </div>

      {onFilter || onProfile || avatar ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {onFilter && <TopbarSearchbar onFilter={onFilter} />}
          <div>
            {avatar || (onProfile && <Profile onProfile={onProfile} />)}
          </div>
        </div>
      ) : null}
    </div>
  )
}
