import { useQuery } from '@based/react'
import { useItemSchema } from './useItemSchema'
import { useLanguage } from './useLanguage'

const getDescriptors = (fields, meta) => {
  const options = Object.keys(fields).filter((key) => {
    const { type } = fields[key]
    return type === 'string' || type === 'text'
  })

  return meta?.descriptor ? [meta.descriptor, ...options] : options
}

export const useDescriptor = (id) => {
  const schema = useItemSchema(id)
  const { language } = useLanguage()
  const descriptorFields = schema.fields
    ? getDescriptors(schema.fields, schema.meta)
    : []

  console.info(schema.fields, id)

  const { data, loading } = useQuery(schema.fields ? 'db' : null, {
    $id: id,
    $language: language,
    descriptor: {
      $field: descriptorFields,
    },
  })

  return {
    ...schema,
    descriptor: data?.descriptor || '',
    loading: schema.loading || loading,
    descriptorFields,
  }
}