import React, { useState } from 'react'
import { VirtualizedList } from '~/components/VirtualizedList'

export const VirtualizedLists = () => {
  const listData = [
    { id: 0, label: 'Appkes 0 🍎', icon: 'CheckCircleIcon' },
    { id: 1, label: 'Citroen 1 🍋', icon: 'EyeIcon' },
    { id: 2, label: 'Druiven 2 🍇' },
    { id: 3, label: 'Eieren 3 🥚' },
    { id: 4, label: 'Hamburger 4 🍔' },
  ]
  for (let i = 5; i < 50; i++) {
    listData.push({
      id: i,
      label: 'Cheese 🧀 ' + i,
    })
  }

  const [lijst, setLijst] = useState(listData)

  return (
    <div style={{ height: 800 }}>
      <VirtualizedList
        items={lijst}
        onDrop={(e, data) => {
          console.info('yo waht-->', e, data)
          console.log('Target index -->', data.targetIndex)

          console.log('Data -->', data.data)

          lijst.splice(data.data[0].index, 1)
          lijst.splice(data.targetIndex, 0, data.data[0].data)

          setLijst([...lijst])
          // console.log('list length -->', listData.length)
        }}
      />
    </div>
  )
}
