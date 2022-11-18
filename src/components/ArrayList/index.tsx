import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Space } from '~/types'
import { InputWrapper } from '../Input/InputWrapper'
import { Label, Button, AddIcon, Dialog, Input, usePropState, Text } from '~'
import { useDialog } from '~/components/Dialog'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { SingleArrayListItem } from './SingleArrayListItem'

type ArrayListProps = {
  description?: string
  indent?: boolean
  disabled?: boolean
  style?: CSSProperties
  space?: Space
  onChange?(ids: string[] | number[]): void
  value?: any[]
}

export const ArrayList = ({
  description,
  indent,
  disabled,
  onChange,
  space,
  value = [],
  style,
  ...props
}: ArrayListProps) => {
  const { open } = useDialog()
  const id = JSON.stringify(value)
  const [arr, setArr] = useState<any[]>([])
  const [draggingIndex, setDraggingIndex] = useState<number>()
  const ref = useRef<string>()
  const idsRef = useRef<any[]>()
  const [inputVal, setInputVal] = useState('')
  const [renderCounter, setRenderCounter] = useState(1)

  console.log('props', props)
  console.log('value', value)
  console.log('arr', arr)
  console.log('id', id)

  if (ref.current !== id) {
    // if the external value changed
    ref.current = id
    if (id !== JSON.stringify(arr)) {
      // console.log('change?!', id, arr)
      // and it's not the same as the internal value
      // => update the internal array
      value.forEach((item, i) => {
        arr[i] = item
      })
      arr.splice(value.length)
      // and clear the ids cache
      idsRef.current = null
    }
  }

  // console.log('render', arr)

  if (!idsRef.current) {
    // if no ids cache
    const set = new Set()
    // create an array of unique values to act as id
    idsRef.current = value.map((item) => {
      let cnt = 0
      while (set.has(item)) {
        item = `${item}-${cnt++}`
      }
      set.add(item)
      return item
    })
  }

  const ids = idsRef.current
  console.log('ids', ids)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    setRenderCounter((c) => c + 1)
  }, [arr.length, ids.length, idsRef.current.length])

  const onDragStart = ({ active }) => {
    setDraggingIndex(ids.indexOf(active.id))
  }

  const onDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over.id) {
      const oldIndex = ids.indexOf(active.id)
      const newIndex = ids.indexOf(over.id)
      // update the array
      const newArray = arrayMove(arr, oldIndex, newIndex)
      // update the ids
      idsRef.current = arrayMove(idsRef.current, oldIndex, newIndex)
      onChange(newArray)
      setArr(newArray)
    }

    setDraggingIndex(-1)
  }

  // @ts-ignore
  const itemType = props.schema?.items.type

  const addItemHandler = async () => {
    let inputVAL = ''
    const ok = await open(
      <Dialog
        label={`Add new ${
          itemType.charAt(0).toUpperCase() + itemType.slice(1)
        } `}
      >
        {itemType !== 'object' && (
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
        )}

        {itemType === 'object' && (
          <div>
            <Text>Add a new object?</Text>
          </div>
        )}

        <Dialog.Buttons border>
          <Dialog.Cancel />
          <Dialog.Confirm
            onConfirm={() => {
              if (inputVAL && typeof ok !== 'boolean') {
                if (itemType === 'string') {
                  onChange([...arr, inputVAL])
                  setArr([...arr, inputVAL])
                  idsRef.current = [...idsRef.current, inputVAL]
                } else if (itemType === 'int') {
                  onChange([...arr, parseInt(inputVAL)])
                  setArr([...arr, parseInt(inputVAL)])
                  idsRef.current = [...idsRef.current, parseInt(inputVAL)]
                } else if (itemType === 'float') {
                  onChange([...arr, parseFloat(inputVAL)])
                  setArr([...arr, parseFloat(inputVAL)])
                  idsRef.current = [...idsRef.current, parseFloat(inputVAL)]
                } else if (itemType === 'digest') {
                  onChange([...arr, inputVAL])
                  setArr([...arr, inputVAL])
                  idsRef.current = [...idsRef.current, inputVAL]
                }
              }
              if (itemType === 'object' && typeof ok !== 'boolean') {
                onChange([...arr, {}])
                setArr([...arr, {}])
                idsRef.current = [...idsRef.current, {}]
              }
            }}
          />
        </Dialog.Buttons>
      </Dialog>
    )
  }

  const deleteSpecificItem = async (item, idx) => {
    // console.log('delete this', item, idx)
    arr.splice(idx, 1)
    idsRef.current = [...arr]
    // console.log('idsREF current --> ', idsRef.current)
    onChange(arr)
    setRenderCounter((c) => c + 1)
    //  console.log('delete fire', renderCounter)
  }

  const editSpecificItem = async (item, idx, arr) => {
    // const value = await prompt(`Edit ${arr[idx]} `)
    let inputVAL = ''
    await open(
      <Dialog label={`Edit ${arr[idx]} `}>
        <Input
          type={
            itemType === 'string' || itemType === 'digest' ? 'text' : 'number'
          }
          digest={itemType === 'digest'}
          autoFocus
          // label="input shizzle"
          value={inputVal}
          onChange={(e) => {
            //    console.log(e)
            inputVAL = e
            //   console.log(inputVal)
          }}
        />
        <Dialog.Buttons border>
          <Dialog.Cancel />
          <Dialog.Confirm
            onConfirm={() => {
              if (inputVAL) {
                //   console.log('current:', arr)
                // make a extra array to track the editid items
                // let editTempArr = [...arr]
                if (itemType === 'string') {
                  const editTempArr = arr.map((item, id) => {
                    if (idx === id && item === arr[idx]) {
                      return inputVAL
                    }
                    return item
                  })
                  setArr(editTempArr)
                  onChange(editTempArr)
                  //  console.log('editTempArr', JSON.stringify(editTempArr))
                } else if (itemType === 'int') {
                  const editTempArr = arr.map((item, id) => {
                    if (idx === id && item === arr[idx]) {
                      // @ts-ignore
                      return parseInt(inputVAL)
                    }
                    return item
                  })
                  setArr(editTempArr)
                  onChange(editTempArr)
                } else if (itemType === 'float') {
                  const editTempArr = arr.map((item, id) => {
                    if (idx === id && item === arr[idx]) {
                      // @ts-ignore
                      return parseFloat(inputVAL)
                    }
                    return item
                  })
                  setArr(editTempArr)
                  onChange(editTempArr)
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
      style={style}
    >
      {/** @ts-ignore  **/}
      <Label label={props.label} space={12} />

      {renderCounter ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
          onDragStart={onDragStart}
        >
          <SortableContext items={ids} strategy={verticalListSortingStrategy}>
            {ids?.map((id, idx) => {
              return (
                <SingleArrayListItem
                  id={id}
                  key={idx}
                  item={itemType !== 'object' ? arr[idx] : arr[idx].toString()}
                  idx={idx}
                  itemType={itemType}
                  deleteSpecificItem={deleteSpecificItem}
                  editSpecificItem={editSpecificItem}
                  arr={arr}
                />
              )
            })}
          </SortableContext>

          {createPortal(
            <DragOverlay>
              {draggingIndex >= 0 ? (
                <SingleArrayListItem
                  id={ids[draggingIndex]}
                  item={
                    itemType !== 'object'
                      ? arr[draggingIndex]
                      : arr[draggingIndex].toString()
                  }
                  idx={draggingIndex}
                  itemType={itemType}
                  deleteSpecificItem={deleteSpecificItem}
                  editSpecificItem={editSpecificItem}
                  arr={arr}
                />
              ) : null}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      ) : null}

      <Button ghost icon={AddIcon} space={8} onClick={addItemHandler}>
        Add{' '}
        {itemType === 'string'
          ? 'String'
          : itemType === 'int'
          ? 'Integer'
          : itemType === 'float'
          ? 'Float'
          : itemType === 'digest'
          ? 'Digest'
          : itemType === 'object'
          ? 'Object'
          : 'item'}
      </Button>
    </InputWrapper>
  )
}
