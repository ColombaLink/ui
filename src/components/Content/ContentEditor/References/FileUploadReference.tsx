import React, { useEffect } from 'react'
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

  console.log('client??? ', client)

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

            return client.file(file)
          })
        )

        onChange(result[0]?.id)

        // onChange(
        //   multiple
        //     ? result.map((file) => file?.id) || { $delete: true }
        //     : result[0]?.id || { $delete: true }
        // )
      }}
      value={value}
    />
  )
}
