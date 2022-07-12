import { useOverlay } from './useOverlay'
import { ComponentType, CSSProperties, PropsWithChildren } from 'react'
import { PositionProps } from '~/components/Overlay'
import { PropsEventHandler } from '~/types'
import { ContextMenu } from '~/components/ContextMenu'

export function useContextMenu<P = { [key: string]: any }>(
  component: ComponentType<PropsWithChildren<P>>,
  props?: P | PropsWithChildren<P>,
  position?: PositionProps & { style?: CSSProperties },
  handler?: (selection: Event | any) => () => void | undefined
): PropsEventHandler {
  return useOverlay<P>(component, props, position, handler, ContextMenu, {
    transparent: true,
    style: position?.style,
  })
}
