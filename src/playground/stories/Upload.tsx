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
        //  disabled
        indent
        descriptionBottom="You can put upload file here."
        acceptedFileTypes={['.png', '.jpg', '.jpeg', 'video/*']}
        onChange={(e) => console.log('Hallow daar ---> vanuit parent ', e)}
      />
    </div>
  )
}
