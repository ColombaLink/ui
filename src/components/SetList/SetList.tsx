// @ts-nocheck
import React, { useState, useEffect } from 'react'
import { Space } from '~/types'
import { usePropState, Label, Button, AddIcon, Input, Dialog } from '~'
import { InputWrapper } from '../Input/InputWrapper'
import { useDialog } from '~/components/Dialog'

type SetListProps = {
  description?: string
  disabled?: boolean
  space?: Space
  indent?: boolean
  onChange?(items: {}): void
  value?: any
  schema?: any
}

export const SetList = ({
  description,
  onChange,
  disabled,
  indent,
  space,
  value,
  schema,
  ...props
}: SetListProps) => {
  const itemType = schema?.items.type
  const [set, setSet] = usePropState(value)
  const { open } = useDialog()
  const [inputVal, setInputVal] = useState('')

  const addItemHandler = async () => {
    let inputVAL = ''
    const ok = await open(
      <Dialog label="Bonjour monsieur">
        <Input
          type={
            itemType === 'string' || itemType === 'digest' ? 'text' : 'number'
          }
          digest={itemType === 'digest'}
          autoFocus
          label="input shizzle"
          value={inputVal}
          onChange={(e) => {
            console.log(e)
            inputVAL = e
            console.log(inputVal)
          }}
        />
        <Dialog.Buttons border>
          <Dialog.Cancel />
          <Dialog.Confirm
            onConfirm={() => {
              console.log('ARgh', inputVAL)
              if (!set) {
                setSet([inputVAL])
                onChange([inputVAL])
              } else if (set?.indexOf(inputVAL) === -1) {
                setSet([...set, inputVAL])
                onChange([...set, inputVAL])
              }
            }}
          />
        </Dialog.Buttons>
      </Dialog>
    )

    // if (ok && typeof ok !== 'boolean') {
    //   if (schema?.items.type === 'string') {
    //     console.log('ehllo')
    //     onChange([...set, ok])
    //   } else if (schema?.items.type === 'int') {
    //     onChange([...set, parseInt(ok)])
    //   } else if (schema?.items.type === 'float') {
    //     onChange([...set, parseFloat(ok)])
    //   }
    // }
  }
  return (
    <InputWrapper
      indent={indent}
      space={space}
      disabled={disabled}
      descriptionBottom={description}
    >
      <Label label={props.label} space={12} />
      {set?.map((item, i) => (
        <div key={i}>{item}</div>
      ))}
      <Button
        ghost
        icon={AddIcon}
        onClick={() => {
          console.log('pressed')

          addItemHandler()
        }}
      >
        Add Item test
      </Button>
    </InputWrapper>
  )
}
