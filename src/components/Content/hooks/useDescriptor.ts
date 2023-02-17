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
  const descriptorFields = schema.fields
    ? getDescriptors(schema.fields, schema.meta)
    : []

  // console.log(descriptorFields, 'descriptorFields')

  const { data, loading } = useData(
    schema.fields
      ? {
          $id: id,
          $language: language,
          descriptor: {
            $field: descriptorFields,
          },
        }
      : null
  )

  return {
    ...schema,
    descriptor: data.descriptor || '',
    loading: schema.loading || loading,
    descriptorFields,
  }
}
