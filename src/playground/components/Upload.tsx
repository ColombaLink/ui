import React from 'react'
import { FileUpload } from '~'
import ComponentViewer from '../ComponentViewer'

export const Upload = () => {
  const exampleUploadSingle = {
    props: {
      label: 'Upload',
      descriptionBottom: 'Drag and drop or click to upload',
      onChange: (files) => console.log(files),
      multiple: false,
      indent: true,
      acceptedFileTypes: ['image/png', 'image/jpeg', 'image/jpg', 'video/*'],
    },
  }
  const exampleUploadedSingle = {
    props: {
      label: 'Upload',
      descriptionBottom: 'Drag and drop or click to upload',
      onChange: (files) => console.log(files),
      multiple: false,
      indent: true,
      acceptedFileTypes: ['image/png', 'image/jpeg', 'image/jpg', 'video/*'],
      value: [
        {
          type: 'image',
          name: 'blablabla',
          src: 'https://based-5521048989376.imgix.net/fid70375bd/739f6a4c-ad41-4253-bb4b-1e87555d0f68-55122391-3c9f-4db1-b32b-c2c01923f89c-8bdabe66-085e-455f-a85a-31dc9b3343d7.png',
        },
      ],
    },
  }
  const exampleUploadPlural = {
    props: {
      label: 'Upload',
      descriptionBottom: 'Drag and drop or click to upload',
      onChange: (files) => console.log(files),
      multiple: true,
      indent: true,
      acceptedFileTypes: ['image/png', 'image/jpeg', 'image/jpg', 'video/*'],
    },
  }
  const exampleUploadedPlural = {
    props: {
      label: 'Upload',
      descriptionBottom: 'Drag and drop or click to upload',
      onChange: (files) => console.log(files),
      multiple: true,
      indent: true,
      acceptedFileTypes: ['image/png', 'image/jpeg', 'image/jpg', 'video/*'],
      value: [
        {
          type: 'image',
          name: 'file1',
          src: 'https://based-5521048989376.imgix.net/fid70375bd/739f6a4c-ad41-4253-bb4b-1e87555d0f68-55122391-3c9f-4db1-b32b-c2c01923f89c-8bdabe66-085e-455f-a85a-31dc9b3343d7.png',
        },
        {
          type: 'image',
          name: 'file2',
          src: 'https://based-5521048989376.imgix.net/fiae726b6f/e17804f3-46be-4cb6-a4d3-5d3065841ada-f9fd4b10-e7d0-4ae8-aea5-3f33d3d9dbff-05f80e33-8cef-493f-970c-c0af57a69a92.png',
        },
      ],
    },
  }

  return (
    <ComponentViewer
      component={FileUpload}
      propsName="FileUploadProps"
      examples={[
        exampleUploadSingle,
        exampleUploadedSingle,
        exampleUploadPlural,
        exampleUploadedPlural,
      ]}
    />
  )
}
