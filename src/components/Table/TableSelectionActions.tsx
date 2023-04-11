import React, { FC } from 'react'
import { styled, Style } from 'inlines'
import { Text, Button } from '~'

type TableSelectionActionsProps = {
  selectedRows: string[]
  setSelectedRows: (e) => void
  setShowSelectedRows: (e) => void
  showSelectedRows: boolean
}

export const TableSelectionActions: FC<TableSelectionActionsProps> = ({
  selectedRows,
  setSelectedRows,
  setShowSelectedRows,
  showSelectedRows,
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
      <Button
        outline
        ghost
        color="lightaction"
        onClick={() => {
          setShowSelectedRows(!showSelectedRows)
        }}
      >
        {!showSelectedRows ? 'Show selected items' : 'Show all items'}
      </Button>
      <Button color="red">Delete items</Button>
    </styled.div>
  )
}
