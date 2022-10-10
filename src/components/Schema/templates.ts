import { Color } from '~/types'
import {
  TextIcon,
  AddIcon,
  ExternalLinkIcon,
  ModelIcon,
  AttachmentIcon,
  CalendarIcon,
  ToggleIcon,
  ListIcon,
  TwentyThreeIcon,
  LockIcon,
  EmailIcon,
} from '~/icons'

export const systemFields = new Set([
  'id',
  'type',
  'children',
  'parents',
  'createdAt',
  'updatedAt',
])
export const alwaysIgnore = new Set(['descendants', 'ancestors', 'aliases'])

export type FieldTemplates =
  | 'array'
  | 'boolean'
  | 'dateTime'
  | 'email'
  | 'file'
  | 'float'
  | 'id'
  | 'int'
  | 'markdown'
  | 'number'
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
    categoryTitle?: string
    description: string
    color?: Color
    hidden?: boolean
    icon: any
    schema: {
      type: string
      properties?: object
      items?: object
      meta?: {
        format?: 'url' | 'email'
      }
    }
  }
} = {
  // keys have to represent types or formats TODO add ts

  string: {
    categoryTitle: 'Text and String',
    label: 'String',
    color: 'lightaccent',
    description: 'String is nice',
    icon: TextIcon,
    schema: { type: 'string' },
  },

  markdown: {
    label: 'Markdown',
    color: 'lightaccent',
    description: 'Markdown is fancy',
    icon: AddIcon,
    schema: { type: 'string' },
  },
  text: {
    label: 'Text',
    description: 'Text you know it',
    color: 'lightaccent',
    icon: TextIcon,
    schema: { type: 'text' },
  },
  digest: {
    label: 'Digest',
    color: 'lightaccent',
    description: 'Digests you know it',
    icon: LockIcon,
    schema: { type: 'digest' },
  },

  email: {
    categoryTitle: 'Rich formatted data',
    label: 'Email',
    color: 'lightbabyblue',
    description: 'Emails you know it',
    icon: EmailIcon,
    schema: {
      type: 'string',
      meta: {
        format: 'email',
      },
    },
  },
  url: {
    label: 'URL',
    color: 'lightbabyblue',
    description: 'Url is cool',
    icon: ExternalLinkIcon,
    schema: { type: 'string' },
  },

  dateTime: {
    categoryTitle: 'Plain formatted data',
    label: 'Date-Time',
    color: 'lightteal',
    description: 'Dates and times',
    icon: CalendarIcon,
    schema: { type: 'timestamp' },
  },
  timestamp: {
    label: 'Timestamp',
    color: 'lightteal',
    description: 'Timestamps you know it',
    icon: CalendarIcon,
    schema: { type: 'timestamp' },
  },
  boolean: {
    label: 'Boolean',
    color: 'lightteal',
    description: 'Booleans you know it',
    icon: ToggleIcon,
    schema: { type: 'boolean' },
  },

  reference: {
    categoryTitle: 'References and files',
    label: 'Reference',
    color: 'lightpurple',
    description: 'References you know it',
    icon: ToggleIcon,
    schema: { type: 'reference' },
  },
  references: {
    label: 'References',
    color: 'lightpurple',
    description: 'References you know it',
    icon: ToggleIcon,
    schema: { type: 'references' },
  },
  file: {
    label: 'File',
    color: 'lightpurple',
    description: 'Files are handy',
    icon: AttachmentIcon,
    schema: {
      type: 'reference',
      meta: {
        refTypes: ['file'],
      },
    },
  },

  array: {
    categoryTitle: 'Complex data structures',
    label: 'Array',
    color: 'lightyellow',
    description: 'Arrays is nice',
    icon: ListIcon,
    schema: { type: 'array' },
  },

  object: {
    label: 'Object',
    color: 'lightyellow',
    description: 'Objects are sublime',
    icon: ModelIcon,
    schema: { type: 'object', properties: {} },
  },

  number: {
    categoryTitle: 'Numbers',
    label: 'Number',
    color: 'lightred',
    description: 'Numbers you know it',
    icon: TwentyThreeIcon,
    schema: { type: 'number' },
  },
  int: {
    label: 'Integer',
    color: 'lightred',
    description: 'Integers you know it',
    icon: TwentyThreeIcon,
    schema: { type: 'int' },
  },
  float: {
    label: 'Float',
    color: 'lightred',
    description: 'Floats you know it',
    icon: TwentyThreeIcon,
    schema: { type: 'float' },
  },
  id: {
    hidden: true,
    label: 'Identifier',
    description: 'IDs you know it',
    icon: ToggleIcon,
    schema: { type: 'id' },
  },

  type: {
    hidden: true,
    label: 'Type',
    description: 'Types you know it',
    icon: ToggleIcon,
    schema: { type: 'type' },
  },
}

const templateColors = [
  'accent',
  'babyblue',
  'yellow',
  'green',
  'red',
  'teal',
  'purple',
  'mustard',
  'reddish',
]

// Object.keys(templates).forEach((key, i) => {
//   templates[key].color = `light${templateColors[i % templateColors.length]}`
// })
