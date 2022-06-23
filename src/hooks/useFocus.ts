import { useRef, useState, FocusEventHandler } from 'react'

type FocusState = {
  focus: boolean
  listeners: {
    onFocus: FocusEventHandler
    onBlur: FocusEventHandler
  }
}

export const useFocus = () => {
  const [focus, setFocus] = useState<boolean>()
  const ref = useRef<FocusState>()

  if (ref.current) {
    ref.current.focus = focus
  } else {
    ref.current = {
      focus,
      listeners: {
        onFocus: () => setFocus(true),
        onBlur: () => setFocus(false),
      },
    }
  }

  return ref.current
}
