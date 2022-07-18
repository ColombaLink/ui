import React, { FC, ReactNode } from 'react'
import { Link as WLink } from 'wouter'
import { styled, Style } from 'inlines'

type LinkProps = {
  href?: string
  children?: ReactNode
  style?: Style
  onClick?: () => {}
}

export const Link: FC<LinkProps> = styled(
  ({ href = '/', ...props }: { href: string }) => {
    const { search } = location
    if (search) {
      if (href[0] === '?') {
        // TODO maybe support multiple keys?
        const key = href.substring(1, href.indexOf('='))
        const keyIs = `${key}=`
        const params = search
          .split(/\?|\&/g)
          .filter((v) => v && v !== key && !v.startsWith(keyIs))
        if (params.length) {
          href = `?${params.join('&')}&${href.substring(1)}`
        }
      } else {
        href = `${href}${search}`
      }
    }

    return (
      <WLink href={href}>
        <a {...props}></a>
      </WLink>
    )
  },
  {
    display: 'block',
    color: 'inherit',
    textDecoration: 'none',
  }
)
