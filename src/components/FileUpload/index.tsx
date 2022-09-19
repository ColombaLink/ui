import React, { CSSProperties, useRef, useState } from 'react'
import { Label, color, Text, spaceToPx, UploadIcon, AttachmentIcon } from '~'
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
  padding: 6,
  paddingLeft: 12,
  borderRadius: 4,
  alignItems: 'center',
  gap: 12,
  marginBottom: 8,
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
    console.log(e)
    console.log(e.target.files[0])

    setFile(e.target.files[0])

    // for multiple files
    // setUploadedFiles([...uploadedFiles, e.target.files[0]])

    console.log('the fiel', file)
  }

  return (
    <div
      style={{
        paddingLeft: indent ? 12 : null,
        borderLeft: indent ? `2px solid ${color('border')}` : 'none',
        marginBottom: spaceToPx(space),
        ...style,
      }}
    >
      <Label label={label} description={description} space="8px" />
      {/* {uploadedFiles &&
        uploadedFiles.map((file, idx) => (
          <StyledUploadedFile key={idx}>
            <AttachmentIcon />
            {file.name}
          </StyledUploadedFile>
        ))} */}
      {file && (
        <StyledUploadedFile>
          <AttachmentIcon />
          <Text weight={400}>{file.name}</Text>
        </StyledUploadedFile>
      )}
      <StyledFileInput onClick={handleClickUpload}>
        <UploadIcon />{' '}
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
