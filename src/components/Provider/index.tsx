import React, { CSSProperties, FC, ReactNode, useEffect } from 'react'
import { color } from '~/utils'
import { DialogProvider } from '../Dialog'
import { OverlayProvider } from '../Overlay'
import { Provider as BasedProvider } from '@based/react'
import { Based } from '@based/client'
import { ToastProvider } from '../Toast/ToastProvider'
import { baseTheme } from '~/theme/baseTheme'
import { updateTheme } from '~/theme'
import { darkTheme } from '~/theme/darkTheme'

type ProviderProps = {
  children?: ReactNode
  style?: CSSProperties
  client?: Based
  theme?: 'light' | 'dark'
  themes?: {
    base?: object
    dark?: object
  }
  fill?: boolean
}

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
