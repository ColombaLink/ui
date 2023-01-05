import React from 'react'
import { CustomList } from '~/components/CustomList'

export const CustomLists = () => {
  const listData = []
  for (let i = 0; i < 50; i++) {
    listData.push({
      id: i,
      text: 'Item ' + i,
    })
  }

  return (
    <div style={{ height: 1000 }}>
      <CustomList items={listData} />
    </div>
  )
}
