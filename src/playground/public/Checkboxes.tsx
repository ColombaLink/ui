import React from 'react'
import { Checkbox } from '~'
import ComponentViewer from '../ComponentViewer'

export const Checkboxes = () => {
  return (
    <>
      <ComponentViewer component={Checkbox} />
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
