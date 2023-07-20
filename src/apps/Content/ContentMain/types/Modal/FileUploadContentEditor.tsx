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
  // const [progress, setProgress] = useState(null)

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
        looseMime
        // progress={progress}
        onChange={(files) => {
          if (files.length === 0) {
            onChange('')
          } else {
            onChange({ $files: files, $type: type, $key: key, $data: data })
          }
        }}
        indent
        value={
          state[key] === ''
            ? []
            : (state[key] && state[key].$files) ||
              (type === 'file' || type === 'reference'
                ? data[key]?.src
                  ? [
                      {
                        src: data[key]?.src,
                        type: data[key]?.mimeType,
                        name: data[key]?.name,
                      },
                    ]
                  : null
                : data[key]
                ? [
                    {
                      src: data[key],
                      type: mimeType,
                      name: data[key],
                    },
                  ]
                : null)
        }
        style={{ marginBottom: BOTTOMSPACE }}
        mime={mimeType ? [mimeType] : meta?.mime}
      />
    </div>
  )
}
