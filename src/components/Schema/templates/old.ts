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
  IdIcon,
  UserIcon,
  ChildrenIcon,
  IntegerIcon,
  CalculatorIcon,
  SquareBracketsIcon,
  CurlyBracesIcon,
  DocIcon,
  JsonIcon,
  SetIcon,
  ToggleIcon,
} from '~/icons'
import { Field } from '../types'

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

export const templates: {
  [K in FieldTemplates]: Field
} = {
  // keys have to represent types or formats TODO add ts

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
  geo: {
    label: 'Geo',
    color: 'lightbabyblue',
    description: 'Geo coordinates',
    icon: GeoMarkerIcon,
    schema: {
      type: 'object',
      meta: {
        format: 'geo',
      },
      properties: {
        lat: { type: 'float' },
        lng: { type: 'float' },
      },
    },
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
    icon: ToggleIcon,
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
    description: 'References ',
    icon: ChildrenIcon,
    schema: { type: 'references' },
  },
  file: {
    label: 'File',
    color: 'lightyellow',
    description: 'File or Files upload',
    icon: AttachmentIcon,
    schema: {
      type: 'reference',
      meta: {
        format: 'file',
        refTypes: ['file'],
      },
    },
  },
  files: {
    label: 'Files',
    color: 'lightyellow',
    description: 'Multiple files',
    icon: AttachmentIcon,
    schema: {
      type: 'references',
      meta: {
        format: 'files',
        refTypes: ['files'],
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
    schema: { type: 'array', items: {} },
  },
  set: {
    label: 'Set',
    color: 'lightorange',
    description: 'A collection of unique values',
    icon: SetIcon,
    schema: { type: 'set', items: {} },
  },
  object: {
    label: 'Object',
    color: 'lightorange',
    description: 'Multiple types',
    icon: CurlyBracesIcon,
    schema: { type: 'object', properties: {} },
  },
  record: {
    label: 'Record',
    color: 'lightorange',
    description: 'A fixed collection of fields',
    icon: DocIcon,
    schema: { type: 'record', values: {} },
  },
  json: {
    label: 'JSON',
    color: 'lightorange',
    description: 'A JSON object',
    icon: JsonIcon,
    schema: { type: 'json' },
  },
  id: {
    label: 'Identifier',
    color: 'lightgrey',
    description: 'IDs you know it',
    icon: IdIcon,
    schema: { type: 'id' },
  },
  type: {
    label: 'Type',
    color: 'lightgrey',
    description: 'Types you know it',
    icon: ListIcon,
    schema: { type: 'type' },
  },
}
