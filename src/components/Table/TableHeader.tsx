import React, { ReactNode, FC, useState } from 'react'
import {
  styled,
  Style,
  Text,
  color,
  Checkbox,
  Button,
  AddIcon,
  useContextMenu,
} from '~'

type TableHeaderProps = {
  headers: {
    key: string
    label: string | ReactNode
  }[]
  columnWidthsArr: number[]
  setColumnWidthsArr: (e) => void
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
  visibleColumns,
  setVisibleColumns,
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
      {visibleColumns
        .filter((x) => x.showColumnCheckbox)
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
        icon={<AddIcon color="text2" />}
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
          { headers, visibleColumns, setVisibleColumns },
          { placement: 'left' }
        )}
      />
    </styled.div>
  )
}

const SelectHeaderDisplay = ({
  headers,
  visibleColumns,
  setVisibleColumns,
}) => {
  return (
    <styled.div>
      {headers.map((item, idx) => (
        <styled.div
          key={item.key}
          style={{ display: 'flex', padding: '4px 6px' }}
        >
          <Checkbox
            small
            label={item.label}
            checked={visibleColumns.map(
              (item) => visibleColumns[idx].showColumnCheckbox
            )}
            onChange={(e) => {
              if (e) {
                const temp = [...visibleColumns]
                console.log('😡', temp)
                temp[idx].showColumnCheckbox = true
                setVisibleColumns(temp)
              } else {
                const temp = [...visibleColumns]
                console.log('🥶', temp)
                temp[idx].showColumnCheckbox = false
                setVisibleColumns(temp)

                console.log('visible columns 🧟', visibleColumns)
              }

              // if(e){

              // }
              // remove from localstorage visible columns
              // const indexItem = visibleColumns.indexOf(item.key)
              // visibleColumns.splice(indexItem, 1)

              // setVisibleColumns(visibleColumns)
              // console.log('🚘', visibleColumns)

              // console.log(headers.filter((x) => x.key !== item.key))
            }}
          />
        </styled.div>
      ))}
    </styled.div>
  )
}
