import { Color } from '~/types'
import {
  TextIcon,
  AddIcon,
  ExternalLinkIcon,
  ModelIcon,
  AttachmentIcon,
  CalendarIcon,
} from '~/icons'

export const systemFields = new Set(['id', 'type', 'children', 'parents'])
export const alwaysIgnore = new Set(['descendants', 'ancestors', 'aliases'])

export type FieldTemplates =
  | 'dateTime'
  | 'string'
  | 'object'
  | 'url'
  | 'markdown'
  | 'file'

export const templates: {
  [K in FieldTemplates]: {
    label: string
    description: string
    color: Color
    icon: any
    schema: {
      type: string
      meta?: {
        format?: 'url'
      }
    }
  }
} = {
  // keys have to represent types or formats TODO add ts
  dateTime: {
    label: 'Date-Time',
    description: 'Dates and times the 4th dimension',
    icon: CalendarIcon,
    color: 'lightyellow',
    schema: { type: 'timestamp' },
  },
  string: {
    label: 'String',
    description: 'String is nice',
    icon: TextIcon,
    color: 'lightyellow',
    schema: { type: 'string' },
  },
  object: {
    label: 'Object',
    description: 'Objects are sublime',
    icon: ModelIcon,
    color: 'lightbabyblue',
    schema: { type: 'object' },
  },
  url: {
    label: 'URL',
    description: 'Url is cool',
    icon: ExternalLinkIcon,
    color: 'lightgreen',
    schema: { type: 'string' },
  },
  markdown: {
    label: 'Markdown',
    description: 'Markdown is fancy',
    icon: AddIcon,
    color: 'lightyellow',
    schema: { type: 'string' },
  },
  file: {
    label: 'File',
    description: 'Files are handy',
    icon: AttachmentIcon,
    color: 'lightred',
    schema: { type: 'reference' },
  },
}
