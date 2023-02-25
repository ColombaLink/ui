import { useRef, useState, MouseEventHandler } from 'react'

type HoverState = {
  hover: boolean
  active: boolean
  listeners: {
    onMouseEnter: MouseEventHandler
    onMouseDown: MouseEventHandler
    onMouseUp: MouseEventHandler
    onMouseLeave: MouseEventHandler
  }
}

function isTouchDevice(): boolean {
  return (
    (typeof 'window' !== undefined && 'ontouchstart' in window) ||
    navigator.maxTouchPoints > 0 ||
    // @ts-ignore
    navigator.msMaxTouchPoints > 0
  )
}

const dummyListeners = {
  onMouseEnter: () => {},
  onMouseDown: () => {},
  onMouseUp: () => {},
  onMouseLeave: () => {},
}

export const useHover: () => HoverState = isTouchDevice()
  ? () => {
      return {
        hover: false,
        active: false,
        listeners: dummyListeners,
      }
    }
  : () => {
      const [, update] = useState()
      const ref = useRef<HoverState>()
      if (!ref.current) {
        const handler = (e, active, hover) => {
          ref.current.active = active
          ref.current.hover = hover
          update(e)
        }
        ref.current = {
          active: false,
          hover: false,
          listeners: {
            onMouseEnter: (e) => handler(e, false, true),
            onMouseDown: (e) => handler(e, true, false),
            onMouseUp: (e) => handler(e, false, true),
            onMouseLeave: (e) => handler(e, true, false),
          },
        }
      }
      return ref.current as HoverState
    }
