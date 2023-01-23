import { useClient, useData } from '@based/react'
import React, { useEffect, useRef, useState } from 'react'
import {
  Input,
  Label,
  Button,
  AddIcon,
  EditIcon,
  Toggle,
  DateTimePicker,
  GeoInput,
  useSchemaTypes,
  LoadingIcon,
  ArrayList,
  useLocation,
} from '~'
import { InputWrapper } from '~/components/Input/InputWrapper'
import { alwaysIgnore } from '~/components/Schema/templates'
import { useItemSchema } from '../hooks/useItemSchema'
import { useDialog } from '~/components/Dialog'
import isUrl from 'is-url-superb'
import isEmail from 'is-email'
import { SetList } from '~/components/SetList'
import { ObjectList } from '~/components/ObjectList'
import { RecordList } from '~/components/RecordList'
import { RecordPage } from '~/components/RecordList/RecordPage'
import { Reference } from './References/Reference'
import { FileUploadReference } from './References/FileUploadReference'
import { SelectReferences } from './References/SelectReferences'

const SingleReference = (props) => {
  const client = useClient()

  if (props.meta?.refTypes?.includes('file')) {
    return <FileUploadReference {...props} client={client} />
  }

  // some sort of preview state before publishing
  const [refArray, setRefArray] = useState([])
  const { label, description, value, style, onChange, space = 24 } = props

  const { open, close } = useDialog()

  useEffect(() => {
    if (props.value) {
      setRefArray(Array.from(props.value))
    }
  }, [props.value])

  const onClick = () => {
    open(
      <SelectReferences
        onChange={onChange}
        setRefArray={setRefArray}
        singleRef={true}
        close={close}
      />
    )
  }

  return (
    <InputWrapper
      indent
      style={style}
      descriptionBottom={description}
      space={space}
    >
      <Label
        label={label}
        description={description}
        style={{ marginBottom: 12 }}
      />

      {refArray.length > 0 ? (
        <Reference
          id={props.value || refArray[0]}
          onChange={onChange}
          setRefArray={setRefArray}
          refArray={refArray}
          singleRef
        />
      ) : null}
      <Button ghost icon={AddIcon} onClick={onClick}>
        {value || refArray?.[0] ? 'Change reference' : 'Add reference'}
      </Button>
    </InputWrapper>
  )
}

const References = (props) => {
  const client = useClient()

  const { label, description, value, style, onChange, space = 24 } = props
  const [refArray, setRefArray] = useState([])

  useEffect(() => {
    if (props.value) {
      setRefArray(Array.from(props.value))
    }
  }, [props.value])

  if (props.meta?.refTypes?.includes('files')) {
    return <FileUploadReference {...props} multiple client={client} />
  }

  const { open, close } = useDialog()

  const onClick = () => {
    open(
      <SelectReferences
        onChange={onChange}
        setRefArray={setRefArray}
        close={close}
      />
    )
  }

  return (
    <InputWrapper
      indent
      style={style}
      descriptionBottom={description}
      space={space}
    >
      <Label label={label} style={{ marginBottom: 12 }} />
      {refArray?.map((id) => (
        <Reference
          key={id}
          id={id}
          onChange={onChange}
          setRefArray={setRefArray}
          refArray={refArray}
        />
      ))}
      <Button
        ghost
        icon={value?.length > 0 ? EditIcon : AddIcon}
        onClick={onClick}
      >
        {value?.length > 0 ? 'Change References' : 'Add References'}
      </Button>
    </InputWrapper>
  )
}

const object = {
  default: ({ prefix, schema, field, ...props }) => {
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
        //  noInterrupt
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
    return (
      <Toggle indent descriptionBottom={description} space="48px" {...props} />
    )
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

  //  console.log('schema', schema)

  const query = {
    $id: targetId,
  }
  let target = query
  path.forEach((field) => {
    target[field] = {}
    target = target[field]
  })

  //  console.log('target ', target)

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', ...style }}>
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
