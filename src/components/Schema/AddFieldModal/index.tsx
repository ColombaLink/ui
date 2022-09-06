import React from 'react'
import { Dialog, useLocation } from '~'
import { AddFieldModalGeneral } from './General'
import { AddFieldModalReference } from './Reference'

export const AddFieldModal = ({ fieldData }) => {
  const [location] = useLocation()
  const pathArray = location.split('/')
  const name = pathArray[1]

  const isRef =
    (fieldData.type === 'reference' || fieldData.type === 'references') &&
    fieldData.id !== 'file'

  return isRef ? (
    <AddFieldModalReference
      // field={field}
      type={name}
      fieldData={fieldData}
      //  envSchema={envSchema}
    />
  ) : (
    <AddFieldModalGeneral
      fieldData={fieldData}
      //  envSchema={envSchema}
      //  field={field}
      type={name}
    />
  )
}
