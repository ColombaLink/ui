import { useSchema } from './useSchema'

export const useSchemaTypes = () => {
  const res = useSchema()

  return {
    ...res,
    types: res.loading
      ? {}
      : {
          ...res.schema.types,
          // root: res.schema.rootType,
          root: res.schema.types.root,
        },
  }
}
