import { useQuery } from '@based/react'
import React, { useRef } from 'react'
import { useSchema, LoadingIcon } from '~'
import { alwaysIgnore } from '~/apps/Schema/templates'
import { useItemSchema } from '../hooks/useItemSchema'
import { RecordPage } from '~/components/RecordList/RecordPage'
import * as components from './fieldComponents'

const ContentField = ({
  inputGood,
  id,
  type,
  schema,
  field,
  index,
  language,
  onChange,
  autoFocus,
  prefix,
}) => {
  const { format, description, name, refTypes } = schema.meta
  const dataRef = useRef<any>()
  const isText = type === 'text'
  const [targetId, ...path] = id?.split('.') || []

  const query = {
    $id: targetId,
  }

  let target = query
  path.forEach((field) => {
    target[field] = {}
    target = target[field]
  })

  target[field] = refTypes?.includes('file')
    ? {
        mimeType: true,
        name: true,
        src: true,
        id: true,
      }
    : isText
    ? { [language]: true }
    : true

  const { data, loading } = useQuery(targetId ? 'db' : null, query)

  if (!loading) {
    dataRef.current = path.reduce((data, field) => data[field] || {}, data)
  }

  const Component =
    components[type]?.[format || 'default'] || components[type]?.default

  if (format && !components[type][format]) {
    // TODO: if we feel its complete remove this log!
    console.warn(
      'No special field component defined for ',
      type,
      format,
      ' is this correct?'
    )
  }

  if (
    field === 'createdAt' ||
    field === 'updatedAt' ||
    alwaysIgnore.has(field)
  ) {
    return null
  }

  if (Component === undefined) {
    return (
      <div style={{ order: index }}>
        {name} Missing component for type: {type}
      </div>
    )
  }

  return (
    <Component
      onClick={() => inputGood()}
      // TODO is this ok? why do we neeed? otherwise we have to handle nested objects here as well
      // id={targetId}
      prefix={prefix}
      description={description}
      label={name}
      field={field}
      schema={schema}
      meta={schema.meta}
      style={{ order: index, marginBottom: 24 }}
      value={
        isText ? dataRef.current?.[field]?.[language] : dataRef.current?.[field]
      }
      autoFocus={autoFocus}
      onChange={(value) => {
        if (isText) {
          onChange({ $language: language, [field]: value })
        } else {
          onChange({ [field]: value })
        }
      }}
    />
  )
}

export const ContentEditor = ({
  id,
  type,
  onChange,
  style = null,
  autoFocus = null,
  language = 'en',
  prefix = '',
  inputGood,
}) => {
  let fields, loading, recordValueType

  if (id) {
    if (id.includes('.')) {
      // im dealing with nested fields
      const [pathId, ...path] = id.split('.')
      const s = useItemSchema(pathId)

      loading = s.loading
      fields = s.fields

      // if it is a record
      if (fields && id) {
        const lastPartOfId = id.split('.').pop()
        if (fields[lastPartOfId]?.type === 'record') {
          recordValueType = fields[lastPartOfId].values.type
          type = 'record'
        }
      }

      if (fields) {
        path.forEach((field) => {
          if (field in fields) {
            const { properties, items, values } = fields[field]
            // TODO also make for object in array, record, etc
            fields = items?.properties || values?.properties || properties
          }
        })
        const onChangeProp = onChange

        onChange = (val) => {
          const setObj = path.reduceRight((val, field) => {
            return {
              [field]: val,
            }
          }, val)
          onChangeProp(setObj)
        }
      }
    } else {
      const s = useItemSchema(id)
      fields = s.fields
      loading = s.loading
    }
  } else {
    const s = useSchema()
    loading = s.loading
    if (!loading) {
      fields = s.schema.types[type].fields
    }
  }

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...style,
        }}
      >
        <LoadingIcon />
      </div>
    )
  }

  if (type === 'record') {
    return (
      <RecordPage
        fields={fields}
        id={id}
        onChange={onChange}
        recordValueType={recordValueType}
        style={style}
      />
    )
  }

  console.log('asdasdasd', inputGood)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', ...style }}>
      {fields &&
        Object.keys(fields).map((field) => {
          const fieldSchema = fields[field]
          const { type, meta } = fields[field]
          // console.log('meta', fields[field].meta)

          if (
            type === 'id' ||
            type === 'type' ||
            meta === undefined ||
            meta.hidden
          ) {
            return null
          }

          const index = meta.index

          return (
            <ContentField
              inputGood={inputGood}
              prefix={`${prefix}/${id}`}
              autoFocus={autoFocus === field}
              field={field}
              id={id}
              index={index}
              key={field}
              schema={fieldSchema}
              type={type}
              onChange={onChange}
              language={language}
            />
          )
        })}
    </div>
  )
}
