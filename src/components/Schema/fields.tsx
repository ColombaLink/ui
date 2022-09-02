import React, { ReactNode } from 'react'
import {
  TextIcon,
  EmailIcon,
  ExternalLinkIcon,
  TargetIcon,
  StackIcon,
  EditIcon,
  MarkDownIcon,
  AlignJustifyIcon,
  ReferenceIcon,
  AttachmentIcon,
  CurlyBracesIcon,
  GeoMarkerIcon,
  ModelIcon,
  ListIcon,
  TwentyThreeIcon,
  PercentageIcon,
  ToggleIcon,
  CalendarIcon,
} from '~/icons'

export type FieldData = {
  name: string
  type: string
  description: string
  icon: string | React.ReactNode
  id: string
  color?: string
  template?: { [key: string]: any }
  field?: boolean
  validation?: string // make these typed
}

export const fieldDescriptors: FieldData[] = [
  {
    name: 'Text',
    type: 'text',
    description: 'Text, word, etc.',
    icon: TextIcon,
    id: 'text',
  },
  {
    name: 'Url',
    type: 'url',
    description: 'Field for urls',
    icon: ExternalLinkIcon,
    id: 'url',
  },
  {
    name: 'Email',
    type: 'email',
    description: 'Field for emails',
    icon: EmailIcon,
    id: 'email',
  },
  {
    name: 'Id',
    type: 'id',
    description: 'System field stores unique id of node',
    icon: TargetIcon,
    id: 'id',
  },
  {
    name: 'Type',
    type: 'type',
    description: 'Type api name',
    icon: StackIcon,
    id: 'type',
  },
  {
    name: 'Markdown',
    id: 'markdown',
    type: 'text',
    description: 'Markdown editor',
    validation: 'markdown',
    icon: MarkDownIcon,
  },
  {
    name: 'Rich text',
    type: 'text',
    id: 'richtext',
    description: 'Editor with formatting',
    validation: 'markdown',
    icon: EditIcon,
  },
  {
    name: 'Option list',
    type: 'string',
    id: 'options',
    description: 'A list with specific options (Enum)',
    icon: AlignJustifyIcon,
    validation: 'options', // + meta
  },

  {
    name: 'Reference',
    type: 'reference',
    id: 'reference',
    description: 'Data relations',
    icon: ReferenceIcon,
  },

  {
    name: 'References',
    type: 'references',
    id: 'references',
    description: 'Data relations',
    icon: ReferenceIcon,
  },

  {
    name: 'File',
    type: 'reference',
    id: 'file',
    description: 'Static files',
    icon: AttachmentIcon,
  },
  {
    name: 'Json',
    type: 'json',
    id: 'json',
    description: 'Unstructured data',
    icon: CurlyBracesIcon,
  },
  {
    name: 'Object',
    type: 'object',
    id: 'object',
    description: 'Structured object',
    icon: CurlyBracesIcon,
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
    icon: GeoMarkerIcon,
  },
  {
    name: 'Map',
    type: 'record',
    id: 'map',
    description: 'Key value pairs',
    icon: ModelIcon,
  },
  {
    name: 'Array',
    type: 'array',
    id: 'array',
    description: 'List with things',
    icon: ListIcon,
  },
  {
    name: 'Integer',
    type: 'number',
    id: 'int',
    description: 'A whole number',
    icon: TwentyThreeIcon,
    validation: 'int',
  },
  {
    name: 'Float',
    type: 'number',
    id: 'float',
    description: 'Any number including fractions',
    icon: PercentageIcon,
    validation: 'float',
  },
  {
    name: 'Boolean',
    type: 'boolean',
    id: 'boolean',
    description: 'True or false',
    icon: ToggleIcon,
  },

  {
    name: 'String',
    type: 'string',
    id: 'string',
    description: 'Non internationlized string of characters',
    icon: TextIcon,
  },

  {
    name: 'Set',
    type: 'set',
    id: 'set',
    description: 'Set with numbers or strings',
    icon: StackIcon,
  },
  {
    name: 'Date time',
    type: 'timestamp',
    id: 'timestamp',
    description: 'Date with time',
    icon: CalendarIcon,
  },
  {
    name: 'Created at',
    type: 'timestamp',
    id: 'createdAt',
    description: 'Filled when item gets created',
    icon: CalendarIcon,
    field: true,
  },
  {
    name: 'Updated at',
    type: 'timestamp',
    id: 'updatedAt',
    description: 'Updates on any change',
    icon: CalendarIcon,
    field: true,
  },
]
