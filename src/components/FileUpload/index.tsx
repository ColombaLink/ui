import React, { CSSProperties, useRef, useState } from 'react'
import { Label, color, Text, spaceToPx, UploadIcon, Button, ErrorIcon } from '~'
import { Space } from '~/types'
import { styled } from 'inlines'
import { UploadedFileItem } from './UploadedFileItem'

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

  const clearFiles = () => {
    setClearCount((clearCount) => clearCount + 1)
    // setFile(null)
    setUploadedFiles([])
    onChangeProp(null)
    setErrorMessage('')
  }

  const handleFileDrop = (e) => {
    console.log('E form handleFileDrop', e)

    if (!disabled) {
      e.preventDefault()
      e.stopPropagation()

      const tempArr = Array.from(e.dataTransfer.files)
      let tempCounter = 0

      for (let i = 0; i < tempArr.length; i++) {
        const file = tempArr[i]
        if (acceptedFileTypes && !acceptedFileTypes.includes(file?.type)) {
          //  console.log('types', file?.type)
          setErrorMessage(`File type: ${file?.type} is not allowed.`)
          setDraggingOver(false)
          return
        }
        tempCounter += 1
      }

      if (acceptedFileTypes) {
        if (tempCounter === tempArr.length) {
          //   const TempArr = Array.from(e.dataTransfer.files)
          setUploadedFiles([...uploadedFiles, ...tempArr])
          onChangeProp([...uploadedFiles, ...tempArr])
        }
      } else {
        const TempArr = Array.from(e.dataTransfer.files)
        setUploadedFiles([...uploadedFiles, ...TempArr])
        onChangeProp([...uploadedFiles, ...TempArr])
      }
      setDraggingOver(false)
    }
  }

  const onChange = (e) => {
    console.log('EEEEe', e.target.files)

    // for multiple files
    if (multiple) {
      const TempArr = Array.from(e.target.files)
      setUploadedFiles([...uploadedFiles, ...TempArr])
      onChangeProp([...uploadedFiles, ...TempArr])
    } else {
      setUploadedFiles([e.target.files[0]])
      onChangeProp(e.target.files[0])
    }

    //  ////////////   ---------   /////////////  //
    //  ////////////   ---------   /////////////  //
    // TODO: add error handling niet alleen op de [0]
    // const msg = error(e.target.files[0].type)
    // if (msg) {
    //   // add error msg
    //   setErrorMessage(msg)
    // } else {
    //   // remove error msg
    //   setErrorMessage('')
    // }
    //  ////////////   ---------   /////////////  //
    //  ////////////   ---------   /////////////  //
  }

  const deleteSpecificFile = (id) => {
    setUploadedFiles((uploadedFiles) =>
      uploadedFiles.filter((_, index) => index !== id)
    )
    console.log('DAS DELETED ID: ', id)
    console.log('uploaded files', uploadedFiles)

    // voor single file upload rerender de hidden input
    if (uploadedFiles.length === 1) {
      setClearCount((clearCount) => clearCount + 1)
    }
  }

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
            onClick={() => clearFiles()}
            style={{ height: 'fit-content', marginBottom: 4 }}
          >
            Clear
          </Button>
        )}
      </div>

      {uploadedFiles?.length > 0 &&
        uploadedFiles?.map((file, idx) => (
          <UploadedFileItem
            file={file}
            handleClickUpload={handleClickUpload}
            deleteSpecificFile={deleteSpecificFile}
            key={idx}
            id={idx}
          />
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
          <Text>{multiple ? 'Select your files' : 'Select a file'}</Text>
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
