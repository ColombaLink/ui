import { useState, useEffect } from 'react'

export const usePropState = (prop: any, disable) => {
  const s = useState(prop)

  useEffect(() => {
    if (!disable) {
      s[1](prop)
    }
  }, [prop, disable])

  return s
}
