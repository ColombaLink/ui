import React, { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  UniqueIdentifier,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { alwaysIgnore, systemFields } from '../templates'
import { Draggable } from './Draggable'
import { Field } from './Field'
import { getObjectId } from './utils'
import { sortFields } from '~/hooks/useSchema'
import { useDialog } from '~/components/Dialog'

const sortAndFlatten = (fields) => {
  const sortedFields = sortFields(fields)

  for (let i = sortedFields.length - 1; i >= 0; i--) {
    const key = sortedFields[i]
    if (fields[key].type === 'record') {
      const { properties } = fields[key].values
      if (properties) {
        const nested = sortAndFlatten(properties)
        nested.forEach((nestedKey, index) => {
          nested[index] = `${key}.values.properties.${nestedKey}`
        })
        sortedFields.splice(i + 1, 0, ...nested)
      }
    } else if (fields[key].type === 'array') {
      const { properties } = fields[key].items
      if (properties) {
        const nested = sortAndFlatten(properties)
        nested.forEach((nestedKey, index) => {
          nested[index] = `${key}.items.properties.${nestedKey}`
        })
        sortedFields.splice(i + 1, 0, ...nested)
      }
    } else if (fields[key].type === 'object') {
      const nested = sortAndFlatten(fields[key].properties)
      nested.forEach((nestedKey, index) => {
        nested[index] = `${key}.properties.${nestedKey}`
      })
      sortedFields.splice(i + 1, 0, ...nested)
    }
  }

  return sortedFields
}

export const Fields = ({ includeSystemFields, type, fields, onChange }) => {
  const { confirm } = useDialog()
  const [draggingField, setDraggingField] = useState<UniqueIdentifier | false>()
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )
  const properties = {}
  const objects = {}
  const overIdRef = useRef()
  const sortedFields = sortAndFlatten(fields)
  const onDragStart = ({ active }) => {
    setDraggingField(active.id)
  }

  const [collapsed = new Set(), setCollapsed] = useState<Set<string>>()

  const toggleExpand = (field) => {
    if (collapsed.has(field)) {
      collapsed.delete(field)
    } else {
      collapsed.add(field)
    }
    setCollapsed(new Set(collapsed))
  }

  const onDragEnd = async ({ active, over }) => {
    setDraggingField(null)
    if (active.id !== over.id) {
      const activePath = active.id.split('.')
      const overObject = getObjectId(overIdRef.current, properties, objects)

      let overPath

      if (overObject) {
        const { type } = objects[overObject]
        overPath = overObject.split('.')
        if (type === 'array') {
          overPath.push('items')
        } else if (type === 'record') {
          overPath.push('values')
        }
        overPath.push('properties', '$$stub$$')
      } else {
        overPath = over.id.split('.')
      }

      let revert
      if (activePath.length !== overPath.length) {
        const activeKey = activePath[activePath.length - 1]
        const activeField = activePath.reduce(
          (fields, key) => fields[key],
          fields
        )

        const overFields = overPath
          .slice(0, -1)
          .reduce((fields, key) => fields[key], fields)

        if (activeKey in overFields) {
          console.error('Already has field!', activeKey, overFields)
        } else {
          overFields[activeKey] = { ...activeField }
          activeField.$delete = true

          revert = () => {
            delete overFields[activeKey]
            delete activeField.$delete
          }
        }
      }

      const resortedFields = arrayMove(
        sortedFields,
        sortedFields.indexOf(active.id as string),
        sortedFields.indexOf(over.id as string)
      )
      const setIndex = (field, index) => {
        const path = field.split('.')
        const targetFields = path.reduce((fields, key) => fields[key], fields)
        if ('meta' in targetFields) {
          targetFields.meta.index = index
        } else {
          targetFields.meta = { index }
        }
      }

      resortedFields.forEach(setIndex)

      if (revert) {
        // @ts-ignore
        const ok = await confirm({
          label: 'Your are moving a field in or out of an object',
          children:
            'Are you sure? This will update the schema and all related data',
        })

        if (!ok) {
          sortedFields.forEach(setIndex)
          revert()
          setDraggingField(false) // force an update
          return
        }
      }

      onChange(fields)
    }
  }

  const objectPath = []
  const filtered = sortedFields.filter((field) => {
    if (alwaysIgnore.has(field)) {
      return false
    }
    if (!includeSystemFields && systemFields.has(field)) {
      return false
    }
    if (draggingField && field.startsWith(`${draggingField}.`)) {
      return false
    }
    const path = field.split('.')
    const { type, $delete, items, values } = path.reduce(
      (fields, key) => fields[key],
      fields
    )

    if ($delete) {
      return false
    }

    while (objectPath.length) {
      const parent = objectPath[objectPath.length - 1]
      if (field.startsWith(parent.field)) {
        if (collapsed.has(parent.field)) {
          return false
        } else {
          properties[field] = parent
        }
        break
      } else {
        objectPath.pop()
      }
    }

    if (
      type === 'object' ||
      items?.type === 'object' ||
      values?.type === 'object'
    ) {
      objectPath.push((objects[field] = { field, type }))
    }

    return true
  })

  // console.log('filtered', filtered)

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <SortableContext items={filtered} strategy={verticalListSortingStrategy}>
        {filtered.map((field) => {
          return (
            <Draggable
              key={field}
              id={field}
              properties={properties}
              objects={objects}
              overIdRef={overIdRef}
            >
              <Field
                type={type}
                field={field}
                fields={fields}
                isDragging={field === draggingField}
                toggleExpand={toggleExpand}
                collapsed={collapsed.has(field)}
              />
            </Draggable>
          )
        })}
      </SortableContext>
      {createPortal(
        <DragOverlay>
          {draggingField ? (
            <Field
              isDragging
              type={type}
              field={draggingField}
              fields={fields}
            />
          ) : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  )
}
