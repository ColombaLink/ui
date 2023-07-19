import React, { FC, useState } from 'react'
import { FileUpload, pathReader } from '~'
import { useClient } from '@based/react'
import { BOTTOMSPACE } from './constants'

export const FileUploadContentEditor: FC<{
  item: {
    name?: string
    type: string
    meta?: any
    key: string
    mimeTypeKey?: string
  }
  name: string
  data: any
  state: any
  onChange: (fields: any) => void
}> = ({
  name,
  data,
  item: { type, meta, key, mimeTypeKey },
  onChange,
  state,
}) => {
  const client = useClient()

  const [progress, setProgress] = useState(null)

  const mimeType: string = mimeTypeKey
    ? pathReader(data, mimeTypeKey.split('.'))
    : undefined

  return (
    <div>
      <FileUpload
        label={name}
        descriptionBottom="Drag and drop or click to upload"
        description={
          meta?.description ??
          (meta?.mime?.length > 0
            ? `Allowed types: ${meta?.mime?.join(', ')}`
            : null)
        }
        progress={progress}
        onChange={(files) => {
          onChange({
            [key]: { $files: files },
          })
        }}
        indent
        value={
          state[key]
            ? state[key].$files ?? undefined
            : type === 'file' || type === 'reference'
            ? [
                {
                  src: data[key].src,
                  type: data[key]?.mimeType,
                  name: data[key]?.name,
                },
              ]
            : [
                {
                  src: data[key],
                  type: mimeType,
                  name: data[key]?.name ?? data[key]?.title,
                },
              ]
        }
        style={{ marginBottom: BOTTOMSPACE }}
        mime={mimeType ? [mimeType] : meta?.mime}
      />
    </div>
  )
}
