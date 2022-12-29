import {
  useContext,
  useEffect,
  // @ts-ignore
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED as ITS_OK_DONT_WORRY,
} from 'react'
import { useLocation as useWouterLocation } from 'wouter'
import { useUpdate } from '../useUpdate'
import { RouterContext } from '~/components/Provider'
import { parseQuery } from '@saulx/utils'

// maybe make this into a seperate pkg? or make sure parsing works well
export const parseHref = (href = '/') => {
  if (href !== '/' && href[href.length - 1] === '/') {
    href = href.slice(0, -1)
  }
  const { search } = location
  if (search) {
    const i = href.indexOf('?')
    if (i !== -1) {
      const a = new URLSearchParams(search)
      const b = new URLSearchParams(href.substring(i))

      b.forEach((value, key) => {
        a.set(key, value)
      })
      href = `${href.substring(0, i)}?${a.toString()}`
    } else {
      href = `${href}${search}`
    }
  }
  return href
}

export const useLocation = (): [string, (href: string) => void] => {
  const [location, setLocation] = useWouterLocation()
  // add this for hash change?
  const update = useUpdate()
  useEffect(() => {
    // TODO optimize!
    const l = () => update()
    window.addEventListener('hashchange', l)
    return () => window.removeEventListener('hashchange', l)
  }, [])
  return [
    location,
    (href) => {
      const i = href?.indexOf('#')
      const fireHashChange =
        i !== -1 && href.substring(i) !== window.location.hash
      setLocation(parseHref(href))
      if (fireHashChange) {
        dispatchEvent(new HashChangeEvent('hashchange'))
      }
    },
  ]
}

type QueryParams = ReturnType<typeof parseQuery>
type Value = string | number | boolean

export type RouteParams = {
  query: QueryParams
  hash: Value
  path: { [key: string]: Value }
  location: string
  // setPath: (pathParams: { [key: string]: Value | null }) => boolean
  // setQuery: (q: QueryParams | null, opts?: { overwrite: boolean }) => boolean
  // setHash: (hash: Value | null) => boolean
  // setLocation: (location: string) => boolean
}

const parseRoute = (
  myPath: string[],
  path: string[],
  pathName: string,
  q?: string,
  hash?: string
): RouteParams => {
  const params = {
    query: q ? parseQuery(q) : null,
    hash,
    path: {},
    location:
      q && hash
        ? pathName + '?' + q + '#' + hash
        : q
        ? pathName + '?' + q
        : hash
        ? pathName + '#' + hash
        : pathName,
  }

  const segments = pathName.split('/').slice(1)

  let i = 0
  for (const p of path) {
    const segs = p.split('/')

    for (let j = 0; j < segs.length; j++) {
      const seg = segs[j]

      const f = /\[.*?\]/g

      const matchers = seg.match(f)

      const vars = matchers ? matchers.map((v) => v.slice(1, -1)) : []

      const matcher = new RegExp(seg.replace(f, '(.+)'))

      if (segments[i + j]) {
        const pSeg = segments[i + j].match(matcher)
        if (pSeg) {
          for (let x = 1; x < pSeg.length; x++) {
            params.path[vars[x - 1]] = pSeg[x]
          }
        }
      } else {
        // what to do here?
        // go go go
      }
    }

    i += segs.length
  }

  console.info(path, 'myPath:', myPath)

  // const p = path.split('/')
  // return p

  return params
}

export const useRoute = (path?: string) => {
  const ctx = useContext(RouterContext)

  const node = ITS_OK_DONT_WORRY.ReactCurrentOwner.current
  let parent = node.return
  let parentStore = ctx.componentMap.get(parent)
  while (!parentStore) {
    parent = parent.return
    if (parent) {
      parentStore = ctx.componentMap.get(parent)
    } else {
      break
    }
  }
  const parentPath = parentStore?.path || ctx.rootPath
  const nodePath = [...parentPath, path]
  console.info('nodePath:', nodePath)

  const params = parseRoute(
    path,
    nodePath,
    window.location.pathname,
    window.location.search.substring(1),
    window.location.hash
  )

  ctx.componentMap.set(node, { path: nodePath })

  console.info('I AM HOOK WITH CTX', path)
  return params
}

/*

 // CONTEXT <> useUrl() / useUrl() / useUrl() </>







  paths: {
    "sidemenu-hook": {
        path: [/seg1]
    },
    "app-body": {
      path: '/:id'
      topbar: { path: '/[env]/[flap]' }
      content: { path: '/[env]' }
    }
  }

const Bla = () => {
  const { path: { flap, flip }, query: { flip }, hash, location, setLocation, setPath, setQuery, setHash } = useRoute('environment-[name=youzi]-[flap]/[flip]?flip=1')

  setPath({
    name: 'youzi'
  }) => 'environment-youzi-[flap]/[flip]?flip=1'

  setQuery({
    flip: {
      potato: 7
    }
  }, {
    overwrite: true
  })

  setQuery(null)
}
 

 

 */
