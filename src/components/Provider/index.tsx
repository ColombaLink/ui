import React, {
  createContext,
  CSSProperties,
  FC,
  PropsWithChildren,
} from 'react'
import { color } from '~/utils'
import { DialogProvider } from '../Dialog'
import { OverlayProvider } from '../Overlay'

export const Context = createContext({
  theme: {},
})

export const Provider: FC<PropsWithChildren<{ style?: CSSProperties }>> = ({
  children,
  style,
}) => {
  return (
    <div
      style={{
        backgroundColor: color('Background1dp'),
        color: color('TextPrimary'),
        ...style,
      }}
    >
      {/* <ToastProvider> */}
      <DialogProvider>
        {children}
        <OverlayProvider />
      </DialogProvider>
      {/* </ToastProvider> */}
    </div>
  )
}
