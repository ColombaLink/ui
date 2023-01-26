// @ts-nocheck
import React, { useRef, useState, useEffect, FC } from 'react'
import { border, color } from '~/utils'
import { styled } from 'inlines'
import { scrollAreaStyle } from '../ScrollArea'
import { Text } from '../Text'
import { Button } from '../Button'
import { Checkbox } from '../Checkbox'
import {
  AddIcon,
  AttachmentIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ReferenceIcon,
  SortIcon,
} from '~/icons'
import { VariableSizeGrid } from 'react-window'
import { useInfiniteScroll } from '../InfiniteList'
import { isImage } from '~/utils/isImage'
import { HEADER_HEIGHT, ITEM_HEIGHT, ACTIONS_WIDTH } from './constants'
import { toDateString } from '~/utils/date'
import { Badge } from '../Badge'
import { useHover, useContextMenu } from '~/hooks'
import { useSchema } from '~/hooks/useSchema'
import { useItemSchema } from '../Content/hooks/useItemSchema'
import stringifyObject from 'stringify-object'
import { DataEventHandler } from '~/types'
import { OnAction } from './types'
import { getImageSrcFromId } from '~/utils/getImageSrcFromId'
import { useDialog } from '~/components/Dialog'
import { VirtualizedList } from '../VirtualizedList'
import { removeOverlay } from '../Overlay'

import { useWindowResize } from '~/hooks/useWindowResize'

const Grid = styled(VariableSizeGrid)

// single ref display
const Reference = ({ value }) => {
  // console.log('value', value)

  const afbThumb = getImageSrcFromId(value)

  // console.log(afbThumb, 'afbThumb')

  return value.length > 0 ? (
    <div style={{ display: 'flex', verticalAlign: 'center' }}>
      {!afbThumb ? (
        <div style={{ minWidth: 20, paddingTop: 4 }}>
          <ReferenceIcon
            color="accent"
            style={{
              marginRight: 6,
            }}
          />
        </div>
      ) : (
        <div
          style={{
            backgroundSize: 'cover',
            backgroundImage: `url(${afbThumb})`,
            width: 34,
            height: 34,
            marginRight: 12,
          }}
        />
      )}

      <Badge style={{ maxHeight: 24, marginTop: afbThumb ? 5 : 0 }}>
        {value}
      </Badge>
    </div>
  ) : null
}

// multiple refs display
const References = ({ value }) => {
  // console.log('ref', value)

  return value.length > 0 ? (
    <div
      style={{
        position: 'absolute',
        left: 6,
        display: 'flex',
      }}
    >
      <div style={{ minWidth: 32, display: 'flex' }}>
        <AttachmentIcon
          color="accent"
          style={{
            marginRight: 4,
          }}
        />
        <Text color="accent">{value.length}</Text>
      </div>
      {/* {value.slice(0, 3).map((ref, idx) => (
        <Badge style={{ marginLeft: 6 }} key={idx}>
          {ref}
        </Badge>
      ))} */}
    </div>
  ) : null
}

// let selectedRowCheckboxes = []

const Cell = ({ columnIndex, rowIndex, style, data }) => {
  const { types, items, fields, onClick, setState, hoverRowIndex } = data
  const item = items[rowIndex]
  let children, value, field
  const { hover, active, listeners } = useHover()
  const colIndex = columnIndex - 1
  const activeRow = hoverRowIndex === rowIndex
  const isCheckbox = columnIndex === 0
  // TODO optimize

  // console.log('What the data?', data)
  // console.log('What the item?', item)

  // console.log('Data fields', data.fields)

  const { fields: schemaFields } = useItemSchema(item?.id)

  // console.log('Schema fields', schemaFields, children, item?.id, item)

  let hasField
  if (item) {
    if (isCheckbox) {
      children = (
        <Checkbox
          size={16}
          checked={data.selectedRowCheckboxes?.includes(rowIndex)}
          onClick={(e) => {
            // this is the correct item from row
            console.log('item', item)

            // if shift is being held down, select all items between the last selected item and the current item
            // all this for logic for if the shift key is pressed down
            if (e.shiftKey) {
              console.log('shift key pressed is down')
              const prevClick =
                data.selectedRowCheckboxes[
                  data.selectedRowCheckboxes.length - 1
                ]

              const newNumbersInBetween = []

              if (
                prevClick < rowIndex &&
                data.selectedRowCheckboxes?.includes(rowIndex) &&
                data.selectedRowCheckboxes?.includes(prevClick)
              ) {
                const tempNewArr = []
                for (let i = prevClick; i < rowIndex + 1; i++) {
                  if (data.selectedRowCheckboxes?.includes(i)) {
                    tempNewArr.push(i)
                  }
                }

                const diffArr = data.selectedRowCheckboxes?.filter(
                  (el) => !tempNewArr.includes(el)
                )

                data.setSelectedRowCheckboxes([...diffArr])
              } else if (
                prevClick > rowIndex &&
                data.selectedRowCheckboxes?.includes(rowIndex) &&
                data.selectedRowCheckboxes?.includes(prevClick)
              ) {
                const tempNewArr = []
                for (let i = prevClick; i > rowIndex - 1; i--) {
                  if (data.selectedRowCheckboxes?.includes(i)) {
                    tempNewArr.push(i)
                  }
                }

                const diffArr = data.selectedRowCheckboxes?.filter(
                  (el) => !tempNewArr.includes(el)
                )

                data.setSelectedRowCheckboxes([...diffArr])
              } else if (prevClick < rowIndex) {
                for (let i = prevClick + 1; i < rowIndex + 1; i++) {
                  if (!data.selectedRowCheckboxes?.includes(i)) {
                    newNumbersInBetween.push(i)
                  }
                }

                data.setSelectedRowCheckboxes([
                  ...data.selectedRowCheckboxes,
                  ...newNumbersInBetween,
                ])
              } else if (prevClick > rowIndex) {
                for (let i = prevClick - 1; i > rowIndex - 1; i--) {
                  if (!data.selectedRowCheckboxes?.includes(i)) {
                    newNumbersInBetween.push(i)
                  }
                }

                data.setSelectedRowCheckboxes([
                  ...data.selectedRowCheckboxes,
                  ...newNumbersInBetween,
                ])
              }
            }

            if (
              !e.shiftKey &&
              !data.selectedRowCheckboxes?.includes(rowIndex)
            ) {
              data.setSelectedRowCheckboxes([
                ...data.selectedRowCheckboxes,
                rowIndex,
              ])
              //   selectedRowCheckboxes.push(rowIndex)
              console.log('selectedRowCheckboxes', data.selectedRowCheckboxes)
            } else if (!e.shiftKey) {
              data.selectedRowCheckboxes?.splice(
                data.selectedRowCheckboxes.indexOf(rowIndex),
                1
              )
            }
          }}
        />
      )
    } else {
      field = fields[colIndex]
      value = item[field]
      hasField = schemaFields && field in schemaFields
      if (value) {
        const fieldType = types[item.type].fields[field]?.type
        const metaFieldType = types[item.type].fields[field]?.meta?.format

        const prettierObject = (obj) => {
          return stringifyObject(obj, {
            indent: ' ',
            singleQuotes: false,
            doubleQuotes: false,
          })
        }

        if (fieldType) {
          const weight = colIndex ? 400 : 500
          if (fieldType === 'array') {
            children = (
              <Text weight={400}>
                {prettierObject(items[0][field]).substring(0, 64)}
              </Text>
            )
          } else if (fieldType === 'json') {
            children = (
              <Text weight={400}>
                {prettierObject(JSON.parse(value)).substring(0, 64)}
              </Text>
            )
          } else if (fieldType === 'boolean') {
            children = <Text weight={400}>{JSON.stringify(value)}</Text>
          } else if (fieldType === 'record') {
            children = (
              <Text weight={400}>
                {prettierObject(items[0][field]).substring(0, 64)}
              </Text>
            )
          } else if (fieldType === 'set') {
            children = (
              <Text weight={400}>
                {prettierObject(items[0][field]).substring(0, 64)}
              </Text>
            )
          } else if (fieldType === 'object') {
            children = (
              <Text weight={400}>{prettierObject(value).substring(0, 64)}</Text>
            )
          } else if (fieldType === 'id') {
            children = <Badge color="text">{value}</Badge>
          } else if (fieldType === 'references') {
            children = value.length ? <References value={value} /> : null
          } else if (fieldType === 'reference') {
            children = value.length ? <Reference value={value} /> : null
          } else if (fieldType === 'timestamp') {
            children = <Text weight={weight}>{toDateString(value)}</Text>
          } else if (fieldType === 'digest') {
            children = (
              <Badge weight={weight}>{value.substring(0, 6) + '...'}</Badge>
            )
          } else if (fieldType === 'string' && metaFieldType === 'markdown') {
            children = <Text weight={weight}>{value.substring(0, 64)}</Text>
          } else if (isImage(value)) {
            // console.log('image', value)
            children = (
              <div
                style={{
                  backgroundImage: `url(${value})`,
                  backgroundSize: 'cover',
                  height: style.height,
                  width: style.height,
                }}
              />
            )
          } else if (typeof value === 'object') {
            console.warn('incorrect value:', fieldType, item, field, value)
          } else {
            children = <Text weight={400}>{value}</Text>
          }
        }
      }

      if (!children) {
        children =
          activeRow && hasField ? (
            <Text
              color="text"
              style={{
                pointerEvents: 'none',
                opacity: 0.5,
              }}
            >
              {field}
            </Text>
          ) : (
            ''
          )
      }
    }
  }

  useEffect(() => {
    cancelAnimationFrame(data.raf)
    if (hover) {
      setState({ hoverRowIndex: rowIndex })
    } else {
      data.raf = requestAnimationFrame(() => {
        if (data.hoverRowIndex === rowIndex) {
          setState({ hoverRowIndex: null })
        }
      })
    }
  }, [hover])

  return (
    <div
      {...listeners}
      onClick={() => {
        if (!isCheckbox) {
          onClick(item, field, field && types[item.type].fields[field].type)
        }
      }}
      style={{
        ...style,
        top: style.top + HEADER_HEIGHT,
        width: style.width,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        cursor: isCheckbox ? null : hasField ? 'pointer' : 'not-allowed',
        paddingLeft: isCheckbox ? ACTIONS_WIDTH - 36 : 12,
        paddingRight: 12,
        borderBottom: border(1),
        //  borderRight: border(1),
        backgroundColor: color(
          activeRow
            ? !isCheckbox && hasField
              ? 'background:hover'
              : 'background2:hover'
            : 'background'
        ),
      }}
    >
      {children}
    </div>
  )
}

const InnerTable = ({
  tableRef,
  types,
  items,
  fields,
  onClick,
  selectedRowCheckboxes,
  setSelectedRowCheckboxes,
  ...props
}) => {
  const [state, setState] = useState({})
  const { current: itemData } = useRef({})

  Object.assign(itemData, {
    types,
    items,
    fields,
    onClick,
    selectedRowCheckboxes,
    setSelectedRowCheckboxes,
    setState,
    ...state,
  })

  return (
    <Grid {...props} itemData={itemData} ref={tableRef}>
      {Cell}
    </Grid>
  )
}

const HeaderDragLine = ({ index, setColWidths, colWidths }) => {
  const width = 8
  return (
    <styled.div
      onMouseDown={({ currentTarget, clientX: startX }) => {
        // @ts-ignore
        const { offsetWidth } = currentTarget.parentNode
        const onUp = () => {
          removeEventListener('mouseup', onUp)
          removeEventListener('mousemove', onMove)
        }
        const onMove = ({ clientX }) => {
          colWidths[index] = Math.max(40, offsetWidth - (startX - clientX))
          setColWidths([...colWidths])
        }
        addEventListener('mousemove', onMove)
        addEventListener('mouseup', onUp)
      }}
      style={{
        zIndex: 1,
        position: 'absolute',
        right: -width / 2,
        height: 32,
        bottom: 0,
        width,
        cursor: 'col-resize',
        '&:hover>div': {
          backgroundColor: color('border'),
        },
      }}
    >
      <div
        style={{
          marginLeft: width / 2,
          width: 2,
          height: '100%',
        }}
      />
    </styled.div>
  )
}

const Header = ({
  width,
  fields,
  columnWidth,
  setColWidths,
  colWidths,
  setFilteredFields,
  filteredFields,
  allFields,
  newWorldOrder,
  unCheckedArr,
  setUnCheckedArr,
  setSort,
  sortOrder,
  lijst,
  setLijst,
  activeSortField,
  setActiveSortField,
}) => {
  // const { hover, active, listeners } = useHover()
  // const [dragging, setDragging] = useState(false)

  // console.log('header', fields, colWidths)

  // console.log('filteredFields 🐸', filteredFields)

  // // field order
  // const newWorldOrder = []
  // lijst.map(
  //   (item, idx) =>
  //     filteredFields?.includes(item.label) && newWorldOrder.push(item.label)
  // )

  // console.log('newWorldOrder 🐸', newWorldOrder)

  // const [newFields, setNewFields] = useState(newWorldOrder)

  return (
    <>
      <div
        style={{
          position: 'sticky',
          left: 0,
          paddingLeft: ACTIONS_WIDTH,
          top: 0,
          display: 'flex',
          borderBottom: border(1),
          backgroundColor: color('background'),
          height: HEADER_HEIGHT,
          minWidth: width,
        }}
        // {...listeners}
      >
        {newWorldOrder.map((field, index) => (
          <div
            key={index}
            style={{
              width: columnWidth(index + 1),
              height: HEADER_HEIGHT,
              position: 'relative',
              cursor: 'pointer',
            }}
            onClick={() => {
              console.log('clicked on -->', field)
              if (field) {
                setActiveSortField(field)
                if (sortOrder === 'desc') {
                  setSort([field, 'asc'])
                } else {
                  setSort([field, 'desc'])
                }
              }
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {field === activeSortField && (
                <SortIcon color="accent" style={{ marginRight: '-6px' }} />
              )}
              <Text
                color={field === activeSortField ? 'accent' : 'text2'}
                weight={field === activeSortField ? '600' : '400'}
                style={{ paddingLeft: 12, lineHeight: `${HEADER_HEIGHT}px` }}
              >
                {field}
              </Text>
              {field === activeSortField && sortOrder === 'desc' && (
                <ChevronDownIcon color="accent" style={{ marginLeft: '6px' }} />
              )}
              {field === activeSortField && sortOrder === 'asc' && (
                <ChevronUpIcon color="accent" style={{ marginLeft: '6px' }} />
              )}
            </div>
            <HeaderDragLine
              setColWidths={setColWidths}
              colWidths={colWidths}
              index={index}
            />
          </div>
        ))}
      </div>
      <Button
        icon={<AddIcon color="text2" />}
        color="border"
        style={{
          width: 24,
          height: 24,
          position: 'absolute',
          right: 16,
          top: 8,
          padding: 0,
        }}
        onClick={useContextMenu(
          SelectFieldsMenu,
          {
            allFields,
            setFilteredFields,
            unCheckedArr,
            setUnCheckedArr,
            lijst,
            setLijst,
            newWorldOrder,
          },
          { placement: 'left' }
        )}
      />
    </>
  )
}

export type TableFromQueryProps = {
  fields: string[]
  query: { [key]: any }
  width: number
  height: number
  target?: string
  language?: string
  onClick: DataEventHandler
  onAction?: OnAction
  setSelectedRowCheckboxes?: (selectedRowCheckboxes: any) => void
  selectedRowCheckboxes?: Array<number>
}

export const TableFromQuery: FC<TableFromQueryProps> = ({
  query,
  fields,
  width,
  height,
  target = 'root',
  language = 'en',
  onClick,
  // onDelete,
  onAction,
  setSelectedRowCheckboxes,
  selectedRowCheckboxes,
}) => {
  const colWidth = 200
  const { schema } = useSchema()
  const [[sortField, sortOrder], setSort] = useState<string[]>([
    'updatedAt',
    'desc',
  ])
  const [activeSortField, setActiveSortField] = useState<string>('updatedAt')

  // before you delete modal to confirm
  const { confirm } = useDialog()

  //  console.log('TableFromQuery', query)
  // console.log('onAction', onAction)

  const [filteredFields, setFilteredFields] = useState(fields)
  const [unCheckedArr, setUnCheckedArr] = useState([
    'type',
    'parents',
    'createdAt',
    'children',
  ])

  const newListOrderArr = []
  const newListOrder = fields.map((field, idx) =>
    newListOrderArr.push({
      label: field,
      // id: idx,
      checkbox: !unCheckedArr.includes(field),
    })
  )

  const [lijst, setLijst] = useState(newListOrderArr)

  useEffect(() => {
    let tempUnCheckedArr = []
    // setFilteredFields
    if (lijst.length > 0) {
      lijst.map(
        (item, idx) => !item.checkbox && tempUnCheckedArr.push(item.label)
      )

      //  console.log('tempUnCheckedArr -->', tempUnCheckedArr)

      setUnCheckedArr(tempUnCheckedArr)
    }
  }, [lijst])

  // console.log('fields', fields)
  // console.log('filteredFields', filteredFields)
  // console.log(unCheckedArr, 'al;rjeainfr')
  // console.log('📟', lijst)

  // run once to filter out the fields that are not checked by default
  useEffect(() => {
    setFilteredFields(fields.filter((field) => !unCheckedArr.includes(field)))
  }, [unCheckedArr])

  //  console.log('filteredFields 🐸', filteredFields)

  // field order
  const newWorldOrder = []
  lijst.map(
    (item, idx) =>
      filteredFields?.includes(item.label) && newWorldOrder.push(item.label)
  )

  // console.log('newWorldOrder 🐸', newWorldOrder)

  const [newFields, setNewFields] = useState(newWorldOrder)

  const tableRef = useRef()
  const { itemCount, items, onScrollY, loading } = useInfiniteScroll({
    query: (offset, limit) => query(offset, limit, sortField, sortOrder),
    height,
    target,
    language,
    itemSize: ITEM_HEIGHT,
    // treshold: 15,
  })
  const [colWidths, setColWidths] = useState([])

  useEffect(() => {
    if (tableRef.current) {
      const prevColWidths = tableRef.current.colWidths || []
      const columnIndex = Math.max(
        0,
        colWidths.findIndex((val, index) => {
          return val !== prevColWidths[index]
        })
      )

      tableRef.current.resetAfterIndices({
        columnIndex,
      })

      tableRef.current.colWidths = colWidths
    }
  }, [colWidths])

  if (loading) {
    return null
  }

  const types = {
    root: schema.rootType,
    ...schema.types,
  }

  const columnCount = fields.length + 1 // one extra for actions
  const columnWidth = (index) => {
    if (index === 0) {
      return ACTIONS_WIDTH
    }
    index = index - 1
    if (colWidths[index] !== undefined) {
      return colWidths[index]
    }
    const field = fields[index]
    if (field === 'id') {
      return 116
    }
    return colWidth
  }

  const deleteItems = async (items) => {
    const ok = await confirm(`Are you sure you want to delete this item?`)
    if (ok) {
      const newItemArr = []
      for (let i = 0; i < items.length; i++) {
        if (selectedRowCheckboxes.includes(i)) {
          newItemArr.push(items[i])
        }
      }
      onAction(newItemArr, 'delete')
      setSelectedRowCheckboxes([])
    }
  }

  return (
    <>
      <InnerTable
        tableRef={tableRef}
        style={scrollAreaStyle}
        columnCount={columnCount}
        columnWidth={columnWidth}
        height={height}
        types={types}
        items={items}
        fields={newWorldOrder}
        onClick={onClick}
        selectedRowCheckboxes={selectedRowCheckboxes}
        setSelectedRowCheckboxes={setSelectedRowCheckboxes}
        itemKey={({ columnIndex, data: { items, filteredFields }, rowIndex }) =>
          `${items[rowIndex]?.id || rowIndex}-${fields[columnIndex]}`
        }
        innerElementType={({ children, style }) => {
          // console.log('fields from innerTable', items)

          return (
            <div
              style={{
                ...style,
                width: style.width + ACTIONS_WIDTH,
              }}
            >
              <div>{children}</div>

              <Header
                width={width}
                colWidths={colWidths}
                columnWidth={columnWidth}
                fields={filteredFields}
                allFields={fields}
                setFilteredFields={setFilteredFields}
                filteredFields={filteredFields}
                newWorldOrder={newWorldOrder}
                setColWidths={setColWidths}
                unCheckedArr={unCheckedArr}
                setUnCheckedArr={setUnCheckedArr}
                lijst={lijst}
                setLijst={setLijst}
                setSort={setSort}
                sortOrder={sortOrder}
                activeSortField={activeSortField}
                setActiveSortField={setActiveSortField}
              />
              {/* TODO: add filter menu */}
              {selectedRowCheckboxes.length > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: 40,
                    height: 20,
                    background: 'yellow',
                  }}
                >
                  <Button onClick={() => deleteItems(items)}>Delete</Button>
                </div>
              )}
            </div>
          )
        }}
        rowCount={itemCount}
        estimatedColumnWidth={colWidth}
        estimatedRowHeight={ITEM_HEIGHT}
        rowHeight={() => ITEM_HEIGHT}
        width={width}
        onScroll={({ scrollTop }) => onScrollY(scrollTop)}
      />
    </>
  )
}

const SelectFieldsMenu = ({
  allFields,
  setFilteredFields,
  unCheckedArr,
  setUnCheckedArr,
  lijst,
  setLijst,
  newWorldOrder,
}) => {
  // console.log('allFields -->', allFields)
  // console.log('filteredFields -->', filteredFields)
  // console.log('unCheckedArr -->', unCheckedArr)
  // console.log('set unchecked arr??', setUnCheckedArr)

  return (
    <div style={{ height: allFields.length * 30 }}>
      <VirtualizedList
        items={lijst}
        onDrop={(e, data) => {
          //   console.info('yo waht-->', e, data)
          console.log('Target index -->', data.targetIndex)

          //   console.log('Data regfe-->', data?.data)

          let removedItem = lijst.splice(data.data[0]?.index, 1)

          console.log('removed item -->', removedItem)

          // insert the removed item at the target index

          let newList = [...lijst]
          newList.splice(data.targetIndex, 0, removedItem[0])
          //  console.log('new list -->????', newList)
          setLijst([...newList])
          removeOverlay()
          //  setLijst([...lijst.splice(data.targetIndex, 0, removedItem[0])])

          // resetAfterIndex()
          // console.log('list length -->', listData.length)
        }}
        onClick={() => {
          console.log('click--->', lijst)
          setLijst([...lijst])
        }}
      />
    </div>
  )
}
