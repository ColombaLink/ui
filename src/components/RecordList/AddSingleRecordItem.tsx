import React from 'react'
import { Dialog, Input } from '~'

export const AddSingleRecordItem = async (
  tempObj,
  setTempObj,
  itemType,
  onChange,
  open
) => {
  // const itemType = 'string'

  console.log('temp obj-->', tempObj)

  // const { open } = useDialog()

  let inputValue = ''
  let inputKey = ''
  const ok = await open(
    <Dialog
      label={`Add new ${itemType.charAt(0).toUpperCase() + itemType.slice(1)} `}
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
                setTempObj({ ...tempObj, [inputKey]: inputValue })
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
