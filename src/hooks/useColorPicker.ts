import { styled } from 'inlines'
import { useState, useCallback } from 'react'
import { useOverlay } from '~/hooks'
import { color } from '~/utils'
import { ColorPicker } from '~/components/ColorPicker'
import { rgbaToArr } from '~/components/ColorPicker/utils'

const WrappedColorPicker = styled(ColorPicker, {
  border: 'none',
})

let tester
const valueToRgba = (value) => {
  if (value) {
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
}

export const useColorPicker = (valueProp, onChange) => {
  const [value, setValue] = useState(valueProp)
  const [rgba, setRgba] = useState(() => valueToRgba(valueProp))

  return {
    value,
    rgba,
    onClick: useOverlay(
      WrappedColorPicker,
      {
        value: rgba,
        onChange: useCallback(
          (value) => {
            setValue(value)
            setRgba(value)
            onChange(value)
          },
          [onChange]
        ),
      },
      { variant: 'detached', width: 320 }
    ),
    setValue: (value) => {
      setValue(value)
      setRgba(valueToRgba(value))
    },
  }
}
