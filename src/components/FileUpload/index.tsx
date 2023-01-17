import React, { CSSProperties, useRef, useState, FC, useEffect } from 'react'
import {
  Label,
  color,
  Text,
  UploadIcon,
  Button,
  usePropState,
  Input,
  ChevronDownIcon,
  ChevronUpIcon,
  Dialog,
  useDialog,
  Tabs,
  Tab,
} from '~'
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
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: 9,
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
  const [, setIsFocused] = useState(false)
  const [urlInputValue, setUrlInputValue] = useState('')
  const [fileName, setFileName] = useState('')
  const [showMoreOptions, setShowMoreOptions] = useState(false)

  const hiddenFileInput = useRef(null)

  if (!Array.isArray(uploadedFiles)) {
    uploadedFiles = uploadedFiles ? [uploadedFiles] : []
  }

  const dialog = useDialog()
  const renameDialog = useDialog()

  const handleClickUpload = async () => {
    // now we are gonna open new modal here

    let otherUrlInputValue = ''

    dialog.open(
      <Dialog>
        <Tabs>
          <Tab label="Upload">
            <Button
              style={{ marginTop: '16px' }}
              outline
              color="lightaction"
              fill
              textAlign="center"
              onClick={() => {
                // upload
                if (!disabled) {
                  hiddenFileInput.current.click()
                }
              }}
            >
              Upload file
            </Button>
          </Tab>
          <Tab label="Embed link">
            <div
              style={{
                marginTop: '16px',
              }}
            >
              <Input
                space="20px"
                placeholder="Paste the image link..."
                onChange={(e) => {
                  setUrlInputValue(e)
                  otherUrlInputValue = e
                }}
                value={urlInputValue}
              />
              <Button
                large
                style={{ margin: '0 auto' }}
                onClick={() => urlHandler(otherUrlInputValue)}
              >
                Embed image
              </Button>
            </div>
          </Tab>
        </Tabs>
      </Dialog>
    )
  }

  // close dialog if uploadedFiles  is changed
  useEffect(() => {
    dialog.close()
  }, [uploadedFiles])

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
        newValue = [files[0]]
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

  // should TODO delete file instead of the onChange([])
  const deleteSpecificFile = (id) => {
    setUploadedFiles((uploadedFiles) =>
      Array.isArray(uploadedFiles)
        ? uploadedFiles?.filter((_, index) => index !== id)
        : onChange([])
    )
    setClearCount((clearCount) => clearCount + 1)
  }

  const replaceSpecificFile = (id) => {
    console.log('Edit file through a modal, like name? or something??', id)
  }

  const urlHandler = async (urlInput) => {
    if (urlInput) {
      const file = await fetch(urlInput)
        .then(
          (res) => res.blob()
          //  mimetype = res.headers.get('content-type')
          //  console.log('type is', mimetype)
        )
        .then(
          (blobFile) =>
            new File([blobFile], fileName || urlInput.split('/').pop(), {
              type: blobFile.type,
            })
        )
      console.log('file before', file)
      urlUploadFile([file])
    }
  }

  const urlUploadFile = async (e) => {
    let files = e
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
      newValue = [files[0]]
    }
    setUploadedFiles(newValue)
    onChange(newValue)
    setUrlInputValue('')
  }

  // console.log('??? Uploaded Files?', uploadedFiles)
  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  const downloadFile = (file) => {
    const url = window.URL.createObjectURL(file)
    const link = document.createElement('a')
    link.download = file.name
    link.href = url
    link.click()
  }

  const renameFile = (file, idx) => {
    console.log('rename file', file, idx)
    console.log('file name', file.name)
    const renameArr = [...uploadedFiles]

    let newFileName = ''

    renameDialog.open(
      <Dialog label="Rename">
        <Input
          placeholder="Example.png"
          value={fileName}
          onChange={(e) => {
            setFileName(e)
            newFileName = e
          }}
        />
        <Button
          large
          style={{ margin: '20px auto' }}
          onClick={() => {
            renameArr[idx].name = newFileName
            setUploadedFiles([...renameArr])
            renameDialog.close()
          }}
        >
          Rename file
        </Button>
      </Dialog>
    )
  }

  const duplicateFile = (file, idx) => {
    console.log('duplicate file', file, idx)

    let dupliArr = [...uploadedFiles]
    dupliArr.splice(idx, 0, file)

    console.log('dupliArr', dupliArr)

    setUploadedFiles([...dupliArr])
  }

  return (
    <InputWrapper
      indent={indent}
      descriptionBottom={descriptionBottom}
      disabled={disabled}
      errorMessage={errorMessage}
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
              downloadFile={() => downloadFile(file)}
              duplicateFile={() => duplicateFile(file, idx)}
              openInNewTab={() => openInNewTab(uploadedFiles[idx].src)}
              renameFile={() => renameFile(file, idx)}
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
              : color('background'),
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
            <Text>{!multiple ? 'Replace file' : 'Upload new file'}</Text>
          ) : (
            <Text>{multiple ? 'Select your files' : 'Upload new file'}</Text>
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
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: 12,
          marginBottom: 12,
          cursor: 'pointer',
        }}
        onClick={() => {
          setShowMoreOptions(!showMoreOptions)
        }}
      >
        <Text typo="caption500" style={{ marginRight: 12 }}>
          More Options
        </Text>
        {showMoreOptions ? (
          <ChevronDownIcon size={12} />
        ) : (
          <ChevronUpIcon size={12} />
        )}
      </div>
      {showMoreOptions && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Input
              label="File name"
              placeholder="Your file name"
              space={12}
              style={{ width: '100%' }}
              value={fileName}
              onChange={(e) => {
                setFileName(e)
              }}
            />
          </div>
        </div>
      )}
    </InputWrapper>
  )
}
