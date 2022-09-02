import React from 'react'
import { Dialog } from '~'
import { AddFieldModalGeneral } from './General'
import { AddFieldModalReference } from './Reference'

export const AddFieldModal = ({ fieldData }) => {
  const isRef =
    (fieldData.type === 'reference' || fieldData.type === 'references') &&
    fieldData.id !== 'file'

  return isRef ? (
    <AddFieldModalReference
      // field={field}
      type={fieldData.type}
      //   fieldData={fieldData}
      //  envSchema={envSchema}
    />
  ) : (
    <AddFieldModalGeneral
      //  fieldData={fieldData}
      //  envSchema={envSchema}
      //  field={field}
      type={fieldData.type}
    />
  )
}
