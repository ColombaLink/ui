import React, { useEffect, useState, useRef } from 'react'
import { DraggableListWrapper, ListItem } from '~/components/ListItems'
import { DragDropIcon } from '~/icons'
import { Text } from '~/components/Text'

const listItems = ['Apple', 'Banana', 'Citroen', 'Dragonfruit', 'Elderberry']

export const Lists = () => {
  const [list, setList] = useState(listItems)
  const [activeListItem, setActiveListItem] = useState(null)
  const [mouseOverListItem, setMouseOverListItem] = useState(null)

  const dragHandler = (e) => {
    console.log('drag')
    console.log('Active dragging:', e.target.id)
    setActiveListItem(+e.target.id)
  }

  const dragOverHandler = (e) => {
    // moet deze zetten zodat ze gedropt kunnen worden (animatie'tje)
    e.preventDefault()
    console.log('draggin over:', e.target.id)
    setMouseOverListItem(+e.target.id)
  }

  const dragEndHandler = (e) => {
    if (activeListItem === mouseOverListItem) {
      console.log('Test  = Same item, nothing happens')
    }

    if (activeListItem !== mouseOverListItem) {
      e.preventDefault()
      e.stopPropagation()
      arrayMagic(activeListItem, mouseOverListItem, list)
    }
  }

  // const dropHandler = (e) => {
  //   console.log('dropped')
  // }

  // some array magic slicing etc
  const arrayMagic = (activeItem, mouseOverItem, list) => {
    // must make copy to trigger re-render
    const newList = [...list]
    const oldItem = list[activeItem]

    //remove the old active item from the list
    newList.splice(activeListItem, 1)

    //put old item back in the list
    newList.splice(mouseOverItem, 0, oldItem)

    setList(newList)
  }

  return (
    <div>
      <Text>Draggable list</Text>
      <br />

      {list.map((item, index) => (
        <li
          draggable
          key={index}
          id={`${index}`}
          style={{
            width: 300,
            padding: 8,
            height: 40,
            border: '1px solid grey',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '4px',
          }}
          onDrag={(e) => {
            dragHandler(e)
          }}
          onDragOver={(e) => {
            dragOverHandler(e)
          }}
          onDragEnd={(e) => {
            dragEndHandler(e)
          }}
        >
          <DragDropIcon style={{ marginRight: 12, pointerEvents: 'none' }} />
          {item}
        </li>
      ))}

      <br />
      <Text>Try another one</Text>
      <br />

      {/* {list.map((item, index) => (
        <ListItem
          draggable
          key={index}
          id={`${index}`}
          left={<Text>{item}</Text>}
          // @ts-ignore
          onMouseDown={(e) => mouseDownHandler(e)}
          onMouseOver={(e) => mouseOverHandler(e)}
          onMouseUp={mouseUpHandler}
          onMouseMove={mouseMoveHandler}
        />
      ))} */}
    </div>
  )
}
