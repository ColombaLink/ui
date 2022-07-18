import React, { CSSProperties, FC, ReactNode, useState } from 'react'
import { Space } from '~/types'
import { color, renderOrCreateElement, spaceToPx } from '~/utils'
import { DragDropIcon } from '~/icons'
import { Text } from '~/components/Text'
import { Avatar } from '~/components/Avatar'
import { Thumbnail } from '../Thumbnail'
import { Button } from '../Button'

type ListProps = {
  data: Array<any>
  listComponent?: FC<any> | ReactNode
  style?: CSSProperties
  space?: Space

  // draggable?: boolean
  // right?: ReactNode
  // left?: ReactNode
  // avatar?: Boolean
  // thumbnail?: Boolean
}

export const List: FC<ListProps> = ({
  data,
  space = 4,
  style,
  listComponent,
  // draggable,
  // right,
  // left,
  // avatar,
  // thumbnail,
}) => {
  const [list, setList] = useState(data)
  const [activeListItem, setActiveListItem] = useState(null)
  const [mouseOverListItem, setMouseOverListItem] = useState(null)

  const dragHandler = (e) => {
    console.log(e)
    setActiveListItem(e.target.id)
  }

  const dragOverHandler = (e) => {
    // moet deze zetten zodat ze gedropt kunnen worden (animatie'tje)
    e.preventDefault()
    setMouseOverListItem(+e.target.id)
  }

  const dragEndHandler = (e) => {
    if (activeListItem === mouseOverListItem) {
      console.log('Test  = Same item, nothing happens')
    }
    if (activeListItem !== mouseOverListItem) {
      arrayMagic(activeListItem, mouseOverListItem, list)
    }
  }

  const arrayMagic = (activeItem, mouseOverItem, list) => {
    // must make copy to trigger re-render
    const newList = [...list]
    const oldItem = list[activeItem]

    newList.splice(activeListItem, 1)
    newList.splice(mouseOverItem, 0, oldItem)

    setList(newList)
  }

  console.log(listComponent)

  return (
    <div>
      {list.map((item, index) => (
        <div key={index}>
          {renderOrCreateElement(listComponent, {
            draggable: true,
            key: index,
            left: item,
            id: index,
            listeners: {
              dragstart: (e) => dragHandler(e),
              dragover: (e) => dragOverHandler(e),
              dragend: (e) => dragEndHandler(e),
              mouseOver: console.log('faba'),
            },
          })}
        </div>
      ))}

      {/* {list.map((item, index) => (
        <div
          style={{
            display: 'flex',
            backgroundColor: color('background2dp'),
            justifyContent: 'space-between',
            alignItems: 'center',
            border: `1px solid ${color('border')}`,
            padding: '12px 20px',
            borderRadius: 4,
            marginBottom: spaceToPx(space),
            ...style,
          }}
          draggable
          key={index}
          id={`${index}`}
          onDragOver={(e) => dragOverHandler(e)}
          onDragEnd={(e) => dragEndHandler(e)}
          onDragStart={(e) => dragHandler(e)}
        >
          <Text style={{ pointerEvents: 'none' }}>
            {item} {index}
          </Text>
          <Button onClick={() => console.log('halo')}>Hello</Button>
        </div>
      ))} */}
    </div>
  )
}
