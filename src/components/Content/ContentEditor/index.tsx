import { useClient, useData } from '@based/react'
import React from 'react'
import {
  Input,
  Text,
  Label,
  Badge,
  border,
  Button,
  AddIcon,
  RadioButtons,
  DateTimePicker,
  FileUpload,
} from '~'
import { InputWrapper } from '~/components/Input/InputWrapper'
import { alwaysIgnore } from '~/components/Schema/templates'
import { useItemSchema } from '../hooks/useItemSchema'
import { useDescriptor } from '../hooks/useDescriptor'
import { Dialog, useDialog } from '~/components/Dialog'
import { ContentMain } from '../ContentMain'

const Reference = ({ id }) => {
  const { type, descriptor } = useDescriptor(id)

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
      <Badge color="text">{type}</Badge>
      <Text style={{ marginLeft: 8 }}>{descriptor}</Text>
    </div>
  )
}

const References = ({
  label,
  description,
  value = [],
  style,
  onChange,
  ...props
}) => {
  const { open } = useDialog()
  return (
    <>
      {props?.meta?.refTypes?.includes('file') ? (
        <div style={style}>
          <FileUpload
            style={{ background: 'yellow' }}
            label={label}
            indent
            descriptionBottom={description}
            space
            multiple
            props={props}
            onChange={onChange}
            value={value}
          />
        </div>
      ) : (
        <InputWrapper indent style={style}>
          <Label
            label={label}
            description={description}
            style={{ marginBottom: 12 }}
          />
          {value.map((id) => (
            <Reference key={id} id={id} />
          ))}
          <Button
            ghost
            icon={AddIcon}
            onClick={() => {
              open(
                <Dialog
                  padding={0}
                  style={{
                    width: '100vw',
                    height: 'calc(100vh - 60px)',
                  }}
                  pure
                >
                  <ContentMain style={{ height: '100%' }} />
                </Dialog>
              )
            }}
          >
            Add item
          </Button>
        </InputWrapper>
      )}
    </>
  )
}

const SingleReference = ({
  label,
  description,
  onChange,
  value,
  style,
  ...props
}) => {
  return (
    <>
      {props?.meta?.refTypes?.includes('file') ? (
        <div style={style}>
          <FileUpload
            label={label}
            indent
            descriptionBottom={description}
            space
            // multiple
            props={props}
            onChange={onChange}
            value={value}
          />
        </div>
      ) : (
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
      )}
    </>
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
  default: ({ description, ...props }) => {
    return (
      <RadioButtons
        indent
        descriptionBottom={description}
        space
        data={[
          {
            value: true,
            label: 'True',
          },
          {
            value: false,
            label: 'False',
          },
        ]}
        {...props}
      />
    )
  },
}

const timestamp = {
  default: (props) => (
    <DateTimePicker
      indent
      {...props}
      type="number"
      value={props.value}
      error={(value) => {
        if (!value) {
          return 'Please enter a valid value'
        }
      }}
    />
  ),
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

const ContentField = ({ id, meta, type, field, index, language, onChange }) => {
  const { ui, format, description, name } = meta

  // if field === ref && meta restrict === file
  // return { src, name, id }

  // isFiles
  // isFile

  let q: any = true
  if (
    type === 'reference' &&
    meta &&
    meta.refTypes?.length === 1 &&
    meta.refTypes[0] === 'file'
  ) {
    console.log('???')
    q = {
      mimeType: true,
      name: true,
      src: true,
      id: true,
      // $list: true
    }
  }

  const { data } = useData({ $id: id, $language: language, [field]: q })
  const Component = components[type]?.[ui || format || 'default']
  const label = name || `${field[0].toUpperCase()}${field.substring(1)}`

  const client = useClient()

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
        {label} Missing component for type: {type}
      </div>
    )
  }

  return (
    <Component
      description={description}
      label={label}
      meta={meta}
      style={{ order: index, marginBottom: 24 }}
      value={data[field]}
      onChange={(value) => {
        // $file: {}
        console.log('nhbj', value)

        if (Array.isArray(value)) {
          console.log('It is an arraytje !!!')
          client.file(value).then((v) => {
            onChange()
          })
        }

        // vanuit de top

        if (value instanceof File) {
          client.file(value).then((v) => {
            onChange({ [field]: v.id })
          })
        } else {
          onChange({ $language: language, [field]: value })
        }
      }}
    />
  )
}

export const ContentEditor = ({ id, onChange, style = null }) => {
  const { schema, fields, loading, meta } = useItemSchema(id)

  if (loading) {
    return <>loading...</>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', ...style }}>
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
          <ContentField
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
