import React from 'react'

type FileUploadProps = {
  label?: string
  description?: string
  descriptionBottom?: string
  indent?: boolean
  error?: string
  onChange?: (file: File) => void
}

export const FileUpload = ({
  label,
  description,
  descriptionBottom,
  indent,
  error,
  onChange,
}: FileUploadProps) => {
  return <div>FileUpload</div>
}
