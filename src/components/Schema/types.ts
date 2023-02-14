import { Color, Icon } from '~/types'
import { FC } from 'react'

export type Format =
  | 'url'
  | 'email'
  | 'geo'
  | 'file'
  | 'files'
  | 'markdown'
  | 'bytes'
  | 'progress'
  | 'src'

export type MimeType = 'image' | 'video' | 'audio' | 'document'

export type FieldMeta = {
  name?: string
  description?: string
  format?: Format
  refTypes?: string[]
  readOnly?: boolean
  mimeType?: MimeType[]
}

export type Field = {
  label: string
  description: string
  color: Color
  icon: FC<Icon>
  schema: {
    type: string
    properties?: object
    values?: object
    items?: object
    meta?: FieldMeta
  }
  hidden?: boolean
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

export type FieldTemplates =
  | 'array'
  | 'boolean'
  | 'createdBy'
  | 'dateTime'
  | 'digest'
  | 'email'
  | 'file'
  | 'files'
  | 'float'
  | 'id'
  | 'int'
  | 'geo'
  | 'markdown'
  | 'number'
  | 'object'
  | 'record'
  | 'reference'
  | 'references'
  | 'string'
  | 'text'
  | 'timestamp'
  | 'type'
  | 'url'
  | 'set'
  | 'json'
  | 'bytes'
