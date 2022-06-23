import { useState, useEffect } from 'react'

export const usePropState = (prop) => {
  const s = useState(prop)

  useEffect(() => {
    s[1](prop)
  }, [prop])

  return s
}
