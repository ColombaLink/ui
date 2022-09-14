// export type FieldData = {
//   name: string
//   type: string
//   description: string
//   icon: string
//   id: string
//   color?: string
//   template?: { [key: string]: any }
//   field?: boolean
//   validation?: string // TODO make these typed
// }

import { ReactElement } from 'react'
import {
  TextIcon,
  AddIcon,
  ExternalLinkIcon,
  ModelIcon,
  AttachmentIcon,
  CalendarIcon,
} from '~/icons'
import { Color } from '~/types'

// export type Field = {
//   type: string
//   // TODO fix this in based
//   meta?: any
//   properties?: any
//   values?: any
//   items?: any
// }

export const systemFields = new Set(['id', 'type', 'children', 'parents'])
export const alwaysIgnore = new Set(['descendants', 'ancestors', 'aliases'])
export const templates: {
  [template: string]: {
    label: string
    description: string
    color: Color
    icon: any
  }
} = {
  // keys have to represent types or formats TODO add ts
  dateTime: {
    label: 'Date-Time',
    description: 'Dates and times the 4th dimension',
    icon: CalendarIcon,
    color: 'lightyellow',
  },
  string: {
    label: 'String',
    description: 'String is nice',
    icon: TextIcon,
    color: 'lightyellow',
  },
  object: {
    label: 'Object',
    description: 'Objects are sublime',
    icon: ModelIcon,
    color: 'lightbabyblue',
  },
  url: {
    label: 'URL',
    description: 'Url is cool',
    icon: ExternalLinkIcon,
    color: 'lightgreen',
  },
  markdown: {
    label: 'Markdown',
    description: 'Markdown is fancy',
    icon: AddIcon,
    color: 'lightyellow',
  },
  file: {
    label: 'File',
    description: 'Files are handy',
    icon: AttachmentIcon,
    color: 'lightred',
  },
}

// const systemFieldData: FieldData = {
//   name: 'system',
//   type: 'type',
//   description: 'System field',
//   icon: 'IconText',
//   id: 'system',
// }
/*

export const fieldDescriptors: FieldData[] = [
  {
    name: 'Text',
    type: 'text',
    description: 'Text, word, etc.',
    icon: 'IconText',
    id: 'text',
  },
  {
    name: 'Url',
    type: 'url',
    description: 'Field for urls',
    icon: 'IconLink',
    id: 'url',
  },
  {
    name: 'Email',
    type: 'email',
    description: 'Field for emails',
    icon: 'IconEmail',
    id: 'email',
  },
  {
    name: 'Id',
    type: 'id',
    description: 'System field stores unique id of node',
    icon: 'IconTarget',
    id: 'id',
  },
  {
    name: 'Type',
    type: 'type',
    description: 'Type api name',
    icon: 'IconLayers',
    id: 'type',
  },
  {
    name: 'Markdown',
    id: 'markdown',
    type: 'text',
    description: 'Markdown editor',
    validation: 'markdown',
    icon: 'IconMarkdown',
  },
  {
    name: 'Rich text',
    type: 'text',
    id: 'richtext',
    description: 'Editor with formatting',
    validation: 'markdown',
    icon: 'IconEdit',
  },
  {
    name: 'Option list',
    type: 'string',
    id: 'options',
    description: 'A list with specific options (Enum)',
    icon: 'IconAlignJustify',
    validation: 'options', // + meta
  },

  {
    name: 'Reference',
    type: 'reference',
    id: 'reference',
    description: 'Data relations',
    icon: 'IconReference',
  },

  {
    name: 'References',
    type: 'references',
    id: 'references',
    description: 'Data relations',
    icon: 'IconReference',
  },

  {
    name: 'File',
    type: 'reference',
    id: 'file',
    description: 'Static files',
    icon: 'IconAttachment',
  },
  {
    name: 'Json',
    type: 'json',
    id: 'json',
    description: 'Unstructured data',
    icon: 'IconJson',
  },
  {
    name: 'Object',
    type: 'object',
    id: 'object',
    description: 'Structured object',
    icon: 'IconJson',
  },
  {
    name: 'Geo',
    type: 'object',
    id: 'geo',
    template: {
      type: 'object',
      meta: { id: 'geo' },
      properties: {
        long: { type: 'float' },
        lat: { type: 'float' },
        // optional
        // country: { type: "string", meta: "country-iso" },
        //optional
        // region: { type: "string", meta: "region-iso" },
      },
    },
    description: 'Geo coordinates',
    icon: 'IconGrid',
  },
  {
    name: 'Map',
    type: 'record',
    id: 'map',
    description: 'Key value pairs',
    icon: 'IconModel',
  },
  {
    name: 'Array',
    type: 'array',
    id: 'array',
    description: 'List with things',
    icon: 'IconAlignJustify',
  },
  {
    name: 'Integer',
    type: 'number',
    id: 'int',
    description: 'A whole number',
    icon: 'IconInteger',
    validation: 'int',
  },
  {
    name: 'Float',
    type: 'number',
    id: 'float',
    description: 'Any number including fractions',
    icon: 'IconFloat',
    validation: 'float',
  },
  {
    name: 'Boolean',
    type: 'boolean',
    id: 'boolean',
    description: 'True or false',
    icon: 'IconBoolean',
  },

  {
    name: 'String',
    type: 'string',
    id: 'string',
    description: 'Non internationlized string of characters',
    icon: 'IconText',
  },

  {
    name: 'Set',
    type: 'set',
    id: 'set',
    description: 'Set with numbers or strings',
    icon: 'IconLayers',
  },
  {
    name: 'Date time',
    type: 'timestamp',
    id: 'timestamp',
    description: 'Date with time',
    icon: 'IconCal',
  },
  {
    name: 'Created at',
    type: 'timestamp',
    id: 'createdAt',
    description: 'Filled when item gets created',
    icon: 'IconCal',
    field: true,
  },
  {
    name: 'Updated at',
    type: 'timestamp',
    id: 'updatedAt',
    description: 'Updates on any change',
    icon: 'IconCal',
    field: true,
  },
]

export const fieldDescriptorsById: { [key: string]: FieldData } = {}
export const getFieldStyle = (field: Field, fieldName?: string): FieldData => {
  const id = field.meta?.id

  if (id) {
    const f = fieldDescriptorsById[id]
    if (f) {
      return f
    }
  }

  if (fieldName && fieldDescriptorsById[fieldName]) {
    return fieldDescriptorsById[fieldName]
  }

  const metaName = field.meta?.name

  if (metaName) {
    const f = fieldDescriptors.find((f) => f.name === metaName)
    if (f) {
      return f
    }
  }

  let t = field.type

  if (t === 'references') {
    t = 'reference'
  }

  if (fieldDescriptorsById[t]) {
    return fieldDescriptorsById[t]
  }

  const f = fieldDescriptors.find((f) => f.type === t)
  if (f) {
    return f
  }

  const validation = field.meta?.validation

  if (validation) {
    const f = fieldDescriptors.find((f) => f.validation === validation)
    if (f) {
      return f
    }
  }

  return systemFieldData
}
*/
