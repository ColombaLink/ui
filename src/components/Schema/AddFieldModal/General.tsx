import React, { useEffect, useRef } from 'react'
import { Dialog, Thumbnail, Text, useObjectState, Tabs, Tab, Checkbox } from '~'
import { FieldInfo } from './FieldInfo'
import { FieldOptionsState } from './types'

export const AddFieldModalGeneral = ({ type, fieldData }) => {
  const [options, setOptions] = useObjectState<FieldOptionsState>({
    refType: 'single',
  })

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
        <Tabs space="20px">
          <Tab label="General">
            <FieldInfo update={setOptions} options={options} />
          </Tab>
          <Tab label="Settings" style={{ height: 'inherit' }}>
            <Checkbox description="Make field required" />
          </Tab>
        </Tabs>
      </div>

      <Dialog.Buttons>
        <Dialog.Cancel onCancel={() => {}} />
        <Dialog.Confirm onConfirm={() => {}} />
      </Dialog.Buttons>
    </Dialog>
  )
}
