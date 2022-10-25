import React, { FC, useEffect, useRef, useState } from 'react'
import { Dialog } from '~/components/Dialog'
import { Tab, Tabs } from '~/components/Tabs'
import { Thumbnail } from '~/components/Thumbnail'
import { Text } from '~/components/Text'

import { templates, FieldTemplates } from '../templates'
import { Confirm } from './Confirm'
import { FieldOptions } from '../types'
import { SharedGeneral } from './SharedGeneral'
import { useSchemaTypes } from '~/hooks'
import { MultiSelect, Select } from '~/components/Select'

const References = ({ types, options }) => {
  return (
    <>
      <Text style={{ marginTop: 24 }}>Allowed types</Text>
      <MultiSelect
        placeholder="Select allowed types"
        filterable
        style={{ marginTop: 16, width: 400 }}
        values={options.meta.refTypes || []}
        onChange={(values) => {
          options.meta.refTypes = values
        }}
        options={Object.keys(types)}
      />
    </>
  )
}

const ArraySettings = ({ options, field, setDisabled }) => {
  const itemsType = options.items?.type

  useEffect(() => {
    setDisabled(!itemsType)
  }, [itemsType])

  return (
    <>
      <Text style={{ marginTop: 24 }}>Value type</Text>
      <Select
        placeholder="Select value type"
        style={{
          opacity: field ? 0.6 : 1,
          pointerEvents: field ? 'none' : null,
          cursor: field ? 'not-allowed' : null,
          marginTop: 16,
          width: 400,
        }}
        filterable
        value={itemsType}
        onChange={(value) => {
          options.items = templates[value].schema
          setDisabled(false)
        }}
        options={[
          { value: 'digest', label: 'Digest' },
          { value: 'float', label: 'Float' },
          { value: 'int', label: 'Integer' },
          { value: 'object', label: 'Object' },
          { value: 'string', label: 'String' },
        ]}
      />
    </>
  )
}

const RecordSettings = ({ options, field, setDisabled }) => {
  const valuesType = options.values?.type

  useEffect(() => {
    setDisabled(!valuesType)
  }, [valuesType])

  return (
    <>
      <Text style={{ marginTop: 24 }}>Value type</Text>
      <Select
        placeholder="Select value type"
        style={{
          opacity: field ? 0.6 : 1,
          pointerEvents: field ? 'none' : null,
          cursor: field ? 'not-allowed' : null,
          marginTop: 16,
          width: 400,
        }}
        filterable
        value={valuesType}
        onChange={(value) => {
          options.values = templates[value].schema
          setDisabled(false)
        }}
        options={[
          { value: 'digest', label: 'Digest' },
          { value: 'float', label: 'Float' },
          { value: 'int', label: 'Integer' },
          { value: 'object', label: 'Object' },
          { value: 'string', label: 'String' },
        ]}
      />
    </>
  )
}

const general = {
  references: References,
  array: ArraySettings,
  record: RecordSettings,
}

export const FieldModal: FC<
  | {
      type: string
      field: string
      template?: FieldTemplates
      path?: string[]
    }
  | {
      type: string
      field?: string
      template: FieldTemplates
      path?: string[]
    }
> = ({ type, field, template, path = [] }) => {
  const { types, loading } = useSchemaTypes()
  const [generalDisabled, setGeneralDisabled] = useState(true)
  const [specificDisabled, setSpecificDisabled] = useState(false)
  const optionsRef = useRef<FieldOptions>()

  if (loading) {
    return null
  }

  const fields = path.reduce((fields, key) => fields[key], types[type].fields)

  if (!template) {
    if (field) {
      const fieldSchema = fields[field]
      if (!fieldSchema) {
        console.warn('Field is not defined in schema')
        return null
      }
      template = fieldSchema.meta?.format || fieldSchema.type
    } else {
      console.warn('FieldModal needs template or field property')
      return null
    }
  }

  if (!optionsRef.current) {
    if (field) {
      optionsRef.current = {
        field,
        meta: {},
        ...fields[field],
      }
    } else {
      optionsRef.current = {
        // @ts-ignore
        meta: {},
        ...templates[template].schema,
      }
    }
  }

  const options = optionsRef.current

  const { label, icon, color } = templates[template]
  const TypeSpecificGeneral = general[template]

  return (
    <Dialog>
      <Dialog.Body>
        <Dialog.Label style={{ alignItems: 'center', display: 'flex' }}>
          <Thumbnail color={color} icon={icon} style={{ marginRight: 16 }} />
          {label}
        </Dialog.Label>
        <Tabs sameHeight activeTab={0}>
          <Tab label="General">
            <SharedGeneral
              options={options}
              setDisabled={setGeneralDisabled}
              field={field}
            />
            {TypeSpecificGeneral && (
              <TypeSpecificGeneral
                options={options}
                setDisabled={setSpecificDisabled}
                field={field}
                types={types}
              />
            )}
          </Tab>
          <Tab label="Settings" />
        </Tabs>
      </Dialog.Body>
      <Dialog.Buttons border>
        <Dialog.Cancel>Cancel (Esc)</Dialog.Cancel>
        <Confirm
          type={type}
          disabled={generalDisabled || specificDisabled}
          options={options}
          path={path}
        >
          {field ? 'Update' : 'Create'} (Enter)
        </Confirm>
      </Dialog.Buttons>
    </Dialog>
  )
}
