import { ReactNode, FC, MouseEvent } from 'react'

export type TableHeader<T> = {
  key: string
  label?: ReactNode
  showColumnCheckbox?: boolean
  customComponent?: FC<{
    data: T
    key: string
    columnIndex: number
    rowIndex: number
  }>
}

export type TableProps<T extends any = any> = {
  headers?: TableHeader<T>[]
  data?: T[]
  width?: number
  height?: number
  rowCount?: number
  rowHeight?: number
  columnCount?: number
  columnWidth?: number
  onClick?: (e: MouseEvent, data: any) => void
}
