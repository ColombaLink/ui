import React, { useState } from 'react'
import { color } from '~'
import { styled } from 'inlines'
import { FirstFilterPill } from './FirstFilterPill'
import { RootPill } from './RootPill'

export const QueryBuilder = () => {
  const [isFocus, setIsFocus] = useState<boolean>(false)
  const [inputString, setInputString] = useState<string>('')

  return (
    <styled.div
      style={{
        border: isFocus
          ? `1px solid ${color('accent')}`
          : `1px solid ${color('border')}`,
        outline: isFocus
          ? `2px solid rgba(44, 60, 234, 0.2)`
          : `2px solid transparent`,
        borderRadius: 4,
        padding: 5,
        display: 'flex',
        alignItems: 'center',
        marginBottom: 12,
        cursor: 'text',
      }}
    >
      <RootPill />
      <FirstFilterPill setIsFocus={setIsFocus} />
    </styled.div>
  )
}
