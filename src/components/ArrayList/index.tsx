import React, { CSSProperties, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Space } from '~/types'
import { InputWrapper } from '../Input/InputWrapper'
import { Label, Button, AddIcon } from '~'
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
  const { prompt } = useDialog()
  const id = JSON.stringify(value)
  const [arr, setArr] = useState<any[]>([])
  const [draggingIndex, setDraggingIndex] = useState<number>()
  const ref = useRef<string>()
  const idsRef = useRef<any[]>()

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
    const ok = await prompt(
      `Add new ${itemType.charAt(0).toUpperCase() + itemType.slice(1)} `
    )

    if (ok && typeof ok !== 'boolean') {
      if (itemType === 'string') {
        onChange([...arr, ok])
      } else if (itemType === 'int') {
        onChange([...arr, parseInt(ok)])
      } else if (itemType === 'float') {
        onChange([...arr, parseFloat(ok)])
      }
    }
  }

  const deleteSpecificItem = async (idx) => {
    setArr(arr.filter((_, index) => index !== idx))
  }

  // Wat als het een integer is
  const editSpecificItem = async (idx) => {
    const value = await prompt(`Edit ${arr[idx]} `)
    if (value === false) {
      return
    }
    if (itemType === 'string') {
      setArr(
        arr.map((item) => {
          if (item === arr[idx]) {
            return value
          }
          return item
        })
      )
    } else if (itemType === 'int') {
      // @ts-ignore
      if (!isNaN(parseInt(value))) {
        setArr(
          arr.map((item) => {
            if (item === arr[idx]) {
              // @ts-ignore
              return parseInt(value)
            }
            return item
          })
        )
      }
    } else if (itemType === 'float') {
      // @ts-ignore
      if (!isNaN(parseFloat(value))) {
        setArr(
          arr.map((item) => {
            if (item === arr[idx]) {
              // @ts-ignore
              return parseFloat(value)
            }
            return item
          })
        )
      }
    }
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
