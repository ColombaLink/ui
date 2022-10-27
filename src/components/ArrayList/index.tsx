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

  // console.log('value -->', props?.value)

  const { prompt } = useDialog()

  // @ts-ignore
  const [arr, setArr] = usePropState(props?.value)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setArr((arr) => {
        const oldIndex = arr.indexOf(active.id)
        const newIndex = arr.indexOf(over.id)

        return arrayMove(arr, oldIndex, newIndex)
      })
    }
  }
  // @ts-ignore
  const itemType = props?.schema?.items.type

  // Delete item options
  const deleteSpecificItem = (idx) => {
    console.log('Delete this', idx)
  }

  // Edit item options
  const editSpecificItem = (idx) => {
    console.log('edit this', idx)
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
                editSpecificItem={editSpecificItem}
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
          // open modal om een nieuw item toe te voegen..

          const ok = await prompt(
            `Add new ${itemType.charAt(0).toUpperCase() + itemType.slice(1)} `
          )
          console.log('Result from prompt', ok)

          // push to array
          // als het geen boolean is, of typeof string of number
          if (ok && typeof ok !== 'boolean') {
            setArr([...arr, ok])
            onChange(arr)
          }
        }}
      >
        Add {itemType.charAt(0).toUpperCase() + itemType.slice(1)}
      </Button>
    </InputWrapper>
  )
}
