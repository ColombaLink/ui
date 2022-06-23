import React from 'react'
import { Checkbox, Provider } from '~'
import { styled } from 'inlines'

export const Checkboxes = () => {
  return (
    <Provider>
      <Checkbox style={{ marginBottom: 8 }} />
      <Checkbox style={{ marginBottom: 8 }}>With Label</Checkbox>
      <Checkbox style={{ marginBottom: 8 }} hover>
        Hovering
      </Checkbox>
      <Checkbox style={{ marginBottom: 8 }} checked>
        Selected
      </Checkbox>
      <Checkbox style={{ marginBottom: 8 }} checked hover>
        Selected and hovering
      </Checkbox>
    </Provider>
  )
}
