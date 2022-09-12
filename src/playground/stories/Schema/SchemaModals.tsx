import { Based, BasedClient } from '@based/client'
import { useClient, useSchema } from '@based/react'
import { deepCopy } from '@saulx/utils'
import React, { FC, useEffect, useRef, useState } from 'react'
import { Dialog } from '~/components/Dialog'
import { Input } from '~/components/Input'
import { Page } from '~/components/Page'
import safeTypeName from '~/components/Schema/AddTypeModal/safeTypeName'
import { templates } from '~/components/Schema/fields'
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
  const [fieldName, setFieldName] = useState(options.fieldName)
  const update = useUpdate()

  useEffect(() => {
    if (
      !options.displayName ||
      options.displayName.length < 3 ||
      !options.fieldName ||
      options.fieldName.length < 3
    ) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [options.fieldName, options.displayName])

  return (
    <>
      <Input
        autoFocus
        type="text"
        placeholder="Type something here"
        label="Display name"
        description="Name that will be displayed in the interface"
        onChange={(value: string) => {
          options.displayName = value
          if (!fieldName) {
            options.fieldName = safeTypeName(value)
          }
          update()
        }}
        value={options.displayName}
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
          options.fieldName = safeTypeName(value)
          setFieldName(options.fieldName)
        }}
        value={
          options.fieldName ??
          (options.displayName && safeTypeName(options.displayName))
        }
        style={{ marginBottom: 24 }}
      />
      <Input
        multiline // TODO no camelcase?
        label="Description (Optional)"
        description="Displays a hint for content editors"
        value={options.description}
        onChange={(value) => {
          options.description = value
          update()
        }}
      />
    </>
  )
}

type FieldOptions = {
  displayName?: string
  fieldName?: string
  description?: string
}

type FieldSchemaTemplate = {
  type: string
  meta?: {
    name?: string
    description?: string
    format?: 'url'
  }
}

const updateFieldSchema = (
  client: Based,
  type: string,
  fieldSchemaTemplate: FieldSchemaTemplate,
  options: FieldOptions
) => {
  const { displayName, description, fieldName } = options

  if (!displayName) {
    throw Error('Display name is required')
  }

  if (!fieldName) {
    throw Error('Field name is required')
  }

  const fieldSchema = deepCopy(fieldSchemaTemplate) as FieldSchemaTemplate

  if (!fieldSchema.meta) {
    fieldSchema.meta = {}
  }

  fieldSchema.meta.name = displayName

  if (description) {
    fieldSchema.meta.description = description
  }

  return client.updateSchema({
    schema: {
      types: {
        [type]: {
          fields: {
            [fieldName]: fieldSchema,
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
    fieldName: editField,
  })
  const [disabled, setDisabled] = useState(true)
  const { schema, loading } = useSchema()
  const update = useUpdate()

  useEffect(() => {
    if (editField && !loading) {
      const { meta } = schema.types[type].fields[editField]
      if (meta) {
        options.displayName = meta.name
        options.description = meta.description
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
  const { label, description, icon, color } = templates[template]
  return (
    <Dialog>
      <Dialog.Body>
        <Dialog.Label style={{ alignItems: 'center', display: 'flex' }}>
          <Thumbnail color={color} icon={icon} style={{ marginRight: 16 }} />
          {label}
        </Dialog.Label>
        <Tabs sameHeight>{children}</Tabs>
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

const String = ({ type, editField }) => {
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

const Url = ({ type, editField }) => {
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

const Object = ({ type, editField }) => {
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

const File = ({ type, editField }) => {
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

// const Integer = ({ type }) => {
//   const { options, disabled, update, setDisabled } = useFieldSchemaUpdate(
//     type,
//     'int'
//   )
//   return (
//     <FieldModal template="url" disabled={disabled} onConfirm={update}>
//       <Tab label="General">
//         <GeneralMeta options={options} setDisabled={setDisabled} />
//       </Tab>
//       <Tab label="Settings"></Tab>
//     </FieldModal>
//   )
// }

export const SchemaModals = () => {
  return (
    <div style={{ display: 'flex', flexGrow: 1, flexWrap: 'wrap', gap: 32 }}>
      <String type="youzitype" editField="ok-g" />
      <Url type="youzitype" editField="ok-g" />
      <Object type="youzitype" editField="ok-g" />
      <File type="youzitype" editField="ok-g" />
    </div>
  )
}
