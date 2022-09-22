import React, { FC, useRef, useState } from 'react'
import { Dialog } from '~/components/Dialog'
import { Tab, Tabs } from '~/components/Tabs'
import { Thumbnail } from '~/components/Thumbnail'
import { Text } from '~/components/Text'

import { templates, FieldTemplates } from '../templates'
import { Confirm } from './Confirm'
import { FieldOptions } from '../types'
import { SharedGeneral } from './SharedGeneral'
import { useSchemaTypes } from '~/hooks'
import { MultiSelect } from '~/components/Select'

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

const general = {
  references: References,
}

export const FieldModal: FC<
  | {
      type: string
      field: string
      template?: FieldTemplates
    }
  | {
      type: string
      field?: string
      template: FieldTemplates
    }
> = ({ type, field, template }) => {
  const { types, loading } = useSchemaTypes()
  const [disabled, setDisabled] = useState(true)
  const optionsRef = useRef<FieldOptions>()

  if (loading) {
    return null
  }

  if (!optionsRef.current) {
    if (field) {
      optionsRef.current = {
        field,
        meta: types[type].fields[field].meta || {},
      }
    } else {
      optionsRef.current = {
        meta: {},
      }
    }
  }

  const options = optionsRef.current

  if (!template) {
    if (field) {
      const fieldSchema = types[type].fields[field]
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
              setDisabled={setDisabled}
              field={field}
            />
            {TypeSpecificGeneral && (
              <TypeSpecificGeneral
                options={options}
                setDisabled={setDisabled}
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
          disabled={disabled}
          options={options}
          template={template}
        >
          {field ? 'Update' : 'Create'} (Enter)
        </Confirm>
      </Dialog.Buttons>
    </Dialog>
  )
}
