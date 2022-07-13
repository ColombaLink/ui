import React, { useRef, useState, MouseEventHandler } from 'react'

type ToolTipState = {
  hover: boolean
  active: boolean
  listeners: {
    onMouseEnter: MouseEventHandler
    onMouseLeave: MouseEventHandler
  }
}

export const useToolTip = (): ToolTipState => {
  const [, update] = useState()
  const ref = useRef<ToolTipState>()

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
        onMouseEnter: (e) => handler(e, true, true),
        onMouseLeave: (e) => handler(e, false, false),
      },
    }
  }
  return ref.current
}
