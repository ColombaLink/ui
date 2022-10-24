import { useClient, useData } from '@based/react'
import React, { useRef, useState } from 'react'
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
  GeoInput,
} from '~'
import { InputWrapper } from '~/components/Input/InputWrapper'
import { alwaysIgnore } from '~/components/Schema/templates'
import { useItemSchema } from '../hooks/useItemSchema'
import { useDescriptor } from '../hooks/useDescriptor'
import { Dialog, useDialog } from '~/components/Dialog'
import { ContentMain } from '../ContentMain'
// import isUrl from 'is-url-superb'
import isEmail from 'is-email'
import { validatePassword, url as isUrl } from '@saulx/validators'

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

const FileReference = ({
  value,
  label,
  description,
  style,
  onChange,
  multiple,
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
      multiple={multiple}
      onChange={async (files) => {
        console.log('-->', files)

        const result = await Promise.all(
          files.map((file) => {
            console.log('file from map', file)
            return client.file(file)
          })
        )

        // console.log('The result -->', result)
        // console.log(
        //   'Test this -->',
        //   result.map((file) => file?.id)
        // )

        console.log(result)

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
  const { label, description, value, style } = props

  if (props.meta?.refTypes?.includes('files')) {
    return <FileReference {...props} multiple />
  }

  const { open } = useDialog()
  return (
    <InputWrapper indent style={style}>
      <Label
        label={label}
        description={description}
        style={{ marginBottom: 12 }}
      />
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
              <ContentMain style={{ height: '100%' }} />
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
  url: ({ description, meta, onChange, ...props }) => (
    <Input
      {...props}
      maxChars={200}
      descriptionBottom={description}
      indent
      space
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
  email: ({ description, meta, onChange, ...props }) => (
    <Input
      {...props}
      maxChars={200}
      descriptionBottom={description}
      indent
      space
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
  ),
}

const number = {
  default: ({ description, ...props }) => {
    return (
      <Input
        {...props}
        descriptionBottom={description}
        indent
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
        integer
        type="number"
        indent
      />
    )
  },
}

const digest = {
  default: ({ description, onChange, ...props }) => {
    const [show, setShow] = useState(true)
    return (
      <Input
        {...props}
        descriptionBottom={description}
        indent
        space
        type={show ? 'password' : 'text'}
        // error={(value) => {
        //   if (validatePassword(value)) {
        //     return 'is valid password?'
        //   }
        // }}
        //  onChange={(e) => e.preventDefault()}
        onFocus={() => setShow(false)}
        onBlur={(e) => {
          setShow(true)
          //  console.log('ON BLur', e)
          if (validatePassword(e.target.value)) {
            onChange(e.target.value)
          }
          //  Change the border color back as well
        }}
      />
    )
  },
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

const geo = {
  default: ({ description, ...props }) => {
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
  number,
  float,
  int,
  digest,
  geo,
  text: string,
  timestamp,
}

const ContentField = ({ id, meta, type, field, index, language, onChange }) => {
  const { ui, format, description, name, refTypes } = meta

  const { data } = useData({
    $id: id,
    $language: language,
    [field]: refTypes?.includes('file')
      ? {
          mimeType: true,
          name: true,
          src: true,
          id: true,
        }
      : true,
  })
  const Component =
    components[type]?.[ui || format || 'default'] || components[type]?.default
  const label = name // || `${field[0].toUpperCase()}${field.substring(1)}`

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
        //  console.log('nhbj the value uit onchange', value)
        // console.log('Type of value -->', typeof value)

        onChange({ $language: language, [field]: value })
        // }
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
