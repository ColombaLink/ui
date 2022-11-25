import React from 'react'
import {
  Text,
  color,
  MoreIcon,
  DeleteIcon,
  EditIcon,
  useContextMenu,
  ContextItem,
  Dialog,
  Input,
} from '~'
import { useDialog } from '~/components/Dialog'

// const stopPropagation = (e) => e.stopPropagation()

export const SingleRecordListItem = ({
  index,
  objectKey,
  objectValue,
  onChange,
  object,
}) => {
  const { open } = useDialog()

  const contextHandler = useContextMenu(
    ContextMenu,
    { index, objectKey, objectValue, open, onChange, object },
    { placement: 'right' }
  )

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        border: `1px solid ${color('border')}`,
        borderRadius: 4,
        padding: '0px 16px',
        alignItems: 'center',
        height: 42,
        marginBottom: 8,
      }}
    >
      <div style={{ display: 'flex' }}>
        <Text weight={500}>{objectKey}</Text> : {objectValue}
      </div>
      <div>
        <MoreIcon
          style={{ cursor: 'pointer' }}
          //  onPointerDown={stopPropagation}
          onClick={contextHandler}
        />
      </div>
    </div>
  )
}

const editSpecificItem = async (
  index,
  objectKey,
  objectValue,
  open,
  onChange,
  object
) => {
  console.log('EDIT ITEM', index, objectKey, objectValue)

  let newObjKey = objectKey
  let newObjVal = objectValue

  const oldObjKey = objectKey
  const oldObjVal = objectValue

  const ok = await open(
    <Dialog label={`Edit ${objectKey} : ${objectValue} `}>
      <Input
        label="Object Key"
        value={newObjKey}
        space
        onChange={(e) => (newObjKey = e)}
      />
      <Input
        autoFocus
        label="Object Value"
        value={newObjVal}
        onChange={(e) => (newObjVal = e)}
      />
      <Dialog.Buttons border>
        <Dialog.Cancel />
        <Dialog.Confirm
          onConfirm={() => {
            object[oldObjKey] = object[newObjKey]
            object[newObjKey] = newObjVal

            if (newObjKey !== oldObjKey) {
              object[oldObjKey] = null
            }

            onChange({ ...object, [newObjKey]: newObjVal })
          }}
        />
      </Dialog.Buttons>
    </Dialog>
  )
}

const ContextMenu = ({
  index,
  objectKey,
  objectValue,
  open,
  onChange,
  object,
}) => {
  return (
    <>
      <ContextItem
        onClick={() =>
          editSpecificItem(
            index,
            objectKey,
            objectValue,
            open,
            onChange,
            object
          )
        }
        icon={EditIcon}
      >
        Edit
      </ContextItem>
      <ContextItem
        onClick={() => {
          object[objectKey] = null
          onChange({ ...object })
        }}
        icon={DeleteIcon}
      >
        Delete
      </ContextItem>
    </>
  )
}
