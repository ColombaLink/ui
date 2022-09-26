import React from 'react'
import { FileUpload } from '~'
import ComponentViewer from '../ComponentViewer'

export const Upload = () => {
  return (
    <ComponentViewer
      component={FileUpload}
      propsName="FileUploadProps"
      examples={[
        {
          props: {
            label: 'Upload',
            descriptionBottom: 'Drag and drop or click to upload',
            onChange: (files) => console.log(files),
            multiple: true,
            indent: true,
            acceptedFileTypes: [
              'image/png',
              'image/jpeg',
              'image/jpg',
              'video/*',
            ],
          },
        },
      ]}
    />
  )
}
