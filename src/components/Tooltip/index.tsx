import React, {
  ReactNode,
  CSSProperties,
  FC,
  useState,
  useRef,
  useEffect,
} from 'react'
import { addOverlay, removeOverlay } from '../Overlay'

import { useOverlayPosition } from '~/hooks'
import { Overlay, OverlayProps } from '../Overlay'

import { border, color } from '~/utils'

type TooltipProps = {
  children: FC | ReactNode
  label: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  style?: CSSProperties
  onClose?: () => void
}

export const Tooltip: FC<TooltipProps> = ({
  children,
  label,
  onClose = null,
  position = 'bottom',
  style,
}) => {
  const [mouseOver, setMouseOver] = useState(true)
  const [childElHeight, setChildElHeight] = useState(undefined)
  const [childElWidth, setChildElWidth] = useState(undefined)

  const childEl = useRef<HTMLDivElement>()

  useEffect(() => {
    setChildElHeight(childEl.current.offsetHeight)
    setChildElWidth(childEl.current.offsetWidth)
  }, [childEl])

  const toolTipLabel = (
    <div
      style={{
        padding: '4px 8px',
        borderRadius: 4,
        display: 'block',
        backgroundColor: color('border'),
        width: position == 'left' ? 'min-content' : 'auto',
        position: 'absolute',
        top:
          position == 'bottom'
            ? 4
            : position == 'right' || position == 'left'
            ? -childElHeight
            : undefined,
        bottom: position == 'top' ? childElHeight + 4 : undefined,
        left:
          position == 'right'
            ? childElWidth + childElWidth / 5
            : position == 'left'
            ? -childElWidth + -12
            : undefined,
        ...style,
      }}
    >
      {label}
    </div>
  )

  return (
    <>
      <div>
        <div
          onMouseEnter={(e) => {
            setMouseOver(true)
            addOverlay(toolTipLabel, onClose)
            console.log('X', e.clientX)
            console.log('Y', e.clientY)

            console.log(childEl)

            console.log('X  pos el', childEl.current.clientX)
            console.log('Y  pos el', childEl.current.offsetTop)
          }}
          onMouseLeave={() => {
            setMouseOver(true)
          }}
          style={{
            position: 'relative',
            width: 'fit-content',
          }}
          ref={childEl}
        >
          {children}
        </div>
      </div>
      {/* {mouseOver && (
       
      )} */}
    </>
  )
}
