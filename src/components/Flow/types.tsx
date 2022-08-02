import {
  ReactChild,
  ReactChildren,
  ComponentType,
  ReactText,
  PropsWithChildren,
  ReactNode,
  SyntheticEvent,
} from 'react'

export type Data<T = {}> = T & {
  data: any
  index?: number
  exportData?: ExportData
}

export type ExportData<T = any> = (data: Data<T>) => Promise<ExportedData>

export type Children<T = PropsWithChildren<any>> =
  | ReactChild
  | ReactChildren
  | ComponentType<T>
  | ReactText
  | ReactText[]
  | ReactNode
  | ReactNode[]
  | number
  | string
  | number[]
  | string[]

export type ExportedData = {
  file?: {
    value: any
    name: string
    mime: string
  }
  text?: string
}

export type DataEventHandler<T = {}> = (
  e?: Event | SyntheticEvent,
  data?: Data<T>
) => void | Promise<void> | boolean | Promise<boolean>

export type MultiDataEventHandler<T = {}> = (
  e: Event | SyntheticEvent,
  data?: Data<T>[]
) => void | Promise<void>
