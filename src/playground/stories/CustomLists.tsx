import React, { useState } from 'react'
import { CustomList } from '~/components/CustomList'

export const CustomLists = () => {
  const listData = [
    { id: 0, text: 'Appkes 0 🍎' },
    { id: 1, text: 'Citroen 1 🍋' },
    { id: 2, text: 'Druiven 2 🍇' },
    { id: 3, text: 'Eieren 3 🥚' },
  ]
  for (let i = 4; i < 50; i++) {
    listData.push({
      id: i,
      text: 'Item 🧀 ' + i,
    })
  }

  const [lijst, setLijst] = useState(listData)

  return (
    <div style={{ height: 800 }}>
      <CustomList
        items={lijst}
        onDrop={(e, data) => {
          console.info('yo waht-->', e, data)
          console.log('Target index -->', data.targetIndex)

          lijst.splice(data.data[0].index, 1)
          lijst.splice(data.targetIndex, 0, data.data[0].data)

          setLijst([...lijst])
          // console.log('list length -->', listData.length)
        }}
      />
    </div>
  )
}
