import React, { CSSProperties, useEffect, useState } from 'react'
import { Space } from '~/types'
import { InputWrapper } from '../Input/InputWrapper'
import { Label, Button, AddIcon, usePropState } from '~'
import { useDialog } from '~/components/Dialog'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
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
  onChange?(items: string[] | number[]): void
}

export const ArrayList = ({
  description,
  indent,
  disabled,
  onChange,
  style,
  space,
  ...props
}: ArrayListProps) => {
  console.log('props from array list', props)

  const { prompt } = useDialog()

  // @ts-ignore
  const [arr, setArr] = usePropState(props?.value)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    onChange && onChange(arr)
  }, [arr])

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setArr((arr) => {
        const oldIndex = arr.indexOf(active.id)
        const newIndex = arr.indexOf(over.id)
        // @ts-ignore
        onChange(arrayMove(arr, oldIndex, newIndex))
        return arrayMove(arr, oldIndex, newIndex)
      })
    }
  }
  // @ts-ignore
  const itemType = props?.schema?.items.type

  // Delete item options
  const deleteSpecificItem = (idx) => {
    console.log('Delete this', idx)
    // filter out

    setArr((arr) => arr.filter((item, index) => index !== idx))
  }

  // Edit item options
  const editSpecificItem = (idx) => {
    console.log('edit this', idx)
    // so open modal and with this idx and value
    // const editText = prompt(`Edit ${arr[idx]} `)

    // if (editText && typeof editText !== 'boolean') {
    //   console.group(editText)
    //   console.log('--->', arr.splice(idx, 1, editText))
    //   setArr(arr.splice(idx, 1, editText))
    // }
  }

  return (
    <InputWrapper
      indent={indent}
      space={space}
      disabled={disabled}
      descriptionBottom={description}
    >
      {/** @ts-ignore  **/}
      <Label label={props?.label} space={12} />

      {arr && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={arr} strategy={verticalListSortingStrategy}>
            {arr?.map((id, idx) => (
              <SingleArrayListItem
                key={id}
                id={id}
                idx={idx}
                itemType={itemType}
                deleteSpecificItem={deleteSpecificItem}
                editSpecificItem={async () => editSpecificItem(idx)}
              />
            ))}
          </SortableContext>
        </DndContext>
      )}

      <Button
        ghost
        icon={AddIcon}
        space={8}
        onClick={async () => {
          const ok = await prompt(
            `Add new ${itemType.charAt(0).toUpperCase() + itemType.slice(1)} `
          )

          if (ok && typeof ok !== 'boolean' && arr === undefined) {
            onChange([ok])
          }

          if (ok && typeof ok !== 'boolean') {
            onChange([...arr, ok])
          }

          //  focus on button after adding one to quickly add another
        }}
      >
        Add {itemType.charAt(0).toUpperCase() + itemType.slice(1)}
      </Button>
    </InputWrapper>
  )
}
