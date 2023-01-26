import { useSchema } from '~/hooks/useSchema'

export const useItemSchema = (id) => {
  const { schema, loading } = useSchema()
  if (loading || !id) {
    return { loading }
  }
  if (id === 'root') {
    // return { schema, type: 'root', ...schema.rootType }
    return { schema, type: 'root', ...schema.types.root }
  } else {
    const type = schema.prefixToTypeMapping[id.substring(0, 2)]
    return { schema, type, ...schema.types[type] }
  }
}
