import { text } from './text'
import { numbers } from './number'
import { Field } from '../types'
export * from '../types'

export const groups = {
  'Text and String': text,
  Numbers: numbers,
}

export const templates: {
  [key: string]: Field
} = {}

for (const group in groups) {
  for (const template in groups[group]) {
    templates[template] = groups[group][template]
  }
}

export const systemFields = new Set([
  'id',
  'type',
  'children',
  'parents',
  'createdAt',
  'updatedAt',
])

export const alwaysIgnore = new Set(['descendants', 'ancestors', 'aliases'])

// const items = {
//     'Text and String': {
//       string,
//       text,
//       markdown,
//       digest,
//     },

//     'Plain formatted data': {
//       dateTime,
//       timestamp,
//       createdBy,
//       boolean,
//     },
//     'Numbers and ID': {
//       number,
//       float,
//       int,
//       bytes,
//     },
//     'Rich formatted data': {
//       email,
//       url,
//       geo,
//     },
//     'References and files': {
//       reference,
//       references,
//       file,
//       // files,
//     },

//     'Complex data structures': {
//       array,
//       object,
//       record,
//       set,
//       json,
//     },
//   }
