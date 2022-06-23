import React from 'react'
import { Checkbox as _Checkbox, Input } from '~'

export const Checkbox = () => {
  return (
    <>
      <_Checkbox style={{ marginBottom: 8 }} />
      <_Checkbox style={{ marginBottom: 8 }}>With Label</_Checkbox>
      <_Checkbox style={{ marginBottom: 8 }} checked>
        Selected
      </_Checkbox>
      <_Checkbox style={{ marginBottom: 8 }} checked label="With label">
        And Description
      </_Checkbox>
    </>
  )
}

export const Text = () => {
  return (
    <>
      <Input />
      <Input>With Label</Input>
    </>
  )
}
