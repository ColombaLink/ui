import React, { CSSProperties, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Space } from '~/types'
import { InputWrapper } from '../Input/InputWrapper'
import { Label, Button, AddIcon, Dialog, Input } from '~'
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

  if (ref.current !== id) {
    // if the external value changed
    ref.current = id
    if (id !== JSON.stringify(arr)) {
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
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

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
              if (inputVAL && typeof ok !== 'boolean') {
                if (itemType === 'string') {
                  onChange([...arr, inputVAL])
                } else if (itemType === 'int') {
                  onChange([...arr, parseInt(inputVAL)])
                } else if (itemType === 'float') {
                  onChange([...arr, parseFloat(inputVAL)])
                }
              }
            }}
          />
        </Dialog.Buttons>
      </Dialog>
    )
  }

  const deleteSpecificItem = async (item, idx) => {
    onChange(arr.filter((_, index) => index !== idx))
  }

  const editSpecificItem = async (item, idx) => {
    // const value = await prompt(`Edit ${arr[idx]} `)
    let inputVAL = ''
    const ok = await open(
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
                    arr.map((item) => {
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
      style={style}
    >
      {/** @ts-ignore  **/}
      <Label label={props.label} space={12} />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
      >
        <SortableContext items={ids} strategy={verticalListSortingStrategy}>
          {ids.map((id, idx) => {
            return (
              <SingleArrayListItem
                key={id}
                id={id}
                item={arr[idx]}
                idx={idx}
                itemType={itemType}
                deleteSpecificItem={deleteSpecificItem}
                editSpecificItem={editSpecificItem}
              />
            )
          })}
        </SortableContext>
        {createPortal(
          <DragOverlay>
            {draggingIndex >= 0 ? (
              <SingleArrayListItem
                id={ids[draggingIndex]}
                item={arr[draggingIndex]}
                idx={draggingIndex}
                itemType={itemType}
                deleteSpecificItem={deleteSpecificItem}
                editSpecificItem={editSpecificItem}
              />
            ) : null}
          </DragOverlay>,
          document.body
        )}
      </DndContext>

      <Button ghost icon={AddIcon} space={8} onClick={addItemHandler}>
        Add {itemType.charAt(0).toUpperCase() + itemType.slice(1)}
      </Button>
    </InputWrapper>
  )
}
