// @ts-nocheck
import {
  CSSProperties,
  FC,
  ReactNode,
  useEffect,
  useContext,
} from 'react'
import { StateContext } from '../../hooks/ContextState'
import { color } from '~/utils'
import { DialogProvider } from '../Dialog'
import { OverlayProvider } from '../Overlay'
import { Provider as BasedProvider, useClient } from '@based/react'
import { BasedClient } from '@based/client'
import { ToastProvider } from '../Toast/ToastProvider'
import { baseTheme } from '~/theme/baseTheme'
import { updateTheme } from '~/theme'
import { darkTheme } from '~/theme/darkTheme'

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

type ExtractVar<C> = C extends React.Context<infer T> ? T : never

export type AllContexts = {
  client: BasedClient
  state: ExtractVar<typeof StateContext>
}

export const useAllContexts = (): AllContexts => {
  const state = useContext(StateContext)
  const client = useClient()
  return { state, client }
}

export const ForwardContext: FC<{
  context: AllContexts
  children: ReactNode
}> = ({ context, children }) => {
  let r: ReactNode = children
  const { state, client, router } = useAllContexts()
  if (state !== context.state) {
    r = <StateContext.Provider value={context.state}>{r}</StateContext.Provider>
  }
  if (client !== context.client) {
    r = <BasedProvider client={context.client}>{r}</BasedProvider>
  }
  return <>{r}</>
}

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
