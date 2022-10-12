import { Color } from '~/types'
import {
  TextIcon,
  AddIcon,
  AttachmentIcon,
  CalendarIcon,
  ListIcon,
  TwentyThreeIcon,
  LockIcon,
  EmailIconFilled,
  PenIcon,
  UrlIcon,
  GeoMarkerIcon,
  TimeIcon,
  CheckCircleIcon,
  UserIcon,
  ChildrenIcon,
  IntegerIcon,
  CalculatorIcon,
  SquareBracketsIcon,
  CurlyBracesIcon,
  DocIcon,
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
  | 'createdBy'
  | 'dateTime'
  | 'digest'
  | 'email'
  | 'file'
  | 'float'
  | 'id'
  | 'int'
  | 'map'
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

export const templates: {
  [K in FieldTemplates]: {
    label?: string
    categoryTitle?: string
    description: string
    color?: Color
    hidden?: boolean
    icon: any
    schema: {
      type: string
      properties?: object
      values?: object
      items?: object
      meta?: {
        format?: 'url' | 'email'
      }
    }
  }
} = {
  // keys have to represent types or formats TODO add ts

  string: {
    label: 'String',
    color: 'lightpurple',
    description: 'Non internationalized string',
    icon: TextIcon,
    schema: { type: 'string' },
  },
  markdown: {
    label: 'Markdown',
    color: 'lightpurple',
    description: 'Markdown editor',
    icon: AddIcon,
    schema: { type: 'string' },
  },
  text: {
    label: 'Text',
    description: 'Editor with formatting',
    color: 'lightpurple',
    icon: PenIcon,
    schema: { type: 'text' },
  },
  digest: {
    label: 'Digest',
    color: 'lightpurple',
    description: 'Digests you know it',
    icon: LockIcon,
    schema: { type: 'digest' },
  },

  email: {
    label: 'Email',
    color: 'lightbabyblue',
    description: 'An email address',
    icon: EmailIconFilled,
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
    description: 'A web address',
    icon: UrlIcon,
    schema: {
      type: 'string',
      meta: {
        format: 'url',
      },
    },
  },
  map: {
    label: 'Map',
    color: 'lightbabyblue',
    description: 'Geo coordinates',
    icon: GeoMarkerIcon,
    schema: { type: 'map' },
  },

  dateTime: {
    label: 'Date-Time',
    color: 'lightteal',
    description: 'Dates and timestamp',
    icon: CalendarIcon,
    schema: { type: 'timestamp' },
  },
  timestamp: {
    label: 'Timestamp',
    color: 'lightteal',
    description: 'A digital time record',
    icon: TimeIcon,
    schema: { type: 'timestamp' },
  },
  createdBy: {
    label: 'Created by',
    color: 'lightteal',
    description: 'A record of user',
    icon: UserIcon,
    schema: { type: 'timestamp' },
  },
  boolean: {
    label: 'Boolean',
    color: 'lightteal',
    description: 'True and false',
    icon: CheckCircleIcon,
    schema: { type: 'boolean' },
  },

  reference: {
    label: 'Reference',
    color: 'lightyellow',
    description: 'References you know it',
    icon: ChildrenIcon,
    schema: { type: 'reference' },
  },
  references: {
    label: 'References',
    color: 'lightyellow',
    description: 'References you know it',
    icon: ChildrenIcon,
    schema: { type: 'references' },
  },
  file: {
    label: 'File',
    color: 'lightpink',
    description: 'Files are handy',
    icon: AttachmentIcon,
    schema: {
      type: 'reference',
      meta: {
        refTypes: ['file'],
      },
    },
  },

  number: {
    label: 'Number',
    color: 'lightsailorblue',
    description: 'Numbers you know it',
    icon: TwentyThreeIcon,
    schema: { type: 'number' },
  },
  float: {
    label: 'Float',
    color: 'lightsailorblue',
    description: 'Any number',
    icon: CalculatorIcon,
    schema: { type: 'float' },
  },
  int: {
    label: 'Integer',
    color: 'lightsailorblue',
    description: 'A whole number',
    icon: IntegerIcon,
    schema: { type: 'int' },
  },

  array: {
    label: 'Array',
    color: 'lightorange',
    description: 'A collection of similar types',
    icon: SquareBracketsIcon,
    schema: { type: 'array' },
  },
  object: {
    label: 'Object',
    color: 'lightorange',
    description: 'A collection of multiple types',
    icon: CurlyBracesIcon,
    schema: { type: 'object', properties: {} },
  },
  record: {
    label: 'Record',
    color: 'lightorange',
    description: 'A fixed collection of fields',
    icon: DocIcon,
    schema: { type: 'object', properties: {} },
  },

  id: {
    label: 'Identifier',
    description: 'IDs you know it',
    icon: ListIcon,
    schema: { type: 'id' },
  },

  type: {
    label: 'Type',
    description: 'Types you know it',
    icon: ListIcon,
    schema: { type: 'type' },
  },
}
