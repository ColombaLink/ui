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

const parseRoute = (path: string, location: string) => {
  const p = path.split('/')

  return p
}

export const useRoute = (path?: string) => {
  const ctx = useContext(RouterContext)

  // const hookNumber = useMemo(() => ++cnt, [])

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

  // .. => up
  // / => root
  // path
  ctx.componentMap.set(node, { path: nodePath })
  console.info('I AM HOOK WITH CTX', ctx, path)
  return nodePath.join('/')
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
