import React, { useState } from 'react'
import { DragDropIcon } from '~/icons'
import { Text } from '~/components/Text'
import { List, ListItem } from '~/components/ListItems'
import { Avatar } from '~/components/Avatar'
import { CustomList } from '~/components/CustomList'
import { Thumbnail } from '~/components/Thumbnail'

const listItems = [
  'Apple',
  'Banana',
  'Citroen',
  'Dragonfruit',
  'Elderberry',
  'Zulu',
  'Yankee',
  'X-ray',
  'Whiskey',
  'Victor',
]

const otherListItems = ['Zulu', 'Yankee', 'X-ray', 'Whiskey', 'Victor']

const testingListItems = [
  <>
    <Thumbnail label="Zulu" color="green" />
    <Text style={{ marginLeft: 16 }}>Zulu</Text>
  </>,
  <>
    <Thumbnail color="babyblue" label="Y" />
    <Text style={{ marginLeft: 16 }}>Yak</Text>
  </>,
  <>
    <Thumbnail label="X" />
    <Text style={{ marginLeft: 16 }}>Xray</Text>
  </>,
]

// make a list with multiple child, components

export const Lists = () => {
  //   const [list, setList] = useState(listItems)
  //   const [activeListItem, setActiveListItem] = useState(null)
  //   const [mouseOverListItem, setMouseOverListItem] = useState(null)

  //   const dragHandler = (e) => {
  //     setActiveListItem(+e.target.id)
  //   }

  //   const dragOverHandler = (e) => {
  //     // moet deze zetten zodat ze gedropt kunnen worden (animatie'tje)
  //     e.preventDefault()
  //     setMouseOverListItem(+e.target.id)
  //   }

  //   const dragEndHandler = (e) => {
  //     if (activeListItem === mouseOverListItem) {
  //       setActiveListItem(null)
  //     }
  //     if (activeListItem !== mouseOverListItem) {
  //       arrayMagic(activeListItem, mouseOverListItem, list)
  //       setActiveListItem(null)
  //     }
  //   }

  //   // some array magic slicing etc
  //   const arrayMagic = (activeItem, mouseOverItem, list) => {
  //     // must make shallow copy to trigger re-render
  //     const newList = [...list]
  //     const oldItem = list[activeItem]

  //     //remove the old active item from the list
  //     newList.splice(activeListItem, 1)
  //     //put old item back in the list
  //     newList.splice(mouseOverItem, 0, oldItem)

  //     setList(newList)
  //   }

  return (
    <div style={{ height: 360 }}>
      <CustomList
        items={testingListItems}
        draggable
        style={
          {
            /* background: 'orange', width: 500,*/
          }
        }
      />

      {/* <Text>Draggable list</Text>
      <br />

      {list.map((item, index) => (
        <li
          draggable
          key={index}
          id={`${index}`}
          onDragStart={(e) => dragHandler(e)}
          onDragOver={(e) => dragOverHandler(e)}
          onDragEnd={(e) => dragEndHandler(e)}
          style={{
            width: 300,
            padding: 8,
            height: 40,
            border: '1px solid grey',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '4px',
          }}
        >
          <DragDropIcon style={{ marginRight: 12, pointerEvents: 'none' }} />
          {/* mouse over text of child item fucked up index sometimes
          set pointerEvents to none */}
      {/*}
          <Text style={{ pointerEvents: 'none' }}>
            {item} - {index}
          </Text>
        </li>
      ))}

      <br />
      <Text> Nieuwe Lijst Component</Text>
      <br />

      <List
        data={otherListItems}
        //listComponent={<ListItem left>io</ListItem>}
      /> */}
    </div>
  )
}
