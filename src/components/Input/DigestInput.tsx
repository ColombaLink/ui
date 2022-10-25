import React, { useEffect, useState } from 'react'
import { Input } from '.'
import { Text, EyeIcon, EyeBlockedIcon } from '~'

type DigestInputProps = {
  value?: string
  onChange?: (value: string | number | null) => void
  props?: any
}

export const DigestInput = ({ value, onChange, props }: DigestInputProps) => {
  return (
    <div
      style={{ display: 'flex', position: 'relative', alignItems: 'center' }}
    >
      <Input {...props} style={{ width: '100%' }} />
      {/* // onclick should change the input type to text from password */}
      <EyeIcon style={{ position: 'absolute', right: 8 }} />
      <EyeBlockedIcon style={{ position: 'absolute', right: 8 }} />
    </div>
  )
}
