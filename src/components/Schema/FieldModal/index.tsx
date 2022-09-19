import React, { FC, useRef, useState } from 'react'
import { useSchema } from '@based/react'
import { Dialog } from '~/components/Dialog'
import { Tab, Tabs } from '~/components/Tabs'
import { Thumbnail } from '~/components/Thumbnail'
import { templates, FieldTemplates } from '../templates'
import { Confirm } from './Confirm'
import { FieldOptions } from '../types'
import { General } from './General'

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
  const { schema, loading } = useSchema()
  const [disabled, setDisabled] = useState(true)
  const { current: options } = useRef<FieldOptions>({
    field,
    meta: {},
  })

  if (loading) {
    return null
  }

  if (!template) {
    if (field) {
      const fieldSchema = schema.types[type].fields[field]
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

  return (
    <Dialog>
      <Dialog.Body>
        <Dialog.Label style={{ alignItems: 'center', display: 'flex' }}>
          <Thumbnail color={color} icon={icon} style={{ marginRight: 16 }} />
          {label}
        </Dialog.Label>
        <Tabs sameHeight activeTab={0}>
          <Tab label="General">
            <General
              options={options}
              setDisabled={setDisabled}
              field={field}
            />
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
