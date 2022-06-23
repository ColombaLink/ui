import React from 'react'
import { Checkbox as _Checkbox, CheckIcon, Input } from '~'

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
      <Input style={{ marginBottom: 8 }} label="String" />
      <Input style={{ marginBottom: 8 }} label="Number" type="number" />
      <Input
        style={{ marginBottom: 8 }}
        label="With Icon Left"
        iconLeft={CheckIcon}
      />
      <Input style={{ marginBottom: 8 }} label="Multiline" multiline />
    </>
  )
}
