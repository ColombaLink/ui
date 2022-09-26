import { useSchema } from '@based/react'

export const useSchemaTypes = () => {
  const res = useSchema()

  return {
    ...res,
    types: res.loading
      ? {}
      : {
          ...res.schema.types,
          root: res.schema.rootType,
        },
  }
}
