import { useRef, useState } from 'react'

export const useHover = (initialState = false) => {
  const [hover, setHover] = useState(initialState)
  const ref = useRef()

  if (!ref.current) {
    ref.current = {
      listeners: {
        onMouseEnter: () => setHover(true),
        onMouseLeave: () => setHover(false),
      },
    }
  }

  ref.current.hover = hover

  return ref.current
}
