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
  const [progress, setProgress] = useState(null)

  // replace shit fileUpload

  const mimeType: string = mimeTypeKey
    ? pathReader(data, mimeTypeKey.split('.'))
    : undefined

  return (
    <div>
      {/* {progress * 100}% */}
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
          // updateProgess
          // console.info('FIRE', files[0])

          // if string
          console.info('FLAP', files)
          if (type === 'string') {
            // client
            //   .stream('db:file-upload', { contents: files[0] }, (e) =>
            //     setProgress(e)
            //   )
            //   .then(async (v) => {
            //     // very different...
            //     const { mimeType, name } = await client
            //       .query('db', {
            //         $id: v.id,
            //         mimeType: true,
            //         name: true,
            //       })
            //       .get()
            //     onChange({ ...v, mimeType, name })
            //   })
          } else if (type === 'file' || type === 'reference') {
            // client
            //   .stream('db:file-upload', { contents: files[0] }, (e) =>
            //     setProgress(e)
            //   )
            //   .then(async (v) => {
            //     // very different...
            //     const { mimeType, name } = await client
            //       .query('db', {
            //         $id: v.id,
            //         mimeType: true,
            //         name: true,
            //       })
            //       .get()
            //     onChange({ ...v, mimeType, name })
            //   })
          }
        }}
        indent
        value={
          //  very diferent
          state[key]?.src
            ? [
                {
                  src: state[key]?.src,
                  type: state[key]?.mimeType ?? data[key]?.mimeType,
                  name: state[key]?.name ?? data[key]?.name,
                },
              ]
            : [
                {
                  src: data[key]?.src,
                  type: data[key]?.mimeType,
                  name: data[key]?.name,
                },
              ]
        }
        style={{ marginBottom: BOTTOMSPACE }}
        mime={mimeType ? [mimeType] : meta?.mime}
      />
    </div>
  )
}
