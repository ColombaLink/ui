import React from 'react'
import { FileUpload } from '~'

export const FileUploadReference = ({
  value,
  label,
  description,
  style,
  onChange,
  multiple,
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
        const result = await Promise.all(
          files?.map((file) => {
            console.log('file 🐤', file)
            console.log(client.file(file), 'client.file(file) 🐤')

            return client.file(file)
          })
        )

        onChange(
          multiple
            ? result.map((file) => file?.id) || { $delete: true }
            : result[0]?.id || { $delete: true }
        )
      }}
      value={value}
    />
  )
}
