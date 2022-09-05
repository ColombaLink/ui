import React from 'react'
import { Dialog, useLocation } from '~'
import { AddFieldModalGeneral } from './General'
import { AddFieldModalReference } from './Reference'

import { useSchema, useClient, useData } from '@based/react'

export const AddFieldModal = ({ fieldData }) => {
  const schema = useSchema()
  const client = useClient()
  const data = useData()

  const [location] = useLocation()
  const pathArray = location.split('/')
  const name = pathArray[1]

  console.log('schema', schema)

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
