import React, { ReactNode, useEffect } from 'react'
import { removeOverlay } from '~/components/Overlay'
import { useOverlay } from '~/hooks'
import { useLocation } from '~/hooks/useLocation'

export const useTooltip = (
  text: string | ReactNode,
  position: 'top' | 'bottom' | 'left' | 'right' = 'bottom'
) => {
  const onMouseEnter = useOverlay(
    () => <>{text}</>,
    null,
    { variant: 'detached', position: position },

    undefined,
    undefined,
    {
      overlay: false,
      style: { padding: '4px 8px', width: 'fit-content' },
    }
  )

  const location = useLocation()

  useEffect(() => {
    removeOverlay()
  }, [location])

  return {
    onMouseEnter,
    onMouseLeave: () => removeOverlay(),
  }
}
