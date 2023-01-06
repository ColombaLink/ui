import React, { ReactNode, useEffect } from 'react'
import { removeAllOverlays, removeOverlay } from '~/components/Overlay'
import { useOverlay } from '~/hooks'
import { useLocation } from '~/hooks/location'

export const useTooltip = (
  text: string | ReactNode,
  position: 'top' | 'bottom' | 'left' | 'right' = 'bottom'
) => {
  const onMouseEnter = useOverlay(
    () => <>{text}</>,
    text,
    { variant: 'detached', position: position },

    undefined,
    undefined,
    {
      overlay: false,
      style: { padding: '4px 8px', width: 'fit-content' },
    }
  )

  const [location] = useLocation()

  // useEffect(() => {
  //   removeAllOverlays()
  // }, [location])

  return {
    onMouseEnter,
    onMouseLeave: () => removeOverlay(),
  }
}
