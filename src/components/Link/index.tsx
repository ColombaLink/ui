import React, { FC, ReactNode } from 'react'
import { Link as WLink } from 'wouter'
import { styled, Style } from 'inlines'
import { parseHref } from '../../hooks/useLocation'
type LinkProps = {
  href?: string
  children?: ReactNode
  style?: Style
  onClick?: () => {}
}

export const Link: FC<LinkProps> = styled(
  ({ href = '/', ...props }: { href: string }) => {
    return (
      <WLink href={parseHref(href)}>
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
