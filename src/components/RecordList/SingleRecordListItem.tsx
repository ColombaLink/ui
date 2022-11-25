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
}) => {
  const { open } = useDialog()

  const contextHandler = useContextMenu(
    ContextMenu,
    { index, objectKey, objectValue, open },
    { placement: 'right' }
  )

  console.log('onChange', onChange)

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

const editSpecificItem = async (index, objectKey, objectValue, open) => {
  console.log('EDIT ITEM', index, objectKey, objectValue)

  let inputVal = ''
  const ok = await open(
    <Dialog label={`Edit ${objectKey} : ${objectValue} `}>
      <Input
        autoFocus
        // label="input shizzle"
        value={inputVal}
      />
      <Dialog.Buttons border>
        <Dialog.Cancel />
        <Dialog.Confirm onConfirm={() => console.log('confirmed')} />
      </Dialog.Buttons>
    </Dialog>
  )
}

const ContextMenu = ({ index, objectKey, objectValue, open }) => {
  return (
    <>
      <ContextItem
        onClick={() => editSpecificItem(index, objectKey, objectValue, open)}
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
