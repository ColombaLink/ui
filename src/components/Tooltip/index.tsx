import React, {
  ReactNode,
  CSSProperties,
  FC,
  useState,
  useRef,
  useEffect,
} from 'react'
// TODO yves fix
import { addOverlay, removeOverlay } from '../Overlay'

import { useOverlayPosition } from '~/hooks'
import { Overlay, OverlayProps } from '../Overlay'
import { useOverlay } from '~/hooks'

import { Text, Button } from '~'

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

  // @ts-ignore
  const { open } = useOverlay()

  const openSimpleOverlay = () => {
    // useOverlay()
  }

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
      <Button onClick={openSimpleOverlay}>Open Simple Overlay</Button>
      <div
        onMouseEnter={(e) => {
          setMouseOver(true)
          addOverlay(toolTipLabel, onClose)
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
    </>
  )
}
