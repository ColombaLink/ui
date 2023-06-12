import React from 'react'
import { styled } from 'inlines'
import { Button } from '~/components/Button'
import { Text } from '~/components/Text'
import { color } from '~/utils'
import { ScrollArea } from '~/components/ScrollArea'
import { ContentEditor } from './ContentEditor'

export const ContentEditModal = ({ rowData }) => {
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
        <ScrollArea>
          <Text> Component hier voor het renderen van editable fields</Text>
          <ContentEditor rowData={rowData} />
        </ScrollArea>
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
