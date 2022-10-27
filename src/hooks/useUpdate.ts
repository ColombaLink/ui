import { useState } from 'react'

export const useUpdate = (callback?: () => void) => {
  const [count, setCount] = useState(0)
  return () => {
    setCount(count + 1)
    callback?.()
  }
}
