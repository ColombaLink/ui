import React from 'react'
import { Input, CheckIcon, EditIcon, LockIcon, EmailIcon } from '~'

export const InputFields = () => {
  return (
    <>
      <Input label="String" type="gender" />
      <br />
      <Input label="Number" type="number" />
      <br />
      <Input label="With Icon Left" iconLeft={CheckIcon} />
      <br />
      <Input large label="With Icon Right" iconRight={EditIcon} />
      <br />
      <Input
        label="With Description"
        description="More information about this field."
      />
      <br />
      <Input label="Multiline" multiline />
      <br />
      <Input label="Optional Multiline" optional multiline />
      <br />
      <Input label="With Background" bg />
      <br />
      <Input
        large
        label="Password"
        iconLeft={LockIcon}
        type="password"
        placeholder="Password"
      />
      <br />
      <Input large iconLeft={EmailIcon} placeholder="Email address" />
      <br />
      <Input
        label="Email"
        large
        iconLeft={EmailIcon}
        placeholder="Email address"
      />
    </>
  )
}
