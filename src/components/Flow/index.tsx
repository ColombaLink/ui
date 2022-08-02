import React from 'react'
import { Header } from './Header'

// flow props types

type FlowProps = {}

//header flow component

//footer flow component

export const Flow: FlowProps = (props) => {
  return (
    <div>
      blah
      <Header
        outline
        label="Editable label"
        indicator="indicatoro"
        onEditTitle={() => {}}
      />
    </div>
  )
}
