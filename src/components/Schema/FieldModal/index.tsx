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
import { Checkbox } from '~/components/Checkbox'
import { Accordion, AccordionItem, RadioButtons, Input } from '~'

const ReferencesGeneral = ({ types, options }) => {
  console.log('options', options)
  console.log('the types', types)

  return (
    <>
      <Accordion>
        <AccordionItem label="1. Define relationship" active>
          <RadioButtons
            cards
            direction="horizontal"
            data={[
              {
                label: 'Multiple references',
                value: 'Multiref',
                description: 'This will result in a list of references',
              },
              {
                label: 'Single reference',
                value: 'SingleRef',
                description: 'This will result in a single reference',
              },
            ]}
          />
          <MultiSelect
            placeholder="Type to reference"
            filterable
            style={{ marginTop: 16, width: 400 }}
            values={options.meta.refTypes || []}
            onChange={(values) => {
              options.meta.refTypes = values
            }}
            options={Object.keys(types)}
          />
        </AccordionItem>
        <AccordionItem label="2. Field info" />
        <AccordionItem label="3. Bi-directional" />
        <AccordionItem label="4. Target info" />
      </Accordion>
    </>
  )
}

const ArrayGeneral = ({ options, field, setDisabled }) => {
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

const SetGeneral = ({ options, field, setDisabled }) => {
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
          { value: 'string', label: 'String' },
        ]}
      />
    </>
  )
}

const RecordGeneral = ({ options, field, setDisabled }) => {
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

const FileGeneral = ({ options }) => {
  return (
    <Checkbox
      style={{ marginTop: 24 }}
      label="Allow multiple files upload"
      checked={options.multiple}
      onChange={(value) => {
        options.meta.multiple = value
        console.log('-->', value)
        if (value) {
          // schema change from file to files
          options.meta.format = 'files'
          options.meta.refTypes = ['files']
          options.type = 'references'
        }
        // change template based on this reference for file and refrences for files
      }}
    />
  )
}

const general = {
  references: ReferencesGeneral,
  array: ArrayGeneral,
  record: RecordGeneral,
  set: SetGeneral,
  file: FileGeneral,
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
        <Dialog.Label>
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              fontSize: 16,
              marginTop: 8,
            }}
          >
            <Thumbnail
              color={color}
              icon={icon}
              size={32}
              outline
              style={{ marginRight: 16 }}
            />
            <Text weight={600} size={16}>
              {label}
            </Text>
          </div>
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
          <Tab label="Settings">
            <div style={{ marginTop: 24, marginBottom: 24, paddingLeft: 16 }}>
              <Checkbox
                space
                label="Can't be empty"
                description="Prevents saving an entry if this field is empty"
              />
              <Checkbox
                space
                label="Set field as unique"
                description="Ensures that multiple entries can't have the same value for this field"
              />
              <Checkbox
                space
                label="Limit character count"
                description="Specifies the maximum number of characters allowed in this field"
                onChange={(e) => console.log('this is checked now --->', e)}
              />
              {true && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    marginBottom: 20,
                    marginTop: -12,
                    maxWidth: 450,
                    marginLeft: 24,
                  }}
                >
                  <Select
                    options={[
                      { value: 'atleast', label: 'At least' },
                      { value: 'between', label: 'Between' },
                      { value: 'nomorethan', label: 'No more than' },
                    ]}
                    placeholder="Set a limit"
                  />
                  <Input
                    type="number"
                    style={{ minWidth: 100 }}
                    placeholder="Min"
                  />
                  <Text wrap>&</Text>
                  <Input
                    type="number"
                    style={{ minWidth: 100 }}
                    placeholder="Max"
                  />
                </div>
              )}
              <Checkbox
                space
                label="Match a specific pattern"
                description="Only accepts values that match a specific regular exporession"
              />
              <Checkbox
                space
                label="Custom validation"
                description="Write a custom function"
              />
            </div>
          </Tab>
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
