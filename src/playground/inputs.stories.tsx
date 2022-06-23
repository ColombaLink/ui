import React from 'react'
import { Checkbox } from '~'

export const Checkboxes = () => {
  return (
    <>
      <Checkbox style={{ marginBottom: 8 }} />
      <Checkbox style={{ marginBottom: 8 }}>With Label</Checkbox>
      <Checkbox style={{ marginBottom: 8 }} checked>
        Selected
      </Checkbox>
      <Checkbox style={{ marginBottom: 8 }} checked label="With label">
        And Description
      </Checkbox>
    </>
  )
}
