import React from 'react'
import { styled } from 'inlines'
import { Button } from '~/components/Button'
import { Text } from '~/components/Text'
import { color, Color } from '~/utils'

export const ContentEditModal = ({ rowData }) => {
  console.log('rowData from Edit modal', rowData)

  return (
    <styled.div
      style={{
        background: color('background'),
        display: 'flex',
        borderRadius: 12,
        width: 'calc(100% -  64px)',
        height: 'calc(100% -  64px)',
      }}
    >
      <styled.div style={{ flexGrow: 1, padding: 32 }}>
        <Text>Test</Text>
      </styled.div>
      <styled.div
        style={{
          maxWidth: 292,
          width: '100%',
          backgroundColor: color('background2'),
          padding: 32,
          borderTopRightRadius: 12,
          borderBottomRightRadius: 12,
          borderLeft: `1px solid ${color('border')}`,
        }}
      >
        <Button large>Publish</Button>
      </styled.div>
    </styled.div>
  )
}
