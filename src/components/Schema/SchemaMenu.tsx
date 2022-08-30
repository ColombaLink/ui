import React from 'react'
import { Menu, Text, Button, AddIcon, Separator, useDialog } from '~'
import { AddTypeModal } from './AddTypeModal'

export const SchemaMenu = ({ data, style }) => {
  const dialog = useDialog()

  return (
    <Menu style={{ paddingTop: 32, ...style }} data={data}>
      <Separator />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text size={14}>Types</Text>
        <Button
          icon={AddIcon}
          onClick={() => {
            dialog.open(<AddTypeModal />)
          }}
        >
          Add
        </Button>
      </div>
    </Menu>
  )
}
