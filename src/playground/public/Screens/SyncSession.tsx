import React, { Fragment, useState } from 'react'
import { Topbar } from '~/components/Topbar'
import { Page, Text, Container, Button, border } from '~'
import { InfiniteList } from '~/components/InfiniteList'
import { useClient } from '@based/react'

export const SyncSession = () => {
  const client = useClient()
  const [state, setState] = useState('lorem ipsum')
  const [pos, setPos] = useState(0)

  return (
    <>
      <Topbar />
      <div style={{ display: 'flex' }}>
        <textarea
          value={state}
          onInput={(e) => setPos(e.target.selectionEnd)}
          onChange={(e) => setState(e.target.value)}
          style={{
            all: 'unset',
            height: 400,
            width: 300,
            border: '1px solid red',
          }}
        />
        <div
          style={{
            all: 'unset',
            height: 400,
            width: 300,
            border: '1px solid blue',
          }}
        >
          <span
            style={{ borderRight: '1px solid red' }}
            onInput={(e) => {
              // console.log(e.target.selectionEnd)
              // setPos(e.target.selectionEnd)
            }}
            onChange={(e) => {
              // setState(e.target.value)
            }}
            contentEditable
            dangerouslySetInnerHTML={{
              __html: state
                // .substring(0, pos)
                .replace(/\n/g, '<br/>')
                .replace(/ /g, '&nbsp'),
            }}
          />
        </div>
      </div>
    </>
  )
}
