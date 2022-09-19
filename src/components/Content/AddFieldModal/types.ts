import { FieldData } from '../fields'

export type AddFieldProps = {
  type: string
  fieldData: FieldData
}

export type FieldOptionsState = {
  isRequired?: boolean
  name?: string
  fieldName?: string
  description?: string
  refType?: 'multi' | 'single'
  isBidirectional?: boolean
  refTypes?: string[]
  biDirectionalTarget?: Omit<FieldOptionsState, 'biDirectionalTarget'>
  fileTypes?: ('image' | 'video' | 'font' | 'other')[]
}

export type ValidationProps = {
  fieldData: FieldData
  update: (obj: any) => void
  options: FieldOptionsState
}
