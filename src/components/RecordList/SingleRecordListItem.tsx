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

type SingleRecordListItemProps = {
  index?: number
  objectKey?: string
  objectValue?: any
  onChange?: (value: any) => void
  object?: {}
  setTempObj?: (value: any) => void
  itemType?: string
}

export const SingleRecordListItem = ({
  index,
  objectKey,
  objectValue,
  onChange,
  object,
  setTempObj,
  itemType,
}: SingleRecordListItemProps) => {
  const { open } = useDialog()

  const contextHandler = useContextMenu(
    ContextMenu,
    {
      index,
      objectKey,
      objectValue,
      open,
      onChange,
      object,
      setTempObj,
      itemType,
    },
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
        <Text weight={600}>{objectKey}: </Text>
        <Text style={{ marginLeft: 6 }}>
          {itemType === 'digest'
            ? objectValue.toString().substring(0, 6) + '...'
            : objectValue}
        </Text>
      </div>
      <div style={{ minWidth: 16 }}>
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
  object,
  setTempObj,
  itemType
) => {
  let newObjKey = objectKey
  let newObjVal = objectValue
  const oldObjKey = objectKey

  await open(
    <Dialog label={`Edit ${objectKey} : ${objectValue} `}>
      <Input
        type="text"
        label="Object Key"
        value={newObjKey}
        space
        onChange={(e) => (newObjKey = e)}
      />
      <Input
        autoFocus
        label="Object Value"
        type={
          itemType === 'string' || itemType === 'digest' ? 'text' : 'number'
        }
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
            setTempObj({ ...object, [newObjKey]: newObjVal })
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
  setTempObj,
  itemType,
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
            object,
            setTempObj,
            itemType
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
          setTempObj({ ...object })
        }}
        icon={DeleteIcon}
      >
        Delete
      </ContextItem>
    </>
  )
}
