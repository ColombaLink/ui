import React, { CSSProperties, FC, HTMLAttributes, ReactNode } from 'react'
import { Link as WLink } from 'wouter'
import { styled, Style } from 'inlines'
import { parseHref, useRoute } from '../../hooks/location'
import { QueryParams, Value } from '~/hooks/location/types'
type LinkProps = {
  href?: string
  children?: ReactNode
  style?: CSSProperties | Style
  onClick?: () => {}
}

export const Link: FC<LinkProps> = styled(
  ({ href = '/', onClick, ...props }) => {
    const parsedHref = parseHref(href)

    return (
      <WLink
        href={parsedHref}
        onClick={
          parsedHref.includes('?')
            ? (e) => {
                dispatchEvent(new Event('popstate'))
                onClick?.(e)
              }
            : parsedHref.includes('#')
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

/*
<RouteLink href='https://google.com' query={{
  success: 'amazing'
}} />

*/

// export const Link: FC<
//   {
//     route?: string
//     href?: string
//     path?: { [key: string]: Value }
//     query?: QueryParams
//     hash?: string
//     overwrite?: boolean
//   } & HTMLAttributes<HTMLDivElement>
// > = styled(
//   ({ route, href, path, query, hash, overwrite, onClick, ...props }) => {
//     const r = useRoute(route)
//     return (
//       <div
//         onClick={(e) => {
//           if (href) {
//             r.setLocation(href)
//           }
//           if (path) {
//             r.setPath(path)
//           }
//           if (query) {
//             r.setQuery(query, { overwrite })
//           }
//           if (hash) {
//             r.setHash(hash)
//           }
//           if (onClick) {
//             return onClick(e)
//           }
//         }}
//         {...props}
//       />
//     )
//   },
//   {
//     cursor: 'pointer',
//   }
// )
