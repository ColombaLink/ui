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
import { systemFields } from '../Schema/templates'

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
  const [location, setLocation] = useLocation()

  // console.log('all fields', fields)

  let systemFieldsArr = Array.from(systemFields)

  // for file drop upload
  const client = useClient()
  const [draggingOver, setDraggingOver] = useState(false)
  const toast = useToast()

  // before you delete modal to confirm
  const { confirm } = useDialog()

  const [filteredFields, setFilteredFields] = useState([])
  const [unCheckedArr, setUnCheckedArr] = useState([])
  const [newWorldOrder, setNewWorldOrder] = useState([])

  // lijst determines order and wich fields are shown
  const [lijst, setLijst] = useState<{ label: string; checkbox: boolean }[]>([])

  // console.log('lijst', lijst)
  // console.log('All fields', fields)

  let checkedItemsAsObjectsArr = []
  let checkedItems = []

  // run once to filter out the fields that are not checked by default
  useEffect(() => {
    setFilteredFields(fields.filter((field) => !unCheckedArr.includes(field)))
  }, [unCheckedArr])

  // field order zorgt voor de drag drop order
  console.log(newWorldOrder, 'newworldorder')
  // lijst?.filter(
  //   (item, idx) =>
  //     filteredFields?.includes(item.label) && newWorldOrder.push(item.label)
  // )

  const getLijstFromQueryParams = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const checked = urlParams.get('checked')

    // als er params zijn
    if (checked) {
      checkedItems = JSON.parse(decodeURIComponent(checked))
      console.log('And this-->', JSON.parse(decodeURIComponent(checked)))
      console.log('And this-->', checkedItems)
    } else {
      // als er geen params zijn
      fields
        .filter((item) => !systemFieldsArr.includes(item))
        .map((field, idx) => {
          if (idx < 5) {
            checkedItems.push(field)
          }
        })
    }

    // van alle velden stop in de lijst
    fields.forEach((field) => {
      checkedItemsAsObjectsArr.push({
        label: field,
        checkbox: checkedItems.includes(field),
      })
    })

    console.log('checkedItems', checkedItems)
    console.log('checkedItemsAsObjectsArr', checkedItemsAsObjectsArr)
    setNewWorldOrder([...checkedItems])
    setFilteredFields([...checkedItems])
    setLijst([...checkedItemsAsObjectsArr])
  }

  // fire once
  useEffect(() => {
    getLijstFromQueryParams()
  }, [])

  useEffect(() => {
    // clean my state from par
    return () => {
      setNewWorldOrder([])
      history.replaceState(
        null,
        '',
        '?' +
          window.location.search
            .split('&')
            .filter(
              (str) =>
                !str.startsWith('?checked=') && !str.startsWith('checked=')
            )
            .join('&')
      )
    }
  }, [])

  useEffect(() => {
    console.log('lijst FiRE 🐸')

    let tempUnCheckedArr = []
    // setFilteredFields
    if (lijst.length > 0) {
      lijst.map(
        (item, idx) => !item.checkbox && tempUnCheckedArr.push(item.label)
      )
      setUnCheckedArr(tempUnCheckedArr)
    }
    console.log('unchecked??', tempUnCheckedArr)

    if (lijst.length > 0) {
      setNewWorldOrder(
        lijst.filter((item) => item.checkbox).map((item) => item.label)
      )
    }
  }, [lijst])

  // TODO: set location search params to newWorldOrder
  //  setLocation(`?checked=${encodeURIComponent(JSON.stringify(newCheckedArr))}`)

  useEffect(() => {
    setLocation(`?checked=${encodeURIComponent(JSON.stringify(newWorldOrder))}`)
  }, [newWorldOrder])

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
