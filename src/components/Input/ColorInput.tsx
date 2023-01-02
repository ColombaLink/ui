import React, { useEffect, useRef, RefObject, CSSProperties } from 'react'
import { useColorPicker } from '~/hooks/useColorPicker'
import { color } from '~/utils'

type ColorInputProps = {
  inputRef?: RefObject<HTMLInputElement>
  value?: string
  placeholder?: string
  defaultValue?: string
  disabled?: boolean
  style?: CSSProperties
  onChange?: (target) => void
}

export const ColorInput = ({
  inputRef,
  // name,
  placeholder,
  defaultValue,
  value = defaultValue,
  disabled,
  style,
  onChange,
  ...props
}: ColorInputProps) => {
  const { value: colorState, rgba, onClick, setValue } = useColorPicker(value)
  const rgbaRef = useRef(rgba)

  useEffect(() => {
    if (rgba !== value) {
      if (rgbaRef.current !== rgba) {
        rgbaRef.current = rgba
        onChange({ target: { value: rgba } })
      }
    }
  }, [rgba])

  return (
    <div
      style={{
        display: 'flex',
        position: 'relative',
      }}
    >
      <input
        {...props}
        type="text"
        ref={inputRef}
        value={colorState}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        style={{
          ...style,
          paddingLeft: 36,
          border: `1px solid ${color('border')}`,
          borderRadius: 4,
          minHeight: 36,
          cursor: disabled ? 'not-allowed' : null,
          backgroundColor: color('background'),
        }}
      />
      <button
        style={{
          cursor: 'pointer',
          position: 'absolute',
          left: 12,
          top: '50%',
          transform: 'translate3d(0,-50%,0)',
          backgroundColor: rgba,
          height: 20,
          width: 20,
          borderRadius: 4,
          marginRight: 8,
          marginLeft: -4,
          border: `1px solid ${color('border')}`,
          pointerEvents: disabled ? 'none' : null,
        }}
        onClick={onClick}
      />
    </div>
  )
}
