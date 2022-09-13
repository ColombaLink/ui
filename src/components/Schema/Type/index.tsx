import React, { FC } from 'react'
import { NoType } from './NoType'
import { Type as TypeSelected } from './Type'

export const Type: FC<{
  hrefPrefix: string
  type: string
  db: string
}> = ({ hrefPrefix, type, db }) => {
  return type ? (
    <TypeSelected hrefPrefix={hrefPrefix} type={type} db={db} />
  ) : (
    <NoType hrefPrefix={hrefPrefix} />
  )
}
