import React, { FC } from 'react'
import { AddFieldModalGeneral } from './General'
import { AddFieldModalReference } from './Reference'
import { templates } from '../templates'

export const AddFieldModal: FC<{
  template: string
  type: string
}> = ({ template, type }) => {
  const { schema } = templates[template]
  const isRef =
    (schema.type === 'reference' || schema.type === 'references') &&
    template !== 'file'

  return isRef ? (
    <AddFieldModalReference type={type} template={template} />
  ) : (
    <AddFieldModalGeneral template={template} type={type} />
  )
}
