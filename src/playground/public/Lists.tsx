import React, { useEffect, useState } from 'react'
import { DraggableListWrapper, ListItem } from '~/components/ListItems'
import { Thumbnail } from '~/components/Thumbnail'
import { DragDropIcon } from '~/icons'

const listItems = ['Apple', 'Banana', 'Citroen', 'Dragonfruit', 'Elderberry']

export const Lists = () => {
  const [list, setList] = useState(listItems)
  const [activeListItem, setActiveListItem] = useState(null)
  const [mouseOverListItem, setMouseOverListItem] = useState(null)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [tempCopy, setTempCopy] = useState(null)

  const mouseDownHandler = (e) => {
    setIsMouseDown(true)
    setActiveListItem(+e.target.id)

    // temp copy shizzle
    const tempDiv = document.createElement('div')
    const tempEl = e.target.cloneNode(true)
    tempDiv.appendChild(tempEl)

    tempDiv.style.position = 'absolute'
    tempDiv.style.pointerEvents = 'none'
    tempDiv.style.opacity = '0.75'

    setTempCopy(tempDiv)
  }

  const mouseOverHandler = (e) => {
    setMouseOverListItem(+e.target.id)
    console.log('on mouse OVER =>', e.target.id)
  }

  const mouseUpHandler = () => {
    //reset temp copy
    document.body.removeChild(tempCopy)
    setTempCopy(null)

    setIsMouseDown(false)
    console.log('Mouse released')
    if (activeListItem === mouseOverListItem) {
      console.log('Test  = Same item, nothing happens')
    }
    if (activeListItem !== mouseOverListItem) {
      console.log('Test  = Different item, FIRE')
      arrayMagic(activeListItem, mouseOverListItem, list)
    }
  }

  const mouseMoveHandler = (e) => {
    if (isMouseDown) {
      console.log('mouse moves')

      const mouseY = e.clientY
      const mouseX = e.clientX

      document.body.appendChild(tempCopy)
      tempCopy.style.left = `${mouseX - 16}px`
      tempCopy.style.top = `${mouseY - 16}px`
    }
  }

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
            onMouseMove={mouseMoveHandler}
          >
            <DragDropIcon /> {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
