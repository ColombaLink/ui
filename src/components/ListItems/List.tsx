import React, { CSSProperties, FC, ReactNode, useState } from 'react'
import { Space } from '~/types'
import { color, spaceToPx } from '~/utils'
import { DragDropIcon } from '~/icons'
import { Text } from '~/components/Text'
import { Avatar } from '~/components/Avatar'
import { Thumbnail } from '../Thumbnail'

type ListProps = {
  listItems: Array<any>
  style?: CSSProperties
  space?: Space
  draggable?: boolean
  right?: ReactNode
  left?: ReactNode
  avatar?: Boolean
  thumbnail?: Boolean
}

export const List: FC<ListProps> = ({
  listItems,
  space = 4,
  style,
  draggable,
  right,
  left,
  avatar,
  thumbnail,
}) => {
  const [list, setList] = useState(listItems)
  const [activeListItem, setActiveListItem] = useState(null)
  const [mouseOverListItem, setMouseOverListItem] = useState(null)

  const dragHandler = (e) => {
    setActiveListItem(+e.target.id)
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

  return (
    <div>
      {list.map((item, index) => (
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
          onDrag={(e) => dragHandler(e)}
          onDragOver={(e) => dragOverHandler(e)}
          onDragEnd={(e) => dragEndHandler(e)}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              pointerEvents: 'none',
            }}
          >
            {draggable && (
              <DragDropIcon
                style={{ cursor: 'pointer', pointerEvents: 'none' }}
              />
            )}
            {thumbnail && <Thumbnail size={32} label={item} />}
            {avatar && <Avatar size={32} label={item} />}
            {left} <Text>{item}</Text>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            {right}
          </div>
        </div>
      ))}
    </div>
  )
}
