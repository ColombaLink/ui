type FieldMeta = {
  name?: string
  description?: string
  format?: 'url'
}

export type FieldOptions = {
  field?: string
  meta?: FieldMeta
  items?: {
    type: string
  }
}

export type FieldSchema = {
  type: string
  meta?: FieldMeta
}
