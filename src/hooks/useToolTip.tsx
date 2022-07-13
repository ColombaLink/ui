import React, {
  useRef,
  useState,
  MouseEventHandler,
  FC,
  useEffect,
} from 'react'
import { addOverlay, removeOverlay } from '~/components/Overlay'
import { color } from '~/utils'

type useToolTipProps = {
  ref: React.RefObject<HTMLElement> | React.MutableRefObject<HTMLElement> | any
  tip?: string
  position?: 'top' | 'bottom' | 'left' | 'right'
}

// new use Tooltip hook
export const useToolTip = (ref, tip, position = 'right') => {
  let mouseOver
  //the label
  const toolTipLabel = (tip) => {
    return (
      <div
        style={{
          padding: '4px 8px',
          borderRadius: 4,
          margin: 5,
          display: 'block',
          backgroundColor: color('background'),
          border: `1px solid ${color('border')}`,
          width: 'min-content',
          position: 'absolute',
          left:
            position == 'bottom' || position == 'top'
              ? ref.current.offsetLeft
              : position == 'right'
              ? ref.current.offsetLeft + ref.current.clientWidth
              : position == 'left'
              ? ref.current.offsetLeft
              : undefined,
          top:
            position == 'bottom'
              ? ref.current.offsetTop + ref.current.clientHeight
              : position == 'top'
              ? ref.current.clientHeight
              : position == 'right' || position == 'left'
              ? ref.current.offsetTop + ref.current.clientHeight
              : 0,
          transform:
            position == 'top'
              ? 'translateY(-100%)'
              : position == 'right'
              ? 'translateY(-100%)'
              : position == 'left'
              ? 'translate(-120%,-100%)'
              : undefined,
        }}
      >
        {tip}
      </div>
    )
  }

  ref.current.addEventListener('mouseenter', (e) => {
    //   //   // console.log('log the ref. clientWidth', ref.current.clientWidth)
    //   //   // console.log('log the ref. clientHeight', ref.current.clientHeight)
    //   //   // console.log(' offsetLeft', ref.current.offsetLeft)
    //   //   // console.log(' offsetTop', ref.current.offsetTop)
    //   //   // console.log('the tooltip', tip)
    console.log(e)
    mouseOver = true
    console.log(mouseOver)

    addOverlay(toolTipLabel(tip), () => {}, {})
  })

  ref.current.addEventListener('mouseout', () => {
    mouseOver = false
    console.log(mouseOver)
    removeOverlay()
  })
}
