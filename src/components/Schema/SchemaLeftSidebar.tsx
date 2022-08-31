import React, { CSSProperties } from 'react'
import { Menu, Text, Button, AddIcon, Separator, useDialog } from '~'
import { AddTypeModal } from './AddTypeModal'

type SchemaLeftSidebarProps = {
  style?: CSSProperties
  data?: { [key: string]: string }
}

export const SchemaLeftSidebar = ({ style, data }: SchemaLeftSidebarProps) => {
  const dialog = useDialog()
  //   const { data } = useData()

  return (
    <Menu
      style={{ paddingTop: 32, minWidth: 234, ...style }}
      data={data}
      header={
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text size={16}>Types</Text>
          <Button
            icon={AddIcon}
            onClick={() => {
              dialog.open(<AddTypeModal />)
            }}
          >
            Add
          </Button>
        </div>
      }
    ></Menu>
  )
}
