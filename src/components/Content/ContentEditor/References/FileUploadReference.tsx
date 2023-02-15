import React from 'react'
import { FileUpload } from '~'

export const FileUploadReference = ({
  value,
  label,
  description,
  style,
  onChange,
  meta,
  client,
}) => {
  if (value?.mimeType) {
    value.type = value.mimeType
  }
  return (
    <FileUpload
      style={style}
      label={label}
      indent
      descriptionBottom={description}
      space
      multiple={meta.multiple}
      onChange={async (files) => {
        if (!files) {
          onChange({ $delete: true })
          return
        }
        const result = await Promise.all(
          files?.map((file) => {
            return client.file(file)
          })
        )
        onChange(result[0]?.id)
      }}
      value={value}
    />
  )
}
