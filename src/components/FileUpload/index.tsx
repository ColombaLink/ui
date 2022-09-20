import React, { CSSProperties, useEffect, useRef, useState } from 'react'
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
  ErrorIcon,
} from '~'
import { Space } from '~/types'
import { styled } from 'inlines'

type FileUploadProps = {
  label?: string
  description?: string
  descriptionBottom?: string
  indent?: boolean
  error?: (str: string) => string
  onChange?: (file: File[]) => void
  style?: CSSProperties
  space?: Space
  disabled?: boolean
  acceptedFileTypes?: string[]
  multiple?: boolean
}

const StyledFileInput = styled('div', {
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: 6,
  paddingLeft: 12,
  backgroundColor: color('background2'),
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
  '&:hover': {
    cursor: 'pointer',
  },
})

export const FileUpload = ({
  label,
  acceptedFileTypes,
  description,
  descriptionBottom,
  indent,
  error,
  onChange: onChangeProp,
  space,
  style,
  disabled,
  multiple,
}: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null)
  const [draggingOver, setDraggingOver] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [clearCount, setClearCount] = useState(0)

  // for multiple files
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])

  const hiddenFileInput = useRef(null)

  const handleClickUpload = () => {
    if (!disabled) {
      hiddenFileInput.current.click()
    }
  }

  const clearFile = () => {
    setClearCount((clearCount) => clearCount + 1)
    // setFile(null)
    setUploadedFiles([])
    onChangeProp(null)
    setErrorMessage('')
  }

  const handleFileDrop = (e) => {
    if (!disabled) {
      e.preventDefault()
      e.stopPropagation()
      //  console.log('from DROP --->', e.dataTransfer.files[0])
      if (acceptedFileTypes) {
        if (
          acceptedFileTypes.indexOf(e.dataTransfer.files[0].type) &&
          e.dataTransfer.files[0].type !== ''
        ) {
          setFile(e.dataTransfer.files[0])
          onChangeProp(e.dataTransfer.files[0])
        } else {
          setFile(null)
        }
      } else {
        setFile(e.dataTransfer.files[0])
        onChangeProp(e.dataTransfer.files[0])
      }
      setDraggingOver(false)
    }
  }

  const onChange = (e) => {
    // can only input accepted anyway??

    // setFile(e.target.files[0])
    // onChangeProp(e.target.files[0])

    console.log('EEEEe', e.target.files)

    // for multiple files
    if (multiple) {
      const TempArr = Array.from(e.target.files)
      setUploadedFiles([...uploadedFiles, ...TempArr])
      onChangeProp([...uploadedFiles, ...TempArr])
      console.log('uploadedFiles', uploadedFiles)
    } else {
      setUploadedFiles([e.target.files[0]])
      onChangeProp(e.target.files[0])
    }

    const msg = error(e.target.files[0].name)
    if (msg) {
      // add error msg
      setErrorMessage(msg)
    } else {
      // remove error msg
      setErrorMessage('')
    }
  }

  useEffect(() => {
    console.log('uploaded files changed', uploadedFiles)
  }, [uploadedFiles])

  // IF FILE IS NOT ACCEPTED SET ERROR MESSAGE ?

  const contextHandler = useContextMenu(
    ContextOptions,
    { handleClickUpload, clearFile },
    { placement: 'right' }
  )

  return (
    <styled.div
      style={{
        paddingLeft: indent ? 12 : null,
        borderLeft: errorMessage
          ? `2px solid ${color('red')}`
          : uploadedFiles.length > 0
          ? `2px solid ${color('accent')}`
          : indent
          ? `2px solid ${color('border')}`
          : 'none',
        marginBottom: spaceToPx(space),
        '&:hover': {
          cursor: disabled ? 'not-allowed' : 'pointer',
        },
        ...style,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Label
          label={label}
          labelColor={disabled ? 'text2' : 'text'}
          description={description}
          space="8px"
        />

        {uploadedFiles.length > 0 && (
          <Button
            ghost
            onClick={() => clearFile()}
            style={{ height: 'fit-content', marginBottom: 4 }}
          >
            Clear
          </Button>
        )}
      </div>

      {/* {uploadedFiles?.length > 0 &&
        uploadedFiles?.map((file, idx) => (
          <StyledUploadedFile key={idx}>
            <AttachmentIcon />
            {file.name}
          </StyledUploadedFile>
        ))}
      // {file && ( */}

      {uploadedFiles?.length > 0 &&
        uploadedFiles?.map((file, idx) => (
          <StyledUploadedFile key={idx}>
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
        ))}
      {/* // end map */}
      <StyledFileInput
        onClick={handleClickUpload}
        onDragOver={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setDraggingOver(true)
        }}
        onDrop={handleFileDrop}
        onDragLeave={() => setDraggingOver(false)}
        style={{
          backgroundColor: draggingOver
            ? color('lightaccent')
            : color('background2'),
          border: draggingOver
            ? `1px dashed ${color('accent')}`
            : `1px dashed ${color('border')}`,
          '&:hover': {
            cursor: disabled ? 'not-allowed' : 'pointer',
          },
        }}
      >
        <UploadIcon />
        {draggingOver ? (
          <Text>Drop to upload</Text>
        ) : file ? (
          <Text>Replace file</Text>
        ) : (
          <Text>Select a file</Text>
        )}
      </StyledFileInput>
      {/* hide the real input field */}
      <input
        ref={hiddenFileInput}
        onChange={onChange}
        type="file"
        style={{ display: 'none' }}
        accept={acceptedFileTypes && acceptedFileTypes.join(',')}
        key={clearCount}
        multiple={multiple}
      />
      {descriptionBottom && (
        <Text color="text2" italic weight={400} style={{ marginTop: 8 }}>
          {descriptionBottom}
        </Text>
      )}
      {errorMessage && (
        <div
          style={{
            display: 'flex',
            gap: 6,
            alignItems: 'center',
            marginTop: 6,
          }}
        >
          <ErrorIcon color="red" size={16} />
          <Text color="red">{errorMessage}</Text>
        </div>
      )}
    </styled.div>
  )
}

const ContextOptions = ({ clearFile, handleClickUpload }) => {
  return (
    <>
      <ContextItem onClick={() => handleClickUpload()} icon={EditIcon}>
        Edit
      </ContextItem>
      <ContextItem color="red" onClick={clearFile} icon={DeleteIcon}>
        Remove
      </ContextItem>
    </>
  )
}
