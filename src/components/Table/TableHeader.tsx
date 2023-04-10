import React, { ReactNode, FC, useState, useRef, useEffect } from 'react'
import {
  styled,
  Style,
  Text,
  color,
  Checkbox,
  Button,
  AddIcon,
  MoreIcon,
  useContextMenu,
  usePropState,
} from '~'

type TableHeaderProps = {
  headers: {
    key: string
    label: string | ReactNode
  }[]
  columnWidthsArr: number[]
  setColumnWidthsArr: (e) => void
  setTableHeaders: (e) => void
}

const TableHeaderItem = styled('div', {
  height: 42,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden',
  paddingLeft: 6,
})

const ResizeDragLine = styled('div', {
  width: 4,
  position: 'absolute',
  right: 0,
  top: 0,
  bottom: 0,
  cursor: 'col-resize',
  '&:hover': {
    borderRight: `1px solid ${color('accent')}`,
  },
  '&:active': {
    borderRight: `3px solid ${color('accent')}`,
  },
})

export const TableHeader: FC<TableHeaderProps> = ({
  headers,
  columnWidthsArr,
  setColumnWidthsArr,
  setTableHeaders,
}) => {
  // console.log('TABLE header columns width arr', columnWidthsArr)
  const [showDragLines, setShowDraglines] = useState(false)

  return (
    <styled.div
      style={{
        display: 'flex',
        borderBottom: '1px solid rgba(28, 45, 65, 0.1)',
        position: 'relative',
      }}
      onMouseOver={() => setShowDraglines(true)}
      onMouseLeave={() => setShowDraglines(false)}
    >
      {headers
        // ?.filter((x) => x.showColumnCheckbox)
        .map((item, idx) => (
          <TableHeaderItem
            key={item.key}
            style={{ width: columnWidthsArr[idx] }}
          >
            {idx === 0 && <Checkbox small />}
            <Text color="text2">{item.label}</Text>
            <ResizeDragLine
              onMouseDown={({ currentTarget, clientX: startX }) => {
                // @ts-ignore
                const { offsetWidth } = currentTarget.parentNode
                const onUp = () => {
                  removeEventListener('mouseup', onUp)
                  removeEventListener('mousemove', onMove)
                }
                const onMove = ({ clientX }) => {
                  columnWidthsArr[idx] = Math.max(
                    40,
                    offsetWidth - (startX - clientX)
                  )
                  setColumnWidthsArr([...columnWidthsArr])
                }
                addEventListener('mousemove', onMove)
                addEventListener('mouseup', onUp)
              }}
              style={{
                borderRight: showDragLines
                  ? `1px solid ${color('border')}`
                  : '1px solid transparent',
              }}
            />
          </TableHeaderItem>
        ))}

      <Button
        icon={<MoreIcon color="text2" />}
        color="lightgrey"
        style={{
          width: 24,
          height: 24,
          position: 'absolute',
          // left: scrollLeft ? width + scrollLeft - 36 : width - 36,
          top: 8,
          padding: 0,
          right: 12,
        }}
        onClick={useContextMenu(
          SelectHeaderDisplay,
          { headers, setTableHeaders },
          { placement: 'left' }
        )}
      />
    </styled.div>
  )
}

const SelectHeaderDisplay = ({ headers, setTableHeaders }) => {
  const dragItem = useRef(null)
  const dragOverItem = useRef()

  const [listForRender, setListForRender] = usePropState(headers)

  const dragStart = (e, position) => {
    dragItem.current = position
  }

  const dragEnter = (e, position) => {
    dragOverItem.current = position
  }

  const drop = (e) => {
    const copyListItems = [...listForRender]
    const dragItemContent = copyListItems[dragItem.current]
    copyListItems.splice(dragItem.current, 1)
    copyListItems.splice(dragOverItem.current, 0, dragItemContent)
    dragItem.current = null
    dragOverItem.current = null
    setTableHeaders(copyListItems)
    setListForRender(copyListItems)
  }

  return (
    <styled.div>
      {listForRender.map((item, idx) => (
        <styled.div
          key={idx}
          style={{ display: 'flex', padding: '4px 6px' }}
          draggable
          onDragStart={(e) => dragStart(e, idx)}
          onDragEnter={(e) => dragEnter(e, idx)}
          onDragEnd={drop}
        >
          <Checkbox
            small
            label={item.label}
            checked={headers[idx].showColumnCheckbox}
            onChange={(e) => {
              if (e) {
                headers[idx].showColumnCheckbox = true
                //      setVisibleColumns([...visibleColumns])
              } else {
                headers[idx].showColumnCheckbox = false
                //     setVisibleColumns([...visibleColumns])
              }
            }}
          />
        </styled.div>
      ))}
    </styled.div>
  )
}
