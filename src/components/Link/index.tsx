import React, { FC } from 'react'
import { Link as WLink } from 'wouter'
import { styled } from 'inlines'

type LinkProps = {
  href?: string
  children?: React.ReactNode
  style?: React.CSSProperties
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
