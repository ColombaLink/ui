import { useRef, useState, MouseEventHandler } from 'react'

type MouseOverState = {
  mouseOver: boolean
  listeners: {
    onMouseEnter: MouseEventHandler
    onMouseLeave: MouseEventHandler
  }
}

export const useMouseOver = () => {
  const [mouseOver, setMouseOver] = useState<boolean>()
  const ref = useRef<MouseOverState>()

  if (ref.current) {
    ref.current.mouseOver = mouseOver
  } else {
    ref.current = {
      mouseOver: false,
      listeners: {
        onMouseEnter: () => setMouseOver(true),
        onMouseLeave: () => setMouseOver(false),
      },
    }
  }

  return ref.current
}
