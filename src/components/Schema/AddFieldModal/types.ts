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
