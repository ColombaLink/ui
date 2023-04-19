import React, { FC } from 'react'
import { Text, Button, styled } from '~'

type TableSelectionActionsProps<T> = {
  selectedRows: string[]
  setSelectedRows: (rows: T[]) => void
  setShowSelectedRows: (show: boolean) => void
  // delete row fn
  showSelectedRows: boolean
}

export const TableSelectionActions: FC<TableSelectionActionsProps<any>> = ({
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
      <Button color="red" onClick={() => console.log('TODO delete ')}>
        Delete items
      </Button>
    </styled.div>
  )
}
