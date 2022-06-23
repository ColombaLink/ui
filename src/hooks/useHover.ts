import { useState, useRef } from 'react'

export const useHover = () => {
  const [hover, setHover] = useState(false)
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
