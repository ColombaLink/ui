import React from 'react'
import { styled } from 'inlines'
import { Button } from '~/components/Button'
import { Text } from '~/components/Text'
import { color } from '~/utils'
import { ContentEditor } from './ContentEditor'

export const ContentEditModal = ({ rowData }) => {
  return (
    <styled.div
      style={{
        background: color('background'),
        display: 'flex',
        borderRadius: 12,
        width: 'calc(100% -  64px)',
        maxWidth: 1164,
        height: 'calc(100% -  64px)',
      }}
    >
      <styled.div style={{ flexGrow: 1, overflowY: 'auto' }}>
        <styled.div
          style={{
            borderBottom: `1px solid ${color('border')}`,
            padding: '24px 32px',
          }}
        >
          <Text typography="subtitle500">{rowData.type}</Text>
        </styled.div>
        <styled.div>
          <ContentEditor rowData={rowData} />
        </styled.div>
      </styled.div>

      <styled.div
        style={{
          maxWidth: 260,
          width: '100%',
          backgroundColor: color('background2'),
          padding: 24,
          borderTopRightRadius: 12,
          borderBottomRightRadius: 12,
          borderLeft: `1px solid ${color('border')}`,
        }}
      >
        <Button large style={{ width: '100%', marginBottom: 12 }}>
          Publish
        </Button>
        <Text color="text2">Last snurp</Text>
      </styled.div>
    </styled.div>
  )
}
