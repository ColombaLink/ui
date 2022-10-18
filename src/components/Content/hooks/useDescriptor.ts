import { useData } from '@based/react'
import { useItemSchema } from '../hooks/useItemSchema'
import { useLanguage } from '../hooks/useLanguage'

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
  const { data, loading } = useData(
    schema.loading
      ? null
      : {
          $id: id,
          $language: language,
          descriptor: {
            $field: getDescriptors(schema.fields, schema.meta),
          },
        }
  )

  return {
    ...schema,
    descriptor: data.descriptor || id,
    loading: schema.loading || loading,
  }
}
