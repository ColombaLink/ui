import React, { FC } from 'react'
import { Link as WLink } from 'wouter'
import { styled } from 'inlines'

export const Link: FC = styled(
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
