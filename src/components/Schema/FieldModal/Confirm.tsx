import { useClient } from '@based/react'
import React from 'react'
import { Dialog } from '~/components/Dialog'
import { Toast, useToast } from '~/components/Toast'
import { templates } from '../fields'

export const Confirm = ({ disabled, options, type, template, children }) => {
  const toast = useToast({ attached: true })
  const client = useClient()
  return (
    <Dialog.Confirm
      disabled={disabled}
      onConfirm={async () => {
        try {
          const { field, meta = {} } = options
          const { schema } = templates[template]

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
                      type: schema.type,
                      meta,
                    },
                  },
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
