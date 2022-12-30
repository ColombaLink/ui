import {
  useContext,
  useEffect,
  useMemo,
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

// will be a class...

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

const matchVars = /\[.*?\]/g

export const parseRoute = (
  path: { vars: string[]; matcher: RegExp }[],
  start: number,
  pathName: string,
  q?: string,
  hash?: string
): RouteParams => {
  // do the location etc once
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
  const segs = pathName.split('/').slice(1)
  for (let i = start; i < segs.length; i++) {
    const seg = segs[i]
    const { vars, matcher } = path[i - start]
    if (seg) {
      const pSeg = segs[i].match(matcher)
      if (pSeg) {
        for (let x = 1; x < pSeg.length; x++) {
          params.path[vars[x - 1]] = pSeg[x]
        }
      }
    }
  }
  return params
}

// useReducer for change

export const useRoute = (path?: string) => {
  const ctx = useContext(RouterContext)
  const node = ITS_OK_DONT_WORRY.ReactCurrentOwner.current

  const parsedPath = useMemo(() => {
    const p = path.split('/')
    const result: { vars: string[]; matcher: RegExp }[] = []
    for (const seg of p) {
      const matchers = seg.match(matchVars)
      const matcher = new RegExp(seg.replace(matchVars, '(.+)'))
      const vars = matchers ? matchers.map((v) => v.slice(1, -1)) : []
      result.push({
        vars,
        matcher,
      })
    }
    return result
  }, [path])

  useEffect(() => {
    return () => {
      ctx.componentMap.delete(node)
    }
  }, [])

  const update = useUpdate()

  // on update

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
  const start = parentStore
    ? parentStore.start + parentStore.path.length
    : ctx.rootPath.length

  ctx.componentMap.set(node, {
    path: parsedPath,
    start,
    update,
  })

  // have to check if changed
  const params = parseRoute(
    parsedPath,
    start,
    window.location.pathname,
    window.location.search.substring(1),
    window.location.hash
  )

  // check if they changed else dont update!

  return params
}
