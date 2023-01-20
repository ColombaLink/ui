import { useClient, useData } from '@based/react'
import React, { useEffect, useRef, useState } from 'react'
import {
  Input,
  Text,
  Label,
  Badge,
  border,
  Button,
  AddIcon,
  EditIcon,
  Toggle,
  DateTimePicker,
  FileUpload,
  GeoInput,
  useSchemaTypes,
  LoadingIcon,
  ArrayList,
  useLocation,
  InfiniteList,
  Checkbox,
  CheckIcon,
  CopyIcon,
  CloseIcon,
  color,
  MoreIcon,
  DeleteIcon,
  useContextMenu,
  ContextItem,
} from '~'
import { InputWrapper } from '~/components/Input/InputWrapper'
import { alwaysIgnore } from '~/components/Schema/templates'
import { useItemSchema } from '../hooks/useItemSchema'
import { useDescriptor } from '../hooks/useDescriptor'

import { Dialog, useDialog } from '~/components/Dialog'
import isUrl from 'is-url-superb'
import isEmail from 'is-email'
import { SetList } from '~/components/SetList'
import { ObjectList } from '~/components/ObjectList'
import { toDateString } from '~/utils/date'
import { RecordList } from '~/components/RecordList'
import { RecordPage } from '~/components/RecordList/RecordPage'
import { useCopyToClipboard } from '~/hooks'
import { useWindowResize } from '~/hooks/useWindowResize'

import { getImageSrcFromId } from '~/utils/getImageSrcFromId'
import { styled } from 'inlines'
import { getNameFromId } from '~/utils/getNameFromID'

const Reference = ({ id }) => {
  const { type, descriptor } = useDescriptor(id)
  const [copied, copy] = useCopyToClipboard(id)

  const afbThumb = getImageSrcFromId(id)
  const fileName = getNameFromId(id)

  const contextHandler = useContextMenu(
    ContextOptions,
    {
      deleteSpecificRef,
      id,
    },
    { placement: 'right' }
  )

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
      <Badge
        color="text"
        onClick={(id as any) !== 'root' ? (copy as any) : null}
        icon={id !== 'root' ? <CopyIcon /> : null}
      >
        {id}
      </Badge>
      {copied && (
        <div style={{ display: 'flex', marginLeft: 6, marginTop: 4 }}>
          <CheckIcon color="green" />
          <Text size={12}>Copied!!</Text>
        </div>
      )}
      {type === 'file' ? (
        <div
          style={{
            backgroundSize: 'cover',
            backgroundImage: `url(${afbThumb})`,
            minWidth: 44,
            height: 44,
            marginLeft: 12,
            marginRight: 12,
          }}
        />
      ) : null}
      <Text style={{ marginLeft: 12 }}>{type || 'reference'}</Text>
      <Text style={{ marginLeft: 12 }}>{fileName || descriptor}</Text>

      {/* // more icon for removing reference */}
      <div
        style={{
          marginLeft: 'auto',
          width: 24,
          height: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
        onClick={contextHandler}
      >
        <MoreIcon color="text" />
      </div>
    </div>
  )
}

const deleteSpecificRef = (id) => {
  console.log('deleteSpecificRef', id)
}

const ContextOptions = ({
  // handleClickUpload,
  deleteSpecificRef,
  id,
}) => {
  return (
    <>
      <ContextItem onClick={() => deleteSpecificRef(id)} icon={DeleteIcon}>
        Delete
      </ContextItem>
    </>
  )
}

const FileUploadReference = ({
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
        const result = await Promise.all(
          files?.map((file) => {
            return client.file(file)
          })
        )

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

const SelectReferencesItemDescriptor = ({ id }) => {
  const { descriptor, loading } = useDescriptor(id)
  return loading ? null : <Text>{descriptor}</Text>
}

const SelectReferencesItem = ({ style, data, index }) => {
  const item = data.items[index]

  // console.log('item ---->', item)
  // console.log('data --->', data)

  if (!item) {
    return (
      <div
        style={{
          borderBottom: border(1),
          ...style,
        }}
      />
    )
  }
  const checked = data.selected.has(item.id)

  const afbThumb = getImageSrcFromId(item.id)

  console.log('item id', item.id)

  return (
    <div
      style={{
        display: 'flex',
        borderBottom: border(1),
        alignItems: 'center',
        padding: '0 24px',
        ...style,
      }}
    >
      <Checkbox
        checked={checked}
        onChange={() => {
          if (checked) {
            data.selected.delete(item.id)
          } else {
            data.selected.add(item.id)
          }
        }}
      />
      <Badge
        style={{
          marginRight: 16,
          fontFamily: 'monospace',
        }}
      >
        {item.id}
      </Badge>

      <SelectReferencesItemDescriptor id={item.id} />
      {/* <SelectReferencesItemThumbnail id={item.id} /> */}
      {afbThumb ? (
        <div
          style={{
            backgroundSize: 'cover',
            backgroundImage: `url(${afbThumb})`,
            width: 44,
            height: 44,
          }}
        />
      ) : null}
      <Text style={{ marginLeft: 16 }}>{getNameFromId(item.id)}</Text>
      <div style={{ flexGrow: 1 }} />
      <Badge style={{ marginLeft: 16 }}>{item.type}</Badge>
      <Text style={{ marginLeft: 16 }}>{toDateString(item.createdAt)}</Text>
    </div>
  )
}

const SelectReferences = ({
  onChange,
  setRefArray,
  singleRef = false,
  close,
}) => {
  const [filter, setFilter] = useState('')
  const { types, loading } = useSchemaTypes()
  const [typing, setTyping] = useState(false)
  const selected = useRef<Set<string>>()

  const { width, height } = useWindowResize()
  const dialogRef = useRef<HTMLDivElement>(null)

  if (typing) {
    if (selected.current) {
      selected.current = null
    }
  } else if (!selected.current) {
    selected.current = new Set()
  }

  useEffect(() => {
    if (filter) {
      setTyping(true)
      const timer = setTimeout(() => {
        setTyping(false)
      }, 500)
      return () => clearTimeout(timer)
    } else {
      setTyping(false)
    }
  }, [filter])

  if (loading) return null

  const queryFields = Object.keys(types).reduce((set, type) => {
    for (const key in types[type].fields) {
      const field = types[type].fields[key]
      if (field.type === 'string' || field.type === 'id') {
        set.add(key)
      }
    }
    return set
  }, new Set())

  return (
    <Dialog
      ref={dialogRef}
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        marginLeft: '16px',
        marginRight: '16px',
        flexDirection: 'column',
      }}
      pure
      label={
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>{singleRef ? 'Select a reference' : 'Select References'}</div>
            <styled.div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                height: 32,
                width: 32,
                marginLeft: 'auto',
                borderRadius: 16,
                backgroundColor: color('lighttext'),
                '&:hover': {
                  backgroundColor: color('lighttext:hover'),
                },
              }}
              onClick={() => close()}
            >
              <CloseIcon size={14} />
            </styled.div>
          </div>

          <Input
            ghost
            style={{
              marginTop: 12,
              backgroundColor: color('background2'),
              boxShadow: '0px',
              outline: 'none',
              height: 40,
              alignItems: 'center',
              borderRadius: 8,
              paddingTop: '4px',
              paddingLeft: '16px',
            }}
            value={filter}
            onChange={(val) => {
              setFilter(val.trim())
            }}
          />
        </>
      }
    >
      {typing ? (
        <div
          style={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <LoadingIcon />
        </div>
      ) : (
        <div
          style={{
            flexGrow: 1,
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          <InfiniteList
            target="root"
            height={height - 210}
            itemSize={55}
            itemData={(items) => ({ items, selected: selected.current })}
            query={($offset, $limit) => {
              const query = {
                id: true,
                createdAt: true,
                type: true,
                $list: {
                  $offset,
                  $limit,
                  $find: {
                    $traverse: 'descendants',
                    //  $filter: {},
                  } as any,
                },
              }

              if (filter) {
                let f
                queryFields.forEach(($field) => {
                  const obj = {
                    $field,
                    $operator: 'includes',
                    $value: filter,
                  }
                  if (f) {
                    f = f.$or = obj
                  } else {
                    f = query.$list.$find.$filter = obj
                  }
                })
              }

              return query
            }}
          >
            {SelectReferencesItem}
          </InfiniteList>
        </div>
      )}
      <div
        style={{
          padding: 24,
          paddingTop: 14,
          display: 'flex',
          justifyContent: 'flex-end',
          borderTop: border(1),
        }}
      >
        <Dialog.Confirm
          space="16px"
          onConfirm={() => {
            setRefArray([...selected.current])
            if (singleRef) {
              onChange(Array.from(selected.current)[0])
            } else {
              onChange(Array.from(selected.current))
            }

            // console.log('aight', selected.current)
            // console.log('aight array ?', Array.from(selected.current))
          }}
        >
          Confirm
        </Dialog.Confirm>
      </div>
    </Dialog>
  )
}

// let once
const References = (props) => {
  const { label, description, value, style, onChange, space = 24 } = props

  const [refArray, setRefArray] = useState([])

  useEffect(() => {
    setRefArray(value)
  }, [value])

  // console.log('value', value)
  // console.log('some props', props)

  if (props.meta?.refTypes?.includes('files')) {
    return <FileUploadReference {...props} multiple />
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
      <Label
        label={label}
        // description={description}
        style={{ marginBottom: 12 }}
      />

      {/* if there are reftypes on the meta */}
      {/* {meta?.refTypes?.length > 0 &&
        meta?.refTypes?.map((ref) => <Reference id={ref} key={ref} />)} */}
      {refArray?.map((id) => (
        <Reference key={id} id={id} />
      ))}
      {/* {value?.map((id) => (
        <Reference key={id} id={id} />
      ))} */}
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

const SingleReference = (props) => {
  if (props.meta?.refTypes?.includes('file')) {
    return <FileUploadReference {...props} />
  }

  // some sort of preview state before publishing
  const [refArray, setRefArray] = useState([])
  const { label, description, value, style, onChange, space = 24 } = props

  const { open, close } = useDialog()

  const onClick = () => {
    open(
      <SelectReferences
        onChange={onChange}
        setRefArray={setRefArray}
        singleRef
        close={close}
      />
    )
  }

  // console.log('props from Single Reference component', props)
  // console.log('refArray From Single Reference component', refArray)

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
      {/* // show temp refArray for render purposes */}
      {refArray[0] ? (
        <Reference id={refArray[0]} />
      ) : value ? (
        <Reference id={value} />
      ) : null}
      <Button ghost icon={AddIcon} onClick={onClick}>
        {value || refArray[0] ? 'Change reference' : 'Add reference'}
      </Button>
    </InputWrapper>
  )
}

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

  console.log('target field', target[field])

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
