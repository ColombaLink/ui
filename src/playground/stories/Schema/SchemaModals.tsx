import { Based, BasedClient } from '@based/client'
import { useClient, useSchema } from '@based/react'
import React, { FC, useEffect, useRef, useState } from 'react'
import { Dialog } from '~/components/Dialog'
import { Input } from '~/components/Input'
import safeTypeName from '~/components/Schema/AddTypeModal/safeTypeName'
import { templates } from '~/components/Schema/fields'
import { Select } from '~/components/Select'
import { Tab, Tabs } from '~/components/Tabs'
import { Thumbnail } from '~/components/Thumbnail'
import { Toast, useToast } from '~/components/Toast'

const useUpdate = (callback?: () => void) => {
  const [count, setCount] = useState(0)
  return () => {
    setCount(count + 1)
    callback?.()
  }
}

const GeneralMeta: FC<{
  options: FieldOptions
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>
  editField?: boolean
}> = ({ options, setDisabled, editField }) => {
  const [field, setField] = useState(options.field)
  const update = useUpdate()

  useEffect(() => {
    if (
      !options.meta.name ||
      options.meta.name.length < 3 ||
      !options.field ||
      options.field.length < 3
    ) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [options.field, options.meta.name])

  return (
    <>
      <Input
        autoFocus
        type="text"
        placeholder="Type something here"
        label="Display name"
        description="Name that will be displayed in the interface"
        onChange={(value: string) => {
          options.meta.name = value
          if (!field) {
            options.field = safeTypeName(value)
          }
          update()
        }}
        value={options.meta.name}
        style={{ marginTop: 24, marginBottom: 24 }}
      />
      <Input
        disabled={editField}
        type="text"
        placeholder="Type something here"
        label="Field name"
        description="Api field - name used in the sdk and clients"
        onChange={(value: string) => {
          // TODO make own safeName for fields (dont use type)
          options.field = safeTypeName(value)
          setField(options.field)
        }}
        value={
          options.field ??
          (options.meta.name && safeTypeName(options.meta.name))
        }
        style={{ marginBottom: 24 }}
      />
      <Input
        multiline // TODO no camelcase?
        label="Description (Optional)"
        description="Displays a hint for content editors"
        value={options.meta.description}
        onChange={(value) => {
          options.meta.description = value
          update()
        }}
      />
    </>
  )
}

type FieldMeta = {
  name?: string
  description?: string
  format?: 'url'
}

type FieldOptions = {
  field?: string
  meta?: FieldMeta
}

type FieldSchemaTemplate = {
  type: string
  meta?: FieldMeta
}

const updateFieldSchema = (
  client: Based,
  type: string,
  fieldSchemaTemplate: FieldSchemaTemplate,
  options: FieldOptions
) => {
  const { field, meta = {} } = options

  if (!meta.name) {
    throw Error('Display name is required')
  }

  if (!field) {
    throw Error('Field name is required')
  }

  return client.updateSchema({
    schema: {
      types: {
        [type]: {
          fields: {
            [field]: {
              type: fieldSchemaTemplate.type,
              meta,
            },
          },
        },
      },
    },
  })
}

const useFieldSchemaUpdate = (
  type: string,
  fieldSchemaTemplate: FieldSchemaTemplate,
  editField?: string
): {
  loading: boolean
  options: FieldOptions
  update: () => Promise<void>
  disabled: boolean
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>
} => {
  const client = useClient()
  const toast = useToast({ attached: true })
  const { current: options } = useRef<FieldOptions>({
    field: editField,
    meta: {},
  })
  const [disabled, setDisabled] = useState(true)
  const { schema, loading } = useSchema()
  const update = useUpdate()

  useEffect(() => {
    if (editField && !loading) {
      const { meta } = schema.types[type].fields[editField]
      if (meta) {
        options.meta = meta
        update()
      }
    }
  }, [editField, loading])

  return {
    loading,
    disabled: disabled || loading,
    setDisabled,
    options,
    update: async () => {
      try {
        await updateFieldSchema(client, type, fieldSchemaTemplate, options)
      } catch (e) {
        toast(
          <Toast type="error" label={e.message}>
            Try updating your settings
          </Toast>
        )
      }
    },
  }
}

const FieldModal = ({
  template,
  disabled,
  onConfirm,
  children,
  editField = false,
}) => {
  const { label, icon, color } = templates[template]
  return (
    <Dialog>
      <Dialog.Body>
        <Dialog.Label style={{ alignItems: 'center', display: 'flex' }}>
          <Thumbnail color={color} icon={icon} style={{ marginRight: 16 }} />
          {label}
        </Dialog.Label>
        <Tabs sameHeight activeTab={0}>
          {children}
        </Tabs>
      </Dialog.Body>
      <Dialog.Buttons border>
        <Dialog.Cancel>Cancel (Esc)</Dialog.Cancel>
        <Dialog.Confirm disabled={disabled} onConfirm={onConfirm}>
          {`${editField ? 'Update' : 'Create'} (Enter)`}
        </Dialog.Confirm>
      </Dialog.Buttons>
    </Dialog>
  )
}

const StringModal = ({ type, editField }) => {
  const { options, disabled, update, setDisabled } = useFieldSchemaUpdate(
    type,
    {
      type: 'string',
    },
    editField
  )

  return (
    <FieldModal
      template="string"
      disabled={disabled}
      onConfirm={update}
      editField={editField}
    >
      <Tab label="General">
        <GeneralMeta
          options={options}
          setDisabled={setDisabled}
          editField={editField}
        />
      </Tab>
      <Tab label="Settings"></Tab>
    </FieldModal>
  )
}

const UrlModal = ({ type, editField }) => {
  const { options, disabled, update, setDisabled } = useFieldSchemaUpdate(
    type,
    {
      type: 'string',
      meta: {
        format: 'url',
      },
    },
    editField
  )
  return (
    <FieldModal
      template="url"
      disabled={disabled}
      onConfirm={update}
      editField={editField}
    >
      <Tab label="General">
        <GeneralMeta
          options={options}
          setDisabled={setDisabled}
          editField={editField}
        />
      </Tab>
      <Tab label="Settings"></Tab>
    </FieldModal>
  )
}

const ObjectModal = ({ type, editField }) => {
  const { options, disabled, update, setDisabled } = useFieldSchemaUpdate(
    type,
    {
      type: 'object',
    },
    editField
  )
  return (
    <FieldModal
      template="object"
      disabled={disabled}
      onConfirm={update}
      editField={editField}
    >
      <Tab label="General">
        <GeneralMeta
          options={options}
          setDisabled={setDisabled}
          editField={editField}
        />
      </Tab>
      <Tab label="Settings"></Tab>
    </FieldModal>
  )
}

const FileModal = ({ type, editField }) => {
  const { options, disabled, update, setDisabled } = useFieldSchemaUpdate(
    type,
    {
      type: 'reference',
    },
    editField
  )
  return (
    <FieldModal
      template="file"
      disabled={disabled}
      onConfirm={update}
      editField={editField}
    >
      <Tab label="General">
        <GeneralMeta
          options={options}
          setDisabled={setDisabled}
          editField={editField}
        />
      </Tab>
      <Tab label="Settings"></Tab>
    </FieldModal>
  )
}

const DateTimeModal = ({ type, editField }) => {
  const { options, disabled, update, setDisabled } = useFieldSchemaUpdate(
    type,
    {
      type: 'timestamp',
    },
    editField
  )
  return (
    <FieldModal
      template="dateTime"
      disabled={disabled}
      onConfirm={update}
      editField={editField}
    >
      <Tab label="General">
        <GeneralMeta
          options={options}
          setDisabled={setDisabled}
          editField={editField}
        />
      </Tab>
      <Tab label="Settings"></Tab>
    </FieldModal>
  )
}

export const SchemaModals = () => {
  const [type, setType] = useState('youzitype')
  const [editField, setEditField] = useState('createdAt')
  const { schema, loading } = useSchema()

  useEffect(() => {
    if (!loading) {
      if (!schema.types[type].fields[editField]) {
        setEditField(null)
      }
    }
  }, [type, schema, loading, editField])

  if (loading) {
    return null
  }

  let modals
  if (editField) {
    const fieldType = schema.types[type].fields[editField].type
    if (fieldType === 'string' || fieldType === 'text') {
      modals = (
        <>
          <StringModal type={type} editField={editField} />
          <UrlModal type={type} editField={editField} />
        </>
      )
    } else if (fieldType === 'timestamp') {
      modals = <DateTimeModal type={type} editField={editField} />
    }
  } else {
    modals = (
      <>
        <StringModal type={type} editField={editField} />
        <UrlModal type={type} editField={editField} />
        <ObjectModal type={type} editField={editField} />
        <FileModal type={type} editField={editField} />
      </>
    )
  }

  return (
    <>
      <Select
        style={{ width: 500, marginBottom: 12 }}
        value={type}
        options={Object.keys(schema.types)}
        name="type"
        label="Item type"
        // @ts-ignore
        onChange={setType}
      />
      {type && (
        <>
          <Select
            style={{ width: 500 }}
            value={editField}
            options={Object.keys(schema.types[type].fields).map((field) => ({
              value: field,
              label: `${field} (${schema.types[type].fields[field].type})`,
            }))}
            name="type"
            label="Edit Existing Field"
            // @ts-ignore
            onChange={setEditField}
          />
          <br />
        </>
      )}
      <div
        key={editField}
        style={{ display: 'flex', flexGrow: 1, flexWrap: 'wrap', gap: 32 }}
      >
        {modals}
      </div>
    </>
  )
}
