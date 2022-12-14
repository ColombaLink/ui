import React, { FC, ReactNode, CSSProperties, useEffect, useState } from 'react'
import { border, color, hrefIsActive, renderOrCreateElement } from '~/utils'
import { Link } from '../Link'
import { parseHref, useLocation } from '~/hooks'
import { useTooltip } from '~/hooks/useTooltip'
import { Text } from '../Text'
import { styled } from 'inlines'
import { ChevronRightIcon } from '~/icons'

type SidebarProps = {
  data: {
    icon?: ReactNode
    label?: string
    href?: string
    subTitle?: string
  }[]
  style?: CSSProperties
  selected?: string
  prefix?: string
  children?: ReactNode | ReactNode[]
  header?: ReactNode | ReactNode[]
  expandable?: boolean
}

type SidebarItemProps = {
  children?: ReactNode
  label?: string
  href?: string
  isActive?: boolean
  expanded?: boolean
}

const SidebarItem: FC<SidebarItemProps> = ({
  label,
  href,
  isActive,
  children,
  expanded,
}) => {
  const tooltip = expanded ? undefined : useTooltip(label, 'right')

  return (
    <Link
      href={href}
      style={{
        width: expanded ? 216 : 40,
        height: 40,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 8,
        borderRadius: 8,
        transition: 'width 0.3s linear',
        paddingLeft: 10,
        //   paddingRight: 10,
        color: color(isActive ? 'lightaccent:contrast' : 'text'),
        backgroundColor: isActive ? color('lightaccent:active') : null,
        '&:hover': isActive
          ? null
          : {
              backgroundColor: color('background:hover'),
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
          // width: expanded ? '100%' : 0,
          //  transition: 'width 0.3s linear',
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
  expandable,
}) => {
  const [location, setLocation] = useLocation()
  const [expanded, setExpanded] = useState(false)
  const [hoverForExpansion, setHoverForExpansion] = useState(false)
  const [menuHeight, setMenuHeight] = useState(null)

  if (!selected) {
    selected = location
  }

  let hasActive
  const parsedData = data.map(({ label, href, icon, subTitle }) => {
    if (subTitle) {
      label = ''
      href = ''
      icon = ''
    }

    if (href[0] !== '?') {
      href = prefix + href
    }

    return { label, href, icon, subTitle }
  })

  const elements = parsedData.map(({ label, href, icon, subTitle }, i) => {
    const isActive = hrefIsActive(href, location, parsedData)

    if (isActive) {
      hasActive = true
    }

    if (subTitle) {
      return (
        <Text
          wrap
          key={i}
          space={16}
          size={12}
          weight={600}
          color="text2"
          style={{
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            marginTop: 16,
            // width: expanded ? '100%' : 0,
            transition: 'opacity 0.3s linear',
            overflowX: 'hidden',
            opacity: expanded ? 1 : 0,
          }}
        >
          {subTitle.toUpperCase()}
        </Text>
      )
    }

    return (
      <SidebarItem
        key={i}
        label={label}
        href={href}
        isActive={isActive}
        expanded={expanded}
      >
        {renderOrCreateElement(icon, { size: 20 })}
      </SidebarItem>
    )
  })

  useEffect(() => {
    if (!hasActive) {
      const firstHref = parsedData[0].href
      if (firstHref) {
        window.history.replaceState({}, '', parseHref(parsedData[0].href))
      }
    }
  }, [hasActive])

  return (
    <div
      style={{
        // width: expanded ? 246 : 70,
        minWidth: expanded ? 246 : 70,
        paddingTop: 6,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        position: 'relative',
        borderRight: border(1),
        transition: 'all 0.3s linear',
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
            '&:hover': {
              borderRight: `2px solid ${color('accent')}`,
              cursor: 'pointer',
            },
          }}
          onMouseOver={(e) => {
            setMenuHeight(e.currentTarget.offsetHeight)
            setHoverForExpansion(true)
          }}
          onMouseLeave={() => {
            setHoverForExpansion(false)
          }}
          onClick={() => setExpanded((prev) => !prev)}
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
                '&:hover': {
                  backgroundColor: color('background2'),
                },
              }}
              onClick={() => setExpanded((prev) => !prev)}
            >
              <ChevronRightIcon
                color="text"
                size={16}
                style={{
                  transform: expanded ? 'scaleX(-1)' : 'scaleX(1)',
                  boxShadow: `0px 1px 4px ${color('background2')}`,
                }}
                onClick={() => setExpanded((prev) => !prev)}
              />
            </styled.div>
          ) : null}
        </styled.div>
      )}
    </div>
  )
}
