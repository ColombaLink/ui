import React, { createContext, CSSProperties, FC, ReactNode } from 'react'
import { color } from '~/utils'
import { DialogProvider } from '../Dialog'
import { OverlayProvider } from '../Overlay'
import { Provider as BasedProvider } from '@based/react'
import { Based } from '@based/client'
import { themes } from '~/themes'

export const Context = createContext({
  theme: {},
})

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
  if (theme) {
    themes(theme)
  }
  return (
    <div
      style={{
        backgroundColor: color('Background1dp'),
        color: color('TextPrimary'),
        height: fill ? '100vh' : '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      <BasedProvider client={client}>
        <DialogProvider>
          {children}
          <OverlayProvider />
        </DialogProvider>
      </BasedProvider>
    </div>
  )
}
