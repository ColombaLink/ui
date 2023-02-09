import React, { useState, useEffect, useRef } from 'react'
import { styled } from 'inlines'
import { VariableSizeGrid } from 'react-window'
import { Cell } from './Cell'

const Grid = styled(VariableSizeGrid)

// let selectedRowCheckboxes = []

export const InnerTable = ({
  tableRef,
  types,
  items,
  fields,
  onClick,
  setRelevantFields,
  selectedRowCheckboxes,
  setSelectedRowCheckboxes,
  isMultiref,
  ...props
}) => {
  const [state, setState] = useState({})
  const { current: itemData } = useRef({})

  fields = Array.from(fields.map((field) => field.label))

  Object.assign(itemData, {
    types,
    items,
    fields,
    onClick,
    setRelevantFields,
    selectedRowCheckboxes,
    setSelectedRowCheckboxes,
    setState,
    ...state,
  })

  let fieldsOfRelevance

  if (isMultiref) {
    fieldsOfRelevance = []

    // @ts-ignore
    itemData.items?.forEach((element) => {
      const keys = Object.keys(element)

      keys.forEach((key) => {
        if (!fieldsOfRelevance.includes(key)) {
          fieldsOfRelevance.push(key)
          //  console.log('KEY ', key)
        }
      })
    })
  } else {
    // console.log('all fields??', fields)
    fieldsOfRelevance = [...fields]
  }

  useEffect(() => {
    setRelevantFields(fieldsOfRelevance)
  }, [isMultiref])

  // console.log('can we filter these fields then --> ', fieldsOfRelevance)
  // console.log('NEW ?? 🍇 InnerTable ---> ', itemData)
  // setRelevantFields(fieldsOfRelevance)

  return (
    <Grid {...props} itemData={itemData} ref={tableRef}>
      {Cell}
    </Grid>
  )
}
