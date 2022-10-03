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
    color?: Color
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
    schema: { type: 'timestamp' },
  },
  string: {
    label: 'String',
    description: 'String is nice',
    icon: TextIcon,
    schema: { type: 'string' },
  },
  object: {
    label: 'Object',
    description: 'Objects are sublime',
    icon: ModelIcon,
    schema: { type: 'object' },
  },
  url: {
    label: 'URL',
    description: 'Url is cool',
    icon: ExternalLinkIcon,
    schema: { type: 'string' },
  },
  markdown: {
    label: 'Markdown',
    description: 'Markdown is fancy',
    icon: AddIcon,
    schema: { type: 'string' },
  },
  file: {
    label: 'File',
    description: 'Files are handy',
    icon: AttachmentIcon,
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
    schema: { type: 'boolean' },
  },
  id: {
    label: 'Identifier',
    description: 'IDs you know it',
    icon: ToggleIcon,
    schema: { type: 'id' },
  },
  reference: {
    label: 'Reference',
    description: 'References you know it',
    icon: ToggleIcon,
    schema: { type: 'reference' },
  },
  references: {
    label: 'References',
    description: 'References you know it',
    icon: ToggleIcon,
    schema: { type: 'references' },
  },
  timestamp: {
    label: 'Timestamp',
    description: 'Timestamps you know it',
    icon: ToggleIcon,
    schema: { type: 'timestamp' },
  },
  type: {
    label: 'Type',
    description: 'Types you know it',
    icon: ToggleIcon,
    schema: { type: 'type' },
  },
  text: {
    label: 'Text',
    description: 'Text you know it',
    icon: TextIcon,
    schema: { type: 'text' },
  },
  email: {
    label: 'Email',
    description: 'Emails you know it',
    icon: ToggleIcon,
    schema: {
      type: 'string',
      meta: {
        format: 'email',
      },
    },
  },
}


const templateColors = ['accent', 'babyblue', 'reddish', 'yellow', 'green', 'teal', 'purple', 'mustard']

Object.keys(templates).forEach((key, i) => {
  templates[key].color = `light${templateColors[i % templateColors.length]}`
})