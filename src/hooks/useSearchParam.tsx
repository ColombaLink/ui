import { useState, useEffect } from 'react'

const getValue = (param: string) =>
  new URLSearchParams(window.location.search).get(param)

export function useSearchParam(param: string): string | number | boolean {
  const [value, setValue] = useState(() => getValue(param))
  useEffect(() => {
    const onChange = () => {
      setValue(getValue(param))
    }
    window.addEventListener('popstate', onChange)
    window.addEventListener('pushState', onChange)
    window.addEventListener('replacestate', onChange)
    return () => {
      window.removeEventListener('popstate', onChange)
      window.removeEventListener('pushState', onChange)
      window.removeEventListener('replacestate', onChange)
    }
  }, [param])

  if (value === 'true') {
    return true
  }

  if (value === 'false') {
    return false
  }

  return value
}
