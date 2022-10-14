import React, { CSSProperties, useRef, useState, FC } from 'react'
import { Label, color, Text, UploadIcon, Button, usePropState } from '~'
import { Space } from '~/types'
import { styled } from 'inlines'
import { UploadedFileItem } from './UploadedFileItem'
import { InputWrapper } from '../Input/InputWrapper'

type FileUploadProps = {
  label?: string
  description?: string
  descriptionBottom?: string
  indent?: boolean
  // error?: (str: string) => string
  onChange?: (file: File[]) => void
  style?: CSSProperties
  space?: Space
  disabled?: boolean
  acceptedFileTypes?: string[]
  multiple?: boolean
  value?: any
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

export const FileUpload: FC<FileUploadProps> = ({
  label,
  acceptedFileTypes,
  description,
  descriptionBottom,
  indent,
  // error,
  onChange,
  space,
  style,
  disabled,
  multiple,
  value,
}) => {
  let [uploadedFiles, setUploadedFiles] = usePropState(value)
  const [draggingOver, setDraggingOver] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [clearCount, setClearCount] = useState(0)
  const [isFocused, setIsFocused] = useState(false)
  const hiddenFileInput = useRef(null)

  if (!Array.isArray(uploadedFiles)) {
    uploadedFiles = uploadedFiles ? [uploadedFiles] : []
  }

  const handleClickUpload = () => {
    if (!disabled) {
      hiddenFileInput.current.click()
    }
  }

  const clearFiles = () => {
    setClearCount((clearCount) => clearCount + 1)
    setUploadedFiles([])
    onChange([])
    setErrorMessage('')
  }

  const handleFileDrop = (e) => {
    setErrorMessage('')
    setDraggingOver(false)
    setIsFocused(false)

    if (!disabled) {
      e.preventDefault()
      e.stopPropagation()

      let files = Array.from(e.dataTransfer.files)

      if (acceptedFileTypes) {
        files = files.filter((file: File) => {
          const accepted = acceptedFileTypes.includes(file.type)
          if (!accepted) {
            setErrorMessage(`File type: ${file?.type} is not allowed.`)
            setDraggingOver(false)
          }
          return accepted
        })
      }

      let newValue = [...uploadedFiles, ...files]
      if (!multiple) {
        const [first] = newValue
        newValue = first ? [first] : []
      }
      setUploadedFiles(newValue)
      onChange(newValue)
    }
  }

  const changeHandler = (e) => {
    const newValue = multiple
      ? [...uploadedFiles, ...e.target.files]
      : [e.target.files[0]]

    setUploadedFiles(newValue)
    onChange(newValue)
    setErrorMessage('')
  }

  const deleteSpecificFile = (id) => {
    setUploadedFiles((uploadedFiles) =>
      uploadedFiles.filter((_, index) => index !== id)
    )
    setClearCount((clearCount) => clearCount + 1)
  }

  const replaceSpecificFile = (id) => {
    console.log('Should open edit modal --> The id:', id)
  }

  console.log('???', uploadedFiles)

  return (
    <InputWrapper
      indent={indent}
      descriptionBottom={descriptionBottom}
      disabled={disabled}
      errorMessage={errorMessage}
      focus={isFocused}
      space={space}
      style={style}
    >
      <styled.div style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}>
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
          uploadedFiles.map((file, idx) => (
            <UploadedFileItem
              file={file}
              handleClickUpload={handleClickUpload}
              deleteSpecificFile={deleteSpecificFile}
              replaceSpecificFile={replaceSpecificFile}
              key={idx}
              id={idx}
            />
          ))}
        {/* // end map */}
        <StyledFileInput
          onClick={handleClickUpload}
          onDragOver={(e) => {
            setIsFocused(true)
            e.preventDefault()
            e.stopPropagation()
            setDraggingOver(true)
          }}
          onDrop={handleFileDrop}
          onDragLeave={() => {
            setDraggingOver(false)
            setIsFocused(false)
          }}
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
          ) : uploadedFiles.length > 0 && !multiple ? (
            <Text>{!multiple ? 'Replace file' : 'Select a file'}</Text>
          ) : (
            <Text>{multiple ? 'Select your files' : 'Select a file'}</Text>
          )}
        </StyledFileInput>
        {/* hide the real input field */}
        <input
          ref={hiddenFileInput}
          onChange={(e) => changeHandler(e)}
          type="file"
          style={{ display: 'none' }}
          accept={acceptedFileTypes && acceptedFileTypes.join(',')}
          key={clearCount}
          multiple={multiple}
        />
      </styled.div>
    </InputWrapper>
  )
}
