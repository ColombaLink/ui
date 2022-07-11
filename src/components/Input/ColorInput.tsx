import React, { useEffect, useRef } from 'react'
import { useColorPicker } from '~/hooks/useColorPicker'
import { color } from '~/utils'

export const ColorInput = ({
  inputRef,
  name,
  placeholder,
  defaultValue,
  value = defaultValue,
  disabled,
  style,
  onChange,
  ...props
}) => {
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
    <>
      <input
        {...props}
        type="text"
        ref={inputRef}
        value={colorState}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        style={{
          ...style,
          paddingLeft: 36,
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
        }}
        onClick={onClick}
      />
    </>
  )
}
