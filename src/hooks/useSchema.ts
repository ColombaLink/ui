import { useBasedContext, useSchema as useBasedSchema } from '@based/react'
import { systemFields } from '~/components/Schema/templates'

export const sortFields = (fields) => {
  return Object.keys(fields).sort((a, b) => {
    const indexA = fields[a].meta?.index
    const indexB = fields[b].meta?.index
    if (indexA === undefined) {
      if (indexB === undefined) {
        if (systemFields.has(a)) {
          if (!systemFields.has(b)) {
            return 1
          }
        } else if (systemFields.has(b)) {
          return -1
        }
        return a < b ? -1 : 1
      }
      return 1
    }
    return indexA < indexB ? -1 : 1
  })
}

const addMeta = (obj, key) => {
  if (!('meta' in obj)) {
    obj.meta = {}
  }
  if (!('name' in obj.meta)) {
    obj.meta.name = key
  }
}

const walkField = (obj, key) => {
  addMeta(obj, key)
  const target = obj.items || obj.values || obj
  if (target.properties) {
    target.properties = sortFields(target.properties).reduce(
      (properties, key) => {
        const property = target.properties[key]
        walkField(property, key)
        properties[key] = property
        return properties
      },
      {}
    )
  }
}

const walkType = (obj, key) => {
  addMeta(obj, key)
  // add descriptor here
  if (obj.fields) {
    // sort the fields here
    obj.fields = sortFields(obj.fields).reduce((fields, key) => {
      const field = obj.fields[key]
      walkField(field, key)
      fields[key] = field
      return fields
    }, {})
  }
}

export const useSchema = (db = 'default') => {
  const res = useBasedSchema(db)
  const ctx = useBasedContext() as any

  // console.log(
  //   'res.schema:',
  //   JSON.stringify(res.schema?.rootType?.meta || {}, null, 2)
  // )

  if (!res.loading) {
    if (!('_buiSha' in ctx)) {
      ctx._buiSha = {}
    }
    if (res.schema.sha !== ctx._buiSha[db]) {
      ctx._buiSha[db] = res.schema.sha

      walkType(res.schema.rootType, 'root')
      for (const key in res.schema.types) {
        walkType(res.schema.types[key], key)
      }
    }
  }

  return res
}
