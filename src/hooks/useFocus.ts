import { useRef, useState } from 'react'

export const useFocus = (initialState = false) => {
  const [focus, setFocus] = useState(initialState)
  const ref = useRef()

  if (!ref.current) {
    ref.current = {
      listeners: {
        onFocus: () => setFocus(true),
        onBlur: () => setFocus(false),
      },
    }
  }

  ref.current.focus = focus

  return ref.current
}
