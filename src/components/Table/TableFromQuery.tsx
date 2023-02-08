// @ts-nocheck
import React, { useRef, useState, useEffect, FC } from 'react'
import { color } from '~/utils'
import { scrollAreaStyle } from '../ScrollArea'
import { useInfiniteScroll } from '../InfiniteList'
import { ITEM_HEIGHT, ACTIONS_WIDTH, ITEM_WIDTH } from './constants'
import { useLocation } from '~/hooks'
import { useSchema } from '~/hooks/useSchema'
import { DataEventHandler } from '~/types'
import { OnAction } from './types'
import { useDialog } from '~/components/Dialog'
import { Toast, useToast } from '../Toast'
import { useClient } from '@based/react'
import { Header } from './Header'
import { InnerTable } from './InnerTable'
import { SelectedOptionsSubMenu } from './SelectedOptionsSubMenu'

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
  setTableIsEmpty?: (tableIsEmpty: boolean) => void
  isMultiref?: boolean
}

export const TableFromQuery: FC<TableFromQueryProps> = ({
  query,
  fields,
  width,
  height,
  target = 'root',
  language = 'en',
  onClick,
  setTableIsEmpty,
  onAction,
  setSelectedRowCheckboxes,
  selectedRowCheckboxes,
  isMultiref,
}) => {
  const colWidth = ITEM_WIDTH
  const { schema } = useSchema()
  const [[sortField, sortOrder], setSort] = useState<string[]>([
    'updatedAt',
    'desc',
  ])
  const [activeSortField, setActiveSortField] = useState<string>('updatedAt')
  const [relevantFields, setRelevantFields] = useState(fields)

  // console.log('relevantFields', relevantFields)
  const [location, setLocation] = useLocation()

  useEffect(() => {
    setFilteredFields(
      relevantFields.filter((field) => !unCheckedArr.includes(field))
    )
    // maak nieuw list order
    const newListOrderArr2 = []
    const newListOrder2 = relevantFields.map((field, idx) =>
      newListOrderArr2.push({
        label: field,
        // id: idx,
        checkbox: !unCheckedArr.includes(field),
      })
    )
    // console.log('newListOrderArr2', newListOrderArr2)
    setLijst(newListOrderArr2)
  }, [relevantFields, fields.length])

  // for file drop upload
  const client = useClient()
  const [draggingOver, setDraggingOver] = useState(false)
  const toast = useToast()

  // before you delete modal to confirm
  const { confirm } = useDialog()

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

  // WORK ON SAVING TO URL CUSTOM VIEWS
  const [lijst, setLijst] = useState(newListOrderArr)

  const checkedItems = []
  // console.log('lijst--->', lijst)

  /// TODO zet lijst in url
  // wellicht alleen de item die true zijn in de url zetten
  // kan misschien ook korter?? korter door alleen label namen te gebruiken
  for (let i = 0; i < lijst.length; i++) {
    if (lijst[i].checkbox) {
      checkedItems.push(lijst[i].label)
    }
  }

  useEffect(() => {
    setLocation(`?checked=${encodeURIComponent(JSON.stringify(checkedItems))}`)
  }, [checkedItems])

  console.log(checkedItems, '🛑')
  console.log(encodeURIComponent(JSON.stringify(checkedItems)), '🈂️')

  // test the reverse %5B%22name%22%2C%22id%22%5D
  // get this part from the url if there is??
  console.log(
    'DECODED -->',
    decodeURIComponent(
      '%5B%22name%22%2C%22testingarray%22%2C%22updatedAt%22%5D'
    )
  )

  // 1 check the url to see if there is a custom view
  let checkedFieldsPartOfUrl
  if (window.location.href.includes('checked=')) {
    checkedFieldsPartOfUrl = window.location.href
      .split('&')
      .filter((item) => (item.includes('checked=') ? item : null))
      .toString()
      .substring(8)
    console.log('checkedFieldsPartOfUrl', checkedFieldsPartOfUrl)
  }

  // 2 if there is a custom view then set the list to that
  // 3 if there is no custom view then set the list to the default list default show 4 or 5 first items

  // TODO als er dus een URL is moet het er weer uitgehaald worden en dat word de startlijst

  useEffect(() => {
    let tempUnCheckedArr = []
    // setFilteredFields
    if (lijst.length > 0) {
      lijst.map(
        (item, idx) => !item.checkbox && tempUnCheckedArr.push(item.label)
      )

      // console.log('tempUnCheckedArr -->', tempUnCheckedArr)

      setUnCheckedArr(tempUnCheckedArr)
    }
  }, [lijst])

  // console.log('fields', fields)
  // console.log('filteredFields', filteredFields)
  // console.log(unCheckedArr, 'al;rjeainfr')
  // console.log('📟', lijst)

  // run once to filter out the fields that are not checked by default
  useEffect(() => {
    // console.log('😱', fields)
    setFilteredFields(fields.filter((field) => !unCheckedArr.includes(field)))
  }, [unCheckedArr])

  //  console.log('filteredFields 🐸', filteredFields)

  // field order
  const newWorldOrder = []
  lijst.map(
    (item, idx) =>
      filteredFields?.includes(item.label) && newWorldOrder.push(item.label)
  )

  // const [newFields, setNewFields] = useState(newWorldOrder)

  // console.log('location', location)

  const locationIsFile = location.split('/').pop() === 'file'

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
    if (itemCount < 1) {
      setTableIsEmpty(true)
    } else {
      setTableIsEmpty(false)
    }
  }, [itemCount])

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
    // root: schema.rootType,
    root: schema.types.root,
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

  // file drop
  const handleFileDrop = async (e) => {
    if (locationIsFile && draggingOver) {
      setDraggingOver(false)
      e.preventDefault()
      e.stopPropagation()

      const files = Array.from(e.dataTransfer.files)
      console.log(files)

      const test = await Promise.all(
        files?.map((file) => {
          console.log('file 🐤', file)
          // make a toast pop for each file
          // TODO check if successfull upload i guess
          const notify = () => {
            toast.add(
              <Toast
                label="File uploaded"
                type="success"
                description={file.name}
              />
            )
          }

          notify()

          return client.file(file)
        })
      )
    } else {
      return null
    }
  }

  return (
    <>
      <div
        onDragOver={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setDraggingOver(true)
        }}
        onDrop={handleFileDrop}
        onDragLeave={() => {
          setDraggingOver(false)
        }}
      >
        {selectedRowCheckboxes.length > 0 && (
          <SelectedOptionsSubMenu
            selectedRowCheckboxes={selectedRowCheckboxes}
            setSelectedRowCheckboxes={setSelectedRowCheckboxes}
            items={items}
            deleteItems={deleteItems}
          />
        )}
        <InnerTable
          tableRef={tableRef}
          style={{
            background:
              locationIsFile && draggingOver
                ? color('lightaccent')
                : color('background'),
            border:
              locationIsFile && draggingOver
                ? `1px dashed ${color('accent')}`
                : locationIsFile
                ? `1px dashed ${color('border')}`
                : 'none',
            scrollAreaStyle,
          }}
          columnCount={columnCount}
          columnWidth={columnWidth}
          height={height}
          types={types}
          items={items}
          fields={newWorldOrder}
          onClick={onClick}
          setRelevantFields={setRelevantFields}
          selectedRowCheckboxes={selectedRowCheckboxes}
          setSelectedRowCheckboxes={setSelectedRowCheckboxes}
          isMultiref={isMultiref}
          itemKey={({
            columnIndex,
            data: { items, filteredFields },
            rowIndex,
          }) => `${items[rowIndex]?.id || rowIndex}-${fields[columnIndex]}`}
          innerElementType={({ children, style }) => {
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
                  scrollLeft={tableRef.current?.state?.scrollLeft}
                  setSelectedRowCheckboxes={setSelectedRowCheckboxes}
                  selectedRowCheckboxes={selectedRowCheckboxes}
                  items={items}
                />
              </div>
            )
          }}
          rowCount={itemCount}
          estimatedColumnWidth={colWidth}
          estimatedRowHeight={ITEM_HEIGHT}
          rowHeight={() => ITEM_HEIGHT}
          width={width}
          // onScroll={({ scrollTop }) => onScrollY(scrollTop)}
          onScroll={({ scrollTop }) => {
            onScrollY(scrollTop)
          }}
        />
      </div>
    </>
  )
}
