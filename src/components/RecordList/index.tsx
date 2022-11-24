import React, { CSSProperties, useState } from 'react'
import { InputWrapper } from '../Input/InputWrapper'
import { Space } from '~/types'
import { EditIcon, AddIcon } from '~/icons'
import { Button } from '~/components/Button'
import { Text } from '~/components/Text'
import { Badge } from '~/components/Badge'
import { Dialog, useDialog } from '~/components/Dialog'
import { Input } from '~/components/Input'

type RecordListProps = {
  label?: string
  description?: string
  descriptionBottom?: string
  schema?: any
  style?: CSSProperties
  space?: Space
  onClick?: () => void
  onChange?: (value: any) => void
}

export const RecordList = ({
  label,
  description,
  schema,
  onClick,
  onChange,
  ...props
}: RecordListProps) => {
  const { open } = useDialog()
  //   const [inputKey, setInputKey] = useState('')
  //   const [inputValue, setInputVal] = useState('')
  console.log('What is inside RECORD props-->', props)

  const addItemHandler = async () => {
    const itemType = schema.values.type

    let inputValue = ''
    let inputKey = ''
    const ok = await open(
      <Dialog
        label={`Add new ${
          itemType.charAt(0).toUpperCase() + itemType.slice(1)
        } `}
      >
        <Input
          label="Key"
          space
          type={
            itemType === 'string' || itemType === 'digest' ? 'text' : 'number'
          }
          digest={itemType === 'digest'}
          autoFocus
          value={inputKey}
          onChange={(e) => {
            inputKey = e
          }}
        />
        <Input
          label="Value"
          type={
            itemType === 'string' || itemType === 'digest' ? 'text' : 'number'
          }
          digest={itemType === 'digest'}
          autoFocus
          value={inputValue}
          onChange={(e) => {
            inputValue = e
          }}
        />

        <Dialog.Buttons border>
          <Dialog.Cancel />
          <Dialog.Confirm
            onConfirm={() => {
              if (inputKey && typeof ok !== 'boolean') {
                if (itemType === 'string') {
                  console.log('What is inputKey-->', inputKey)
                  console.log('What is inputValue-->', inputValue)
                  onChange({ ...ok, [inputKey]: inputValue })
                } else if (itemType === 'int') {
                } else if (itemType === 'float') {
                } else if (itemType === 'digest') {
                }
              }
            }}
          />
        </Dialog.Buttons>
      </Dialog>
    )
  }

  return (
    <InputWrapper indent space descriptionBottom={description}>
      <Text space={12} weight={600}>
        <div style={{ display: 'flex' }}>
          {label} <Badge style={{ marginLeft: 8 }}>{schema.values.type}</Badge>
        </div>
      </Text>
      <InputWrapper indent space={8}>
        {props.value &&
          Object.keys(props.value).map((ObjKey, idx) => (
            <div key={idx} style={{ display: 'flex', marginBottom: 4 }}>
              {ObjKey} : {props.value[ObjKey]}
            </div>
          ))}
      </InputWrapper>
      {props.value && (
        <Button ghost icon={EditIcon} onClick={onClick}>
          Edit Record
        </Button>
      )}
      {!props.value && (
        <Button ghost icon={AddIcon} onClick={addItemHandler}>
          Add {schema.values.type}
        </Button>
      )}
    </InputWrapper>
  )
}
