import React, {
  createContext,
  CSSProperties,
  FC,
  PropsWithChildren,
  ReactNode,
} from 'react'
import { color } from '~/utils'
import { DialogProvider } from '../Dialog'
import { OverlayProvider } from '../Overlay'
import { Provider as BasedProvider } from '@based/react'
import { Based } from '@based/client'

export const Context = createContext({
  theme: {},
})

type ProviderProps = {
  children?: ReactNode
  style?: CSSProperties
  client?: Based
}

export const Provider: FC<ProviderProps> = ({ children, style, client }) => {
  return (
    <div
      style={{
        backgroundColor: color('Background1dp'),
        color: color('TextPrimary'),
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      <BasedProvider client={client}>
        {/* <ToastProvider> */}
        <DialogProvider>
          {children}
          <OverlayProvider />
        </DialogProvider>
        {/* </ToastProvider> */}
      </BasedProvider>
    </div>
  )
}
