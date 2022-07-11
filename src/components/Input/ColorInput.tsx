import { styled } from 'inlines'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useOverlay } from '~/hooks'
import { color } from '~/utils'
import { ColorPicker } from '../ColorPicker'
import { rgbaToArr } from '../ColorPicker/utils'

const WrappedColorPicker = styled(ColorPicker, {
  border: 'none',
})

let tester
const valueToRgba = (value = '') => {
  if (value.startsWith('rgba(')) {
    return value
  }
  if (!tester) {
    tester = document.createElement('div')
    document.documentElement.appendChild(tester)
  }
  tester.style.backgroundColor = value
  const { backgroundColor } = getComputedStyle(tester)
  const rgba = rgbaToArr(backgroundColor)
  return `rgba(${rgba.join(',')})`
}

const useColorPicker = (value) => {
  const [v, setValue] = useState(() => ({ value, rgba: valueToRgba(value) }))
  return [
    v,
    useOverlay(
      WrappedColorPicker,
      {
        value: v.rgba,
        onChange: useCallback((value) => {
          setValue({ value, rgba: value })
        }, []),
      },
      { variant: 'detached', width: 320 }
    ),
    useCallback((value) => {
      setValue({ value, rgba: valueToRgba(value) })
    }, []),
  ]
}

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
  const [{ value: colorState, rgba }, onClick, setColor] = useColorPicker(value)
  const rgbaRef = useRef(rgba)
  useEffect(() => {
    if (rgba !== value) {
      if (rgbaRef.current !== rgba) {
        rgbaRef.current = rgba
        console.log({ rgba })
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
        onChange={(e) => setColor(e.target.value)}
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
          backgroundColor: colorState,
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
