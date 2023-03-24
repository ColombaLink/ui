import { useQuery } from '@based/react'
import { useItemSchema } from './useItemSchema'
import { useLanguage } from './useLanguage'

const getThumbnails = (fields, meta) => {
  const options = Object.keys(fields).filter((key) => {
    //  console.log(fields[key])
    const { type } = fields[key]
    return type === 'string' || type === 'text'
  })

  return meta?.name.thumb ? [meta.thumbnails, ...options] : options
}

export const useThumbnail = (id) => {
  const schema = useItemSchema(id)
  const { language } = useLanguage()
  const thumbFields = schema.fields
    ? getThumbnails(schema.fields, schema.meta)
    : []

  //   console.log(thumbFields, 'thumbFields')

  const { data, loading } = useQuery(
    'db',
    schema.fields
      ? {
          $id: id,
          $language: language,
          src: {
            $field: 'file',
          },
        }
      : null
  )

  //   console.log(data, 'data')

  return {
    ...schema,
    thumbnails: data.src || '-',
    loading: schema.loading || loading,
    thumbFields,
  }
}
