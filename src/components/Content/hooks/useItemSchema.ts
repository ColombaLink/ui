import { useSchema } from '~/hooks/useSchema'

export const useItemSchema = (id) => {
  const { schema, loading } = useSchema()
  if (loading) {
    return { loading }
  }
  if (id === 'root') {
    return { schema, type: 'root', ...schema.rootType }
  } else {
    const type = schema.prefixToTypeMapping[id.substring(0, 2)]
    return { schema, type, ...schema.types[type] }
  }
}
