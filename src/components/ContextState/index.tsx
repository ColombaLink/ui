import { hash } from '@saulx/hash'
import React, {
  createContext,
  useContext,
  useEffect,
  FC,
  ReactNode,
  useMemo,
} from 'react'
import { useUpdate } from '~/hooks/useUpdate'

type CtxVal = {
  map: Map<string, { value?: any; listeners: Set<() => void> }>
  onChange?: (key: string, t: any) => void
}

export const StateContext = createContext<CtxVal>({ map: new Map() })

export const StateProvider: FC<{
  children: ReactNode
  onChange?: (key: string, t: any) => void
  values?: { [key: string]: any }
}> = ({ children, values, onChange }) => {
  const ctxValue = useMemo(() => {
    const ctxVal: CtxVal = {
      map: new Map(),
      onChange,
    }
    return ctxVal
  }, [])

  useMemo(() => {
    ctxValue.map.forEach((v, key) => {
      if (values[key] !== undefined && v.value !== values[key]) {
        v.value = values[key]
        v.listeners.forEach((u) => u())
      }
    })
  }, [ctxValue, values ? hash(values) : 0])

  ctxValue.onChange = onChange

  return (
    <StateContext.Provider value={ctxValue}>{children}</StateContext.Provider>
  )
}

export const useContextState = <T extends unknown>(
  key: string,
  initialValue?: T
): [any, (value: T) => void] => {
  const update = useUpdate()
  const values = useContext(StateContext)
  if (!values.map.has(key)) {
    values.map.set(key, {
      listeners: new Set(),
      value: initialValue,
    })
  }
  const v = values.map.get(key)

  useEffect(() => {
    v.listeners.add(update)
    return () => {
      v.listeners.delete(update)
    }
  }, [])

  return [
    v.value,
    (value: T) => {
      v.value = value
      v.listeners.forEach((u) => u())
      if (values.onChange) {
        values.onChange(key, value)
      }
    },
  ]
}
