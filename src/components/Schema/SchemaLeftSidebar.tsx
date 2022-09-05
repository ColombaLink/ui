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

  // Invert keys and values of an object
  const invert = (obj) =>
    Object.keys(obj).reduce((res, k) => Object.assign(res, { [obj[k]]: k }), {})
  const menuData = invert(data)

  // console.log('menuData', menuData)

  return (
    <Menu
      style={{ paddingTop: 32, minWidth: 234, ...style }}
      data={menuData}
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
            ghost
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
