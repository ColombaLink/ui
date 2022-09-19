import React from 'react'
import { FileUpload, Spacer } from '~'

export const Upload = () => {
  return (
    <div>
      Upload Some!
      <Spacer space="32px" />
      <FileUpload
        label="Upload"
        //   description="do it!"
        indent
        descriptionBottom="You can put upload file here."
      />
    </div>
  )
}
