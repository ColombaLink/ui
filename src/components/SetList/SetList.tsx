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
  space,
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

  /// Delete is not going great
  const deleteSpecificItem = (item, id) => {
    // console.log('ITEM & ID --->', item, id)
    set.delete(item)
    onChange(Array.from(set))
  }

  const editSpecificItem = async (item, idx) => {
    // console.log(item, idx)
    let inputVAL = ''
    const ok = await open(
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
                  onChange(
                    arr.map((item, id) => {
                      if (idx === id && item === arr[idx]) {
                        return inputVAL
                      }
                      return item
                    })
                  )
                } else if (itemType === 'int') {
                  onChange(
                    arr.map((item, id) => {
                      if (idx === id && item === arr[idx]) {
                        // @ts-ignore
                        return parseInt(inputVAL)
                      }
                      return item
                    })
                  )
                } else if (itemType === 'float') {
                  onChange(
                    arr.map((item, id) => {
                      if (idx === id && item === arr[idx]) {
                        // @ts-ignore
                        return parseFloat(inputVAL)
                      }
                      return item
                    })
                  )
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
