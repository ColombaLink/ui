import React, { useState } from 'react'
import { styled } from 'inlines'
import {
  color,
  BasedIcon,
  AttachmentIcon,
  Text,
  MoreIcon,
  useContextMenu,
  ContextItem,
  DeleteIcon,
  EditIcon,
} from '~'

const StyledUploadedFile = styled('div', {
  display: 'flex',
  border: `1px solid ${color('border')}`,
  backgroundColor: color('background'),
  paddingLeft: 12,
  borderRadius: 8,
  alignItems: 'center',
  gap: 12,
  marginBottom: 8,
  position: 'relative',
  cursor: 'auto',
})

const StyledMoreIcon = styled('div', {
  position: 'absolute',
  right: 16,
  '&:hover': {
    cursor: 'pointer',
  },
})

const CacheBackground = ({ file }) => {
  if (!file.src) {
    file.src = URL.createObjectURL(file)
  }
  const [url, setUrl] = useState(file.src)

  return (
    <div
      style={{
        height: 62,
        width: 62,
        backgroundImage: `url(${url})`,
        backgroundSize: 'cover',
      }}
    >
      <img
        style={{ display: 'none' }}
        src={file.src}
        onLoad={() => {
          setUrl(file.src)
        }}
      />
    </div>
  )
}

export const UploadedFileItem = ({
  file,
  handleClickUpload,
  deleteSpecificFile,
  id,
  replaceSpecificFile,
}) => {
  const contextHandler = useContextMenu(
    ContextOptions,
    { handleClickUpload, deleteSpecificFile, id, replaceSpecificFile },
    { placement: 'right' }
  )

  return (
    <StyledUploadedFile>
      {/* image */}
      {file?.type?.includes('image') && <CacheBackground file={file} />}
      {/* movie */}
      {file?.type?.includes('video') && (
        <div
          style={{
            height: 62,
            width: 62,
            backgroundColor: color('background2'),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <BasedIcon size={20} />
        </div>
      )}
      {/* audio */}
      {file?.type?.includes('audio') && (
        <div
          style={{
            height: 62,
            width: 62,
            backgroundColor: color('background2'),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <BasedIcon size={20} />
        </div>
      )}

      {file?.type?.includes('image') ||
      file?.type?.includes('video') ||
      file?.type?.includes('audio') ? null : (
        <AttachmentIcon />
      )}
      <Text style={{ marginTop: 6, marginBottom: 6 }} weight={400}>
        {file?.name}
      </Text>
      <StyledMoreIcon onClick={contextHandler}>
        <MoreIcon />
      </StyledMoreIcon>
    </StyledUploadedFile>
  )
}

const ContextOptions = ({
  // handleClickUpload,
  deleteSpecificFile,
  id,
  replaceSpecificFile,
}) => {
  return (
    <>
      <ContextItem onClick={() => replaceSpecificFile(id)} icon={EditIcon}>
        Edit
      </ContextItem>
      <ContextItem
        color="red"
        onClick={() => deleteSpecificFile(id)}
        icon={DeleteIcon}
      >
        Remove
      </ContextItem>
    </>
  )
}
