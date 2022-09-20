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
        multiple
        indent
        descriptionBottom="You can put upload file here."
        acceptedFileTypes={['.png', '.jpg', '.jpeg', 'video/*']}
        onChange={(e) => console.log('Hallow daar ---> vanuit parent ', e)}
        error={(value) => {
          if (value.includes('jpg')) {
            return 'jpg is not allowed, but it is test'
          }
        }}
      />
    </div>
  )
}
