// @ts-nocheck
import React, {
  CSSProperties,
  FC,
  ReactNode,
  useEffect,
  createContext,
} from 'react'
import { color } from '~/utils'
import { DialogProvider } from '../Dialog'
import { OverlayProvider } from '../Overlay'
import { Provider as BasedProvider } from '@based/react'
import { BasedClient } from '@based/client'
import { ToastProvider } from '../Toast/ToastProvider'
import { baseTheme } from '~/theme/baseTheme'
import { updateTheme } from '~/theme'
import { darkTheme } from '~/theme/darkTheme'
import { AuthProvider, useRouterListeners } from '~'

import { RouterCtx } from '~/hooks/location/types'

type ProviderProps = {
  children?: ReactNode
  style?: CSSProperties
  client?: BasedClient
  theme?: 'light' | 'dark'
  themes?: {
    base?: object
    dark?: object
  }
  fill?: boolean
  path?: string
}

// @ts-ignore
export const RouterContext = createContext<RouterCtx>({
  rootPath: [],
  componentMap: new Map(),
})

// TODO: types!
const mergeNested = (theme, overwrite, key) => {
  if (overwrite[key]) {
    if (theme[key]) {
      for (const i in overwrite[key]) {
        if (theme[key][i]) {
          for (const j in overwrite[key][i]) {
            theme[key][i][j] = overwrite[key][i][j]
          }
        } else {
          theme[key][i] = overwrite[key][i]
        }
      }
    } else {
      theme[key] = overwrite[key]
    }
  }
}

const merge = (theme, overwrite) => {
  if (overwrite) {
    mergeNested(theme, overwrite, 'colors')
    mergeNested(theme, overwrite, 'light')
  }
}

export const Provider: FC<ProviderProps> = ({
  children,
  style,
  path,
  client,
  themes,
  theme,
  fill,
}) => {
  useEffect(() => {
    if (themes) {
      const { base, dark } = themes
      merge(baseTheme, base)
      merge(darkTheme, dark)
      updateTheme()
    }
  }, [themes])

  useEffect(() => {
    if (theme) {
      updateTheme(theme === 'dark' ? darkTheme : baseTheme)
    }
  }, [theme])

  const routes = useRouterListeners(path)

  return (
    <div
      style={{
        backgroundColor: color('background'),
        color: color('text'),
        height: fill ? '100vh' : null,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      <BasedProvider client={client}>
        <RouterContext.Provider value={routes}>
          <ToastProvider>
            <DialogProvider>
              <AuthProvider>{children}</AuthProvider>
              <OverlayProvider />
            </DialogProvider>
          </ToastProvider>
        </RouterContext.Provider>
      </BasedProvider>
    </div>
  )
}
