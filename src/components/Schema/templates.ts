import { Color } from '~/types'
import {
  TextIcon,
  AddIcon,
  ExternalLinkIcon,
  ModelIcon,
  AttachmentIcon,
  CalendarIcon,
  ToggleIcon,
} from '~/icons'

export const systemFields = new Set(['id', 'type', 'children', 'parents'])
export const alwaysIgnore = new Set(['descendants', 'ancestors', 'aliases'])

export type FieldTemplates =
  | 'boolean'
  | 'dateTime'
  | 'email'
  | 'file'
  | 'id'
  | 'markdown'
  | 'object'
  | 'reference'
  | 'references'
  | 'string'
  | 'text'
  | 'timestamp'
  | 'type'
  | 'url'

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
    schema: {
      type: 'reference',
      meta: {
        refTypes: ['file'],
      },
    },
  },
  boolean: {
    label: 'Boolean',
    description: 'Booleans you know it',
    icon: ToggleIcon,
    color: 'lightred',
    schema: { type: 'boolean' },
  },
  id: {
    label: 'Identifier',
    description: 'IDs you know it',
    icon: ToggleIcon,
    color: 'babyblue',
    schema: { type: 'id' },
  },
  reference: {
    label: 'Reference',
    description: 'References you know it',
    icon: ToggleIcon,
    color: 'red',
    schema: { type: 'reference' },
  },
  references: {
    label: 'References',
    description: 'References you know it',
    icon: ToggleIcon,
    color: 'red',
    schema: { type: 'references' },
  },
  timestamp: {
    label: 'Timestamp',
    description: 'Timestamps you know it',
    icon: ToggleIcon,
    color: 'yellow',
    schema: { type: 'timestamp' },
  },
  type: {
    label: 'Type',
    description: 'Types you know it',
    icon: ToggleIcon,
    color: 'yellow',
    schema: { type: 'type' },
  },
  text: {
    label: 'Text',
    description: 'Text you know it',
    icon: ToggleIcon,
    color: 'yellow',
    schema: { type: 'text' },
  },
  email: {
    label: 'Email',
    description: 'Emails you know it',
    icon: ToggleIcon,
    color: 'yellow',
    schema: {
      type: 'string',
      meta: {
        format: 'email',
      },
    },
  },
}
