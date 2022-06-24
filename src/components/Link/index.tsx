import React, { FC, ReactNode } from 'react'
import { Link as WLink } from 'wouter'
import { styled, Style } from 'inlines'

type LinkProps = {
  href?: string
  children?: ReactNode
  style?: Style
}

export const Link: FC<LinkProps> = styled(
  ({ href = '/', ...props }: { href: string }) => (
    <WLink href={href}>
      <a {...props}></a>
    </WLink>
  ),
  {
    display: 'block',
    color: 'inherit',
    textDecoration: 'none',
  }
)
