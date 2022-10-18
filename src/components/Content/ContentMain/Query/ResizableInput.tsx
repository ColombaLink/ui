import React, { useEffect, useRef, useState } from 'react'
import { usePropState } from '~/hooks'
import { Input } from '~/components/Input'

export const ResizableInput = ({
  value: valueProp,
  onSubmit,
  nextInputRef = null,
  onDelete = null,
}) => {
  const ctx = useRef<CanvasRenderingContext2D>()
  const [value, setValue] = usePropState(valueProp)
  const [width, setWidth] = useState(40)

  if (!ctx.current) {
    const c = document.createElement('canvas')
    ctx.current = c.getContext('2d')
    ctx.current.font = '500 16px Font'
  }

  useEffect(() => {
    const { width } = ctx.current.measureText(value || '')
    setWidth(Math.ceil(width) + 1)
  }, [value])

  return (
    <Input
      placeholder=""
      ghost
      value={value}
      onChange={setValue}
      autoFocus
      style={{ width }}
      onKeyDown={(e) => {
        if (e.key === 'Backspace') {
          if (!value) {
            onDelete?.()
          }
        } else if (e.key === 'Enter' || e.key === 'Tab') {
          if (!e.shiftKey) {
            if (value) {
              onSubmit(value)
            }
            if (nextInputRef) {
              e.currentTarget.blur()
              nextInputRef.current.focus()
              e.preventDefault()
            }
          }
        }
      }}
    />
  )
}
