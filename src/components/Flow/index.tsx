import React from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { Footer } from './Footer'
import { FooterBottom } from './FooterBottom'
import { Sequence } from './Sequence'
import { Header } from './Header'
import { wait } from '@saulx/utils'
import { AddIcon } from '~'

// flow props types

type FlowProps = {}

//header flow component

//footer flow component

export const Flow: FlowProps = (props) => {
  return (
    <AutoSizer>
      <Header outline label="Editable label" onEditTitle={() => {}} />
      <Footer
        label="New Footer seq"
        onClick={async (e, data) => {
          await wait(1e3)
        }}
        outline
        icon={AddIcon}
      />
    </AutoSizer>
  )
}
