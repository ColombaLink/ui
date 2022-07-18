import React, { ReactNode } from 'react'
import { removeOverlay } from '~/components/Overlay'
import { useOverlay } from '~/hooks'

export const useToolTips = (
  text: string | ReactNode,
  position: 'top' | 'bottom' | 'left' | 'right' = 'bottom'
) => {
  const onMouseEnter = useOverlay(
    () => <>{text}</>,
    { nice: true },
    { variant: 'detached', position: position },

    undefined,
    undefined,
    {
      overlay: false,
      style: { padding: '4px 8px', width: 'fit-content' },
    }
  )

  return {
    onMouseEnter,
    onMouseLeave: () => removeOverlay(),
  }
}
