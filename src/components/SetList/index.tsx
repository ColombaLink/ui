// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { Space } from '~/types'
import { Label, Button, AddIcon, Input, Dialog } from '~'
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
  space = 48,
  value,
  schema,
  ...props
}: SetListProps) => {
  const itemType = schema?.items.type
  const [arr, setArr] = useState(value)
  const [set, setSet] = useState<any>(new Set(arr))
  const { open } = useDialog()
  const [inputVal, setInputVal] = useState('')

  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    setArr(value)
    setSet(new Set(value))
  }, [value])

  // console.log('Arrtje', arr)
  // console.log('Settje', set)

  const addItemHandler = async () => {
    let inputVAL = ''
    const ok = await open(
      <Dialog label="Add new item to the set">
        <Input
          type={
            itemType === 'string' || itemType === 'digest' ? 'text' : 'number'
          }
          digest={itemType === 'digest'}
          autoFocus
          label={`Add new ${
            itemType.charAt(0).toUpperCase() + itemType.slice(1)
          } `}
          value={inputVal}
          onChange={(e) => {
            inputVAL = e
          }}
        />
        <Dialog.Buttons border>
          <Dialog.Cancel />
          <Dialog.Confirm
            onConfirm={() => {
              if (itemType === 'int') {
                inputVAL = parseInt(inputVAL)
              } else if (itemType === 'float') {
                inputVAL = parseFloat(inputVAL)
              }
              if (set.has(inputVAL)) {
                setErrorMessage(
                  'This item already exists in the set, none item was added'
                )
              } else {
                setErrorMessage('')
                set.add(inputVAL)
                setArr(Array.from(set))
                onChange(Array.from(set))
              }
            }}
          />
        </Dialog.Buttons>
      </Dialog>
    )
  }

  const deleteSpecificItem = (item, id, set) => {
    // console.log('ITEM & ID --->', item, id, set)
    const newSet = new Set(set)
    newSet.delete(item)
    // console.log('NEW Delete SET --->', newSet)
    setArr(Array.from(newSet))
    setSet(newSet)
    onChange(Array.from(newSet))
  }

  const editSpecificItem = async (item, idx, set) => {
    // console.log(item, idx)
    // console.log('ARRR', set)
    let inputVAL = ''
    await open(
      <Dialog label={`Edit ${arr[idx]} `}>
        <Input
          type={
            itemType === 'string' || itemType === 'digest' ? 'text' : 'number'
          }
          digest={itemType === 'digest'}
          autoFocus
          value={inputVal}
          onChange={(e) => {
            inputVAL = e
          }}
        />
        <Dialog.Buttons border>
          <Dialog.Cancel />
          <Dialog.Confirm
            onConfirm={() => {
              if (inputVAL) {
                if (itemType === 'string') {
                  const editTempSet = set.map((item, id) => {
                    if (idx === id && item === arr[idx]) {
                      return inputVAL
                    }
                    return item
                  })
                  onChange(editTempSet)
                  setArr(editTempSet)
                } else if (itemType === 'int') {
                  const editTempSet = arr.map((item, id) => {
                    if (idx === id && item === arr[idx]) {
                      // @ts-ignore
                      return parseInt(inputVAL)
                    }
                    return item
                  })
                  onChange(editTempSet)
                  setArr(editTempSet)
                } else if (itemType === 'float') {
                  const editTempSet = arr.map((item, id) => {
                    if (idx === id && item === arr[idx]) {
                      // @ts-ignore
                      return parseFloat(inputVAL)
                    }
                    return item
                  })
                  onChange(editTempSet)
                  setArr(editTempSet)
                } else if (itemType === 'digest') {
                  const editTempSet = arr.map((item, id) => {
                    if (idx === id && item === arr[idx]) {
                      // @ts-ignore
                      return inputVAL
                    }
                    return item
                  })
                  onChange(editTempSet)
                  setArr(editTempSet)
                }
              }
            }}
          />
        </Dialog.Buttons>
      </Dialog>
    )
  }

  return (
    <InputWrapper
      indent={indent}
      space={space}
      disabled={disabled}
      descriptionBottom={description}
      errorMessage={errorMessage}
    >
      <Label label={props.label} space={12} />
      {arr &&
        arr?.map((item, i) => (
          <SingleSetListItem
            item={item}
            key={i}
            id={i}
            itemType={itemType}
            deleteSpecificItem={deleteSpecificItem}
            editSpecificItem={editSpecificItem}
            arr={arr}
          />
        ))}
      <Button ghost icon={AddIcon} onClick={() => addItemHandler()}>
        Add{' '}
        {itemType === 'string'
          ? 'String'
          : itemType === 'int'
          ? 'Integer'
          : itemType === 'float'
          ? 'Float'
          : itemType === 'digest'
          ? 'Digest'
          : 'item'}
      </Button>
    </InputWrapper>
  )
}
