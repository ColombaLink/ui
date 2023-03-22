import { systemFields } from './templates'
import { FieldSchema, TypeSchema } from './types'

export const sortFields = (fields: {
  [key: string]: FieldSchema
}): string[] => {
  return Object.keys(fields).sort((a, b) => {
    const indexA = fields[a].meta?.index
    const indexB = fields[b].meta?.index
    if (indexA === undefined) {
      if (indexB === undefined) {
        if (systemFields.has(a)) {
          if (!systemFields.has(b)) {
            return -1
          }
        } else if (systemFields.has(b)) {
          return 1
        }
        return a < b ? -1 : 1
      }
      return 1
    }
    return indexA < indexB ? -1 : 1
  })
}

export const sortAndFlatten = (fields: {
  [key: string]: FieldSchema
}): string[] => {
  const sortedFields = sortFields(fields)
  for (let i = sortedFields.length - 1; i >= 0; i--) {
    const key = sortedFields[i]
    if (fields[key].type === 'record') {
      const { properties } = fields[key].values
      if (properties) {
        const nested = sortAndFlatten(properties)
        nested.forEach((nestedKey, index) => {
          nested[index] = `${key}.values.properties.${nestedKey}`
        })
        sortedFields.splice(i + 1, 0, ...nested)
      }
    } else if (fields[key].type === 'array') {
      const { properties } = fields[key].items
      if (properties) {
        const nested = sortAndFlatten(properties)
        nested.forEach((nestedKey, index) => {
          nested[index] = `${key}.items.properties.${nestedKey}`
        })
        sortedFields.splice(i + 1, 0, ...nested)
      }
    } else if (fields[key].type === 'object') {
      const nested = sortAndFlatten(fields[key].properties)
      nested.forEach((nestedKey, index) => {
        nested[index] = `${key}.properties.${nestedKey}`
      })
      sortedFields.splice(i + 1, 0, ...nested)
    }
  }
  return sortedFields
}

export const getFields = (
  typeDef: TypeSchema,
  field?: string[]
): { [key: string]: FieldSchema } => {
  let fields: { [key: string]: FieldSchema } = typeDef.fields
  if (!field) {
    return fields
  }
  if (field.length) {
    let n: FieldSchema | { [key: string]: FieldSchema } = fields
    for (const f of field) {
      if (n === undefined) {
        break
      }
      n =
        n.properties?.[f] ||
        n.values?.properties?.[f] ||
        n.items?.properties?.[f] ||
        n?.[f]
    }
    if (n && n.properties) {
      // @ts-ignore
      fields = n.properties
    }
  }
  return fields
}
