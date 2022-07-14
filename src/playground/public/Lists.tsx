import React, { useEffect, useState } from 'react'
import { DraggableListWrapper, ListItem } from '~/components/ListItems'
import { Thumbnail } from '~/components/Thumbnail'
import { DragDropIcon } from '~/icons'

const listItems = ['Apple', 'Banana', 'Citroen', 'Dragonfruit', 'Elderberry']

export const Lists = () => {
  const [list, setList] = useState(listItems)
  const [activeListItem, setActiveListItem] = useState(null)
  const [mouseOverListItem, setMouseOverListItem] = useState(null)

  const mouseDownHandler = (e) => {
    setActiveListItem(+e.target.id)
    console.log('on mouse down =>', e.target.id)
  }

  const mouseOverHandler = (e) => {
    setMouseOverListItem(+e.target.id)
    console.log('on mouse OVER =>', e.target.id)
  }

  const mouseUpHandler = () => {
    console.log('Mouse released')
    if (activeListItem === mouseOverListItem) {
      console.log('Test  = Same item, nothing happens')
    }
    if (activeListItem !== mouseOverListItem) {
      setList(arrayMagic(activeListItem, mouseOverListItem, list))
    }
  }

  // some array magic slicing etc
  const arrayMagic = (activeItem, mouseOverItem, list) => {
    const oldItem = list[activeItem]

    //remove the old active item from the list
    list.splice(activeListItem, 1)

    //put old item back in the list
    list.splice(mouseOverItem, 0, oldItem)

    return list
  }

  return (
    <div>
      <h1>Lists</h1>
      <br />

      <ul>
        {list.map((item, index) => (
          <li
            key={index}
            id={`${index}`}
            style={{
              width: 300,
              height: 40,
              border: '1px solid grey',
              display: 'flex',
              alignItems: 'center',
              marginBottom: '4px',
            }}
            onMouseDown={(e) => mouseDownHandler(e)}
            onMouseOver={(e) => mouseOverHandler(e)}
            onMouseUp={mouseUpHandler}
          >
            <DragDropIcon /> {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
