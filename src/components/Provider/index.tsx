import React, { createContext, CSSProperties, FC, ReactNode } from 'react'
import { color } from '~/utils'
import { DialogProvider } from '../Dialog'
import { OverlayProvider } from '../Overlay'
import { Provider as BasedProvider } from '@based/react'
import { Based } from '@based/client'
import { ToastProvider } from '../Toast/ToastProvider'

type ProviderProps = {
  children?: ReactNode
  style?: CSSProperties
  client?: Based
  theme?: 'dark' | 'light'
  fill?: boolean
}

export const Provider: FC<ProviderProps> = ({
  children,
  style,
  client,
  theme,
  fill,
}) => {
  return (
    <div
      style={{
        backgroundColor: color('background'),
        color: color('text'),
        height: fill ? '100vh' : '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      <BasedProvider client={client}>
        <ToastProvider>
          <DialogProvider>
            {children}
            <OverlayProvider />
          </DialogProvider>
        </ToastProvider>
      </BasedProvider>
    </div>
  )
}
