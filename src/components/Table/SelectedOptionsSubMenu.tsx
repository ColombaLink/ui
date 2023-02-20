import React from 'react'
import { color } from '~/utils'
import { Text, Button } from '~'

export const SelectedOptionsSubMenu = ({
  selectedRowCheckboxes,
  setSelectedRowCheckboxes,
  showSelectedItemsOnly,
  items,
  deleteItems,
}) => {
  console.log('--->', selectedRowCheckboxes)
  console.log('items', items)

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        height: 34,
        marginBottom: 8,
        marginLeft: 32,
      }}
    >
      <div>
        <Text>
          {selectedRowCheckboxes.length}
          {selectedRowCheckboxes.length === 1
            ? ' item selected'
            : ' items selected'}
        </Text>
      </div>
      <Button
        onClick={() => setSelectedRowCheckboxes([])}
        color="lightaction"
        outline
        style={{
          // @ts-ignore
          '&:hover': {
            backgroundColor: color('lightaction:hover'),
            boxShadow: '0px 2px 4px rgba(156, 156, 156, 0.08)',
          },
        }}
      >
        Clear selection
      </Button>
      <Button
        onClick={() => {
          console.log('items', items)
          showSelectedItemsOnly()
        }}
        color="lightaction"
        outline
        style={{
          // @ts-ignore
          '&:hover': {
            backgroundColor: color('lightaction:hover'),
            boxShadow: '0px 2px 4px rgba(156, 156, 156, 0.08)',
          },
        }}
      >
        Show selected items
      </Button>
      <Button color="red" onClick={() => deleteItems(items)}>
        Delete items
      </Button>
    </div>
  )
}
