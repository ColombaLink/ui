import React, { CSSProperties, FC, ReactNode } from 'react'
import { Link as WLink } from 'wouter'
import { styled } from 'inlines'
import { parseHref } from '../../hooks/location'
type LinkProps = {
  href?: string
  children?: ReactNode
  style?: CSSProperties
  onClick?: () => {}
}

export const Link: FC<LinkProps> = styled(
  ({ href = '/', onClick, ...props }) => {
    const parsedHref = parseHref(href)
    return (
      <WLink
        href={parsedHref}
        onClick={
          parsedHref.includes('#')
            ? (e) => {
                dispatchEvent(new HashChangeEvent('hashchange'))
                onClick?.(e)
              }
            : onClick
        }
      >
        <a {...props} />
      </WLink>
    )
  },
  {
    display: 'block',
    color: 'inherit',
    textDecoration: 'none',
  }
)
