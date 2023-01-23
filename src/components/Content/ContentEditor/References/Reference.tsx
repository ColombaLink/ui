import React from 'react'
import {
  MoreIcon,
  DeleteIcon,
  useContextMenu,
  ContextItem,
  border,
  Badge,
  CopyIcon,
  CheckIcon,
  Text,
} from '~'
import { useDescriptor } from '../../hooks/useDescriptor'
import { useCopyToClipboard } from '~/hooks'
import { getImageSrcFromId } from '~/utils/getImageSrcFromId'
import { getNameFromId } from '~/utils/getNameFromId'

export const Reference = ({
  id,
  onChange,
  setRefArray,
  refArray,
  singleRef = false,
}) => {
  const { type, descriptor } = useDescriptor(id)
  const [copied, copy] = useCopyToClipboard(id)

  const afbThumb = getImageSrcFromId(id)
  const fileName = getNameFromId(id)

  const deleteSpecificRef = (id) => {
    console.log('deleteSpecificRef', id)

    console.log('refArray before deleteSpecificRef', refArray)

    if (singleRef) {
      onChange(null)
      setRefArray(null)
    } else {
      const newRefArray = refArray.filter((ref) => ref !== id)

      console.log('newRefArray', newRefArray)

      onChange(newRefArray)
      setRefArray(newRefArray)
    }
  }

  const contextHandler = useContextMenu(
    ContextOptions,
    {
      deleteSpecificRef,
      id,
    },
    { placement: 'right' }
  )

  return (
    <div
      style={{
        height: 48,
        border: border(1),
        color: 'white',
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        marginBottom: 8,
      }}
    >
      <Badge
        color="text"
        onClick={(id as any) !== 'root' ? (copy as any) : null}
        icon={id !== 'root' ? <CopyIcon /> : null}
      >
        {id}
      </Badge>
      {copied && (
        <div style={{ display: 'flex', marginLeft: 6, marginTop: 4 }}>
          <CheckIcon color="green" />
          <Text size={12}>Copied!!</Text>
        </div>
      )}
      {type === 'file' ? (
        <div
          style={{
            backgroundSize: 'cover',
            backgroundImage: `url(${afbThumb})`,
            minWidth: 44,
            height: 44,
            marginLeft: 12,
            marginRight: 12,
          }}
        />
      ) : null}
      <Text style={{ marginLeft: 12 }}>{type || 'reference'}</Text>
      <Text style={{ marginLeft: 12 }}>{fileName || descriptor}</Text>

      {/* // more icon for removing reference */}
      <div
        style={{
          marginLeft: 'auto',
          width: 24,
          height: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
        onClick={contextHandler}
      >
        <MoreIcon color="text" />
      </div>
    </div>
  )
}

const ContextOptions = ({
  // handleClickUpload,
  deleteSpecificRef,
  id,
}) => {
  return (
    <>
      <ContextItem onClick={() => deleteSpecificRef(id)} icon={DeleteIcon}>
        Delete
      </ContextItem>
    </>
  )
}
