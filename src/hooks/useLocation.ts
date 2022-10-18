import { useLocation as useWouterLocation } from 'wouter'

export const parseHref = (href = '/') => {
  if (href !== '/' && href[href.length - 1] === '/') {
    href = href.slice(0,-1)
  }
  const { search } = location
  if (search) {
    if (href[0] === '?') {
      // TODO maybe support multiple keys?
      const key = href.substring(1, href.indexOf('='))
      const keyIs = `${key}=`
      const params = search.substring(1)
        .split('&')
        .filter((v) => v !== key && !v.startsWith(keyIs))
      if (params.length) {
        href = `?${params.join('&')}&${href.substring(1)}`
      }
    } else {
      href = `${href}${search}`
    }
  }
  
  return href
}

// TODO add hash and query based routing here
// https://github.com/molefrog/wouter#uselocation-hook-working-with-the-history
export const useLocation = (): [string, (href: string) => void] => {
  const [location, setLocation] = useWouterLocation()
  return [
    location,
    (href) => {
      setLocation(parseHref(href))
    },
  ]
}
