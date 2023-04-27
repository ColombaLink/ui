import { ReactNode, FC, MouseEvent } from 'react'

export type TableCustomComponent<T> = FC<{
  data: T
  header: TableHeader<T>
  context: TableProps<T>
}>

export type TableHeader<T> = {
  key: string
  width?: number
  label?: ReactNode
  showColumnCheckbox?: boolean
  customComponent?: TableCustomComponent<T>
}

export type TableProps<T extends any = any> = {
  headers?: TableHeader<T>[]
  data?: T[]
  width?: number
  height?: number
  context?: any
  rowCount?: number
  rowHeight?: number
  columnCount?: number
  columnWidth?: number
  onClick?: (e: MouseEvent, data: any) => void
}
