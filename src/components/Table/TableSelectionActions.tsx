import React, { FC } from 'react'
import { styled, Style } from 'inlines'
import { Text, Button } from '~'

type TableSelectionActionsProps = {
  selectedRows: string[]
  setSelectedRows: (e) => void
}

export const TableSelectionActions: FC<TableSelectionActionsProps> = ({
  selectedRows,
  setSelectedRows,
}) => {
  return (
    <styled.div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 16,
      }}
    >
      <Text>{selectedRows.length} items selected</Text>
      <Button
        outline
        ghost
        color="lightaction"
        onClick={() => setSelectedRows([])}
      >
        Clear selection
      </Button>
      <Button outline ghost color="lightaction">
        Show selected items
      </Button>
      <Button color="red">Delete items</Button>
    </styled.div>
  )
}
