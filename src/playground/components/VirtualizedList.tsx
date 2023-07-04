import React, { useState } from 'react'
import { VirtualizedList as VirtualizedListComponent } from '~/components/VirtualizedList'

export const VirtualizedList = () => {
  const listData = [
    { id: 0, label: 'Appkes 0 🍎', icon: 'CheckCircleIcon', checkbox: true },
    { id: 1, label: 'Citroen 1 🍋', icon: 'EyeIcon', checkbox: false },
    {
      id: 2,
      label: 'Druiven 2 🍇',
      checkbox: true,
    },
    { id: 3, label: 'Eieren 3 🥚', checkbox: false },
    {
      id: 4,
      label: 'Hamburger 4 🍔',
      child: '',
    },
  ]
  for (let i = 5; i < 50; i++) {
    listData.push({
      id: i,
      label: 'Cheese 🧀 ' + i,
      child: '',
    })
  }

  const [lijst, setLijst] = useState(listData)

  return (
    <div style={{ height: 800 }}>
      <VirtualizedListComponent
        items={lijst}
        onDrop={(e, data) => {
          console.info('yo waht-->', e, data)
          console.log('Target index -->', data.targetIndex)

          console.log('Data regfe-->', data?.data)

          lijst.splice(data?.data[0]?.index, 1)
          lijst.splice(data.targetIndex, 0, data.data[0].data)

          setLijst([...lijst])
          // console.log('list length -->', listData.length)
        }}
      />
    </div>
  )
}
