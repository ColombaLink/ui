import React, { CSSProperties, useRef, useState } from 'react'
import {
  Label,
  color,
  Text,
  spaceToPx,
  UploadIcon,
  AttachmentIcon,
  BasedIcon,
  Button,
  MoreIcon,
  useContextMenu,
  ContextItem,
  EditIcon,
  DeleteIcon,
} from '~'
import { Space } from '~/types'
import { styled } from 'inlines'

type FileUploadProps = {
  label?: string
  description?: string
  descriptionBottom?: string
  indent?: boolean
  error?: string
  onChange?: (file: File) => void
  style?: CSSProperties
  space?: Space
}

const StyledFileInput = styled('div', {
  borderRadius: '4px',
  border: `1px dashed ${color('border')}`,
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: 6,
  paddingLeft: 12,
  backgroundColor: color('background2'),
  '&:hover': {
    cursor: 'pointer',
  },
})

const StyledUploadedFile = styled('div', {
  display: 'flex',
  border: `1px solid ${color('border')}`,
  backgroundColor: color('background'),
  paddingLeft: 12,
  borderRadius: 4,
  alignItems: 'center',
  gap: 12,
  marginBottom: 8,
  position: 'relative',
})

const StyledMoreIcon = styled('div', {
  position: 'absolute',
  right: 16,
})

export const FileUpload = ({
  label,
  description,
  descriptionBottom,
  indent,
  error,
  onChange,
  space,
  style,
}: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null)

  // for multiple files
  // const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const hiddenFileInput = useRef(null)

  const handleClickUpload = () => {
    hiddenFileInput.current.click()
  }

  const handleChange = (e) => {
    // console.log(e)
    // console.log(e.target.files[0])
    setFile(e.target.files[0])
    // for multiple files
    // setUploadedFiles([...uploadedFiles, e.target.files[0]])
  }

  const contextHandler = useContextMenu(
    ContextOptions,
    { setFile, handleClickUpload },
    { placement: 'right' }
  )

  return (
    <div
      style={{
        paddingLeft: indent ? 12 : null,
        borderLeft: file
          ? `2px solid ${color('accent')}`
          : indent
          ? `2px solid ${color('border')}`
          : 'none',
        marginBottom: spaceToPx(space),
        ...style,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Label label={label} description={description} space="8px" />

        {file && (
          <Button
            ghost
            onClick={() => setFile(null)}
            style={{ height: 'fit-content', marginBottom: 4 }}
          >
            Clear
          </Button>
        )}
      </div>

      {/* {uploadedFiles &&
        uploadedFiles.map((file, idx) => (
          <StyledUploadedFile key={idx}>
            <AttachmentIcon />
            {file.name}
          </StyledUploadedFile>
        ))} */}
      {file && (
        <StyledUploadedFile>
          {/* image */}
          {file.type.includes('image') && (
            <div
              style={{
                height: 62,
                width: 62,
                backgroundImage: `url(${URL.createObjectURL(file)})`,
                backgroundSize: 'cover',
              }}
            />
          )}
          {/* movie */}
          {file.type.includes('video') && (
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
          {file.type.includes('audio') && (
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

          {file.type.includes('image') ||
          file.type.includes('video') ||
          file.type.includes('audio') ? null : (
            <AttachmentIcon />
          )}
          <Text style={{ marginTop: 6, marginBottom: 6 }} weight={400}>
            {file.name}
          </Text>
          <StyledMoreIcon onClick={contextHandler}>
            <MoreIcon />
          </StyledMoreIcon>
        </StyledUploadedFile>
      )}
      <StyledFileInput onClick={handleClickUpload}>
        <UploadIcon />
        {file ? <Text>Replace file</Text> : <Text>Select a file</Text>}
      </StyledFileInput>
      {/* hide the real input field */}
      <input
        ref={hiddenFileInput}
        onChange={handleChange}
        type="file"
        style={{ display: 'none' }}
      />
      {descriptionBottom && (
        <Text color="text2" italic weight={400} style={{ marginTop: 8 }}>
          {descriptionBottom}
        </Text>
      )}
    </div>
  )
}

const ContextOptions = ({ setFile, handleClickUpload }) => {
  return (
    <>
      <ContextItem onClick={() => handleClickUpload()} icon={EditIcon}>
        Edit
      </ContextItem>
      <ContextItem color="red" onClick={() => setFile(null)} icon={DeleteIcon}>
        Remove
      </ContextItem>
    </>
  )
}
