import React from 'react'
import { styled } from 'inlines'
import { rgbToXY, xyToRgb } from './utils'

const Absolute = styled('div', {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
})

const GradientX = styled(Absolute, {
  background:
    'linear-gradient(to right, rgb(255, 255, 255), rgba(255, 255, 255, 0))',
})

const GradientY = styled(Absolute, {
  background: 'linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 0))',
})

const Pointer = ({ hue, rgb }) => {
  const { x, y } = rgbToXY(rgb, hue)
  return (
    <div
      style={{
        backgroundColor: 'white',
        position: 'absolute',
        height: 6,
        width: 6,
        left: `${x * 100}%`,
        top: `${y * 100}%`,
        transform: `translate3d(-${x * 100}%,-${y * 100}%,0)`,
      }}
    />
  )
}

export const RgbPicker = ({ hue, rgb, onChange }) => {
  const onDown = ({ currentTarget }) => {
    const { left, top, width, height } = currentTarget.getBoundingClientRect()

    const onMove = ({ clientX, clientY }) => {
      let x = (clientX - left) / width
      let y = (clientY - top) / height

      if (x > 1) x = 1
      if (x < 0) x = 0
      if (y > 1) y = 1
      if (y < 0) y = 0

      const rgb = xyToRgb(x, y, hue)
      onChange(rgb)
    }

    const onUp = (e) => {
      onMove(e)
      removeEventListener('mousemove', onMove)
      removeEventListener('mouseup', onUp)
    }

    addEventListener('mousemove', onMove)
    addEventListener('mouseup', onUp)
  }

  return (
    <div
      onMouseDown={onDown}
      style={{
        position: 'relative',
        width: '100%',
        height: 100,
        background: `rgb(${hue.join(',')})`,
      }}
    >
      <GradientX>
        <GradientY>
          <Pointer hue={hue} rgb={rgb} />
        </GradientY>
      </GradientX>
    </div>
  )
}
