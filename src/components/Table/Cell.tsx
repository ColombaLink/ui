import React, { useEffect } from 'react'
import { useItemSchema } from '../Content/hooks/useItemSchema'
import { useHover } from '~/hooks'
import { Checkbox, Text, Badge } from '~'
import { border, color } from '~/utils'
import stringifyObject from 'stringify-object'
import { isImage } from '~/utils/isImage'
import { toDateString } from '~/utils/date'
import {
  HEADER_HEIGHT,
  ITEM_HEIGHT,
  ACTIONS_WIDTH,
  ITEM_WIDTH,
} from './constants'
import { Reference } from './Reference'
import { References } from './References'

export const Cell = ({ columnIndex, rowIndex, style, data }) => {
  const {
    types,
    items,
    fields,
    onClick,
    setState,
    hoverRowIndex,
    setIsMultiref,
  } = data
  const item = items[rowIndex]
  let children, value, field
  const { hover, active, listeners } = useHover()
  const colIndex = columnIndex - 1
  const activeRow = hoverRowIndex === rowIndex
  const isCheckbox = columnIndex === 0
  // TODO optimize

  // console.log('What the data?', data)
  // console.log(data.setIsMultiref, 'setIsMultiref')
  // console.log('What the item?', item)

  //  console.log('Data fields', data.fields)

  const { fields: schemaFields } = useItemSchema(item?.id)

  //  console.log('Schema fields', schemaFields, children, item?.id, item)

  let hasField
  if (item) {
    if (isCheckbox) {
      children = (
        <Checkbox
          checked={data.selectedRowCheckboxes?.includes(rowIndex)}
          onClick={(e) => {
            // this is the correct item from row
            console.log('item', item)

            if (data.selectedRowCheckboxes?.includes(rowIndex)) {
              const newSelectedRowCheckboxes =
                data.selectedRowCheckboxes.filter((el) => el !== rowIndex)
              data.setSelectedRowCheckboxes(newSelectedRowCheckboxes)
            }

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
              //  console.log('selectedRowCheckboxes', data.selectedRowCheckboxes)
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
            children = <Badge>{value.substring(0, 6) + '...'}</Badge>
          } else if (fieldType === 'string' && metaFieldType === 'markdown') {
            children = <Text weight={weight}>{value.substring(0, 64)}</Text>
          } else if (isImage(value)) {
            children = (
              <div
                style={{
                  backgroundImage: `url(${value}?w=100&h=100)`,
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

      // if (!children) {
      //   children =
      //     activeRow && hasField ? (
      //       <Text
      //         color="text"
      //         style={{
      //           pointerEvents: 'none',
      //           opacity: 0.5,
      //         }}
      //       >
      //         {field}
      //       </Text>
      //     ) : (
      //       ''
      //     )
      // }
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
          //        console.log(item, field, field && types[item.type].fields[field].type)
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
        paddingLeft: isCheckbox ? ACTIONS_WIDTH - 36 : 8,
        paddingRight: 12,
        borderBottom: border(1),
        //  borderRight: border(1),
        backgroundColor: color(
          activeRow
            ? !isCheckbox && hasField
              ? 'lightaccent'
              : 'lightaccent'
            : 'transparent'
        ),
      }}
    >
      {children}
    </div>
  )
}
