import { useData, useSchema } from '@based/react'
import React from 'react'
import { Page, Input, Toggle } from '~'
import { client } from '..'

const string = {
  default: Input,
}

const boolean = {
  default: Toggle,
}

const components = {
  boolean,
  string,
  text: string,
}

const EditField = ({ id, meta, type, field, index, language, onChange }) => {
  const { ui, format, description, name } = meta
  const { data } = useData({ $id: id, $language: language, [field]: true })
  const Component = components[type]?.[ui || format || 'default']
  const label = name || `${field[0].toUpperCase()}${field.substring(1)}`

  if (Component === undefined) {
    return (
      <div
        style={{
          order: index,
        }}
      >
        {label} Missing component for type: {type}
      </div>
    )
  }

  return (
    <Component
      label={label}
      description={description}
      value={data[field]}
      style={{ order: index, marginBottom: 24 }}
      onChange={(value) => {
        console.log(value)
        // onChange({ $language: language, [field]: value })
      }}
    />
  )
}

const Edit = ({ id, onChange }) => {
  const { schema } = useSchema()
  const prefix = id.substring(0, 2)
  const type = schema.prefixToTypeMapping?.[prefix]

  if (!type) {
    return <>loading...</>
  }

  const { fields } = schema.types[type]

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {Object.keys(fields).map((field) => {
        const { type, meta } = fields[field]
        const index = meta?.index

        if (index === undefined) {
          return null
        }

        return (
          <EditField
            field={field}
            id={id}
            index={index}
            key={field}
            meta={meta}
            type={type}
            onChange={onChange}
            language={schema.languages[0] || 'en'}
          />
        )
      })}
    </div>
  )
}

export const ContentEditor = () => {
  const id = '5060967721'
  return (
    <div style={{ display: 'flex', flexGrow: 1 }}>
      <Page>
        <Edit
          id={id}
          onChange={(data) => {
            return client.set({
              $id: id,
              ...data,
            })
          }}
        />
      </Page>
    </div>
  )
}
