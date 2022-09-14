import { useData, useSchema } from '@based/react'
import React from 'react'
import {
  Page,
  Input,
  Toggle,
  Text,
  Label,
  Badge,
  border,
  Button,
  AddIcon,
} from '~'
import { client } from '..'

const useItemSchema = (id) => {
  const { schema, loading } = useSchema()
  if (loading) {
    return { loading }
  }
  if (id === 'root') {
    return { schema, type: 'root', ...schema.rootType }
  } else {
    const type = schema.prefixToTypeMapping[id.substring(0, 2)]
    return { schema, type, ...schema.types[type] }
  }
}

const Reference = ({ id }) => {
  const { type } = useItemSchema(id)
  return (
    <div
      style={{
        height: 48,
        border: border(1),
        color: 'white',
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        marginBottom: 12,
      }}
    >
      <Badge>{type}</Badge>
      <Text style={{ marginLeft: 8 }}>{id}</Text>
    </div>
  )
}

const References = ({ label, description, value = [], style }) => {
  return (
    <div style={style}>
      <Label
        label={label}
        description={description}
        style={{ marginBottom: 12 }}
      />
      {value.map((id) => (
        <Reference key={id} id={id} />
      ))}
      <Button light icon={AddIcon}>
        Add item
      </Button>
    </div>
  )
}

const SingleReference = ({ label, description, value, style, ...props }) => {
  return (
    <div style={style}>
      <Label
        label={label}
        description={description}
        style={{ marginBottom: 12 }}
      />
      {value ? <Reference id={value} /> : null}{' '}
      <Button light icon={AddIcon}>
        Add {label.toLowerCase()}
      </Button>
    </div>
  )
}

const Id = ({ value, style }) => {
  return (
    <div
      style={{
        ...style,
        order: -1,
      }}
    >
      {value}
    </div>
  )
}

const Type = ({ value, style }) => {
  return (
    <div
      style={{
        ...style,
        order: -1,
        float: 'right',
      }}
    >
      {value}
    </div>
  )
}

const string = {
  default: ({ description, ...props }) => (
    <Input
      {...props}
      maxChars={200}
      descriptionBottom={description}
      indent
      space
    />
  ),
}

const boolean = {
  default: Toggle,
}

const timestamp = {
  default: (props) => <Input {...props} type="number" />,
}

const references = {
  default: References,
}

const reference = {
  default: SingleReference,
}

const components = {
  boolean,
  reference,
  references,
  string,
  text: string,
  timestamp,
}

const EditField = ({ id, meta, type, field, index, language, onChange }) => {
  const { ui, format, description, name } = meta

  const { data } = useData({ $id: id, $language: language, [field]: true })

  const Component = components[type]?.[ui || format || 'default']
  const label = name || `${field[0].toUpperCase()}${field.substring(1)}`

  if (Component === undefined) {
    return (
      <div style={{ order: index }}>
        {label} Missing component for type: {type}
      </div>
    )
  }

  const disabled = field === 'createdAt' || field === 'updatedAt'

  return (
    <Component
      description={description}
      disabled={disabled}
      label={label}
      style={{ order: index, marginBottom: 24 }}
      value={data[field]}
      onChange={(value) => {
        console.log(value)
        onChange({ $language: language, [field]: value })
      }}
    />
  )
}

const Edit = ({ id, onChange }) => {
  const { schema, fields, loading, meta } = useItemSchema(id)

  if (loading) {
    return <>loading...</>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* {fields[meta.descriptor] ||  */}
      {meta.name}:{id}
      {Object.keys(fields).map((field) => {
        const { type, meta } = fields[field]

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
