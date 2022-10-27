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
  items?: string[] | number[]
  description?: string
  indent?: boolean
  disabled?: boolean
  style?: CSSProperties
  space?: Space
  onChange?(items: string[] | number[]): void
}

export const ArrayList = ({
  items,
  description,
  indent,
  disabled,
  onChange,
  style,
  space,
  ...props
}: ArrayListProps) => {
  console.log('props from array list', props)
  console.log('onChange', onChange)

  const { prompt } = useDialog()

  const [Arr, setArr] = useState([] || items)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setArr((Arr) => {
        const oldIndex = Arr.indexOf(active.id)
        const newIndex = Arr.indexOf(over.id)

        return arrayMove(Arr, oldIndex, newIndex)
      })
    }
  }

  const itemType = 'String'

  // als array veranderd dan onchange
  useEffect(() => {
    console.log('Array', Arr)
    onChange(Arr)
  }, [Arr])

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
      <Label label={props?.label} space={12} />

      {/** map trough items /arr here */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={Arr} strategy={verticalListSortingStrategy}>
          {Arr?.map((id, idx) => (
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

      <Button
        ghost
        icon={AddIcon}
        space={8}
        onClick={async () => {
          // open modal om een nieuw item toe te voegen..

          const ok = await prompt('Add new "blah" ')
          console.log('Result from prompt', ok)

          // push to array
          // als het geen boolean is, of typeof string of number
          if (ok && typeof ok !== 'boolean') {
            setArr([...Arr, ok])
          }
        }}
      >
        Add "blha"
      </Button>
    </InputWrapper>
  )
}
