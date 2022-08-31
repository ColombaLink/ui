import React from 'react'
import { Checkbox } from '../Checkbox'
import { CustomList } from '../CustomList'

export const FieldList = () => {
  let items = ['bah', 'rae']

  return (
    <div style={{ width: '100%' }}>
      <div style={{ height: 600, width: 600, margin: '0 auto' }}>
        <Checkbox space="16px" description="Show system fields" />
        <CustomList items={items} itemSpace={12} draggable />
      </div>
    </div>
  )
}
