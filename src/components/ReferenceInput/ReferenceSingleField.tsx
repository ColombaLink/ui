import React from 'react'
import { Badge, MoreIcon, Text, DragDropIcon, color } from '~'
import { styled } from 'inlines'

type ReferenceInputProps = {
  refName?: string
  refType?: string
  refStatus?: string
}

export const ReferenceSingleField = ({
  refName,
  refType,
  refStatus,
}: ReferenceInputProps) => {
  return (
    <styled.div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 4,
        border: `1px solid ${color('border')}`,
        height: 50,
        padding: '0 12px',
        marginBottom: 10,
        cursor: 'grab',
      }}
    >
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <DragDropIcon />
        <Badge color="grey">{refType}</Badge>
        <Text>{refName}</Text>
      </div>

      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Badge
          color="green"
          style={{
            color: '#235340',
            backgroundColor: 'rgba(15, 188, 133, 0.2)',
          }}
        >
          {refStatus}
        </Badge>
        <MoreIcon />
      </div>
    </styled.div>
  )
}
