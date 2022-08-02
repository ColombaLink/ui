import {
  ReactChild,
  ReactChildren,
  ComponentType,
  ReactText,
  PropsWithChildren,
  ReactNode,
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
