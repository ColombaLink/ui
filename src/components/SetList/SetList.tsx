// @ts-nocheck
import React, { useState } from 'react'
import { Space } from '~/types'
import { usePropState, Label, Button, AddIcon, Input, Dialog } from '~'
import { InputWrapper } from '../Input/InputWrapper'
import { useDialog } from '~/components/Dialog'

import { SingleSetListItem } from './SingleSetListItem'

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
  }

  /// Delete is not going great
  const deleteSpecificItem = (id) => {
    console.log('ID --->', id)
    console.log(
      'new array --->',
      set.filter((_, index) => index !== id)
    )
    setSet(set.filter((_, index) => index !== id))
    // onChange(set.filter((_, index) => index !== id))
  }

  const editSpecificItem = (id) => {
    console.log(id)
  }

  return (
    <InputWrapper
      indent={indent}
      space={space}
      disabled={disabled}
      descriptionBottom={description}
    >
      <Label label={props.label} space={12} />
      {set &&
        set?.map((item, i) => (
          <SingleSetListItem
            item={item}
            key={i}
            id={i}
            itemType={itemType}
            deleteSpecificItem={deleteSpecificItem}
            editSpecificItem={editSpecificItem}
          />
        ))}
      <Button ghost icon={AddIcon} onClick={() => addItemHandler()}>
        Add Item test
      </Button>
    </InputWrapper>
  )
}
