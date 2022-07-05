import React from 'react'
import { Checkbox } from '~'

export const Checkboxes = () => {
  return (
    <>
      <Checkbox />
      <br />
      <Checkbox>With Label</Checkbox>
      <br />
      <Checkbox checked>Selected</Checkbox>
      <br />
      <Checkbox checked label="With label">
        And Description
      </Checkbox>
    </>
  )
}
