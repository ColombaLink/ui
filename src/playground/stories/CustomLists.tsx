import React from 'react'
import { CustomList } from '~/components/CustomList'

export const CustomLists = () => {
  const listData = [
    { id: 0, text: 'Appkes 0' },
    { id: 1, text: 'Citroen 1' },
    { id: 2, text: 'Druiven 2' },
    { id: 3, text: 'Eieren 3' },
  ]
  for (let i = 4; i < 50; i++) {
    listData.push({
      id: i,
      text: 'Item ' + i,
    })
  }

  return (
    <div style={{ height: 800 }}>
      <CustomList
        items={listData}
        onDrop={(e, data) => {
          console.info('yo waht-->', e, data)
          console.log('Target index -->', data.targetIndex)
          listData.splice(data.targetIndex, 0, ...data.data)
          console.log('list length -->', listData.length)
        }}
      />
    </div>
  )
}
