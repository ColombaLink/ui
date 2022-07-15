import React, {
  FC,
  MouseEventHandler,
  MouseEvent,
  PropsWithChildren,
} from 'react'
import { removeOverlay } from '~/components/Overlay'
import { useOverlay } from '~/hooks'

type useToolTipsProps = {
  text?: string | any | PropsWithChildren<any>
  position?: 'top' | 'bottom' | 'left' | 'right'
  onMouseEnter: MouseEvent<Element, MouseEvent>
  onMouseLeave: React.MouseEvent
}

export const useToolTips: FC<useToolTipsProps> = (
  text,
  position = 'bottom'
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
