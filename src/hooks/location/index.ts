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
import { parseQuery, deepEqual, deepMerge } from '@saulx/utils'
import { createGzip } from 'zlib'

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

// ----------------------------------------------------------------------

type QueryParams = ReturnType<typeof parseQuery>
type Value = string | number | boolean

// will be a class...

type Params = {
  query: QueryParams
  hash: Value
  path: { [key: string]: Value }
  location: string
}

export type RouteParams = Params & {
  setPath: (pathParams: { [key: string]: Value | null }) => boolean
  setQuery: (q: QueryParams | null, opts?: { overwrite: boolean }) => boolean
  setHash: (hash: Value | null) => boolean
  setLocation: (location: string) => boolean
}

type ComponentMap = Map<
  any,
  {
    start: number
    path: { vars: string[]; matcher: RegExp; seg: string }[]
    update: () => void
  }
>

export type RouterCtx = {
  rootPath: string[]
  updateRoute: (fromPopState: boolean) => void
  pathName: string
  query: QueryParams
  hash?: string
  location?: string
  componentMap: ComponentMap
}

const matchVars = /\[.*?\]/g

const parseLocation = (q: string, hash: string, pathName: string): string => {
  return q && hash
    ? pathName + '?' + q + '#' + hash
    : q
    ? pathName + '?' + q
    : hash
    ? pathName + '#' + hash
    : pathName
}

export const useRouterListeners = (path?: string): RouterCtx => {
  const routes = useMemo(() => {
    // TODO: fix for server side
    const p = path ? path.split('/').slice(1) : []
    const pathName = window.location.pathname
    const q = window.location.search.substring(1)
    const hash = window.location.hash
    const componentMap: ComponentMap = new Map()
    const ctx: RouterCtx = {
      hash,
      pathName,
      query: q ? parseQuery(q) : null,
      location: parseLocation(q, hash, pathName),
      updateRoute: (fromPopState) => {
        const ordered = [...componentMap.values()].sort((a, b) => {
          return a.start < b.start ? -1 : a.start === b.start ? 0 : 1
        })
        console.info(
          'ORDER',
          ordered.map((v) => v.start)
        )
        // want this to be ordered (top first)
        ordered.forEach((v) => {
          v.update()
        })
        if (!fromPopState) {
          global.history.pushState(undefined, undefined, ctx.location)
        }
      },
      rootPath: p,
      componentMap,
    }
    return ctx
  }, [path])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const listener = () => {
        const pathName = window.location.pathname
        const q = window.location.search.substring(1)
        const hash = window.location.hash
        routes.hash = hash
        routes.pathName = pathName
        routes.query = q ? parseQuery(q) : null
        const newLocation = parseLocation(q, hash, pathName)
        if (newLocation !== routes.location) {
          routes.location = newLocation
          routes.updateRoute(true)
        }
      }
      global.addEventListener('popstate', listener)
      return () => {
        global.removeEventListener('popstate', listener)
      }
    }
    return () => {}
  }, [path])

  return routes
}

export const parseRoute = (
  ctx: RouterCtx,
  path: { vars: string[]; matcher: RegExp }[],
  start: number
): Params => {
  const params = {
    query: ctx.query,
    hash: ctx.hash,
    path: {},
    location: ctx.location,
  }
  const segs = ctx.pathName.split('/').slice(1)
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

let cnt = 0

type QueryValue = string | number | boolean

const toQValue = (
  q: QueryValue | QueryValue[] | { [key: string]: any }
): string => {
  if (typeof q === 'string') {
    return q
  }

  if (typeof q === 'boolean') {
    return !q ? 'false' : 'true'
  }

  if (typeof q === 'number') {
    return String(q)
  }

  if (typeof q === 'number') {
    return String(q)
  }

  if (q === null) {
    return 'null'
  }

  if (Array.isArray(q)) {
    return q
      .map((v) => {
        if (typeof v === 'object' && v !== null) {
          return JSON.stringify(v)
        }
        return toQValue(v)
      })
      .join(',')
  }

  if (typeof q === 'object') {
    return JSON.stringify(q)
  }

  return ''
}

const queryToString = (q: QueryParams): string => {
  if (!q) {
    return ''
  }
  let str = ''
  for (const key in q) {
    str += `&${key}=${toQValue(q[key])}`
  }
  return str.slice(1)
}

export const useRoute = (path?: string): RouteParams => {
  const ctx = useContext(RouterContext)
  const node = ITS_OK_DONT_WORRY.ReactCurrentOwner.current

  // ref also?
  if (!node._id) {
    node._id = ++cnt
  }

  const parsedPath = useMemo(() => {
    const p = path.split('/')
    const result: { vars: string[]; matcher: RegExp; seg: string }[] = []
    for (const seg of p) {
      const matchers = seg.match(matchVars)
      const matcher = new RegExp(seg.replace(matchVars, '(.+)'))
      const vars = matchers ? matchers.map((v) => v.slice(1, -1)) : []
      result.push({
        vars,
        matcher,
        seg,
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

  const params = parseRoute(ctx, parsedPath, start)

  // have to check if changed
  // deepEqual
  // use reducer and deepEqual
  // check if they changed else dont update!

  const y = {
    ...params,
    setPath: (p) => {
      if (deepEqual(params.path, p)) {
        return false
      }

      const results: Map<number, [string, Set<string>]> = new Map()

      for (let i = parsedPath.length - 1; i > -1; i--) {
        const parsed = parsedPath[i]

        for (const key in p) {
          if (parsed.vars.includes(key)) {
            if (!results.has(i)) {
              results.set(i, [parsed.seg, new Set()])
            }
            const r = results.get(i)
            r[0] = r[0].replaceAll(`[${key}]`, String(p[key]))
            r[1].add(key)
          }
        }

        if (results.has(i)) {
          const r = results.get(i)
          for (const v of parsed.vars) {
            if (!r[1].has(v)) {
              r[0] = r[0].replaceAll(`[${v}]`, String(params.path[v] || ''))
            }
          }
        }
      }

      const [s, hash = ''] = ctx.location.split('#')
      const [pathName, q] = s.split('?')

      const x = pathName.split('/')

      results.forEach((v, k) => {
        console.info(v, k)
        x[k + start + 1] = v[0]
      })

      const newLocation = parseLocation(
        q,
        hash,
        x
          .map((v) =>
            v === undefined ? '' : typeof v === 'object' ? JSON.stringify(v) : v
          )
          .join('/')
      )

      return y.setLocation(newLocation)
    },
    setQuery: (query: QueryParams, opts) => {
      if (query === null) {
        ctx.query = null
      } else {
        if (opts?.overwrite) {
          ctx.query = query
        } else {
          deepMerge(ctx.query || {}, query)
        }
      }
      const q = queryToString(ctx.query)

      console.info(ctx.query, q)

      const [s] = ctx.location.split('#')
      const [pathName] = s.split('?')
      ctx.location = parseLocation(q, ctx.hash, pathName)
      ctx.updateRoute(false)
      return true
    },
    setHash: (hash) => {
      if (hash === ctx.hash) {
        return false
      }
      if (!hash) {
        ctx.hash = ''
      }
      ctx.hash = hash
      const [s] = ctx.location.split('#')
      const [pathName, q] = s.split('?')
      ctx.location = parseLocation(q, hash, pathName)
      ctx.updateRoute(false)
      return true
    },
    setLocation: (location: string) => {
      if (location === ctx.location) {
        return false
      }
      const [s, hash = ''] = location.split('#')
      const [pathName, q] = s.split('?')
      ctx.hash = hash
      ctx.pathName = pathName
      ctx.query = q ? parseQuery(q) : null
      ctx.location = location
      ctx.updateRoute(false)
      return true
    },
  }

  return y
}
