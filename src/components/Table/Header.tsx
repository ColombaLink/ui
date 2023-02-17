import React from 'react'
import { Checkbox } from '../Checkbox'
import { Text, Button, SortIcon, ChevronDownIcon, AddIcon } from '~'
import { border, color } from '~/utils'
import { useHover, useContextMenu } from '~/hooks'
import { HEADER_HEIGHT } from './constants'
import { HeaderDragLine } from './HeaderDragLine'
import { styled } from 'inlines'
import { VirtualizedList } from '../VirtualizedList'
import { removeOverlay } from '../Overlay'

export const Header = ({
  width,
  columnWidth,
  setColWidths,
  colWidths,
  setSort,
  sortOrder,
  lijst,
  setLijst,
  activeSortField,
  setActiveSortField,
  scrollLeft,
  setSelectedRowCheckboxes,
  selectedRowCheckboxes,
  items,
}) => {
  // console.log('all fields', allFields)
  // console.log(selectedRowCheckboxes, 'selectedRowCheckboxes')
  const { listeners, hover } = useHover()

  const checkAllHandler = (e) => {
    if (e) {
      const allIndexesArr = []
      for (let i = 0; i < items.length; i++) {
        allIndexesArr.push(i)
      }
      setSelectedRowCheckboxes(allIndexesArr)
    } else {
      // setSelectedRowCheckboxes(selectedRowCheckboxes)
      setSelectedRowCheckboxes([])
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          position: 'sticky',
          left: 0,
          paddingLeft: 44,
          top: 0,
          display: 'flex',
          borderBottom: border(1),
          backgroundColor: color('background'),
          height: HEADER_HEIGHT,
          minWidth: width,
        }}
        {...listeners}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Checkbox
            onChange={(e) => {
              checkAllHandler(e)
            }}
            // do this so it doesn't go false and rerender
            checked={selectedRowCheckboxes.length === items.length}
          />
        </div>
        {lijst.map((field, index) =>
          field.checkbox ? (
            <div
              key={index}
              style={{
                width: columnWidth(index + 1),
                height: HEADER_HEIGHT,
                position: 'relative',
                cursor: 'pointer',
              }}
              onClick={() => {
                //  console.log('clicked on -->', field)
                if (field.label) {
                  setActiveSortField(field.label)
                  if (sortOrder === 'desc') {
                    setSort([field.label, 'asc'])
                  } else {
                    setSort([field.label, 'desc'])
                  }
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {field.label === activeSortField && sortOrder === 'desc' && (
                  <SortIcon
                    color="accent"
                    style={{ marginRight: '-6px', marginLeft: 9 }}
                  />
                )}
                {field.label === activeSortField && sortOrder === 'asc' && (
                  <SortIcon
                    color="accent"
                    style={{ marginRight: '-6px', marginLeft: 9 }}
                  />
                )}
                <styled.div
                  style={{
                    '&:hover >div': {
                      color:
                        field.label === activeSortField
                          ? `${color('accent')} !important`
                          : `${color('text')} !important`,
                      fontWeight: '600 !important',
                    },
                  }}
                >
                  <Text
                    color={field.label === activeSortField ? 'accent' : 'text2'}
                    weight={field.label === activeSortField ? '600' : '400'}
                    style={{
                      paddingLeft: 12,
                      lineHeight: `${HEADER_HEIGHT}px`,
                    }}
                  >
                    {field.label}
                  </Text>
                </styled.div>
                {field.label === activeSortField && (
                  <ChevronDownIcon
                    color="accent"
                    style={{ marginLeft: '6px' }}
                  />
                )}
              </div>

              <HeaderDragLine
                setColWidths={setColWidths}
                colWidths={colWidths}
                index={index}
                hovering={hover}
                style={{
                  '&>div': {
                    backgroundColor: hover ? color('border') : 'transparent',
                  },
                }}
              />
            </div>
          ) : null
        )}
      </div>
      <Button
        icon={<AddIcon color="text2" />}
        color="lightgrey"
        style={{
          width: 24,
          height: 24,
          position: 'absolute',
          left: scrollLeft ? width + scrollLeft - 36 : width - 36,
          top: 8,
          padding: 0,
        }}
        onClick={useContextMenu(
          SelectFieldsMenu,
          {
            lijst,
            setLijst,
          },
          { placement: 'left' }
        )}
      />
    </div>
  )
}

const SelectFieldsMenu = ({ lijst, setLijst }) => {
  return (
    <div style={{ height: lijst.length * 30 }}>
      <VirtualizedList
        items={lijst}
        onDrop={(e, data) => {
          const removedItem = lijst.splice(data.data[0]?.index, 1)

          // insert the removed item at the target index
          const newList = [...lijst]
          newList.splice(data.targetIndex, 0, removedItem[0])
          console.log('new list -->???? for the order', newList)
          setLijst([...newList])
          removeOverlay()
        }}
        onClick={() => {
          const newList = [...lijst]
          setLijst([...newList])
        }}
      />
    </div>
  )
}
