type CellValue = string | number | boolean
type FormattedCell = {
  type: 'image' | 'video' | 'file' | 'date'
  value: CellValue
}
type CellData = CellValue | FormattedCell

type RowData = {
  [key: string]: CellData
}[]

type EventData = {
  item: CellData
  key: string
  colIndex: number
  rowIndex: number
}
