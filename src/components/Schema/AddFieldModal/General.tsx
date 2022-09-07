import React, { useEffect, useRef } from 'react'
import { Dialog, Thumbnail, Text, useObjectState, Tabs, Tab, Checkbox } from '~'
import { FieldInfo } from './FieldInfo'
import { FieldOptionsState } from './types'
import addToSchema from './addToSchema'
import { removeAllOverlays } from '../../Overlay'
import { useToast, Toast } from '~'

import { useSchema, useClient, useData } from '@based/react'

export const AddFieldModalGeneral = ({ type, fieldData }) => {
  const [options, setOptions] = useObjectState<FieldOptionsState>({
    refType: 'single',
  })

  const schema = useSchema()
  const client = useClient()
  const data = useData()

  const toast = useToast()

  console.log('schema', schema)

  const db = 'default'
  const field = undefined

  return (
    <Dialog>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: 16,
          marginBottom: 24,
        }}
      >
        <Thumbnail size={32} icon={fieldData.icon} color="lightpurple" />
        <Text weight={600} style={{ marginLeft: 12 }}>
          {fieldData.name}
        </Text>
      </div>

      {/* @ts-ignore */}
      <div>
        <Tabs space="20px" sameHeight>
          <Tab label="General">
            <FieldInfo update={setOptions} options={options} />
          </Tab>
          <Tab label="Settings">
            <Checkbox description="Make field required" />
          </Tab>
        </Tabs>
      </div>

      <Dialog.Buttons>
        <Dialog.Cancel onCancel={() => {}} />
        <Dialog.Confirm
          onConfirm={async () => {
            console.log('What is type', type)
            console.log('What is db', db)
            console.log('What is options', options)
            console.log('What is fieldData', fieldData)
            console.log('What is schema', schema)
            console.log('What is client', client)
            console.log('What is Field', field)

            try {
              await addToSchema(
                type,
                db,
                options,
                fieldData,
                schema,
                client,
                field
              )
              removeAllOverlays()
            } catch (e: any) {
              toast.add(
                <Toast
                  type="error"
                  label={e.message}
                  description="Try updating your settings"
                ></Toast>
              )
              throw e
            }
          }}
        />
      </Dialog.Buttons>
    </Dialog>
  )
}
