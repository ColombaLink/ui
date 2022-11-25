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

const stopPropagation = (e) => e.stopPropagation()

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

  console.log('onChange', onChange)
  console.log('Complete object', object)

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
          // open options on clik
          onPointerDown={stopPropagation}
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

  const newObjKey = objectKey
  const newObjVal = objectValue
  const ok = await open(
    <Dialog label={`Edit ${objectKey} : ${objectValue} `}>
      <Input autoFocus label="Object Key" value={newObjKey} space />
      <Input autoFocus label="Object Value" value={newObjVal} />
      <Dialog.Buttons border>
        <Dialog.Cancel />
        <Dialog.Confirm
          onConfirm={() => {
            console.log('confirmed', newObjKey, newObjVal)
            // change the object TODO
            onChange({ ...ok, [newObjKey]: newObjVal })
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
        onClick={() => console.log('delete this', index)}
        icon={DeleteIcon}
      >
        Delete
      </ContextItem>
    </>
  )
}
