import {
  Input,
  Text,
  Tab,
  Tabs,
  ListIcon,
  Checkbox,
  useObjectState,
  RadioButton,
  Dialog,
  Button,
  MultiSelect,
  useToast,
  Toast,
  border,
} from '~'
import { styled } from 'inlines'
import React, { useState, FC } from 'react'
import { AddFieldProps, FieldOptionsState } from './types'
import addToSchema from './addToSchema'
import { getPluralName, getName } from '~/utils'
import { FieldInfo } from './FieldInfo'
import { ReferenceType } from './General'
import { useClient, useSchema } from '@based/react'

const Divider = styled('div', {
  width: '100%',
  marginBottom: 24,
  borderBottom: border(1),
})

const TitleWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
})

export const AddFieldModalReference: FC<{
  template: string
  type: string
}> = ({ template, type }) => {
  const { schema } = useSchema()
  const client = useClient()
  const [activeTab, setTab] = useState('reftype')
  const [options, setOptions] = useObjectState<FieldOptionsState>()
  const tabs = ['reftype', 'info', 'direction', 'targetinfo']
  const toast = useToast({ attached: true })
  const types = []

  for (const type in schema.types) {
    const d = schema.types[type]
    types.push({
      value: type,
      label: getName(schema, type),
    })
  }

  return (
    <Dialog>
      <Dialog.Body>
        <div>
          <TitleWrapper
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {/* TODO: remove title wrapper */}
            <TitleWrapper>
              <ListIcon
                style={{
                  padding: 4,
                }}
                // @ts-ignore
                // icon={fieldData.icon}
                // size="medium"
                // @ts-ignore
                // color={fieldData.color}
              />
              <Text style={{ marginLeft: 12 }}>
                Wut?
                {/* {fieldData.name === 'References' ? 'Reference' : fieldData.name} */}
              </Text>
            </TitleWrapper>
          </TitleWrapper>
          TODO: Make Tabs correct and add here..
          {/* <Tabs
            activeIndex={tabs.indexOf(activeTab)}
            onChange={(v) => {
              if (typeof v === 'string') {
                setTab(v)
              }
            }}
          >
            <Tab value={tabs[0]}>1. Define reference</Tab>
            <Tab value={tabs[1]}>2. Field info</Tab>
            <Tab value={tabs[2]}>3. Bi-directional</Tab>
            {options.isBidirectional ? (
              <Tab value={tabs[3]}>4. Target info</Tab>
            ) : null}
          </Tabs> */}
          <Divider />
        </div>
        <div style={{ minHeight: 400 }}>
          {activeTab === 'info' ? (
            <FieldInfo update={setOptions} options={options} />
          ) : activeTab === 'targetinfo' ? (
            <FieldInfo
              update={(o) => setOptions({ biDirectionalTarget: o })}
              options={options.biDirectionalTarget || {}}
            />
          ) : activeTab === 'reftype' ? (
            <>
              <ReferenceType options={options} update={setOptions} />
              <Text style={{ marginTop: 24 }}>Allowed types</Text>
              <MultiSelect
                placeholder="Select allowed types"
                filterable
                style={{ marginTop: 16, width: 400 }}
                values={options.refTypes || []}
                onChange={(values) => {
                  setOptions({ refTypes: values as string[] })
                }}
                options={types}
              />
            </>
          ) : (
            <>
              <div
                style={{
                  userSelect: 'none',
                  cursor: 'pointer',
                }}
              >
                <Checkbox
                  checked={options.isBidirectional}
                  onChange={(v) => {
                    setOptions({ isBidirectional: v })
                  }}
                  // @ts-ignore
                  label={
                    <div style={{ marginTop: -4 }}>
                      <Text>Bi-directional reference</Text>
                      <Text>
                        Will create reference(s) field on the referenced type(s)
                        and keep both in sync
                      </Text>
                    </div>
                  }
                ></Checkbox>

                {options.isBidirectional ? (
                  <div
                    style={{
                      marginTop: 24,
                    }}
                  >
                    <RadioButton
                      label="Target reference settings"
                      value={options.biDirectionalTarget?.refType}
                      data={['single', 'mulitple']}
                      // data={['Multiple references', 'Single reference']}
                      onChange={(value) => {
                        setOptions({
                          biDirectionalTarget: {
                            refType: value as 'multi' | 'single',
                          },
                        })
                      }}
                    >
                      {/* <Radio value="multi">
                        <Text weight="semibold">Multiple references</Text>
                        <Text color="inherit">
                          <DirtyWrapper>
                            This will result in a field containing{' '}
                            <i>{getPluralName(schema, type)}</i> on the target
                            {options.refTypes?.length ? 's' : ''}{' '}
                          </DirtyWrapper>
                        </Text>
                      </Radio>
                      <Radio value="single">
                        <Text weight="semibold">Single reference</Text>
                        <Text color="inherit">
                          <DirtyWrapper>
                            This will result in a single{' '}
                            <i>{getName(schema, type)}</i> field on the target
                            {options.refTypes?.length ? 's' : ''}{' '}
                          </DirtyWrapper>
                        </Text>
                      </Radio> */}
                    </RadioButton>
                  </div>
                ) : null}
              </div>
            </>
          )}
        </div>
      </Dialog.Body>
      <Dialog.Buttons border>
        <Dialog.Cancel>Cancel (Esc)</Dialog.Cancel>
        {(activeTab === 'direction' && !options.isBidirectional) ||
        activeTab === 'targetinfo' ? (
          <Dialog.Confirm
            disabled={
              activeTab === 'targetinfo' && !options.biDirectionalTarget?.name
            }
            onConfirm={async () => {
              try {
                await addToSchema(
                  type,
                  'default', // TODO
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
        ) : (
          <Button
            disabled={
              (activeTab === 'info' && !options.name) ||
              (activeTab === 'reftype' && !options.refTypes?.length)
            }
            onClick={() => {
              setTab(tabs[tabs.indexOf(activeTab) + 1])
            }}
          >
            Next
          </Button>
        )}
      </Dialog.Buttons>
    </Dialog>
  )
}
