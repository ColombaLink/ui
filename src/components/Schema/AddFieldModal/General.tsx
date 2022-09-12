import {
  Text,
  Checkbox,
  useObjectState,
  Dialog,
  RadioButton,
  MultiSelect,
  useToast,
  Toast,
  border,
} from '~'
import { styled } from 'inlines'
import React, { useState, FC } from 'react'
import { AddFieldProps, FieldOptionsState } from './types'
import addToSchema from './addToSchema'
import { ValidationProps } from './types'
import { FieldInfo } from './FieldInfo'
import { useClient, useSchema } from '@based/react'
import { templates } from '../fields'

export const ReferenceType = ({
  options,
  update,
}: {
  options: FieldOptionsState
  update: (val: FieldOptionsState | null | undefined) => void
}) => (
  <RadioButton
    label="Reference type"
    value={options.refType}
    data={['single', 'mulitple']}
    // data={['Single file', 'Multiple files']}
    onChange={(value) => {
      update({ refType: value as 'multi' | 'single' })
    }}
  >
    {/* <Radio value="single">
      <Text weight="semibold">Single file</Text>
      <Text color="Secondary">This will result in a single file field</Text>
    </Radio>
    <Radio value="multi">
      <Text weight="semibold">Multiple files</Text>
      <Text color="Secondary">This will result in a list of files</Text>
    </Radio> */}
  </RadioButton>
)

export const Settings: FC<ValidationProps> = ({ update, options }) => {
  return (
    <>
      <Checkbox
        onChange={(v) => update({ isRequired: v })}
        checked={options.isRequired}
        label="Make field required"
      />
    </>
  )
}

const Divider = styled('div', {
  width: '100%',
  marginBottom: 24,
  borderBottom: border(1),
})

const TitleWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
})

export const AddFieldModalGeneral: FC<{
  template: string
  type: string
  name?: string
}> = ({ template, type, name }) => {
  const { schema } = useSchema()
  const client = useClient()
  const [options, setOptions] = useObjectState<FieldOptionsState>({
    refType: 'single',
  })
  const [activeTab, setTab] = useState('general')
  const toast = useToast({ attached: true })
  const { label } = templates[template]
  return (
    <Dialog>
      <Dialog.Body>
        <div>
          {/* TODO: remove title wrapper */}
          <TitleWrapper
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <TitleWrapper>
              <Text style={{ marginLeft: 12 }}>{label}</Text>
            </TitleWrapper>
          </TitleWrapper>
          TODO: Make Tabs correct and add here..
          {/* <Tabs
            onChange={(v) => {
              if (typeof v === 'string') {
                setTab(v)
              }
            }}
          >
            <Tab value="general">General</Tab>
            <Tab value="settings">Settings</Tab>
          </Tabs> */}
          <Divider />
        </div>
        <div style={{ minHeight: 400 }}>
          {activeTab === 'general' ? (
            template === 'file' ? (
              <>
                <FieldInfo update={setOptions} options={options} />
                <div style={{ height: 24 }} />
                {/* <InputWrapper
                  label="File type"
                  description="Select the allowed file types"
                > */}
                TODO: Put Label here...
                <MultiSelect
                  values={options.fileTypes || ['image']}
                  options={['image', 'video', 'font', 'other']}
                  onChange={(v) => {
                    setOptions({
                      fileTypes: v as ('image' | 'video' | 'font' | 'other')[],
                    })
                  }}
                />
                {/* </InputWrapper> */}
                <div style={{ height: 24 }} />
                <ReferenceType update={setOptions} options={options} />
              </>
            ) : (
              <FieldInfo update={setOptions} options={options} />
            )
          ) : (
            <Checkbox
              onChange={(v) => setOptions({ isRequired: v })}
              checked={options.isRequired}
              label="Make field required"
            />
          )}
        </div>
      </Dialog.Body>
      <Dialog.Buttons border>
        <Dialog.Cancel>Cancel (Esc)</Dialog.Cancel>
        <Dialog.Confirm
          onConfirm={async () => {
            try {
              await addToSchema(
                type,
                'default', // TODO how do we want this?
                options,
                template,
                schema,
                client
              )
            } catch (e: any) {
              toast.add(
                <Toast type="error" label={e.message}>
                  Try updating your settings
                </Toast>
              )
              throw e
            }
          }}
        >
          Create (Enter)
        </Dialog.Confirm>
      </Dialog.Buttons>
    </Dialog>
  )
}
