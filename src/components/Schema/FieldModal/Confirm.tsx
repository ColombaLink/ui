import { useClient } from '@based/react'
import React from 'react'
import { Dialog } from '~/components/Dialog'
import { Toast, useToast } from '~/components/Toast'
import { useSchemaTypes } from '~/hooks'

export const Confirm = ({ disabled, options, type, children, path }) => {
  const { types } = useSchemaTypes()
  const toast = useToast({ attached: true })
  const client = useClient()
  return (
    <Dialog.Confirm
      disabled={disabled}
      onConfirm={async () => {
        try {
          const { field, ...schema } = options

          if (!schema.meta.name) {
            throw Error('Display name is required')
          }

          if (!field) {
            throw Error('Field name is required')
          }

          const currentFields = types[type].fields
          const fields = {}
          let from = currentFields
          let dest = fields
          let i = 0
          const l = path.length

          while (i < l) {
            const key = path[i++]
            dest[key] = { ...from[key] }
            dest = dest[key]
            from = from[key]
          }

          dest[field] = {
            ...from[field],
            ...schema,
          }

          return client.updateSchema({
            schema: {
              types: {
                [type]: {
                  fields,
                },
              },
            },
          })
        } catch (e) {
          toast(
            <Toast type="error" label={e.message}>
              Try updating your settings
            </Toast>
          )
          throw e
        }
      }}
    >
      {children}
    </Dialog.Confirm>
  )
}
