import { useClient, useData } from '@based/react'
import React, { useRef } from 'react'
import {
  Input,
  Text,
  Label,
  Badge,
  border,
  Button,
  AddIcon,
  Toggle,
  DateTimePicker,
  FileUpload,
  GeoInput,
  useSchemaTypes,
  LoadingIcon,
  ArrayList,
  useLocation,
  color,
} from '~'
import { InputWrapper } from '~/components/Input/InputWrapper'
import { alwaysIgnore } from '~/components/Schema/templates'
import { useItemSchema } from '../hooks/useItemSchema'
import { useDescriptor } from '../hooks/useDescriptor'
import { Dialog, useDialog } from '~/components/Dialog'
import { ContentMain } from '../ContentMain'
import isUrl from 'is-url-superb'
import isEmail from 'is-email'
import { SetList } from '~/components/SetList'
import { ObjectList } from '~/components/ObjectList'
import { RecordList } from '~/components/RecordList'
import { SingleRecordListItem } from '~/components/RecordList/SingleRecordListItem'

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
        marginBottom: 8,
      }}
    >
      <Badge color="text">{type || 'reference'}</Badge>
      <Text style={{ marginLeft: 8 }}>{descriptor}</Text>
    </div>
  )
}

const FileReference = ({
  value,
  label,
  description,
  style,
  onChange,
  multiple,
  meta,
}) => {
  const client = useClient()
  if (value?.mimeType) {
    value.type = value.mimeType
  }

  return (
    <FileUpload
      style={style}
      label={label}
      indent
      descriptionBottom={description}
      space
      multiple={meta.multiple}
      onChange={async (files) => {
        console.log('-->', files)

        const result = await Promise.all(
          files?.map((file) => {
            console.log('file from map', file)
            return client.file(file)
          })
        )

        // console.log('Result->', result)
        // console.log(
        //   'Arraytje toch',
        //   result.map((file) => file?.id)
        // )

        onChange(
          multiple
            ? result.map((file) => file?.id) || { $delete: true }
            : result[0]?.id || { $delete: true }
        )
      }}
      value={value}
    />
  )
}

const References = (props) => {
  const { label, description, value, style, meta } = props

  if (props.meta?.refTypes?.includes('files')) {
    return <FileReference {...props} multiple />
  }

  // console.log('META?', meta)
  // console.log('---> Reference props', props)
  // console.log('-->', meta?.refTypes)

  const { open } = useDialog()
  return (
    <InputWrapper indent style={style} descriptionBottom={description}>
      <Label
        label={label}
        // description={description}
        style={{ marginBottom: 12 }}
      />

      {/* if there are reftypes on the meta */}

      {/* {meta?.refTypes?.length > 0 &&
        meta?.refTypes?.map((ref) => <Reference id={ref} key={ref} />)} */}

      {value?.map((id) => (
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
              <ContentMain
                // label={`Add ${field}`}
                // query={{
                //   filters: [],
                //   target: id,
                //   field,
                // }}
                style={{ height: '100%' }}
              />
            </Dialog>
          )
        }}
      >
        Add item
      </Button>
    </InputWrapper>
  )
}

const SingleReference = (props) => {
  if (props.meta?.refTypes?.includes('file')) {
    return <FileReference {...props} />
  }
  const { label, description, value, style } = props

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

// const text = {
//   default: ({ description, ...props }) => {
//     return <Input {...props} descriptionBottom={description} indent space />
//   },
// }

const object = {
  default: ({ prefix, schema, field, ...props }) => {
    // console.log('object', { prefix })
    const [, setLocation] = useLocation()
    return (
      <ObjectList
        indent
        schema={schema}
        {...props}
        onClick={() => {
          setLocation(`${prefix}.${field}`)
        }}
      />
    )
  },
  geo: ({ description, ...props }) => {
    return (
      <GeoInput
        {...props}
        space
        indent
        descriptionBottom={description}
        mapboxApiAccessToken="pk.eyJ1IjoibmZyYWRlIiwiYSI6ImNra3h0cDhtNjA0NWYyb21zcnBhN21ra28ifQ.m5mqJjuX7iK9Z8JvNNcnfg"
        mapboxStyle="mapbox://styles/nfrade/ckkzrytvp3vtn17lizbcps9ge"
      />
    )
  },
}

const record = {
  default: ({ prefix, field, label, value, description, schema, ...props }) => {
    const [, setLocation] = useLocation()
    return (
      <RecordList
        label={label}
        schema={schema}
        description={description}
        value={value}
        onClick={() => {
          //  console.log('get value back?', value)
          setLocation(`${prefix}.${field}`)
        }}
        {...props}
      />
    )
  },
}

const string = {
  default: ({ description, ...props }) => {
    return (
      <Input
        {...props}
        descriptionBottom={description}
        indent
        space
        noInterrupt
      />
    )
  },
  url: ({ description, meta, onChange, ...props }) => (
    <Input
      {...props}
      descriptionBottom={description}
      indent
      space
      // noInterrupt
      error={(value) => {
        if (!isUrl(value) && value.length > 0) {
          return `Please enter a valid url https://...`
        }
      }}
      onChange={(value) => {
        if (meta.format === 'url') {
          if (isUrl(value) || value.length < 1) {
            onChange(value)
          }
        }
      }}
    />
  ),
  email: ({ description, meta, onChange, ...props }) => {
    return (
      <Input
        {...props}
        maxChars={200}
        descriptionBottom={description}
        indent
        space
        //  noInterrupt
        error={(value) => {
          if (!isEmail(value) && value.length > 0) {
            return `Please enter a valid email-address`
          }
        }}
        onChange={(value) => {
          if (meta.format === 'email') {
            if (isEmail(value) || value.length < 1) {
              onChange(value)
            }
          }
        }}
      />
    )
  },
  markdown: ({ description, ...props }) => {
    return (
      <Input
        {...props}
        descriptionBottom={description}
        space
        indent
        markdownInput
        //    noInterrupt
      />
    )
  },
}

const number = {
  default: ({ description, ...props }) => {
    return (
      <Input
        {...props}
        descriptionBottom={description}
        indent
        //   noInterrupt
        space
        type="number"
      />
    )
  },
}

const float = {
  default: ({ description, ...props }) => {
    return (
      <Input
        {...props}
        descriptionBottom={description}
        space
        //   noInterrupt
        type="number"
        indent
        //  onChange={(e) => console.log(typeof e)}
      />
    )
  },
}

const int = {
  default: ({ description, ...props }) => {
    return (
      <Input
        {...props}
        descriptionBottom={description}
        space
        // integer
        //    noInterrupt
        type="number"
        indent
      />
    )
  },
}

const digest = {
  default: ({ description, ...props }) => {
    // TODO make it type: digest
    return (
      <Input {...props} descriptionBottom={description} indent digest space />
    )
  },
}

const boolean = {
  default: ({ description, ...props }) => {
    return <Toggle indent descriptionBottom={description} space {...props} />
  },
}

const timestamp = {
  default: ({ description, ...props }) => (
    <DateTimePicker
      descriptionBottom={description}
      indent
      {...props}
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

const json = {
  default: ({ description, ...props }) => {
    return (
      <Input
        {...props}
        descriptionBottom={description}
        space
        indent
        jsonInput
      />
    )
  },
}

const array = {
  default: ({ description, onChange, ...props }) => {
    return (
      <ArrayList
        {...props}
        description={description}
        onChange={onChange}
        indent
        space
      />
    )
  },
}

const set = {
  default: ({ description, onChange, ...props }) => {
    return (
      <SetList
        description={description}
        onChange={onChange}
        indent
        space
        {...props}
      />
    )
  },
}

const components = {
  boolean,
  reference,
  references,
  string,
  number,
  float,
  int,
  digest,
  object,
  text: string,
  markdown: string,
  timestamp,
  json,
  array,
  set,
  record,
}

const ContentField = ({
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
  const { ui, format, description, name, refTypes } = schema.meta
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

  const { data, loading } = useData(targetId ? query : null)

  if (!loading) {
    dataRef.current = path.reduce((data, field) => data[field] || {}, data)
    // console.log(dataRef.current)
  }

  // console.log('-', field, JSON.stringify({ schema, query, data }, null, 2))

  const Component =
    components[type]?.[ui || format || 'default'] || components[type]?.default

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
        // if (value === '') {
        //   value = { $delete: true }
        // }
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
}) => {
  let fields, loading

  // for record fields
  const targetId = id.split('.')[0]
  const field = id.split('.').pop()

  const query = {
    $id: targetId,
    [field]: true,
  }
  const { data } = useData(targetId ? query : null)

  const insideRecordField = data?.[field]
  let recordValueType

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
        if (fields[lastPartOfId].type === 'record') {
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
    const s = useSchemaTypes()
    loading = s.loading
    if (!loading) {
      fields = s.types[type].fields
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', ...style }}>
      {/* Als het een record is */}
      {type === 'record' && insideRecordField && (
        <div style={{ marginBottom: 24 }}>
          {Object.keys(insideRecordField).map((ObjKey, idx) => (
            <SingleRecordListItem
              key={idx}
              index={idx}
              objectKey={ObjKey}
              objectValue={insideRecordField[ObjKey]}
              onChange={onChange}
              object={insideRecordField}
            />
          ))}
          <Button ghost icon={AddIcon} style={{ marginTop: 12 }}>
            Add {recordValueType || 'key value pair'}
          </Button>
        </div>
      )}

      {/* mapt over de fields in de object */}
      {fields &&
        Object.keys(fields).map((field) => {
          const fieldSchema = fields[field]
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
