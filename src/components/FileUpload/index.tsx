import React, { useRef, useState, FC, useEffect } from 'react'
import {
  Label,
  color,
  Text,
  UploadIcon,
  Button,
  usePropState,
  Input,
  Dialog,
  useDialog,
  Tabs,
  Tab,
  MimeType,
  styled,
  Style,
  RowSpaced,
  removeOverlay,
} from '~'
import { UploadedFileItem } from './UploadedFileItem'
import { InputWrapper } from '../Input/InputWrapper'

type FileUploadProps = {
  label?: string
  description?: string
  descriptionBottom?: string
  indent?: boolean
  onChange?: (file: File[]) => void
  // onChange?: (file: File[], onProgress: (p: number) => void) => void
  style?: Style
  disabled?: boolean
  mime?: string[]
  multiple?: boolean
  value?: [{ name?: string; type?: MimeType; src: string }]
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
  description,
  descriptionBottom,
  indent,
  onChange,
  style,
  disabled,
  multiple,
  value,
  mime,
}) => {
  let [uploadedFiles, setUploadedFiles] = usePropState(value)
  const [draggingOver, setDraggingOver] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [clearCount, setClearCount] = useState(0)
  const [, setIsFocused] = useState(false)
  const [urlInputValue, setUrlInputValue] = useState('')
  const [fileName, setFileName] = useState('')

  // wrap onChange here
  /*
    onChange = (files)) => {
      const [progress, setProgress] = useState(undefined)

        onChangeFromProps(files, setProgress)
    
    }
  */

  // const [progress, setProgress] = useState(undefined)
  // const onChangeFromProps = onChange
  // onChange = (file, progress) => {
  //   onChangeFromProps(file, setProgress)
  //   console.log(progress)
  // }

  const hiddenFileInput = useRef(null)

  if (!Array.isArray(uploadedFiles)) {
    uploadedFiles = uploadedFiles ? [uploadedFiles] : []
  }

  const dialog = useDialog()
  const { prompt } = useDialog()
  const fullScreenDialog = useDialog()
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
                  removeOverlay()
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
                type="text"
                style={{ marginBottom: 20 }}
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

  // TODO? :close dialog if uploadedFiles  is changed
  useEffect(() => {
    //   dialog.close()
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

      if (mime) {
        files = files.filter((file: File) => {
          const accepted = mime.includes(file.type)
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
        : onChange(undefined)
    )
    setClearCount((clearCount) => clearCount + 1)
  }

  const urlHandler = async (urlInput) => {
    if (urlInput) {
      const file = await fetch(urlInput)
        .then((res) => res.blob())
        .then(
          (blobFile) =>
            new File([blobFile], fileName || urlInput.split('/').pop(), {
              type: blobFile.type,
            })
        )

      urlUploadFile([file])
      // console.log(dialog._id)
      // console.log('BLOB 🏄‍♂️ -> ', file)
      removeOverlay()
    }
  }

  const urlUploadFile = async (e) => {
    let files = e
    if (mime) {
      files = files.filter((file: File) => {
        const accepted = mime.includes(file.type)
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

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  const downloadFile = (file) => {
    const link = document.createElement('a')
    link.download = file.name
    link.href = file.url
    link.click()
  }

  const renameFile = async (file, idx) => {
    const extension = file.name.split('.').pop()
    const renameArr = [...uploadedFiles]

    const ok = await prompt('Rename file')
    if (ok && ok !== undefined) {
      setFileName(ok + '.' + extension)

      renameArr[idx].name = ok + '.' + extension
      setUploadedFiles([...renameArr])
    }
    onChange([...renameArr])
  }

  const fullScreenView = (file) => {
    fullScreenDialog.open(
      <Dialog
        style={{ overflow: 'hidden', padding: 0, '& div div': { padding: 0 } }}
      >
        <styled.img
          src={file.src}
          style={{
            width: '100%',
            height: '100%',
            borderTopRightRadius: 8,
            borderTopLeftRadius: 8,
          }}
        />
        <div>
          <RowSpaced
            style={{
              padding: '16px !important',
              margin: '8px 16px',
              marginBottom: ' -14px',
            }}
          >
            <Text typography="body500" color="text2">
              {file.name}
            </Text>
            <Button
              ghost
              large
              color="text"
              onClick={() => {
                fullScreenDialog.close()
              }}
            >
              Close
            </Button>
          </RowSpaced>
        </div>
      </Dialog>
    )
  }

  const replaceSpecificFile = (id) => {
    console.log('Edit file through a modal, like name? or something??', id)
  }

  // TODO: not working great yet ??
  const duplicateFile = (file, idx) => {
    console.log('duplicate file', file, idx)

    const dupliArr = [...uploadedFiles]
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
      hideClearButton
      style={style}
    >
      <styled.div style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Label
            label={label}
            labelColor={disabled ? 'text2' : 'text'}
            description={description}
            style={{ marginBottom: 8 }}
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
              replaceSpecificFile={() => replaceSpecificFile(idx)}
              downloadFile={() => downloadFile(file)}
              duplicateFile={() => duplicateFile(file, idx)}
              openInNewTab={() => openInNewTab(uploadedFiles[idx].src)}
              renameFile={() => renameFile(file, idx)}
              fullScreenView={() => fullScreenView(file)}
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
            '@media (hover: hover)': {
              '&:hover': {
                cursor: disabled ? 'not-allowed' : 'pointer',
              },
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
          onChange={(e) => {
            console.log('-->??', e)
            changeHandler(e)
          }}
          type="file"
          style={{ display: 'none' }}
          accept={mime ? mime?.join(',') : '/*'}
          onLoadedData={(e) => console.log('ARRR', e)}
          key={clearCount}
          multiple={multiple}
        />
      </styled.div>
    </InputWrapper>
  )
}
